import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useMessageStore = create((set, get) => ({
  selectedChatUser: null,
  loadingMessages: false,
  users: null,

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
}));
