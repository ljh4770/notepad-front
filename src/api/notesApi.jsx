import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// 공통 헤더 설정
const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token"); // JWT 가져오기
  if (!token) {
    throw new Error("No access token found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Fetch notes
export const fetchNotes = async () => {
  try {
    const response = await axios.get(`${API_BASE}/note/all`, {
      headers: getAuthHeaders(), // JWT 포함
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error.response?.data || error.message);
    throw error;
  }
};

// Create note
export const createNote = async (note) => {
  try {
    const response = await axios.post(`${API_BASE}/note/`, note, {
      headers: {
        ...getAuthHeaders(),
        withCredentials: true,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create note:", error.response?.data || error.message);
    throw error;
  }
};

// Delete note
export const deleteNote = async (id) => {
  try {
    const response = await axios.post(`${API_BASE}/note/delete/${id}`, null, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete note:", error.response?.data || error.message);
    throw error;
  }
};
