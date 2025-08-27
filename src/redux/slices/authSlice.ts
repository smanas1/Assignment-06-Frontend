import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types";

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      localStorage.setItem("token", token);
      console.log(state.user);
      console.log("User logged in:", user);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      console.log(state.user);
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
