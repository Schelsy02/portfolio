import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

// Créer le slice Redux
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register(state, action: PayloadAction<{ email: string; password: string }>) {
      state.user = {
        email: action.payload.email,
      };
      state.isAuthenticated = false; 
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      state.isAuthenticated = true;
      state.user = {
        email: action.payload.email,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;