import { TRegisterSchema } from "@/utils/schema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TRegisterState = Partial<TRegisterSchema> & {
  setData: (data: Partial<TRegisterSchema>) => void;
  clearData: () => void;
};

export const useRegisterStore = create<TRegisterState>()(
  persist(
    (set, get, store) => ({
      setData: (data) => set((state) => ({ ...state, ...data })), // Mescla os dados
      clearData: () => {
        set(() => ({
          fullName: "",
          cpf: "",
          phone: "",
          email: "",
          password: "",
          number: "",
          cep: "",
          street: "",
          complement: "",
          state: "",
          city: "",
          confirmEmail: "",
          confirmPassword: "",
        })); // Reseta o estado manualmente

        store.persist.clearStorage(); // Limpa o localStorage
      },
    }),
    {
      name: "register-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
