// authReducer.ts
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isSignUp: boolean;
  userLogin:boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isSignUp: false,
  userLogin: false,
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
    userLoginTrue: (state) => {
      state.userLogin=true;
    },
    userLoginFalse: (state) => {
      state.userLogin=false;
    },
  },
});

export const { loginOpen, logout, signUpOpen, signUpClose, userLoginFalse, userLoginTrue } = authSlice.actions;
export default authSlice.reducer;
