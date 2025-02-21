// Centralized Route Configuration
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SCHOOLS: {
    BASE: '/escolas',
    DETAILS: '/escolas/:id',
    NEW: '/escolas/novo'
  },
  TIPOLOGIAS: {
    BASE: '/tipologias',
    NEW: '/tipologias/novo',
    EDIT: '/tipologias/:id'
  },
  FORNECEDORES: {
    BASE: '/fornecedores',
    NEW: '/fornecedores/novo',
    EDIT: '/fornecedores/:id'
  },
  REPORTS: '/relatorios',
  SETTINGS: '/configuracoes'
};
