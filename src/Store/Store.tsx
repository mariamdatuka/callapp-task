import { create } from "zustand";
import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

export interface UserStore {
  users: User[];
  loading: boolean;
  error: Error | null;
  fetchUsers: () => Promise<void>;
}

const userStore = create<UserStore>()((set) => ({
  users:[],
  loading: true,
  error: null,
  fetchUsers: async ():Promise<void> => {
    try {
      const response = await axios.get("http://localhost:3005/api/user");
      set({ users: response.data, loading: false,error: null });
    } catch (error:any) {
      set({ error, loading: false, users:[] });
    }
  },
}));

export default userStore;
