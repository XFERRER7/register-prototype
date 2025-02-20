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
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { masks } from "@/utils/masks"
import { useEffect } from "react";
import axios from 'axios'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { brStates } from "@/utils/br-states"
import { toast } from "@/hooks/use-toast";
import { registerSchema } from "@/utils/schema";
import { useRouter } from "next/navigation";
import { useRegisterStore } from "@/store";

const formSchema = registerSchema.pick({
  cep: true,
  street: true,
  number: true,
  complement: true,
  state: true,
  city: true,
})

type TFormSchemaType = z.infer<typeof formSchema>

export const AddressDataForm = () => {

  const router = useRouter();

  const setData = useRegisterStore((state) => state.setData);
  const {
    cep,
    city,
    complement,
    confirmEmail,
    confirmPassword,
    cpf,
    email,
    fullName,
    number,
    password,
    phone,
    state,
    street
  } = useRegisterStore(state => state)

  const form = useForm<TFormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(data: TFormSchemaType) {
    setData(data);
    router.push("/access-data");
  }

  async function getAddressByCEP(cep: string) {

    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

    if (response.data.erro) {

      form.setValue('street', '')
      form.setValue('complement', '')
      form.setValue('state', '')
      form.setValue('city', '')
    } else {
      const { data } = response

      form.setValue('street', data.logradouro)
      form.setValue('complement', data.complemento)
      form.setValue('city', data.localidade)
      const state = brStates.find(state => state.label === data.uf)
      form.setValue('state', state?.value || '')
    }
  }

  useEffect(() => {

    const cep = form.watch('cep')

    if (cep) {
      form.setValue('cep', masks.postalCode(cep).masked)
    }

    if (cep?.length === 9) {
      // getAddressByCEP(masks.postalCode(cep).original)
    }

  }, [form.watch('cep')])


  useEffect(() => {
    if (!useRegisterStore.persist.hasHydrated) return;

    if (cep && street && number && state && city && complement) {
      form.setValue('cep', cep)
      form.setValue('street', street)
      form.setValue('number', number)
      form.setValue('complement', complement)
      form.setValue('state', state)
      form.setValue('city', city)
    }

  }, [useRegisterStore.persist.hasHydrated, cep, street, number, complement, state, city, router])

  useEffect(() => {
    if (!useRegisterStore.persist.hasHydrated) return;

    if (!fullName || !cpf || !phone) {
      router.push("/personal-data");
    }
    
  }, [useRegisterStore.persist.hasHydrated, fullName, cpf, phone, router])

  return (
    <Card className="w-full lg:w-[30rem]">
      <CardHeader>
        <CardTitle>Informe o seu endereço</CardTitle>
        <CardDescription>Preencha todos os campos obrigatórios</CardDescription>
      </CardHeader>
      <CardContent>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-5 items-center justify-center">
            <div className="grid grid-cols-1 gap-4 w-full h-full">

              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={9}
                        placeholder="XXXXX-XXX"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rua</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome da rua"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 1111"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="complement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o complemento"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Estado</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? brStates.find(
                                (state) => state.value === field.value
                              )?.label
                              : "Selecione um estado"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Procure um estado..." />
                          <CommandList>
                            <CommandEmpty>Nenhum estado encontrado.</CommandEmpty>
                            <CommandGroup>
                              {brStates.map((state) => (
                                <CommandItem
                                  value={state.label}
                                  key={state.value}
                                  onSelect={() => {
                                    form.setValue("state", state.value)
                                  }}
                                >
                                  {state.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      state.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite a cidade"
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
