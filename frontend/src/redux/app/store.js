import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSlice from "../features/UserSlice";
import ChatSlice from "../features/ChatSlice";
import  MessageSlice  from "../features/messageSlice";

 const store = configureStore({
   reducer: combineReducers({
     user: UserSlice,
     chat: ChatSlice,
     message: MessageSlice,
   }),
 });

export default store;
