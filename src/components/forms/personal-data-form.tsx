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
import { registerSchema } from "@/utils/schema";
import { useRouter } from "next/navigation";
import { useRegisterStore } from "@/store";
import Stepper from "../steeper";

const formSchema = registerSchema.pick({
  cpf: true,
  fullName: true,
  phone: true
})

type TFormSchemaType = z.infer<typeof formSchema>

export const PersonalDataForm = () => {

  const router = useRouter();

  const setData = useRegisterStore((state) => state.setData);

  const {
    cpf,
    fullName,
    phone,
  } = useRegisterStore(state => state)

  const form = useForm<TFormSchemaType>({
    resolver: zodResolver(formSchema)
  })

  async function onSubmit(data: TFormSchemaType) {

    setData(data);
    router.push("/address-data");

  }

  useEffect(() => {
    if (!useRegisterStore.persist.hasHydrated) return;

    if (fullName && cpf && phone) {
      form.setValue('fullName', fullName)
      form.setValue('cpf', cpf)
      form.setValue('phone', phone)
    }

  }, [useRegisterStore.persist.hasHydrated, fullName, cpf, phone, router])

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

          <div className="w-full flex items-center justify-center mb-5">
            <Stepper activeStep={2}/>
          </div>

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
