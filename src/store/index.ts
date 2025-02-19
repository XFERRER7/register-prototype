import { TRegisterSchema } from "@/utils/schema"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type TRegisterState = Partial<TRegisterSchema> & {
  setData: (data: Partial<TRegisterSchema>) => void
}

export const useRegisterStore = create<TRegisterState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
    }),
    {
      name: "register-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)