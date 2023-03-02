import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",

  initialState: {
    isAuthenticated: false,
    role: '',
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload
    },

    setStudent: (state) => {
      state.role = 'student'
    },

    setAdmin: (state) => {
      state.role = 'admin'      
    },

    setPublic: (state) => {
      state.role = 'public'
    },
    
  
    logout: (state) => {
      state.user = null
      state.role = ''
      state.isAuthenticated = false;
    }
  },
});

export const { setUser, logout, setRole, setStudent, setAdmin, setPublic } = authSlice.actions;
export default authSlice.reducer;