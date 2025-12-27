import { PERMISSIONS_BY_MODULE, type Role } from "@/types/role";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { LoaderCircle, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

interface RoleEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role | null;
  onSave: (role: Role) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}
const RoleUpdateSchema = z.object({
  _id: z.string(),
  name: z.string(),
  companyId: z.string(),
  permissions: z
    .number("Este campo es obligatorio")
    .int()
    .min(0, "Este campo debe ser igual o mayor a 0"),
  active: z.boolean(),
});

function RoleEditForm({
  onClose,
  role,
  onSave,
  onDelete,
  isLoading,
}: {
  onClose: () => void;
  role: Role | null;
  onSave: (role: Role) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}) {
  const form1 = useForm<z.infer<typeof RoleUpdateSchema>>({
    resolver: zodResolver(RoleUpdateSchema),
    defaultValues: role
      ? {
          _id: role?._id,
          name: role?.name,
          companyId: role?.companyId,
          permissions: role?.permissions,
          active: role?.active,
        }
      : {
          _id: "",
          name: "",
          companyId: "",
          permissions: 0,
          active: true,
        },
  });

  const onSubmitUpdate = (data: z.infer<typeof RoleUpdateSchema>) => {
    onSave(data);
  };

  const onHandleDelete = () => {
    if (role?._id) {
      onDelete(role._id);
    } else {
      console.log("no hay id del Rol");
    }
  };

  return (
    <Form {...form1}>
      <form
        onSubmit={form1.handleSubmit(onSubmitUpdate)}
        className="grid gap-6 px-4 py-2"
      >
        <FormField
          control={form1.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
              control={form1.control}
              name="permissions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permisos</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

        <FormField
          control={form1.control}
          name="permissions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permisos</FormLabel>
              <div className="space-y-4">
                {PERMISSIONS_BY_MODULE.map((group) => (
                  <div key={group.module}>
                    <p className="text-sm font-semibold mb-2">{group.module}</p>

                    <div className="grid gap-2 pl-4">
                      {group.permissions.map((permission) => {
                        const checked =
                          (field.value & permission.value) === permission.value;

                        return (
                          <div
                            key={permission.value}
                            className="flex items-center gap-2"
                          >
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
                        );
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
          control={form1.control}
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
                  <div className="relative inline-grid h-8 grid-cols-2 items-center text-sm font-medium">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label="Square switch with permanent text indicators"
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
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center">
          {/* <Button
            type="button"
            variant={"outline"}
            size={"icon-lg"}
            className="cursor-pointer"
            onClick={onHandleDelete}
          >
            <Trash2 />
          </Button> */}
          <AlertDialog>
            <AlertDialogTrigger asChild >
              <Button variant="destructive"><Trash2 /> Eliminar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción eliminara de forma permanente el Rol
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onHandleDelete}>Confirmar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Actualizar Rol
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
  );
}

const RolEditModal = ({
  isOpen,
  onClose,
  role,
  ...props
}: RoleEditModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px] max-h-[95vh] overflow-y-auto"
        // className="overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div
        // className="flex flex-col max-h-[90vh] overflow-y-auto "
        >
          <DialogHeader>
            <DialogTitle>Editar Rol</DialogTitle>
            <DialogDescription>
              Modifica los detalles del rol.
            </DialogDescription>
          </DialogHeader>
          <div className="pr-2">
            <RoleEditForm onClose={onClose} role={role} {...props} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RolEditModal;
