import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email: credentials.email,
        password: credentials.password
      }, {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      return token;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("https://reqres.in/api/logout", {}, {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      });
      localStorage.removeItem('token');
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Logout failed');
    }
  }
);
