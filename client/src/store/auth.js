import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",

  initialState: {
    isAuthenticated: false,
    role: '',
    user: null,
    userName: 'ss'
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
    
    setUserName : (state, action) => {
      state.userName = action.payload
    },

    logout: (state) => {
      state.user = null
      state.role = ''
      state.isAuthenticated = false;
      state.userName = ''
    }
  },
});

export const { setUser, logout, setRole, setStudent, setAdmin, setPublic, setUserName } = authSlice.actions;
export default authSlice.reducer;