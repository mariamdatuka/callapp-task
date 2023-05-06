import { create} from "zustand";
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
  addUser: (user:User) => Promise<void>;
}

const userStore = create<UserStore>()((set) => ({
  users:[],
  loading: true,
  error: null,
  fetchUsers: async ():Promise<void> => {
    try {
      const response = await axios.get("https://callapi-pcuu.onrender.com/api/user");
      set({ users: response.data, loading: false,error: null });
    } catch (error:any) {
      set({ error, loading: false, users:[] });
    }
  },
  addUser:async(formData:User):Promise<void>=>{
    try {
     await axios.post("https://callapi-pcuu.onrender.com/api/add", formData);
     set((state) => ({ 
       users: [...state.users, formData]
     }));
     } catch (error:any) {
       set({ error, loading: false, users:[] });
     }
   },
  }));



export default userStore;
