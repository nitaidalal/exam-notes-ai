import axios from "axios";
import { setUser } from "../redux/userSlice";

/**
 * Fetch current user data from backend
 * This should be called when:
 * 1. App loads (if logged in)
 * 2. After profile updates
 * 3. To sync latest data from backend
 */
export const getCurrentUser = async (dispatch) => {
    try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/getCurrentUser`,
          {
            withCredentials: true,
          },
        );
        dispatch(setUser(response.data));
    } catch (error) {
        console.log("Error fetching current user:", error);
        throw error;
    }
}