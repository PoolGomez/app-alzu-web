import { useState } from 'react';
import { 
  Save, Trash2, Users, Utensils, ArrowRight 
} from 'lucide-react';

import { useMediaQuery } from "@/hooks/use-media-query"; // Asegúrate de crear este hook
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- TIPOS ---
type TableStatus = "Available" | "Occupied" | "Reserved" | "Cleaning";

interface ITable {
  _id: string;
  title: string;
  status: TableStatus;
  seats: number;
  currentOrder?: string | null;
  roomId: string;
}

interface TableEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: ITable | null;
  rooms: { _id: string, name: string }[];
  onSave: (table: ITable) => void;
  onDelete: (id: string) => void;
}

// --- SUB-COMPONENTE: EL FORMULARIO ---
// Extraemos el formulario para usarlo tanto en el Modal como en el Drawer
function TableForm({ 
  table, 
  rooms, 
  onSave, 
  onDelete 
}: { 
  table: ITable, 
  rooms: any[], 
  onSave: (t: ITable) => void, 
  onDelete: (id: string) => void 
}) {
  const [formData, setFormData] = useState<ITable>(table);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field: keyof ITable, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  return (
    <div className="grid gap-6 px-4 py-2">
      {/* Selector de Estado Visual */}
      {/* <div className="grid grid-cols-2 gap-2">
        {(["Available", "Occupied", "Cleaning", "Reserved"] as const).map((status) => (
          <Button
            key={status}
            variant={formData.status === status ? "default" : "outline"}
            size="sm"
            className={
              formData.status === status 
                ? (status === "Available" ? "bg-green-600 hover:bg-green-700" 
                  : status === "Occupied" ? "bg-red-600 hover:bg-red-700" 
                  : status === "Reserved" ? "bg-amber-600 hover:bg-amber-700" 
                  : "") 
                : "text-muted-foreground"
            }
            onClick={() => handleChange("status", status)}
          >
            {status === "Available" ? "Disponible" : 
             status === "Occupied" ? "Ocupada" : 
             status === "Reserved" ? "Reservada" : "Limpieza"}
          </Button>
        ))}
      </div> */}

      {/* Info de Orden Activa */}
      {/* {formData.status === "Occupied" && (
        <div className="bg-slate-50 border rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Utensils className="h-4 w-4 text-red-500" />
            <span>Orden Activa</span>
          </div>
          <Button variant="ghost" size="sm" className="text-xs h-8">
            Ver Comanda <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      )} */}

      {/* Inputs Básicos */}
      <div className="grid gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right col-span-1">Nombre</Label>
          <Input 
            id="title" 
            value={formData.title} 
            onChange={(e) => handleChange("title", e.target.value)}
            className="col-span-3" 
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="seats" className="text-right col-span-1">Sillas</Label>
          <div className="col-span-3 relative">
            <Users className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              id="seats" 
              type="number" 
              className="pl-9"
              value={formData.seats} 
              onChange={(e) => handleChange("seats", parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="room" className="text-right col-span-1">Sala</Label>
          <div className="col-span-3">
             <Select 
                value={formData.roomId} 
                onValueChange={(val) => handleChange("roomId", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sala" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map(r => (
                    <SelectItem key={r._id} value={r._id}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-col gap-3 mt-4">
        
        <Button 
          variant="ghost" 
          className="text-red-500 hover:text-red-600 hover:bg-red-50 w-full"
          onClick={() => onDelete(formData._id)}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Eliminar Mesa
        </Button>

        <Button onClick={() => onSave(formData)} disabled={!isDirty} className="w-full">
          <Save className="mr-2 h-4 w-4" /> Guardar
        </Button>

      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export function TableEditModal({ isOpen, onClose, table, ...props }: TableEditModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!table) return null;

  // VERSIÓN DESKTOP: DIALOG (MODAL)
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Mesa: {table.title}</DialogTitle>
            <DialogDescription>
              Modifica los detalles o cambia el estado.
            </DialogDescription>
          </DialogHeader>
          <TableForm table={table} {...props} />
        </DialogContent>
      </Dialog>
    );
  }

  // VERSIÓN MOBILE: DRAWER (BOTTOM SHEET)
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Editar Mesa: {table.title}</DrawerTitle>
          <DrawerDescription>
            Desliza hacia abajo para cerrar.
          </DrawerDescription>
        </DrawerHeader>
        
        {/* ScrollArea dentro del Drawer para móviles pequeños */}
        <div className="pb-2"> 
           <TableForm table={table} {...props} />
        </div>
        
        {/* <DrawerFooter className="pt-2"> */}
          {/* Botón de cancelar extra para móvil por usabilidad */}
          {/* <Button variant="outline" onClick={onClose}>Cancelar</Button>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}