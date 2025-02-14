import { AccessDataForm } from "@/components/forms/access-data-form";
import { AddressDataForm } from "@/components/forms/address-data-form";
import { PersonalDataForm } from "@/components/forms/personal-data-form";

export default function Home() {
  return (
    <main className="container py-20 px-4 flex flex-col items-center gap-5">

      <h1 className="text-xl font-bold text-center">
        Protótipo de cadastro de assistidos
      </h1>

      <PersonalDataForm />
      <AddressDataForm />
      <AccessDataForm />

    </main>
  );
}
