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

export const signOut = createAsyncThunk(
  "/user/sign-out",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authService.logOut();

      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userToken: localStorage.getItem("refreshToken") || null,
    currentUser: null,
    isLoading: false,
  },
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        toast.success(payload?.message);

        localStorage.setItem("accessToken", payload?.tokens?.accessToken);
        localStorage.setItem("uid", payload?.user?.id);

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
        const {
          message,
          metadata: { user, tokens },
        } = payload.user;
        toast.success(message);

        localStorage.setItem("accessToken", tokens?.accessToken);
        localStorage.setItem("uid", user?.id);

        return {
          ...state,
          isLoading: false,
          currentUser: user,
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

    builder
      .addCase(signOut.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(signOut.fulfilled, (state, { payload }) => {
        toast.success(payload?.message);

        localStorage.removeItem("accessToken");

        return {
          ...state,
          isLoading: false,
          currentUser: null,
        };
      })
      .addCase(signOut.rejected, (state, { payload }) => {
        toast.error(payload);
        return {
          ...state,
          isLoading: false,
        };
      });
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
