import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { companySchema, type CompanySchema } from "@/schemas/companySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { addCompany } from "@/https";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setCompany } from "@/redux/slices/companySlice";
import { LoaderCircle, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../ui/textarea";
// import { useTransition } from "react";


const ModalContentAddCompany = ({onClose}:{onClose: ()=>void}) => {

  const userData = useAppSelector((state)=> state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  // const [isLoading,setIsLoading] = useState(false);
  // const [isTransitionPending, startTransition] = useTransition();

  const form = useForm<CompanySchema>({
    resolver: zodResolver(companySchema),
    defaultValues:{
      name: "",
      description: "",
      owner: userData._id
    }
  });

  const onSubmit = (data: CompanySchema)=>{
    // addCompányMutation.mutate(data)

      mutation.mutate(data)
    
    
  }

  const mutation = useMutation({
    mutationFn:(reqData: CompanySchema) => addCompany(reqData),
    onSuccess:(res)=>{

      // startTransition(()=>{
          const {data} = res;
          dispatch(setCompany(data.data))
          enqueueSnackbar("Empresa creada correctamente", { variant: "success" });

          onClose();
          navigate("/dashboard")
      // })
      
    },
    onError:(error)=>{
      if(error instanceof AxiosError && error.response){
        enqueueSnackbar(error.response.data.message, { variant: "error"});
      }else{
        enqueueSnackbar("Ocurrió un error inerperado" , { variant: "error"})
      }
    }
  })

  // const isLoading = mutation.isPending ;
  // || isTransitionPending

  return (
    
     <div 
     className="h-full overflow-y-auto p-6"
     >
        <DialogHeader className="h-max-screen">
           
            
            <DialogTitle>Crear nueva empresa</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
         
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}> 

                <div className="grid gap-4">

                <FormField control={form.control} name="name" render={({field}) =>(
                  <FormItem className="grid gap-3">
                    <FormLabel >Nombre</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Ingrese un nombre" {...field}  disabled={mutation.isPending}/>
                    </FormControl>
                  </FormItem>
                  )}
                />

                <FormField control={form.control} name="description" render={({field}) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Descripción</FormLabel>
                    <Textarea placeholder="Ingrese una descripción" {...field}  disabled={mutation.isPending}/>
                  </FormItem>
                )}

                />

                  

                </div>

                <DialogFooter className="pt-4">
                  <DialogClose asChild>
                    <Button variant="outline" disabled={mutation.isPending}>Cancelar</Button>
                  </DialogClose>
                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? (
                      <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Creando...
                      </>
                    ):(
                      <>
                      <Save className="mr-2 h-4 w-4 " />
                      Crear
                      </>
                    )}
                    {/* Crear */}
                  </Button>
                </DialogFooter>
            </form>
          </Form>

      </div>

      
  );
};

export default ModalContentAddCompany;
