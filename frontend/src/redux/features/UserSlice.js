import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const localhost = "http://localhost:5000";
const token = JSON.parse(localStorage.getItem("jwt"));

export const addUser = createAsyncThunk("user/signup", async (data) => {
  try {
    const res = await axios.post(`${localhost}/user/signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const logUser = createAsyncThunk("user/login", async (data) => {
  try {
    const res = await axios.post(`${localhost}/user/login`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const getUser = createAsyncThunk("user/getUser", async (data) => {
  try {
    const res = await axios.get(`${localhost}/user?search=${data}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  userData: [],
  loading: true,
  currentUser: JSON.parse(localStorage.getItem("user")) || [],
  addUserInChat: [],
};

export const UserSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addData: (state, action) => {
      const data = {
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        profilePic: action.payload.profilePic,
      };
      addUser(data);
      state.userData.push(data);
    },
    removeSearchedUser: (state) => {
      state.addUserInChat = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logUser.fulfilled, (state, action) => {
        state.loading = false;
        const temp = action.payload.savedUser;
        state.currentUser = temp;
        localStorage.setItem("user", JSON.stringify(temp));
        localStorage.setItem("jwt", JSON.stringify(action.payload.token));
      })
      .addCase(logUser.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(addUser.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload.savedUser));
        localStorage.setItem("jwt", JSON.stringify(action.payload.token));
        state.currentUser = action.payload.savedUser;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.addUserInChat = action.payload;
      });
  },
});

export const { addData, removeSearchedUser } = UserSlice.actions;

export default UserSlice.reducer;
