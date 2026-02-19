import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      // Store in localStorage for persistence
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.removeItem('user');
    },
    setLoading(state, action) {
      state.loading = action.payload;
    }, 
    loadUserFromStorage(state) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          state.user = JSON.parse(storedUser);
          state.isAuthenticated = true;
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('user');
        }
      }
      state.loading = false;
    },
  },
});

export const { setUser, clearUser, setLoading, loadUserFromStorage } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserLoading = (state) => state.user.loading;

export default userSlice.reducer;
