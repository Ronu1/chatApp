import { createContext, useReducer } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    users: [],
    chatName: "",
    isGroupChat: false,
    pic: "",
    chatId: "null",
    groupPic : "",
    groupAdmin: ""
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          users: action.payload.users,
          chatId: action.payload.id,
          pic: action.payload.users[0].pic,
          isGroupChat: action.payload.isGroupChat,
          chatName: action.payload.chatName,
          groupPic: action.payload.groupPic,
          groupAdmin: action.payload.groupAdmin?._id,
        }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
