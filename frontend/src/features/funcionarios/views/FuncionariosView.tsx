import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Search, Filter, Users, Car } from "lucide-react"

// Importamos los datos desde la capa de datos
import { MOCK_FUNCIONARIOS } from "../data/mocks"
import { Input } from "@/components/ui/input"

export function FuncionariosView() {
  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Gestión de Funcionarios</h1>
          <p className="text-slate-500 mt-1">Administra los perfiles y vehículos autorizados para ingresar al Campus.</p>
        </div>
        <Button>
          <Users className="mr-2 h-4 w-4" /> Nuevo Funcionario
        </Button>
      </div>

      <Card>
        <CardHeader className="py-4 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Directorio Institucional</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input placeholder="Buscar por RUT o Nombre..." className="w-64 pl-8 bg-slate-50 border-slate-200" />
              </div>
              <Button variant="outline" className="text-slate-600">
                <Filter className="mr-2 h-4 w-4" /> Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="pl-6">RUT</TableHead>
                <TableHead>Nombre Completo</TableHead>
                <TableHead>Unidad/Departamento</TableHead>
                <TableHead className="text-center">Vehículos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right pr-6">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_FUNCIONARIOS.map((funcionario) => (
                <TableRow key={funcionario.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium pl-6">{funcionario.rut}</TableCell>
                  <TableCell>{funcionario.nombre}</TableCell>
                  <TableCell>{funcionario.departamento}</TableCell>
                  <TableCell className="text-center">
                    <button className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-900 hover:bg-slate-200 hover:scale-105 transition-all cursor-pointer space-x-1">
                      <Car className="h-3.5 w-3.5" />
                      <span>{funcionario.vehiculos}</span>
                    </button>
                  </TableCell>
                  <TableCell>
                    {funcionario.activo ? (
                      <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200">Activo</Badge>
                    ) : (
                      <Badge variant="destructive" className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200">Inactivo</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}