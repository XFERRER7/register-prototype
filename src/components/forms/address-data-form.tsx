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

const formSchema = z.object({
  cep: z.string({ required_error: 'CEP é obrigatório' }).min(9, 'CEP inválido'),
  street: z.string({ required_error: 'Rua é obrigatório' }).min(3, 'Rua inválida'),
  number: z.string({ required_error: 'Número é obrigatório' }).min(1, 'Número inválido'),
  complement: z.string({ required_error: 'Complemento é obrigatório' }).min(3, 'Complemento inválido'),
  state: z.string({ required_error: 'Estado é obrigatório' }).min(2, 'Estado inválido'),
  city: z.string({ required_error: 'Cidade é obrigatório' }).min(3, 'Cidade inválida'),
})

type TFormSchemaType = z.infer<typeof formSchema>

export const AddressDataForm = () => {

  const form = useForm<TFormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: TFormSchemaType) {
    console.log(values);
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
      getAddressByCEP(masks.postalCode(cep).original)
    }

  }, [form.watch('cep')])

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Informe o seu endereço</CardTitle>
        <CardDescription>Preencha todos os campos obrigatórios</CardDescription>
      </CardHeader>
      <CardContent>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-[30rem] w-full flex flex-col gap-5 items-center justify-center">
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
                    <FormLabel>Language</FormLabel>
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
                          <CommandInput placeholder="Search language..." />
                          <CommandList>
                            <CommandEmpty>No language found.</CommandEmpty>
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
