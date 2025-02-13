import { AccessDataForm } from "@/components/forms/access-data-form";
import { AddressDataForm } from "@/components/forms/address-data-form";
import { PersonalDataForm } from "@/components/forms/personal-data-form";

export default function Home() {
  return (
    <main className="container py-20 px-2 flex flex-col items-center gap-5">

      <PersonalDataForm />
      <AddressDataForm />
      <AccessDataForm />

    </main>
  );
}
