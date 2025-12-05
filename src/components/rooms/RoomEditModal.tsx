
import type { Room } from "@/types/room";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Eye, EyeOff, LoaderCircle, Save, Trash2 } from "lucide-react";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer";

interface RoomEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
  onSave: (table: Room) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

// --- SUB-COMPONENTE: EL FORMULARIO ---
// Extraemos el formulario para usarlo tanto en el Modal como en el Drawer
function TableForm({ 
  room, 
  onSave, 
  onDelete,
  isLoading
}: { 
  room: Room | null, 
  onSave: (t: Room) => void, 
  onDelete: (id: string) => void ,
  isLoading: boolean
}) {



  const FormSchema = z.object({
    _id: z.string(),
    title: z.string().min(1, 'Title is required'),
    visible : z.boolean(),
    // .refine(val => val === true, {
    //   message: 'You must enable step tracker to proceed.'
    // }),
    companyId: z.string()
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        _id: room?._id,
        title: room?.title,
        visible: room?.visible,
        companyId: room?.companyId
    }
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    onSave(data)
  }

  const onHandleDelete = () => {
    if(room?._id){
        onDelete(room._id)
    }
    
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 px-4 py-2">


      {/* Inputs Básicos */}
      <div className="grid gap-4">

        <FormField
            control={form.control}
            name="title"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                        <Input placeholder="Title" {...field} />
                    </FormControl>
                    {/* <FormDescription>Ingresa su nombre</FormDescription> */}
                    <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="visible"
            render={({field}) => (
                <FormItem>
                    <div className='border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none'>
                        <FormControl>
                            <Switch 
                                className='order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2.5 data-[state=checked]:[&_span]:rtl:-translate-x-2.5'
                                checked={field.value} onCheckedChange={field.onChange} 
                            />
                            
                        </FormControl>
                        <div className='flex grow items-center gap-3'>
                            {field.value ? <Eye /> : <EyeOff />}
                                <div className='grid grow gap-2'>
                                <Label >Visible</Label>
                                <p className='text-muted-foreground text-xs'>
                                    Esta opción permite a la sala ser visible en la toma de pedidos
                                </p>
                                </div>
                            </div>
                    </div>
                    {/* <FormDescription>Sera visible</FormDescription> */}
                    <FormMessage />
                </FormItem>
            )}
        />
        
      </div>


      {/* Botones de Acción */}
      <div className="flex flex-col gap-3 mt-4">
        
        <Button
        type="button"
          variant="ghost" 
          className="text-red-500 hover:text-red-600 hover:bg-red-50 w-full"
          onClick={onHandleDelete}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Eliminar Sala
        </Button>

        <Button type="submit" className="w-full">
            {isLoading ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ):(
                <Save className="mr-2 h-4 w-4" />
            )}
          {/* <Save className="mr-2 h-4 w-4" /> Guardar */}
          Guardar
        </Button>

      </div>
    </form>

    </Form>
  );
}


const RoomEditModal = ({ isOpen, onClose, room, ...props }: RoomEditModalProps) => {

    // const isDesktop = useMediaQuery("(min-width: 768px)");

    // if (!room) return null;

  // VERSIÓN DESKTOP: DIALOG (MODAL)
//   if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e)=>e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Editar Mesa</DialogTitle>
            <DialogDescription>
              Modifica los detalles de la sala.
            </DialogDescription>
          </DialogHeader>
          <TableForm room={room} {...props} />
        </DialogContent>
      </Dialog>
    );
//   }

   // VERSIÓN MOBILE: DRAWER (BOTTOM SHEET)
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Editar Sala</DrawerTitle>
          <DrawerDescription>
            Desliza hacia abajo para cerrar.
          </DrawerDescription>
        </DrawerHeader>
        
        {/* ScrollArea dentro del Drawer para móviles pequeños */}
        <div className="pb-2"> 
           <TableForm room={room} {...props} />
        </div>
        
        {/* <DrawerFooter className="pt-2"> */}
          {/* Botón de cancelar extra para móvil por usabilidad */}
          {/* <Button variant="outline" onClick={onClose}>Cancelar</Button>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );

}

export default RoomEditModal