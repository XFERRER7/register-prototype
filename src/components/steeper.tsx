import { KeyRound, MapPinHouse, User } from "lucide-react";
import { useState } from "react";

interface IProps {
  activeStep: number;
}

export default function Stepper({ activeStep }: IProps) {

  const steps = [
    { id: 1, title: "Dados Pessoais" },
    { id: 2, title: "Dados de Endereço" },
    { id: 3, title: "Dados de Acesso" },
  ];

  let currentStepClassName = "text-blue-600 dark:text-blue-500 dark:after:border-blue-800 after:border-blue-100";

  return (
    <ol className="flex justify-center items-center w-full">

      <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block ${activeStep === 1 ? currentStepClassName : "after:border-gray-100"}`}>
        <span className={`flex items-center justify-center w-10 h-10 ${activeStep === 1 ? 'bg-blue-100' : 'bg-gray-100'} rounded-full lg:h-12 lg:w-12  shrink-0`}>
          <User />
        </span>
      </li>

      <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block ${activeStep === 2 ? currentStepClassName : "after:border-gray-100"}`}>
        <span className={`flex items-center justify-center w-10 h-10 ${activeStep === 2 ? 'bg-blue-100' : 'bg-gray-100'} rounded-full lg:h-12 lg:w-12  shrink-0`}>
        <MapPinHouse />
        </span>
      </li>
      
      <li className={`flex items-center ${activeStep === 3 ? currentStepClassName : "after:border-gray-100"}`}>
        <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 ${activeStep === 3 ? 'bg-blue-100' : 'bg-gray-100'}`}>
          <KeyRound />
        </span>
      </li>

    </ol>
  );
}
