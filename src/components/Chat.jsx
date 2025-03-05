import { Send, Edit, Trash2, Check, CheckCheck } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IoCheckmarkDone } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";

const Chat = ({ selectedMchj }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const contextMenuRef = useRef(null); // Modalni boshqarish uchun ref

  const [contextMenu, setContextMenu] = useState(null);

  const fetchMessages = async () => {
    if (!selectedMchj) return;
    try {
      const response = await fetch(`${API_URL}/api/GeTallmessagesbetweenMCHJandAdmin/admin/${selectedMchj.id}/`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Xabarlarni yuklashda xatolik:", error);
    }
  };
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 1000); // 1000 ms = 1 sekund
  
    return () => clearInterval(intervalId);
  }, [selectedMchj]); 



  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (inputText.trim() === "" || loading) return;
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/messages/admin/send/${selectedMchj.id}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: inputText }),
      });

      if (response.ok) {
        fetchMessages();
      } else {
        console.error("Server xatosi:", await response.json());
      }
    } catch (error) {
      console.error("Xabar yuborishda xatolik:", error);
    }

    setInputText("");
    setLoading(false);
  };

  const handleContextMenu = (e, msg) => {
    e.preventDefault();
    if (msg.sender !== 1) return;

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      messageId: msg.id,
    });
  };

  const role = useSelector((state) => state.cart.role);

  const handleUpdate = async (messageId, role) => {
    const newText = prompt("Yangi xabarni kiriting:");
    if (!newText) return;

    try {
      const response = await fetch(`${API_URL}/api/messages/${messageId}/${role}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newText,
        }),
      });

      if (response.ok) {
        fetchMessages();
      } else {
        console.error("Xabarni yangilashda xatolik:", await response.json());
      }
    } catch (error) {
      console.error("Xabarni yangilashda xatolik:", error);
    }

    setContextMenu(null);
  };

  const handleDelete = (messageId, role) => {
    fetch(`${API_URL}/api/messages/${messageId}/${role}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchMessages();
        } else {
          console.error("Xabar o'chirishda xatolik:", response);
        }
      })
      .catch((error) => {
        console.error("Xabar o'chirishda xatolik:", error);
      });

    setContextMenu(null);
  };

  // **Modal tashqarisiga bosilganda yopish**
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenu && contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setContextMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu]);

  return (
    <div className="w-3/4 flex flex-col">
      {selectedMchj ? (
        <div className="flex flex-col flex-1 p-6 bg-white">
          <h2 className="text-lg font-bold pb-3 border-b-2 border-gray-100 mb-4">{selectedMchj.name}</h2>

          {/* Chat Messages */}
          <div className="h-[68vh] min-h-0 flex flex-col-reverse overflow-y-auto p-4 rounded-lg">
            <div ref={messagesEndRef}></div>
            {messages
              .slice()
              .reverse()
              .map((msg, index) => (
                <div
                  key={index}
                  className={`relative px-4 py-2 my-1 rounded-[15px] max-w-xs break-word flex  gap-2 ${
                    msg.sender === 1 ? "self-end bg-blue-500 text-white" : "self-start bg-gray-200"
                  }`}
                  onContextMenu={(e) => handleContextMenu(e, msg)}
                >
                  {msg.content}
                  {msg.sender === 1 && (msg.is_read === true ? <div className="flex flex-1 items-end"><IoCheckmarkDone /></div> : <div className="flex flex-1 items-end"><IoCheckmarkOutline /></div>)}
                </div>
              ))}
          </div>

          {/* Context Menu */}
          {contextMenu && (
            <div
              ref={contextMenuRef}
              className="absolute bg-white shadow-lg rounded-md p-2"
              style={{
                top: contextMenu.y,
                left: contextMenu.x + 150 > window.innerWidth ? contextMenu.x - 120 : contextMenu.x,
              }}
            >
              <button
                className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-200"
                onClick={() => handleUpdate(contextMenu.messageId, role)}
              >
                <Edit size={16} /> Tahrirlash
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 w-full text-red-500 hover:bg-gray-200"
                onClick={() => handleDelete(contextMenu.messageId, role)}
              >
                <Trash2 size={16} /> O'chirish
              </button>
            </div>
          )}

          {/* Input and Send Button */}
          <div className="pt-[0.5rem] flex justify-center items-center gap-3">
            <input
              type="text"
              placeholder="Text message"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="px-6 py-4 w-[90%] rounded-full shadow-lg shadow-gray-400 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className={`bg-blue-500 text-white px-4 py-4 rounded-full shadow-lg shadow-gray-400 cursor-pointer ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Send />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center bg-white">
          <img src="/chatBg.png" alt="chat" />
        </div>
      )}
    </div>
  );
};

export default Chat;
