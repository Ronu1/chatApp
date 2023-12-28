import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const localhost = "http://localhost:5000";
const token = JSON.parse(localStorage.getItem("jwt"));

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (data) => {
    try {
      const res = await axios.post(
        `${localhost}/message/`,
        { content: data.message, chatId: data.chatId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (id) => {
    try {
      const res = await axios.get(`${localhost}/message/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  messageData: [],
};

export const MessageSlice = createSlice({
  name: "messageData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messageData = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messageData = action.payload;
      });
  },
});

export default MessageSlice.reducer;
