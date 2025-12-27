import RolCreateModal from "@/components/roles/RolCreateModal"
import RolEditModal from "@/components/roles/RolEditModal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/hooks/hooks"
import { addRole, deleteRole, getAllRolesByCompanyId, updateRole } from "@/https"
import type { Role } from "@/types/role"

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { KeySquare, Plus } from "lucide-react"
import { enqueueSnackbar } from "notistack"
import { useState } from "react"

const RolesPage = () => {
  const companyData =useAppSelector((state)=>state.company);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const queryClient = useQueryClient();

  const { data: resData, isError } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      return await getAllRolesByCompanyId(companyData._id);
    },
    placeholderData: keepPreviousData,
  });

  const handleCreateRol = (newRolData: Omit<Role, "_id">) => {
      
      mutationAddRol.mutate(newRolData);
      // setIsCreateModalOpen(false);
    };

  const mutationAddRol = useMutation({
    mutationFn: (reqData: Omit<Role, "_id">) => addRole(reqData),
    onSuccess: () => {
      enqueueSnackbar("Rol creado correctamente", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
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

  const mutationUpdateRole = useMutation({
    mutationFn:(reqData: Omit<Role,"companyId">)=> updateRole(reqData),
    onSuccess:()=>{
      enqueueSnackbar("Role actualizado correctamente", { variant: "success"});
      queryClient.invalidateQueries({queryKey: ["roles"]});
      setIsEditModalOpen(false);
    },
    onError:(error)=>{
      if (error instanceof AxiosError && error.response) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Ocurrió un error inerperado", { variant: "error" });
      }
    }
  });

  const handleUpdateRole = (updatedRole: Omit<Role, "companyId">) => {
    console.log(updatedRole)
      mutationUpdateRole.mutate(updatedRole);
    };

  const mutationDeleteRole = useMutation({
      mutationFn: deleteRole,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
        setIsEditModalOpen(false);
        enqueueSnackbar("Rol eliminado correctamente", {
          variant: "success",
        });
      },
      onError: (error) => {
        console.log("Error delete role ", error);
        // navigate("/companies")
        if (error instanceof AxiosError && error.response) {
          enqueueSnackbar(error.response.data.message, { variant: "error" });
        } else {
          enqueueSnackbar("Error al eliminar el rol", { variant: "error" });
        }
      },
    });

    const onHandleDeleteCompany = () => {
    if (selectedRole) {
      mutationDeleteRole.mutate(selectedRole._id);
    } else {
      console.log("No existe una sala seleccionada");
    }
  };

   const handleRoleClick = (role: Role) => {
      setSelectedRole(role);
      setIsEditModalOpen(true);
    };

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <div className="p-2 sm:p-6 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <KeySquare className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold ">Roles</h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                {/* {resData?.data.data.length + " en total"} */}
                Gestiona permisos a cada usuario
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
          Nuevo Rol
        </Button>
      </div>

      {/* BODY */}
      <div className="flex-1 p-2 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
        
        <div className="space-y-3">
          {resData?.data.data.map((role: Role) =>(
            <div key={role._id} onClick={()=>handleRoleClick(role)} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 hover:border-border transition-colors cursor-pointer">

              <div className="flex items-center gap-4">
                <div>
                  <p className="font-semibold text-foreground">{role.name}</p>
                  {/* <p className="font-semibold text-foreground">{JSON.stringify(role)}</p> */}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge className="bg-green-500">{role.active ? "Activo" :"Inactivo"}</Badge>
              </div>

            </div>
          ))}
        </div>

      </div>

      <RolCreateModal
        isOpen={isCreateModalOpen}
        onClose={()=>setIsCreateModalOpen(false)} 
        onConfirm={handleCreateRol}
        companyId={companyData._id}
        isLoading={mutationAddRol.isPending}
      />

      <RolEditModal
        isOpen={isEditModalOpen}
        onClose={()=>setIsEditModalOpen(false)}
        role={selectedRole}
        onSave={handleUpdateRole}
        onDelete={onHandleDeleteCompany}
        isLoading={mutationUpdateRole.isPending}

      />
      


    </div>
  )
}

export default RolesPage