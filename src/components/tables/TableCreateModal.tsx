import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Users, 
  LayoutGrid 
} from 'lucide-react';

import { useMediaQuery } from "@/hooks/use-media-query"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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

// --- TIPOS DE ENTRADA ---
interface NewTableData {
  title: string;
  seats: number;
  roomId: string;
  status: "Available"; // Siempre se crea disponible
}

interface TableCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: NewTableData) => void;
  rooms: { _id: string, name: string }[];
  defaultRoomId?: string; // Para pre-seleccionar la sala actual
}

// --- SUB-COMPONENTE: FORMULARIO REUTILIZABLE ---
function CreateTableForm({ 
  rooms, 
  defaultRoomId, 
  onConfirm, 
  onCancel 
}: { 
  rooms: { _id: string, name: string }[], 
  defaultRoomId?: string, 
  onConfirm: (data: NewTableData) => void,
  onCancel: () => void
}) {
  const [title, setTitle] = useState("");
  const [seats, setSeats] = useState<string>("4"); // String para input, luego parseamos
  const [roomId, setRoomId] = useState<string>(defaultRoomId || (rooms[0]?._id ?? ""));
  const [error, setError] = useState("");

  // Actualizar roomId si cambia el default (ej: el usuario cambia de tab de fondo)
  useEffect(() => {
    if (defaultRoomId) setRoomId(defaultRoomId);
  }, [defaultRoomId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    if (!roomId) {
      setError("Selecciona una sala");
      return;
    }

    onConfirm({
      title: title.trim(),
      seats: parseInt(seats) || 2,
      roomId: roomId,
      status: "Available"
    });
    
    // Resetear form
    setTitle("");
    setSeats("4");
    setError("");
  };

  return (
    <form id="create-table-form" onSubmit={handleSubmit} className="grid gap-6 px-4 py-2">
      
      <div className="grid gap-4">
        {/* Nombre */}
        <div className="grid gap-2">
          <Label htmlFor="create-title">Nombre de la Mesa</Label>
          <Input 
            id="create-title" 
            placeholder="Ej: Mesa 10, Barra B..." 
            value={title}
            onChange={(e) => {
                setTitle(e.target.value);
                setError("");
            }}
            autoFocus // Foco automático para escribir rápido
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Sala */}
          <div className="grid gap-2">
            <Label htmlFor="create-room">Ubicación</Label>
            <Select value={roomId} onValueChange={setRoomId}>
              <SelectTrigger id="create-room">
                <SelectValue placeholder="Sala" />
              </SelectTrigger>
              <SelectContent>
                {rooms.map(room => (
                  <SelectItem key={room._id} value={room._id}>
                    {room.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sillas */}
          <div className="grid gap-2">
            <Label htmlFor="create-seats">Capacidad</Label>
            <div className="relative">
              <Users className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                id="create-seats" 
                type="number" 
                min="1"
                className="pl-9"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 font-medium">{error}</p>
      )}

      {/* Botones (Solo visibles dentro del formulario en Mobile/Drawer para flujo natural) */}
      <div className="md:hidden flex flex-col gap-3 mt-4">
        <Button type="submit" className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Crear Mesa
        </Button>
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

// --- COMPONENTE PRINCIPAL ---
export function TableCreateModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  rooms, 
  defaultRoomId 
}: TableCreateModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nueva Mesa</DialogTitle>
            <DialogDescription>
              Agrega una nueva mesa al mapa de tu restaurante.
            </DialogDescription>
          </DialogHeader>
          
          <CreateTableForm 
            rooms={rooms} 
            defaultRoomId={defaultRoomId} 
            onConfirm={onConfirm} 
            onCancel={onClose}
          />

          <DialogFooter>
             <Button variant="outline" onClick={onClose}>Cancelar</Button>
             <Button type="submit" form="create-table-form">Crear Mesa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Mobile Drawer
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Nueva Mesa</DrawerTitle>
          <DrawerDescription>
            Ingresa los datos para crear la mesa.
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="pb-6">
            <CreateTableForm 
                rooms={rooms} 
                defaultRoomId={defaultRoomId} 
                onConfirm={onConfirm} 
                onCancel={onClose}
            />
        </div>
      </DrawerContent>
    </Drawer>
  );
}