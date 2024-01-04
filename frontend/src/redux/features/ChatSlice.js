import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const localhost = "http://localhost:5000";
const token = JSON.parse(localStorage.getItem("jwt"));

export const accessChat = createAsyncThunk("chat/accessChat", async (data) => {
  try {
    const res = await axios.post(
      `${localhost}/chat/`,
      { userId: data },
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
});

export const createGroupChat = createAsyncThunk(
  "chat/createGroupChat",
  async (data) => {
    try {
      const res = await axios.post(`${localhost}/chat/group`, data, {
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

export const renameGroupChat = createAsyncThunk(
  "chat/renameGroupChat",
  async (data) => {
    try {
      const res = await axios.put(`${localhost}/chat/rename`, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const removeFromGroupChat = createAsyncThunk(
  "chat/removeFromGroupChat",
  async (data) => {
    try {
      const res = await axios.put(`${localhost}/chat/groupremove`, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const addInGroupChat = createAsyncThunk("chat/addInGroupChat", async (data) => {
  try {
    const res = await axios.put(`${localhost}/chat/groupadd`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data;
  } catch (error) {
    return error;
  }
});

export const fetchChats = createAsyncThunk("chat/fetchChats", async () => {
  try {
    const res = await axios.get(`${localhost}/chat/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteChat = createAsyncThunk("chat/deleteChat", async (id) => {
  try {
    const res = await axios.delete(`${localhost}/chat/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return id;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  chatData: [],
  currentChat: [],
};

export const ChatSlice = createSlice({
  name: "chatData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.chatData = action.payload;
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.chatData = state.chatData.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(accessChat.fulfilled, (state, action) => {
        state.chatData.push(action.payload);
      })
      .addCase(createGroupChat.fulfilled, (state, action) => {
        state.chatData.push(action.payload);
      })
      .addCase(renameGroupChat.fulfilled, (state, action) => {
        const index = state.chatData.findIndex(
          (e) => e._id === action.payload._id
        );
        state.chatData[index].chatName = action.payload.chatName;
      })
      .addCase(removeFromGroupChat.fulfilled, (state, action) => {
        const index = state.chatData.findIndex(
          (e) => e._id === action.payload._id
        );
        state.chatData[index].users = action.payload.users;
      })
      .addCase(addInGroupChat.fulfilled, (state, action) => {
        const index = state.chatData.findIndex(
          (e) => e._id === action.payload._id
        );
        state.chatData[index].users = action.payload.users;
      });
  },
});

export default ChatSlice.reducer;
