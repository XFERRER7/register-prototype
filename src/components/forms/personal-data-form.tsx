'use client'

import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect } from "react";
import { masks } from "@/utils/masks"
import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z
    .string({ required_error: 'Nome completo é obrigatório' })
    .min(3, 'Nome completo deve ter no mínimo 3 caracteres'),
  cpf: z
    .string({ required_error: 'CPF é obrigatório' })
    .refine((value) => cpfValidator.isValid(value), {
      message: 'CPF inválido',
    }),
  phone: z.string({ required_error: 'Telefone é obrigatório' }),
});

type TFormSchemaType = z.infer<typeof formSchema>

export const PersonalDataForm = () => {

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

  useEffect(() => {

    const cpf = form.watch('cpf')

    if (cpf) {
      form.setValue('cpf', masks.cpf(cpf).masked)
    }

  }, [form.watch('cpf')])

  useEffect(() => {

    const phone = form.watch('phone')

    if (phone) {
      form.setValue('phone', masks.phone(phone).masked)
    }

  }, [form.watch('phone')])

  return (
    <Card className="w-full lg:w-[30rem]">
      <CardHeader>
        <CardTitle>Informe os dados pessoais</CardTitle>
        <CardDescription>Preencha todos os campos obrigatórios</CardDescription>
      </CardHeader>
      <CardContent>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-5 items-center justify-center">
            <div className="grid grid-cols-1 gap-4 w-full h-full">

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={14}
                        placeholder="XXX.XXX.XXX-XX"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu nome completo"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={15}
                        placeholder="(XX) XXXXX-XXXX"
                        {...field} />
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
