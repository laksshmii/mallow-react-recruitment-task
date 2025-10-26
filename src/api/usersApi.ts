import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UsersResponse {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get<UsersResponse>(`https://reqres.in/api/users?page=${page}`, {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch users');
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://reqres.in/api/register', userData, {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create user');
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }: { id: number; userData: any }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, userData, {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update user');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`, {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete user');
    }
  }
);