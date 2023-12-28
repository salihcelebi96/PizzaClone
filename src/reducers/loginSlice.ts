// authReducer.ts
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isSignUp: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isSignUp: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginOpen: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    signUpOpen: (state) => {
      state.isSignUp = true;
    },
    signUpClose: (state) => {
      state.isSignUp = false;
    },
  },
});

export const { loginOpen, logout, signUpOpen, signUpClose } = authSlice.actions;
export default authSlice.reducer;
