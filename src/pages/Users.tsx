import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import UserInviteModal from "@/components/users/UserInviteModal"
import { useAppSelector } from "@/hooks/hooks"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Check, Copy, Mail, Plus, Shield, Trash2, UserPlus, Users } from "lucide-react"
import { enqueueSnackbar } from "notistack"
import { useState } from "react"

const ROLE_LABELS: Record<UserRole, string> = {
  owner: "Propietario",
  admin: "Administrador",
  manager: "Gerente",
  waiter: "Mesero",
  cashier: "Cajero",
  kitchen: "Cocina",
};

// const ROLE_COLORS: Record<UserRole, string> = {
//   owner: "bg-primary/10 text-primary border-primary/20",
//   admin: "bg-info/10 text-info border-info/20",
//   manager: "bg-accent/10 text-accent border-accent/20",
//   waiter: "bg-success/10 text-success border-success/20",
//   cashier: "bg-warning/10 text-warning border-warning/20",
//   kitchen: "bg-muted text-muted-foreground border-muted",
// };
export type UserRole = 'owner' | 'admin' | 'manager' | 'waiter' | 'cashier' | 'kitchen';
export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CompanyMember {
  id: string;
  userId: string;
  companyId: string;
  role: UserRole;
  permissions: string[];
  user?: User;
  createdAt: Date;
}

// Mock data - esto se conectará a la base de datos
const mockSharedUsers: CompanyMember[] = [
  {
    id: "1",
    userId: "u1",
    companyId: "c1",
    role: "admin",
    permissions: ["companies.manage", "users.manage", "tables.manage"],
    user: {
      id: "u1",
      email: "carlos@ejemplo.com",
      fullName: "Pool Gomez",
      avatar: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    userId: "u2",
    companyId: "c1",
    role: "manager",
    permissions: ["tables.manage", "orders.manage"],
    user: {
      id: "u2",
      email: "maria@ejemplo.com",
      fullName: "María García",
      avatar: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    userId: "u3",
    companyId: "c1",
    role: "waiter",
    permissions: ["tables.view", "orders.create"],
    user: {
      id: "u3",
      email: "pedro@ejemplo.com",
      fullName: "Pedro Sánchez",
      avatar: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "4",
    userId: "u4",
    companyId: "c1",
    role: "cashier",
    permissions: ["orders.view", "invoices.create"],
    user: {
      id: "u4",
      email: "ana@ejemplo.com",
      fullName: "Ana López",
      avatar: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    createdAt: new Date("2024-03-25"),
  },
];

const UsersPage = () => {

  const [sharedUsers, setSharedUsers] = useState<CompanyMember[]>(mockSharedUsers);
  const [copied, setCopied] = useState(false);
  // const [inviteCode] = useState("RF-2024-ABC123");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const userCurrent = useAppSelector((state)=>state.user);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);


    const handleRoleChange = (userId: string, newRole: UserRole) => {
    setSharedUsers(
      sharedUsers.map((u) =>
        u.userId === userId ? { ...u, role: newRole } : u
      )
    );
    // toast({
    //   title: "Rol actualizado",
    //   description: "El rol del usuario ha sido actualizado correctamente",
    // });
    enqueueSnackbar("Rol actualizado",{variant:"success"})
  };

   const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleInviteUser = (dataNewUser:{publicId: string, rolId: string}) => {
    mutationInviteUser.mutate(dataNewUser)
    // setIsCreateModalOpen(false)
  }
  const mutationInviteUser = useMutation({
    mutationFn: (reqData: Omit<Room, "_id">) => addRoom(reqData),
    onSuccess: () => {
      enqueueSnackbar("Sala creada correctamente", { variant: "success" });
      // queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setIsCreateModalOpen(false);
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Ocurrió un error inerperado", { variant: "error" });
      }
    },
  });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userCurrent.publicId);
    setCopied(true);
    // toast({
    //   title: "Código copiado",
    //   description: "El código de invitación ha sido copiado al portapapeles",
    // });
    enqueueSnackbar("Código copiado",{variant:"success"})
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold ">Gestión de Usuarios</h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                {/* {resData?.data.data.length + " en total"} */}
                Invita usuarios a colaborar en tu empresa y gestiona sus permisos
              </span>

            </div>
          </div>
        </div>
        <Button
        className="cursor-pointer"
          size="sm"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Invitar Usuario
        </Button>
      </div>


            {/* Invitation Section */}
      {/* <div className="grid gap-6 md:grid-cols-2">
        

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Invitar por Codigo de usuario
            </CardTitle>
            <CardDescription>
              Envía una invitación directamente al correo del usuario
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Codigo de Usuario</Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
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
            </div>
            <Button 
              onClick={handleSendInvitation} 
              className="w-full">
              <UserPlus className="mr-2 h-4 w-4" />
              Enviar Invitación
            </Button>
          </CardContent>
        </Card>

        
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              Código de Invitación
            </CardTitle>
            <CardDescription>
              Comparte este código para que otros usuarios se unan a tu empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tu código de empresa</Label>
              <div className="flex gap-2">
                <Input
                  value={userCurrent.publicId}
                  readOnly
                  className="font-mono text-lg tracking-wider bg-muted/50"
                />
                <Button variant="outline" size="icon" 
                  onClick={handleCopyCode}
                  >
                  {copied ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="rounded-lg bg-muted/30 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">¿Cómo funciona?</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Comparte el código con el usuario</li>
                <li>El usuario ingresa el código en su cuenta</li>
                <li>Asigna el rol desde esta página</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div> */}


      {/* Shared Users List */}
      {/* <Card className="border-border/50 bg-card/50 backdrop-blur-sm"> */}
        {/* <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Usuarios Compartidos
              </CardTitle>
              <CardDescription>
                4 usuarios con acceso a tu empresa
              </CardDescription>
            </div>
          </div>
        </CardHeader> */}
        {/* <CardContent> */}

        <div className="flex-1 p-6 max-w-7xl mx-auto w-full">

        

          {sharedUsers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border-l-4">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No hay usuarios compartidos</p>
              <p className="text-sm">Invita a tu equipo para comenzar a colaborar</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sharedUsers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 hover:border-border transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.user?.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(member.user?.fullName || "?")}
                        {/* PG */}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">
                        {member.user?.fullName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {member.user?.email}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Desde {member.createdAt.toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>


                      {/* si es vista mobile mostrar */}
                        {
                          !isDesktop && (
                            <div className="flex items-center gap-3 mt-2">
                              <Select
                                value={member.role}
                                onValueChange={(v) => handleRoleChange(member.userId, v as UserRole)}
                              >
                                <SelectTrigger className="w-40">
                                  <Badge 
                                    // className={`${ROLE_COLORS[member.role]} border`}
                                    className="bg-info/10 text-info border-info/20"
                                  >
                                    {ROLE_LABELS[member.role]}
                                  </Badge>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">Administrador</SelectItem>
                                  <SelectItem value="manager">Gerente</SelectItem>
                                  <SelectItem value="waiter">Mesero</SelectItem>
                                  <SelectItem value="cashier">Cajero</SelectItem>
                                  <SelectItem value="kitchen">Cocina</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                // onClick={() => handleRemoveUser(member.userId, member.user?.fullName || "")}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )
                        }
                   

                    </div>
                    
                    

                  </div>

                  {isDesktop &&(
                    <div className="flex items-center gap-3">
                      <Select
                        value={member.role}
                        onValueChange={(v) => handleRoleChange(member.userId, v as UserRole)}
                      >
                        <SelectTrigger className="w-40">
                          <Badge 
                            // className={`${ROLE_COLORS[member.role]} border`}
                            className="bg-info/10 text-info border-info/20"
                          >
                            {ROLE_LABELS[member.role]}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrador</SelectItem>
                          <SelectItem value="manager">Gerente</SelectItem>
                          <SelectItem value="waiter">Mesero</SelectItem>
                          <SelectItem value="cashier">Cajero</SelectItem>
                          <SelectItem value="kitchen">Cocina</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        // onClick={() => handleRemoveUser(member.userId, member.user?.fullName || "")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  
                </div>
              ))}
            </div>
          )}

          </div>

          
        {/* </CardContent>
      </Card> */}


          <UserInviteModal 
          isOpen={isCreateModalOpen}
          onClose={()=>setIsCreateModalOpen(false)}
          onConfirm={handleInviteUser}
          />


    </div>
  )
}

export default UsersPage