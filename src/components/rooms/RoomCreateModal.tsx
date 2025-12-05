import { Eye, EyeOff, LoaderCircle, Plus } from "lucide-react";

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
} from "@/components/ui/dialog";

import { Switch } from "../ui/switch";
import type { Room } from "@/types/room";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface RoomCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: Omit<Room, "_id">) => void;
  companyId: string;
  isLoading: boolean;
}

// --- SUB-COMPONENTE: FORMULARIO REUTILIZABLE ---
function CreateRoomForm({
  onConfirm,
  onCancel,
  companyId,
  isLoading,
}: {
  onConfirm: (data: Omit<Room, "_id">) => void;
  onCancel: () => void;
  companyId: string;
  isLoading: boolean;
}) {
  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    visible: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      visible: true,
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onConfirm({
      title: data.title,
      companyId: companyId,
      visible: data.visible,
    });
  };

  return (
    <Form {...form}>
      <form
        id="create-table-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid gap-6 px-4 py-2"
      >
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese un titulo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visible"
            render={({ field }) => (
              <FormItem>
                <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                  <FormControl>
                    <Switch
                      className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2.5 data-[state=checked]:[&_span]:rtl:-translate-x-2.5"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="flex grow items-center gap-3">
                    {field.value ? <Eye /> : <EyeOff />}
                    <div className="grid grow gap-2">
                      <Label>Visible</Label>
                      <p className="text-muted-foreground text-xs">
                        Esta opción permite a la sala ser visible en la toma de
                        pedidos
                      </p>
                    </div>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Botones (Solo visibles dentro del formulario en Mobile/Drawer para flujo natural) */}
        <div className="flex flex-col gap-3 mt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Crear Sala
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
}

// --- COMPONENTE PRINCIPAL ---
function RoomCreateModal({
  isOpen,
  onClose,
  companyId,
  ...props
}: RoomCreateModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Nueva Sala</DialogTitle>
            <DialogDescription>
              Agrega una nueva sala para tu restaurante.
            </DialogDescription>
          </DialogHeader>

          <CreateRoomForm companyId={companyId} onCancel={onClose} {...props} />
        </DialogContent>
      </Dialog>
    );
  }

  // Mobile Drawer
  // return (
  //   <Drawer open={isOpen} onOpenChange={onClose}>
  //     <DrawerContent>
  //       <DrawerHeader className="text-left">
  //         <DrawerTitle>Nueva Mesa</DrawerTitle>
  //         <DrawerDescription>
  //           Ingresa los datos para crear la mesa.
  //         </DrawerDescription>
  //       </DrawerHeader>

  //       <div className="pb-6">
  //           <CreateRoomForm
  //               // rooms={rooms}
  //               // defaultRoomId={defaultRoomId}
  //               onConfirm={onConfirm}
  //               onCancel={onClose}
  //               companyId={companyId}
  //               isloading={isloading}
  //           />
  //       </div>
  //     </DrawerContent>
  //   </Drawer>
  // );
}

export default RoomCreateModal;
