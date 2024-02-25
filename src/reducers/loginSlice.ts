// authReducer.ts
import { createSlice,PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isSignUp: boolean;
  userLogin:boolean;
  name:string;
  profilName:string;
  
}

const initialState: AuthState = {
  isAuthenticated: false,
  isSignUp: false,
  userLogin: false,
  name:"",
  profilName:"",
  
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
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setProfilName:(state,action: PayloadAction<string>) => {
      state.profilName = action.payload;
    }
  },
});

export const { loginOpen, logout, signUpOpen, signUpClose, userLoginFalse, userLoginTrue,setUserName,setProfilName } = authSlice.actions;
export default authSlice.reducer;
