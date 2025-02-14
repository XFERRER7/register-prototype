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
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

const formSchema = z
  .object({
    email: z.string({ required_error: 'Campo Obrigatório' }).email({ message: "E-mail inválido" }),
    confirmEmail: z.string({ required_error: 'Campo Obrigatório' }).email({ message: "E-mail inválido" }),
    password: z
      .string({ required_error: 'Campo Obrigatório' })
      .min(8, { message: "Mínimo de 8 caracteres" })
      .refine((value) => /[A-Z]/.test(value), {
        message: "A senha deve conter pelo menos uma letra maiúscula",
      })
      .refine((value) => /[a-z]/.test(value), {
        message: "A senha deve conter pelo menos uma letra minúscula",
      })
      .refine((value) => /\d/.test(value), {
        message: "A senha deve conter pelo menos um número",
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "A senha deve conter pelo menos um caractere especial",
      }),
    confirmPassword: z.string({ required_error: 'Campo Obrigatório' }).min(8, { message: "Mínimo de 8 caracteres" }),
  })
  .superRefine(({ confirmPassword, password, email, confirmEmail }, ctx) => {
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

  const form = useForm<TFormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(data: TFormSchemaType) {

    toast({
      title: "Você enviou os seguintes dados",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })

  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Informe os dados de acesso</CardTitle>
        <CardDescription>Preencha todos os campos obrigatórios</CardDescription>
      </CardHeader>
      <CardContent>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-[30rem] w-full flex flex-col gap-5 items-center justify-center">
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
