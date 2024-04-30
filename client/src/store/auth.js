import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",

  initialState: {
    isAuthenticated: false,
    role: '',
    user: null,
    userName: 'ss',
    silver: false,
    gold: false,
    daimond: false,
    studentDetails: {}
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

    setUserName: (state, action) => {
      state.userName = action.payload
    },

    setSilver: (state) => {
      state.silver = true
    },

    setGold: (state) => {
      state.gold = true
    },

    setDaimond: (state) => {
      state.daimond = true
    },

    unSetSilver: (state) => {
      state.silver = false
    },

    unSetGold: (state) => {
      state.gold = false
    },

    unSetDaimond: (state) => {
      state.daimond = false
    },

    saveStudentDetails: (state, action) => {
      state.studentDetails = action.payload;
    },

    logout: (state) => {
      state.user = null
      state.role = ''
      state.isAuthenticated = false;
      state.userName = ''
      state.silver = false
      state.gold = false
      state.daimond = false
    }
  },
});

export const { setUser, logout, setRole, setStudent, setAdmin, setPublic, setUserName, setSilver, setGold, setDaimond, unSetSilver, unSetGold, unSetDaimond, saveStudentDetails } = authSlice.actions;
export default authSlice.reducer;