export interface InsuranceType {
  id: number;
  insurerUid: string;
  name: string;
  description: string;
  type: string;
  coverage: string;
  priceRange: number;
  conditions: string;
}

export interface Insurer {
  uid: string;
  company_name: string;
  cnpj: string;
  address: string;
  phone: string;
  InsuranceTypes: InsuranceType[];
}

// Dados do Dashboard (seguradora)
export interface DashboardData {
  availableInsurers: Insurer[];
}

interface BaseUserData {
  isInsurer: boolean;
  name: string;
  email: string;
  address: string;
  phone: string;
  createdAt: string;
}

// Para um usuário normal
export interface NormalUserData extends BaseUserData {
  isInsurer: false;
  company_name?: never;
  cnpj?: never;

}

// Para uma seguradora
export interface InsurerUserData extends BaseUserData {
  isInsurer: true;
  company_name: string;
  cnpj: string;
}

// O tipo de UserData pode ser uma seguradora ou um usuário normal
export type UserData = NormalUserData | InsurerUserData;

// Interface para o Dashboard de qualquer usuário (normal ou seguradora)

export interface UserDashboardData {
  userData: UserData;
  availableInsurers: Insurer[];  // Ajustado para refletir os dados que o componente espera
}