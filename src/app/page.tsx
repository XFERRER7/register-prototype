import { AccessDataForm } from "@/components/forms/access-data-form";
import { AddressDataForm } from "@/components/forms/address-data-form";
import { PersonalDataForm } from "@/components/forms/personal-data-form";
import { redirect } from "next/navigation";

export default function Home() {

  redirect('/personal-data');

  return (
    <main className="container py-20 px-4 flex flex-col items-center gap-5 mx-auto">

      <h1 className="text-xl font-bold text-center">
        Protótipo de cadastro de assistidos
      </h1>

      <PersonalDataForm />
      <AddressDataForm />
      <AccessDataForm />

    </main>
  );
}
