import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useMessageStore = create((set, get) => ({
  gettingMessages: false,
  sendingMessage: false,
  selectedChatUser: null,
  loadingMessages: false,
  users: null,
  chats: null,

  fetchUsers: async () => {
    try {
      set({ loadingMessages: true });
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data, loadingMessages: false });
    } catch (error) {
      set({ loadingMessages: false });
      console.log(error);
    }
  },

  setSelectedChatUser: (user) => set({ selectedChatUser: user }),

  sendMessage: async (receiverId, text, image) => {
    try {
      set({ sendingMessage: true });
      const formData = new FormData();
      formData.append("text", text);
      formData.append("image", image);
      const res = await axiosInstance.post(
        `/messages/send/${receiverId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res.data);
      set({ sendingMessage: false });
    } catch (error) {
      set({ sendingMessage: false });
      console.log(error);
    }
  },

  getMessages: async (receiverId) => {
    try {
      set({ gettingMessages: true });

      const res = await axiosInstance.get(`/messages/${receiverId}`);
      const messages = res.data;
      const sortedList = messages.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      set({ chats: sortedList });
      set({ gettingMessages: false });
    } catch (error) {
      set({ gettingMessages: false });
      console.log(error);
    }
  },
}));
