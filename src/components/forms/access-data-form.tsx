'use client'

import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"
import { registerSchema } from "@/utils/schema"
import { useRegisterStore } from "@/store"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { brStates } from '@/utils/br-states'
import Stepper from "../steeper"

const formSchema = registerSchema.pick({
  email: true,
  confirmEmail: true,
  password: true,
  confirmPassword: true,
}).superRefine(({ confirmPassword, password, email, confirmEmail }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas não coincidem",
      path: ['confirmPassword'],
    });
  }

  if (confirmEmail !== email) {
    ctx.addIssue({
      code: "custom",
      message: "Os e-mails não coincidem",
      path: ['confirmEmail'],
    });
  }
});

type TFormSchemaType = z.infer<typeof formSchema>

export const AccessDataForm = () => {

  const [isShowingPassword, setIsShowingPassword] = useState(false)
  const [isShowingConfirmPassword, setIsShowingConfirmPassword] = useState(false)

  const setData = useRegisterStore(state => state.setData)
  const clearData = useRegisterStore(state => state.clearData)

  const {
    cep,
    city,
    complement,
    cpf,
    fullName,
    number,
    phone,
    state,
    street
  } = useRegisterStore(state => state)

  const router = useRouter()

  const form = useForm<TFormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(data: TFormSchemaType) {

    try {

      setData(data);

      const body = {
        cep: cep?.replace(/\D/g, ""),
        city,
        complement,
        confirmEmail: data.confirmEmail,
        confirmPassword: data.confirmPassword,
        cpf: cpf?.replace(/\D/g, ""),
        email: data.email,
        fullName,
        number,
        password: data.password,
        phone: phone?.replace(/\D/g, ""),
        state: brStates.find(brState => brState.value === state)?.label,
        street
      }

      const response = await api.post("/users", body)

      if (response.status === 201) {

        toast({
          title: "Usuário cadastrado com sucesso",
        })

        clearData()

      }

    } catch (error: any) {
      if (error.response?.data.message) {
        toast({
          title: error.response.data.message,
          variant: 'destructive'
        })
      } else {
        toast({
          title: "Erro ao cadastrar usuário",
          variant: 'destructive'
        })
      }
    }
  }

  useEffect(() => {
    if (!useRegisterStore.persist.hasHydrated) return;

    if (!fullName || !cpf || !phone) {
      router.push("/personal-data");
    }

    if (!cep || !street || !number || !city || !state) {
      router.push("/address-data");
    }

  }, [useRegisterStore.persist.hasHydrated, fullName, cpf, phone, cep, street, number, city, state])

  return (
    <Card className="w-full lg:w-[30rem]">
      <CardHeader>
        <div className="w-full flex items-center justify-center mb-5">
          <Stepper />
        </div>
        <CardTitle>Informe os dados de acesso</CardTitle>
        <CardDescription>Preencha todos os campos obrigatórios</CardDescription>
      </CardHeader>
      <CardContent>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-5 items-center justify-center">
            <div className="grid grid-cols-1 gap-4 w-full h-full">

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        maxLength={100}
                        placeholder="Digite seu e-mail"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="confirmEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        maxLength={100}
                        placeholder="Confirme seu e-mail"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isShowingPassword ? "text" : "password"}
                          maxLength={50}
                          placeholder="Digite sua senha"
                          {...field} />
                        {
                          isShowingPassword
                            ? <Eye className="absolute right-2 top-2 cursor-pointer" onClick={() => setIsShowingPassword(false)} size={21} />
                            :
                            <EyeOff className="absolute right-2 top-2 cursor-pointer" onClick={() => setIsShowingPassword(true)} size={21} />
                        }
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isShowingConfirmPassword ? "text" : "password"}
                          maxLength={50}
                          placeholder="Confirme sua senha"
                          {...field} />
                        {
                          isShowingConfirmPassword
                            ? <Eye className="absolute right-2 top-2 cursor-pointer" onClick={() => setIsShowingConfirmPassword(false)} size={21} />
                            :
                            <EyeOff className="absolute right-2 top-2 cursor-pointer" onClick={() => setIsShowingConfirmPassword(true)} size={21} />
                        }
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            <Button type="submit" className="w-40">
              {
                form.formState.isSubmitting
                  ? <Loader2 className="animate-spin" size={20} /> : "Continuar"
              }
            </Button>

          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
