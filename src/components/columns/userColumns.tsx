"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Ellipsis } from "lucide-react"
import { IUser } from "@/types"
import { masks } from "@/utils/masks"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const userColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "fullName",
    id: "Nome",
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center">
          <Button
            variant="outline"
            className="border-none bg-transparent hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue("Nome") as string

      return <div className="flex justify-center items-center">{value}</div>
    },
  },
  {
    accessorKey: "cpf",
    id: "CPF",
    header: () => <div className="flex justify-center items-center">
      <span className="text-center">CPF</span>
    </div>,
    cell: ({ row }) => {
      const value = row.getValue("CPF") as string

      return <div className="flex justify-center items-center">
        <span className='text-center'>
          {
            masks.cpf(value).masked
          }
        </span>
      </div>
    },
  },
  {
    accessorKey: "phone",
    id: "Telefone",
    header: () => <div className="flex justify-center items-center">
      <span className="text-center">Telefone</span>
    </div>,
    cell: ({ row }) => {
      const value = row.getValue("Telefone") as string

      return <div className="flex justify-center items-center">
        <span className='text-center'>
          {
            masks.phone(value).masked
          }
        </span>
      </div>
    },
  },
  {
    accessorKey: "email",
    id: "Email",
    header: () => <div className="flex justify-center items-center">
      <span className="text-center">Email</span>
    </div>,
    cell: ({ row }) => {
      const value = row.getValue("Email") as string

      return <div className="flex justify-center items-center">
        <span className='text-center'>
          {value}
        </span>
      </div>
    },
  },
  {
    accessorKey: "address",
    id: "Endereço",
    header: () => <div className="flex justify-center items-center">
      <span className="text-center">Endereço</span>
    </div>,
    cell: ({ row }) => {
      const street = row.original.address.street
      const number = row.original.address.number
      const city = row.original.address.city
      const state = row.original.address.state
      const cep = row.original.address.cep
      const complement = row.original.address.complement

      return <Popover>
        <PopoverTrigger asChild className="mx-auto">
          <Ellipsis className="cursor-pointer hover:scale-105" />
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-lg leading-none">Dados de endereço</h4>
            </div>

            <div className="flex flex-col gap-2 mt-3">

              <div className="flex items-center gap-2">
                <Label className="font-bold">Rua: </Label>
                <span>{street}</span>
              </div>

              <div className="flex items-center gap-2">
                <Label className="font-bold">Número: </Label>
                <span>{number}</span>
                </div>

              <div className="flex items-center gap-2">
                <Label className="font-bold">Cidade: </Label>
                <span>{city}</span>
                </div>

              <div className="flex items-center gap-2">
                <Label className="font-bold">Estado: </Label>
                <span>{state}</span>
                </div>

              <div className="flex items-center gap-2">
                <Label className="font-bold">CEP: </Label>
                <span>{cep}</span>
                </div>

              <div className="flex items-center gap-2">
                <Label className="font-bold">Complemento: </Label>
                <span>{complement}</span>
                </div>

            </div>

          </div>
        </PopoverContent>
      </Popover>
    },
  },
]