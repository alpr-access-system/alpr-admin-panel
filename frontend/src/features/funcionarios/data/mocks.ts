import type { Funcionario } from "../types";

export const MOCK_FUNCIONARIOS: Funcionario[] = [
  { id: 1, rut: "11.111.111-1", nombre: "Juan Pérez", departamento: "Ingeniería", vehiculos: 2, activo: true },
  { id: 2, rut: "22.222.222-2", nombre: "María González", departamento: "Rectoría", vehiculos: 1, activo: true },
  { id: 3, rut: "33.333.333-3", nombre: "Pedro Silva", departamento: "Arquitectura", vehiculos: 0, activo: false },
];
