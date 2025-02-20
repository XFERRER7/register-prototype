export interface IUser {
  fullName: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
  address: {
    number: string;
    cep: string;
    street: string;
    complement: string;
    state: string;
    city: string;
  }
}