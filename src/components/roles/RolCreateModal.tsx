import { PERMISSIONS_BY_MODULE, type Role } from "@/types/role";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoaderCircle, Plus } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

interface RolCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: Omit<Role, "_id">) => void;
  companyId: string;
  isLoading: boolean;
}

const RoleCreateForm = ({onClose, onConfirm, companyId, isLoading}:{
  onClose: ()=>void,
  onConfirm: (data: Omit<Role, "_id">) => void,
  companyId: string,
  isLoading: boolean
}) => {

  const RoleCreateSchema = z.object({
        name: z.string().min(1, "Name is required"),
        permissions: z.number("Este campo es obligatorio").int().min(0,"Debe seleccionar al menos un permiso"),
        active: z.boolean(),
  });

  const form = useForm<z.infer<typeof RoleCreateSchema>>({
        resolver: zodResolver(RoleCreateSchema),
        defaultValues: {
          name: "",
          permissions: 0,
          active: true,
        },
  });

  const handleCreateSubmit = (data: z.infer<typeof RoleCreateSchema>) => {
        onConfirm({
            name: data.name,
            companyId,
            permissions: data.permissions,
            active: data.active
        })
  }

  return (
     <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCreateSubmit)} className="grid gap-6 px-4 py-2">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="permissions"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Permisos</FormLabel>
                                <div className="space-y-4">
                                  {PERMISSIONS_BY_MODULE.map((group) => (
                                    <div key={group.module}>
                                      <p className="text-sm font-semibold mb-2">{group.module}</p>
                                      <div className="grid gap-2 pl-4">
                                        {group.permissions.map((permission)=>{
                                          const checked = (field.value & permission.value) === permission.value;
                                          return(
                                            <div key={permission.value} className="flex items-center gap-2">
                                              <Checkbox 
                                                checked={checked}
                                                onCheckedChange={(value) => {
                                                  const updated = value
                                                    ? field.value | permission.value
                                                    : field.value & ~permission.value;

                                                  field.onChange(updated);
                                                }}
                                              />
                                              <span className="text-sm">{permission.label}</span>
                                            </div>
                                          )
                                        })}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="active"
                        render={({ field }) => (
                        <FormItem>
                            <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-2 shadow-xs outline-none">
                                 
                                 <div className="flex grow items-center gap-2">
                                    {/* {field.value ? <Eye /> : <EyeOff />} */}
                                    <div className="grid grow gap-2">
                                    <Label>Activo</Label>
                                    
                                    <p className="text-muted-foreground text-xs">
                                        Permite ser seleccionable en la asignación
                                    </p>
                                    
                                    </div>
                                    
                                </div>

                                <FormControl>
                                    {/* {field.value && <span>SI</span>} */}
                                    {/* <div> */}
                                    <div className="relative inline-grid h-8 grid-cols-2 items-center text-sm font-medium">
                                        <Switch
                                        // className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2.5 data-[state=checked]:[&_span]:rtl:-translate-x-2.5"
                                        // className='peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto rounded-md [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-sm [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-8.75 [&_span]:data-[state=checked]:rtl:-translate-x-8.75'
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        aria-label='Square switch with permanent text indicators'
      className="
        peer absolute inset-0 h-full w-full rounded-md
        data-[state=unchecked]:bg-input/50
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]

        [&>span]:block
        [&>span]:h-full
        [&>span]:w-1/2
        [&>span]:rounded-sm
        [&>span]:transition-transform
        [&>span]:duration-300
        [&>span]:ease-[cubic-bezier(0.16,1,0.3,1)]
        [&>span]:translate-x-0
        [&>span]:data-[state=checked]:translate-x-full
        
        
        
      "
                                        />
                                        {/* NO */}
    <span
      className="
        pointer-events-none flex items-center justify-center px-2 text-center
        text-[10px] font-medium uppercase
        transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        peer-data-[state=checked]:invisible
        peer-data-[state=unchecked]:translate-x-full
      "
    >
      No
    </span>

    {/* SI */}
    <span
      className="
        pointer-events-none flex items-center justify-center px-2 text-center
        text-[10px] font-medium uppercase
        transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        peer-data-[state=checked]:text-background
        peer-data-[state=checked]:-translate-x-full
        peer-data-[state=unchecked]:invisible
      "
    >
      Si
    </span>
                                    </div>
                                    {/* </div> */}
                                </FormControl>
                                 
                                
                            </div>
                            
                            <FormMessage />
                        </FormItem>
                        )}
                    />


                    <div className="flex flex-col gap-3 mt-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                            <Plus className="mr-2 h-4 w-4" />
                            )}
                            Crear Rol
                        </Button>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                    </div>


                </form>
            </Form>
  )

}

const RolCreateModal = ({
    isOpen,
    onClose,
    companyId,
    ...props
}:RolCreateModalProps) => {

    

    

    

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Nuevo Rol</DialogTitle>
            <DialogDescription>
              Agrega un nuevo rol de usuario para tu restaurante.
            </DialogDescription>
          </DialogHeader>

          {/* <CreateRoomForm companyId={companyId} onCancel={onClose} {...props} /> */}

           <RoleCreateForm onClose={onClose} companyId={companyId} {...props} />


        </DialogContent>
      </Dialog>
  )
}

export default RolCreateModal