// import { columns } from "@/components/tables/columns";
// import { DataTable } from "@/components/tables/DataTable";
// import { columns } from "@/components/tables/columns";
// import { DataTable } from "@/components/tables/DataTable";
import { TableCreateModal } from "@/components/tables/TableCreateModal";
import { TableEditModal } from "@/components/tables/TableEditModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTables } from "@/https";
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AlertCircle, CheckCircle2, Clock, LayoutGrid, MapPin, Plus, Table, Users, Utensils } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useMemo, useState } from "react";

// --- 1. Definición de Tipos (Basado en tu Schema) ---
type TableStatus = "Available" | "Occupied" | "Reserved" | "Cleaning";

interface IRoom {
  _id: string;
  name: string;
}

interface ITable {
  _id: string;
  title: string; // Título único
  status: TableStatus; // Default: "Available"
  seats: number; // Número de asientos
  currentOrder?: string | null; // ObjectId referenciando a la orden
  companyId: string;
  roomId: string;
}

// --- DATOS MOCK ---
const mockRooms: IRoom[] = [
  { _id: "room_1", name: "Salón Principal" },
  { _id: "room_2", name: "Terraza" },
  { _id: "room_3", name: "Piso 2 (Eventos)" },
];


// --- 2. Datos Mock (Para visualizar mientras conectas el backend) ---
const mockTables: ITable[] = [
  { _id: "1", title: "Mesa 1", status: "Occupied", seats: 4, currentOrder: "order_123", companyId: "comp_1" , roomId: "room_1"},
  { _id: "2", title: "Mesa 2", status: "Available", seats: 2, currentOrder: null, companyId: "comp_1",roomId: "room_1" },
  { _id: "3", title: "Mesa 3", status: "Available", seats: 4, currentOrder: null, companyId: "comp_1" ,roomId: "room_2"},
  { _id: "4", title: "Barra 1", status: "Occupied", seats: 1, currentOrder: "order_456", companyId: "comp_1" ,roomId: "room_2"},
  { _id: "5", title: "Mesa VIP", status: "Reserved", seats: 8, currentOrder: null, companyId: "comp_1" , roomId: "room_2"},
  { _id: "6", title: "Mesa 4", status: "Cleaning", seats: 6, currentOrder: null, companyId: "comp_1" ,roomId: "room_3"},
];

// // --- 3. Helpers Visuales ---
// const getStatusConfig = (status: TableStatus) => {
//   switch (status) {
//     case "Available":
//       return { color: "bg-green-500/15 text-green-700 hover:bg-green-500/25 border-green-200", icon: CheckCircle2, label: "Disponible" };
//     case "Occupied":
//       return { color: "bg-red-500/15 text-red-700 hover:bg-red-500/25 border-red-200", icon: Utensils, label: "Ocupada" };
//     case "Reserved":
//       return { color: "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 border-amber-200", icon: Clock, label: "Reservada" };
//     case "Cleaning":
//       return { color: "bg-slate-200 text-slate-600 border-slate-300", icon: AlertCircle, label: "Limpieza" };
//     default:
//       return { color: "bg-gray-100", icon: Users, label: status };
//   }
// };

// --- HELPERS ---
const getStatusConfig = (status: TableStatus) => {
  switch (status) {
    case "Available":
      return { color: "bg-green-100 text-green-700 border-green-200", badgeVariant: "outline" as const, label: "Libre" };
    case "Occupied":
      return { color: "bg-red-50 text-red-700 border-red-200", badgeVariant: "destructive" as const, label: "Ocupada" };
    case "Reserved":
      return { color: "bg-amber-50 text-amber-700 border-amber-200", badgeVariant: "outline" as const, label: "Reservada" };
    case "Cleaning":
      return { color: "bg-slate-100 text-slate-600 border-slate-200", badgeVariant: "secondary" as const, label: "Limpieza" };
    default:
      return { color: "bg-gray-100", badgeVariant: "outline" as const, label: status };
  }
};


const Tables = () => {

  const [selectedRoomId, setSelectedRoomId] = useState<string>(mockRooms[0]._id);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // 1. Agregar estados
const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
const [selectedTable, setSelectedTable] = useState<ITable | null>(null);

// 2. Función para cuando haces click en una tarjeta (Card)
const handleCardClick = (table: ITable) => {
  setSelectedTable(table);
  setIsEditSheetOpen(true);
};

// 3. Funciones Dummy para guardar/borrar
const handleSaveTable = (updatedTable: ITable) => {
  console.log("Guardando en DB...", updatedTable);
  // Aquí harías tu PUT a la API
  // Y luego actualizarías el estado local 'mockTables'
};

const handleDeleteTable = (id: string) => {
   console.log("Eliminando...", id);
};

const handleCreateTable = (newTableData: any) => {
    console.log("Creando mesa:", newTableData);
    // 1. Llamada a API (POST /tables)
    // 2. Refresh de datos o actualizar estado local
    // 3. Cerrar modal
    setIsCreateModalOpen(false);
};

  const { data: resData, isError } = useQuery({
    queryKey:["tables"],
    queryFn: async()=>{
      return await getTables();
    },
    placeholderData: keepPreviousData
  });


  // 1. Filtrar mesas por la Sala seleccionada
  const tablesInRoom = useMemo(() => {
    return mockTables.filter(t => t.roomId === selectedRoomId);
  }, [selectedRoomId]);

  // 2. Filtrar esas mesas por el estado (Filtro secundario)
  const displayedTables = useMemo(() => {
    return tablesInRoom.filter(t => statusFilter === "all" || t.status === statusFilter);
  }, [tablesInRoom, statusFilter]);

  // Contadores para las estadísticas rápidas
  const stats = {
    total: tablesInRoom.length,
    available: tablesInRoom.filter(t => t.status === "Available").length,
    occupied: tablesInRoom.filter(t => t.status === "Occupied").length,
  };
  

  if(isError){
    enqueueSnackbar("Something went wrong!", {variant: "error"})
  }

  return (
      <>
      {/* {JSON.stringify( resData?.data.data )} */}
       {/* <div className="h-full flex-1 flex-col gap-8 p-8 md:flex">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold tracking-tight">Mesas</h2>
                <p className="text-muted-foreground">Aqui tienes una lista de tus mesas</p>
              </div>
              <div className="flex items-center gap-2">
                <UserNav />
              </div>
            </div>
            <DataTable 
              data={resData?.data.data} 
              columns={columns} 
            />
          </div> */}
      <div className="flex flex-col h-full min-h-screen">
      {/* --- HEADER --- */}
      <header className="px-6 py-4 border-b flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Table className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold ">Mesas</h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> {stats.available} Libres</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> {stats.occupied} Ocupadas</span>
            </div>
          </div>
        </div>
        <Button size="sm" onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Mesa
        </Button>
      </header>

      <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* --- NAVEGACIÓN POR SALAS (TABS) --- */}
        <Tabs 
          defaultValue={mockRooms[0]._id} 
          className="w-full" 
          onValueChange={(val) => {
            setSelectedRoomId(val);
            setStatusFilter("all"); // Resetear filtro al cambiar de sala
          }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <TabsList className="h-10">
              {mockRooms.map(room => (
                <TabsTrigger key={room._id} value={room._id} className="px-4">
                  {room.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* --- FILTROS TIPO "PILL" PARA ESTADO --- */}
            <div className="flex gap-2 p-1 rounded-lg border shadow-sm bg-slate-100 dark:bg-neutral-800">
              {[
                { id: "all", label: "Todas" },
                { id: "Available", label: "Libres" },
                { id: "Occupied", label: "Ocupadas" },
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setStatusFilter(filter.id)}
                  className={`
                    px-3 py-1.5 text-xs font-bold rounded-md transition-all
                    ${statusFilter === filter.id 
                      ? "  shadow-sm border " 
                      : "text-gray-500 "}
                  `}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* --- CONTENIDO DE LA SALA --- */}
          <TabsContent value={selectedRoomId} className="mt-0">
            <ScrollArea className="h-[calc(100vh-220px)] pr-4">
              
              {displayedTables.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
                  {displayedTables.map((table) => {
                    const config = getStatusConfig(table.status);
                    
                    return (
                      <Card 
                        key={table._id} 
                        onClick={() => handleCardClick(table)} // <-- Click en toda la tarjeta o en un botón específico
                        className={`group relative overflow-hidden transition-all hover:shadow-lg border-l-4 ${config.color.split(' ')[2]}`}>
                        <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
                          {table.status === 'Occupied' ? <Utensils className="w-16 h-16" /> : <Users className="w-16 h-16" />}
                        </div>

                        <CardHeader className="pb-2">
                          <div className="flex justify-center items-start">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                              {table.title}
                            </CardTitle>
                            {/* <Badge variant={config.badgeVariant} className={config.color}>
                              {config.label}
                            </Badge> */}
                          </div>
                        </CardHeader>

                        <CardContent 
                        // className="pb-3"
                        >
                          
                            

                          <div className="space-y-4 text-sm">

                              <div className="flex items-center justify-center">
                                <Badge variant={config.badgeVariant} className={config.color}>
                                {config.label}
                              </Badge>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{table.seats} Personas</span>
                            </div>
                            
                            {/* {table.status === "Occupied" && (
                              <div className="flex items-center gap-2 text-red-600 bg-red-50 w-fit px-2 py-1 rounded text-xs font-medium">
                                <Clock className="w-3 h-3" />
                                <span>Hace 24 min</span>
                              </div>
                            )} */}
                          </div>
                        </CardContent>

                        {/* <Separator />

                        <CardFooter className="pt-3 bg-slate-50/50 group-hover:bg-white transition-colors">
                          {table.status === "Available" ? (
                            <Button className="w-full shadow-sm" variant="default">
                              Asignar Mesa
                            </Button>
                          ) : table.status === "Occupied" ? (
                            <Button className="w-full bg-slate-900 text-white hover:bg-slate-800" variant="secondary">
                              Ver Comanda
                            </Button>
                          ) : (
                            <Button className="w-full" variant="outline" disabled>
                              Gestionar
                            </Button>
                          )}
                        </CardFooter> */}
                      </Card>
                    );
                  })}
                </div>
              ) : (
                // --- ESTADO VACÍO ---
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-xl ">
                  <MapPin className="h-10 w-10 text-slate-300 mb-2" />
                  <p className="text-slate-500 font-medium">No hay mesas en esta sala con este filtro</p>
                  {statusFilter !== "all" && (
                    <Button variant="link" onClick={() => setStatusFilter("all")}>
                      Ver todas las mesas
                    </Button>
                  )}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* // 5. Renderizar el Sheet al final del componente */}
          <TableEditModal
            isOpen={isEditSheetOpen}
            onClose={() => setIsEditSheetOpen(false)}
            table={selectedTable}
            rooms={mockRooms}
            onSave={handleSaveTable}
            onDelete={handleDeleteTable}
          />

        <TableCreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onConfirm={handleCreateTable}
          rooms={mockRooms}
          defaultRoomId={selectedRoomId} // <--- Truco de UX
        />
      </div>
    </div>

      </>
  )
}

export default Tables