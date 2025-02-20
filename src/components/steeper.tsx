import { useRegisterStore } from "@/store";
import { KeyRound, MapPinHouse, User } from "lucide-react";
import { useState } from "react";

export default function Stepper() {

  const steps = [
    { id: 1, title: "Dados Pessoais" },
    { id: 2, title: "Dados de Endereço" },
    { id: 3, title: "Dados de Acesso" },
  ];

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

  const step1IsComplete = fullName && cpf && phone;
  const step2IsComplete = cep && city && complement && number && state && street;

  let currentStepClassName = "text-green-600 dark:text-green-500 dark:after:border-green-800 after:border-green-100";

  return (
    <ol className="flex justify-center items-center w-full">

      <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block ${step1IsComplete ? currentStepClassName : "after:border-gray-100"}`}>
        <span className={`flex items-center justify-center w-10 h-10 ${step1IsComplete ? 'bg-green-100' : 'bg-gray-100'} rounded-full lg:h-12 lg:w-12  shrink-0`}>
          <User />
        </span>
      </li>

      <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block ${step2IsComplete ? currentStepClassName : "after:border-gray-100"}`}>
        <span className={`flex items-center justify-center w-10 h-10 ${step2IsComplete ? 'bg-green-100' : 'bg-gray-100'} rounded-full lg:h-12 lg:w-12  shrink-0`}>
        <MapPinHouse />
        </span>
      </li>
      
      <li className={`flex items-center after:border-gray-100}`}>
        <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 bg-gray-100`}>
          <KeyRound />
        </span>
      </li>

    </ol>
  );
}
