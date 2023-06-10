export enum ROLES {
  Admin = 'Admin',
  Operator = 'Operator',
  SuperAdmin = 'SuperAdmin',
  FinanceOfficer = 'FinanceOfficer',
}

export const RoleTypes = ['Operator', 'FinanceOfficer', 'Admin', 'SuperAdmin']

export interface RoleType {
  Admin: string
  Operator: string
  SuperAdmin: string
  FinanceOfficer: string
}
