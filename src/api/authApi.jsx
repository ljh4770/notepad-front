import axios from "axios";

const API_BASE = "http://3.18.245.237/api";

export const login = async (email, password) => {
    const response = await axios.post(
        `${API_BASE}/login`,
        { email, password },
        { withCredentials: true } // 쿠키를 포함
    );
    console.log(response.data);
    localStorage.setItem('access_token', response.data.access_token);
    return response.data;
};

export const logout = async () => {
    try {
      const response = await axios.post(`${API_BASE}/logout`, null, {
        withCredentials: true, // 쿠키 포함
      });
      return response.data;
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      throw error;
    }
  };