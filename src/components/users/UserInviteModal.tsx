import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Mail, UserPlus } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

interface UserInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
//   onConfirm: (data: Omit<Room, "_id">) => void;
  onConfirm: (data: {publicId : string, rolId: string}) => void;
//   companyId: string;
//   isLoading: boolean;
}

const UserInviteModal = ({ isOpen, onClose, onConfirm }:UserInviteModalProps) => {



    // form
    const formSchema = z.object({
        publicId: z.string().min(1, "Codigo de usuario es obligatorio"),
        rolId: z.string().min(1, "El Rol es obligatorio"),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            publicId: "",
            rolId: ""
        }
    })

    const handleSendInvitation = (data:z.infer<typeof formSchema>) => {
        console.log("form: ", form.getValues("rolId"))
        onConfirm({
            publicId: data.publicId,
            rolId: data.rolId
        })
    }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="flex gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Invitacion de usuario
            </DialogTitle>
            <DialogDescription>
              Envía una invitación al usuario ingresando su codigo
            </DialogDescription>
          </DialogHeader>

          {/* <CreateRoomForm companyId={companyId} onCancel={onClose} {...props} /> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSendInvitation)} className="space-y-4">

                {/* <Card className="border-border/50 bg-card/50 backdrop-blur-sm"> */}
                    {/* <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary" />
                        Invitar por Codigo de usuario
                        </CardTitle>
                        <CardDescription>
                        Envía una invitación directamente al correo del usuario
                        </CardDescription>
                    </CardHeader> */}
                    {/* <CardContent className="space-y-4"> */}

                        <FormField
                            control={form.control}
                            name="publicId"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Codigo de usuario</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ingrese el codigo de usuario" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* <div className="space-y-2">
                            <Label htmlFor="email">Codigo de Usuario</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder=""
                            />
                        </div> */}

                        {/* <div className="space-y-2">
                            <Label htmlFor="role">Rol del usuario</Label>
                            <Select 
                                value={selectedRole} 
                                onValueChange={(v) => setSelectedRole(v as UserRole)}
                            >
                                <SelectTrigger>
                                <SelectValue placeholder="Selecciona un rol" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="admin">Administrador</SelectItem>
                                <SelectItem value="manager">Gerente</SelectItem>
                                <SelectItem value="waiter">Mesero</SelectItem>
                                <SelectItem value="cashier">Cajero</SelectItem>
                                <SelectItem value="kitchen">Cocina</SelectItem>
                                </SelectContent>
                            </Select>
                        </div> */}

                        <FormField
                            control={form.control}
                            name="rolId"
                            render={({field})=>(
                                <FormItem>
                                        <FormLabel>Rol</FormLabel>
                                        <FormControl>
                                            <Select 
                                            // {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                    // value={selectedRole} 
                                    // onValueChange={(v) => setSelectedRole(v as UserRole)}
                                >
                                    <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un rol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="admin">Administrador</SelectItem>
                                    <SelectItem value="manager">Gerente</SelectItem>
                                    <SelectItem value="waiter">Mesero</SelectItem>
                                    <SelectItem value="cashier">Cajero</SelectItem>
                                    <SelectItem value="kitchen">Cocina</SelectItem>
                                    </SelectContent>
                            </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button 
                            type="submit"
                            className="w-full">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Enviar Invitación
                        </Button>
                    {/* </CardContent>
                    </Card> */}

            </form>
          </Form>


        </DialogContent>
      </Dialog>
  )
}

export default UserInviteModal