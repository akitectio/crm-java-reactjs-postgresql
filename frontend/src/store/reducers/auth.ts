import { IUser } from '@app/types/user';
import { User } from '@firebase/auth';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  currentUser: IUser | null;
}

const initialState: AuthState = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (
      state: AuthState,
      { payload }: { payload: User | null }
    ) => {
      state.currentUser = payload;
    },
    onLogOut:(
      state: AuthState,
    ) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser,onLogOut } = authSlice.actions;

export default authSlice.reducer;
