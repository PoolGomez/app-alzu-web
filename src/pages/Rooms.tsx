
import RoomCreateModal from "@/components/rooms/RoomCreateModal";
import RoomEditModal from "@/components/rooms/RoomEditModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/hooks";
import { addRoom, deleteRoom, getRoomsAllByCompanyId, updateRoom } from "@/https";
import type { Room } from "@/types/room";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Plus, Table } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const RoomsPage = () => {
  const companyData = useAppSelector((state) => state.company);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const queryClient = useQueryClient();

  const handleCreateTable = (newRoomData: Omit<Room, "_id">) => {
    console.log("Creando sala:", newRoomData);
    mutationAddRoom.mutate(newRoomData)
    setIsCreateModalOpen(false);
};

  const { data: resData, isError } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      return await getRoomsAllByCompanyId(companyData._id);
    },
    placeholderData: keepPreviousData,
  });


  const mutationAddRoom = useMutation({
    mutationFn:(reqData: Omit<Room, "_id">) => addRoom(reqData),
    onSuccess:()=>{
      enqueueSnackbar("Sala creada correctamente", { variant: "success" });
      queryClient.invalidateQueries({queryKey:["rooms"]})
      setIsCreateModalOpen(false);
    },
    onError:(error)=>{
      if(error instanceof AxiosError && error.response){
        enqueueSnackbar(error.response.data.message, { variant: "error"});
      }else{
        enqueueSnackbar("Ocurrió un error inerperado" , { variant: "error"})
      }
    }
  })

  const mutationUpdateRoom = useMutation({
    mutationFn:(reqData: Omit<Room, "companyId">) => updateRoom(reqData),
    onSuccess:()=>{
      enqueueSnackbar("Sala actualizada correctamente", { variant: "success" });
      queryClient.invalidateQueries({queryKey:["rooms"]})
      setIsEditSheetOpen(false);
    },
    onError:(error)=>{
      if(error instanceof AxiosError && error.response){
        enqueueSnackbar(error.response.data.message, { variant: "error"});
      }else{
        enqueueSnackbar("Ocurrió un error inerperado" , { variant: "error"})
      }
    }
  })

  const handleUpdateRoom = (updatedTRoom: Omit<Room, "companyId">) => {
    mutationUpdateRoom.mutate(updatedTRoom)
  };

  const mutationDeleteCompany = useMutation({
      mutationFn: deleteRoom,
      onSuccess:(data)=>{
        console.log("id de la sala a  borrar ", data)
        queryClient.invalidateQueries({queryKey:["rooms"]})
        setIsEditSheetOpen(false);
        enqueueSnackbar("Sala eliminada correctamente", {
          variant: "success",
        });
      },
      onError:(error)=>{
        console.log("Error delete room ", error)
        // navigate("/companies")
        if(error instanceof AxiosError && error.response){
                enqueueSnackbar(error.response.data.message, { variant: "error"});
              }else{
                enqueueSnackbar("Error al eliminar la sala" , { variant: "error"})
              }
      }
    })
  
    const onHandleDeleteCompany = () => {
      if(selectedRoom) {
        mutationDeleteCompany.mutate(selectedRoom._id)
      }else{
        console.log("No existe una sala seleccionada")
      }
    }


  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setIsEditSheetOpen(true);
  };


  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  return (
    <div className="flex flex-col h-full min-h-screen">
      <div className="px-6 py-4 border-b flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Table className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold ">Salas</h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                {resData?.data.data.length + " en total"}
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
          Nueva Sala
        </Button>
      </div>

      <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
          {resData?.data.data.map((room: Room) => (
            <Card
              key={room._id}
              onClick={()=>handleRoomClick(room)}
              className="group relative overflow-hidden transition-all hover:shadow-lg border-l-4"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-center items-start">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    {room.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    {room.visible ? (
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Visible
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        No visible
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <RoomCreateModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onConfirm={handleCreateTable}
                companyId={companyData._id}
                isLoading={mutationAddRoom.isPending}
                // rooms={mockRooms}
                // defaultRoomId={selectedRoomId} // <--- Truco de UX
              />
            
      <RoomEditModal
        isOpen={isEditSheetOpen}
        onClose={()=>setIsEditSheetOpen(false)}
        room={selectedRoom}
        onSave={handleUpdateRoom}
        onDelete={onHandleDeleteCompany}
        isLoading={mutationUpdateRoom.isPending}
      />

    </div>
  );
};

export default RoomsPage;
