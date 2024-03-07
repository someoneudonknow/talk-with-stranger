import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";
import { toast } from "react-toastify";

const authService = new AuthService(`${import.meta.env.VITE_BASE_URL}/api/v1`);

export const signUp = createAsyncThunk(
  "user/sign-up",
  async (payload, { rejectWithValue }) => {
    try {
      const userData = await authService.signUp(payload);

      return userData;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "/user/sign-in",
  async (payload, { rejectWithValue }) => {
    try {
      const userData = await authService.signIn(payload?.userData);

      return {
        rememberMe: payload.isRememberMe,
        user: userData,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    error: false,
    errorMessage: "",
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        toast.success(payload?.message);
        return {
          ...state,
          isLoading: false,
          currentUser: payload?.metadata?.user,
        };
      })
      .addCase(signUp.rejected, (state, action) => {
        toast.error(action?.payload);
        return {
          ...state,
          isLoading: false,
          currentUser: null,
        };
      });

    builder
      .addCase(signIn.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        toast.success(payload?.user?.message);

        if (payload?.rememberMe) {
          localStorage.setItem("refreshToken", payload?.tokens?.accessToken);
        }

        return {
          ...state,
          isLoading: false,
          currentUser: payload?.user?.metadata?.user,
        };
      })
      .addCase(signIn.rejected, (state, action) => {
        toast.error(action?.payload);
        return {
          ...state,
          isLoading: false,
          currentUser: null,
        };
      });
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;
