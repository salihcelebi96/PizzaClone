// authReducer.ts
import { createSlice,PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isSignUp: boolean;
  userLogin:boolean;
  name:string;
  profilName:string;
  addAdress:boolean;
  
}

const initialState: AuthState = {
  isAuthenticated: false,
  isSignUp: false,
  userLogin: false,
  name:"",
  profilName:"",
  addAdress:false,
  
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
    },
    addAdressFalse: (state) => {
      state.addAdress=false;
    },
    addAdressTrue: (state) => {
      state.addAdress=true;
    }
  },
});

export const { loginOpen, logout, signUpOpen, signUpClose, userLoginFalse, userLoginTrue,setUserName,setProfilName,addAdressFalse,addAdressTrue } = authSlice.actions;
export default authSlice.reducer;
