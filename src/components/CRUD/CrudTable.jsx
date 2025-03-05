import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store";
import { CirclePlus } from "lucide-react";
import { DeleteModal } from "../DeleteModal";

const ProductTable = ({ data, typeData, setMiniRef }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const mchjId = useSelector((state) => state.cart.mchj);
  const [selectedType, setSelectedType] = useState("");
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleTypeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);
    const foundType = typeData.find((item) => item.name === selectedValue);

    if (foundType) {
      dispatch(cartActions.addTypeId(foundType));
    } else {
      dispatch(cartActions.addTypeId(""));
    }
  };

  const sendDataApi = (newData) => {
    fetch(`${API_URL}/api/instruments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            console.error("Server Error:", text);
            throw new Error(`Server error: ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Yangi texnika qo'shildi:", data);
        alert("Yangi texnika muvaffaqiyatli qo'shildi!");
        setIsModalOpen(false);
        setFormData(initialFormState);
      })
      .catch((error) => {
        console.error("Error adding texnika:", error);
        alert("Texnika qo'shishda xatolik yuz berdi. Iltimos, qayta urunib ko'ring.");
      });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/instruments/${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Item successfully deleted!");
        setMiniRef(true);
        setIsDeleteModalOpen(false);
      } else {
        throw new Error("Error deleting item");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete the item.");
    }
  };

  const openDeleteModal = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const initialFormState = {
    texnika_turi: "",
    rusumi: "",
    zavod_raqami: "",
    davlat_raqami: "",
    sana: "",
    soni: "",
    texnik_holati: "Soz",
    type: "Tanlang",
    mchj: mchjId,
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      setFormData(initialFormState);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (formData.type === "Tanlang") return;

    const matchedType = typeData.find((item) => item.name === formData.type);
    if (matchedType) {
      formData.type = matchedType.id;
    }

    formData.texnik_holati =
      formData.texnik_holati === "Soz"
        ? 1
        : formData.texnik_holati === "Nosoz"
        ? 2
        : 3;

    if (formData.texnika_turi.trim() !== "") {
      if (formData.id) {
        fetch(`${API_URL}/api/instruments/${formData.id}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Tahrirlandi:", data);
            setIsModalOpen(false);
            setFormData(initialFormState);
            setMiniRef(true);
          })
          .catch((error) => console.error("Tahrirlash xatosi:", error));
      } else {
        sendDataApi(formData);
        setMiniRef(true);
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      ...item,
      texnik_holati:
        item.texnik_holati === 1
          ? "Soz"
          : item.texnik_holati === 2
          ? "Nosoz"
          : "Yaroqsiz",
      type: typeData.find((type) => type.id === item.type)?.name || "Tanlang",
    });
    setIsModalOpen(true);
  };

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    dispatch(cartActions.addQuery(value));
  };

  const role = useSelector((state) => state.cart.role);

  return (
    <div className="flex justify-center">
      <div className="py-2 px-8 flex flex-col justify-center relative w-[90rem]">
        <div className="sticky top-0 bg-white z-20 flex justify-between items-center mb-4 shadow-md p-4 rounded-[5px]">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Qidirish"
            className="border border-gray-400 bg-[#F9FAFB] px-4 py-2 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <h1></h1>
          {role !== 2 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#010082] flex items-center gap-2 text-white px-4 py-3 rounded-md cursor-pointer"
            >
              <CirclePlus /> Texnika qo'shish
            </button>
          )}
        </div>

        <div className="overflow-y-auto max-h-[68vh] bg-white">
          <table className="w-full shadow-md rounded-md">
            <thead className="sticky top-0 bg-white z-10 shadow-sm">
              <tr className="text-left">
                <th className="px-4 py-2">
                  <select
                    name="texnik_holati"
                    value={selectedType}
                    onChange={handleTypeChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B95D3]"
                  >
                    <option>Texnika turi</option>
                    {typeData.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </th>
                <th className="px-4 py-2">Rusumi</th>
                <th className="px-4 py-2">Zavod raqami</th>
                <th className="px-4 py-2">Davlat raqami</th>
                <th className="px-4 py-2">Ishlab chiqarilgan yili</th>
                <th className="px-4 py-2">Soni</th>
                <th className="px-4 py-2">Texnik holati</th>
                {role !== 2 && <th className="px-4 py-2"></th>}
                {role !== 2 && <th className="px-4 py-2"></th>}
              </tr>
            </thead>
            <tbody className="border border-gray-100">
              {data.map((item) => (
                <tr key={item.id} className="text-left even:bg-[#F8F8F8] odd:bg-white">
                  <td className="border-b-2 text-[#1B95D3] border-gray-100 pl-5 py-2">
                    {item.texnika_turi}
                  </td>
                  <td className="border-b-2 border-gray-100 px-4 py-2">
                    {item.rusumi}
                  </td>
                  <td className="border-b-2 border-gray-100 px-4 py-2">
                    {item.zavod_raqami}
                  </td>
                  <td className="border-b-2 border-gray-100 px-4 py-2">
                    {item.davlat_raqami}
                  </td>
                  <td className="border-b-2 border-gray-100 px-4 py-2">
                    {item.sana}
                  </td>
                  <td className="border-b-2 border-gray-100 px-4 py-2">
                    {item.soni}
                  </td>
                  <td className="border-b-2 border-gray-100 px-4 py-2">
                    {item.texnik_holati === 1
                      ? "Soz"
                      : item.texnik_holati === 2
                      ? "Nosoz"
                      : "Yaroqsiz"}
                  </td>
                  {role !== 2 && (
                    <td className="border-b-2 border-gray-100 px-4 py-2">
                      <button
                        className="text-green-700 cursor-pointer"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit size={20} />
                      </button>
                    </td>
                  )}
                  {role !== 2 && (
                    <td className="border-b-2 border-gray-100 px-4 py-2">
                      <button
                        className="text-red-700 cursor-pointer"
                        onClick={() => openDeleteModal(item.id)}
                      >
                        <FaTrash size={20} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
            onClick={handleBackdropClick}
          >
            <div className="bg-white p-6 rounded-md shadow-md w-[500px] relative">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setFormData(initialFormState);
                }}
                className="text-3xl absolute top-2 right-2 text-gray-500 cursor-pointer"
              >
                ×
              </button>
              <h2 className="text-xl font-semibold mb-4">
                {formData.id ? "Texnikani tahrirlash" : "Texnika qo'shish"}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Texnika turi</label>
                  <input
                    type="text"
                    name="texnika_turi"
                    value={formData.texnika_turi}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Texnikani kiriting"
                  />
                </div>
                <div>
                  <label className="block mb-1">Rusumi</label>
                  <input
                    type="text"
                    name="rusumi"
                    value={formData.rusumi}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Rusumini kiriting"
                  />
                </div>
                <div>
                  <label className="block mb-1">Zavod raqami</label>
                  <input
                    type="text"
                    name="zavod_raqami"
                    value={formData.zavod_raqami}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Zavod raqamini kiriting"
                  />
                </div>
                <div>
                  <label className="block mb-1">Davlat raqami</label>
                  <input
                    type="text"
                    name="davlat_raqami"
                    value={formData.davlat_raqami}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Davlat raqamini kiriting"
                  />
                </div>
                <div>
                  <label className="block mb-1">Ishlab chiqarilgan yili</label>
                  <input
                    type="number"
                    name="sana"
                    value={formData.sana}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Yilini kiriting"
                  />
                </div>
                <div>
                  <label className="block mb-1">Texnika soni</label>
                  <input
                    type="number"
                    name="soni"
                    min="0"
                    value={formData.soni}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Texnika sonini kiriting"
                  />
                </div>
                <div>
                  <label className="block mb-1">Texnik holati</label>
                  <select
                    name="texnik_holati"
                    value={formData.texnik_holati}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Soz</option>
                    <option>Nosoz</option>
                    <option>Yaroqsiz</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Texnika turi</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Tanlang</option>
                    {typeData.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={
                  !formData.texnika_turi.trim() ||
                  formData.type === "Tanlang" ||
                  formData.soni === ""
                }
                className="mt-4 bg-[#010082] text-white px-4 py-2 rounded-md w-full cursor-pointer disabled:opacity-50"
              >
                {formData.id ? "Tahrirlashni saqlash" : "Yangi texnika qo'shish"}
              </button>
            </div>
          </div>
        )}

        {/* DeleteModal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          itemId={itemToDelete}
        />
      </div>
    </div>
  );
};

export default ProductTable;