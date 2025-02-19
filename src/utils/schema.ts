import { z } from "zod";
import { cpf as cpfValidator } from 'cpf-cnpj-validator'

export const registerSchema = z.object({
  //form 1
  fullName: z.string({ required_error: 'Nome completo é obrigatório' }).min(3, 'Nome completo deve ter no mínimo 3 caracteres'),
  cpf: z.string({ required_error: 'CPF é obrigatório' }).refine((value) => cpfValidator.isValid(value), { message: 'CPF inválido', }),
  phone: z.string({ required_error: 'Telefone é obrigatório' }),

  //form 2
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

  //form 3
  cep: z.string({ required_error: 'CEP é obrigatório' }).min(9, 'CEP inválido'),
  street: z.string({ required_error: 'Rua é obrigatório' }).min(3, 'Rua inválida'),
  number: z.string({ required_error: 'Número é obrigatório' }).min(1, 'Número inválido'),
  complement: z.string({ required_error: 'Complemento é obrigatório' }).min(3, 'Complemento inválido'),
  state: z.string({ required_error: 'Estado é obrigatório' }).min(2, 'Estado inválido'),
  city: z.string({ required_error: 'Cidade é obrigatório' }).min(3, 'Cidade inválida'),
})

export type TRegisterSchema = z.infer<typeof registerSchema>;