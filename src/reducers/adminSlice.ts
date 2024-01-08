
import { createSlice } from '@reduxjs/toolkit';



export interface AdminState {
  adminLogin: boolean,
}

const initialState: AdminState = {
  adminLogin: false,
};

const AdminSlice = createSlice({
  name: 'adminLogin', 
  initialState,
  reducers: {
    adminLoginTrue: (state) => {
        state.adminLogin = true;
    },
    adminLoginFalse: (state) => {
        state.adminLogin = false;
    }
  },
});

export const { adminLoginTrue, adminLoginFalse } = AdminSlice.actions; 

export default AdminSlice.reducer;
