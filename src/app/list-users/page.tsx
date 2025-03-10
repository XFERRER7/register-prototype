'use client'
import { userColumns } from "@/components/columns/userColumns"
import { DataTable } from "@/components/data-table"
import { api } from "@/lib/api"
import { IUser } from "@/types"
import { useEffect, useState } from "react"

export default function Page() {

  const [data, setData] = useState<IUser[]>([])

  async function getUsers() {
    try {

      const response = await api.get<IUser[]>('/users')

      setData(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-5 px-5 w-full">

      <h2 className="text-xl font-bold text-center">
        Lista de assistidos
      </h2>

      <div className="w-full">
        <DataTable columns={userColumns} data={data} />
      </div>
    </div>
  )
}