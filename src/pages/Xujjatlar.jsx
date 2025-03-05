import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/layout/SideBar";
import { PlusCircle, Search, Trash } from "lucide-react";
import { useSelector } from "react-redux";

const Xujjatlar = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);
  const userId = useSelector((state) => state.cart.userId);

  // Hujjatlarni olish
  const getDocuments = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/documents/user/${userId}/`);
      const data = await response.json();
      setDocuments(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getDocuments(userId);
    }
  }, [userId]);

  // Fayl yuklash funksiyasi
  const postDocument = async () => {
    if (!file) {
      alert("Iltimos, faylni tanlang!");
      return;
    }

    const formData = new FormData();
    formData.append("user", userId);
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/api/documents/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Fayl muvaffaqiyatli yuklandi!");
        getDocuments(userId);
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        alert("Fayl yuklashda xatolik!");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("Server bilan bog‘liq muammo yuzaga keldi.");
    }
  };

  // Hujjatni o'chirish
  const deleteDocument = async (docId) => {
    try {
      const response = await fetch(`${API_URL}/api/documents/${docId}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Hujjat muvaffaqiyatli o'chirildi!");
        getDocuments(userId);
      } else {
        alert("O'chirishda xatolik!");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
    setMenuPosition(null);
  };

  // O'ng tugma bosilganda
  const handleContextMenu = (e, docId) => {
    e.preventDefault();
    setSelectedDocId(docId);
    setMenuPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Tashqariga bosilganda menyu yopilishi
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuPosition(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Fayl turiga qarab ikonka tanlash
  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return "https://cdn-icons-png.flaticon.com/128/9496/9496432.png"; // PDF uchun ikonka
      case "docx":
        return "https://cdn-icons-png.flaticon.com/128/9797/9797938.png"; // Word uchun ikonka
      case "xlsx":
        return "https://cdn-icons-png.flaticon.com/128/4726/4726040.png"; // Excel uchun ikonka
      case "pptx":
        return "https://cdn-icons-png.flaticon.com/128/11037/11037529.png"; // PowerPoint uchun ikonka
      case "zip":
        return "https://cdn-icons-png.flaticon.com/128/11040/11040112.png";
      case "rar":
        return "https://cdn-icons-png.flaticon.com/128/11665/11665386.png"; // Arxiv uchun ikonka
      default:
        return "https://cdn-icons-png.flaticon.com/128/2965/2965335.png"; // Boshqa hollarda standart ikonka
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="w-full py-4 px-8 mx-auto">
        {/* Qidiruv va tugma */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Qidirish"
              className="pl-10 pr-3 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#010082]"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="max-w-sm">
              <label htmlFor="file-input" className="hidden">
                Xujjat qo'shish
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files[0])}
                name="file-input"
                id="file-input"
                accept=".pdf, .docx, .pptx, .xlsx, .zip, .rar"
                className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                  dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                  file:bg-[#010082] file:text-white file:border-0 file:me-4
                  file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
              />
            </div>
            <button
              onClick={postDocument}
              className="flex items-center gap-2 bg-[#010082] text-white px-4 py-2 rounded-md"
            >
              <PlusCircle size={20} />
              Xujjat qo'shish
            </button>
          </div>
        </div>

        {/* Kontekst menyusi */}
        {menuPosition && (
          <div
            ref={menuRef}
            className="absolute bg-white shadow-lg rounded-md p-2 z-50"
            style={{
              left: menuPosition.x + "px",
              top: menuPosition.y + "px",
            }}
          >
            <button
              onClick={() => deleteDocument(selectedDocId)}
              className="flex items-center gap-2 text-red-600 hover:bg-gray-100 w-full px-3 py-2"
            >
              <Trash size={16} />
              O'chirish
            </button>
          </div>
        )}

        {/* Hujjatlar ro'yxati */}
        <div className="bg-gray-50 h-[32rem] overflow-auto rounded-md shadow-md p-5 flex flex-wrap gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col items-center gap-2 w-[10rem]"
              onContextMenu={(e) => handleContextMenu(e, doc.id)}
            >
              <a
                href={doc.file}
                download={doc.original_name}
                className="w-[10rem] h-[10rem] flex justify-center items-center bg-#F9FAFB rounded-md shadow cursor-pointer hover:bg-gray-200"
              >
                <img
                  src={getFileIcon(doc.original_name)} // Fayl turiga qarab ikonka
                  alt="file"
                  className="w-full h-full p-8 object-contain hover:mix-blend-darken"
                />
              </a>
              <div className="w-[10rem] text-center">
                <span className="mt-2 text-[1rem] font-semibold truncate block">
                  {doc.original_name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Xujjatlar;