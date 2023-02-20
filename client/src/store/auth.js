import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    role: '',
    user: {},
  },
  reducers: {
    setUser: (state, {payload}) => {
      state.isAuthenticated = true;
      state.user = payload.user
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
      state.user = {}
      state.role = ''
      state.isAuthenticated = false;
    }
  },
});

export const { setUser, logout, setRole, setStudent, setAdmin, setPublic } = authSlice.actions;
export default authSlice.reducer;