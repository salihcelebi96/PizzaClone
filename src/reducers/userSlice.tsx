import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  isChecked1: boolean;
  isChecked2: boolean;
  isChecked3: boolean;
}

interface UsersState {
  users: User[];
  activeUser: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  activeUser: null,
  isLoading: false,
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setActiveUser(state, action: PayloadAction<User>) {
      state.activeUser = action.payload;
    },
    setActiveUserByEmail(state, action: PayloadAction<string>) {
      const userEmail = action.payload;
      const matchedUser = state.users.find(user => user.email === userEmail);
      state.activeUser = matchedUser || null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { setUsers, setActiveUser, setActiveUserByEmail, setLoading, setError } = usersSlice.actions;

export default usersSlice.reducer;
