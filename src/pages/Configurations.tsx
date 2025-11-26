import FullScreenLoader from "@/components/shared/FullScreenLoader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/hooks/hooks";
import useCompanySelect from "@/hooks/useCompanySelect";
import { deleteCompany, updateCompany } from "@/https";
import { companySchema, type CompanySchema } from "@/schemas/companySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle, Save, Trash } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Configurations = () => {
  const isLoadingCompanyData = useCompanySelect();
  const companySelect = useAppSelector((state) => state.company);
  const navigate= useNavigate();

  const form = useForm<CompanySchema>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      description: "",
      owner: "",
    },
  });

  useEffect(() => {
    if (!companySelect) return;

    form.reset({
      name: companySelect.name,
      description: companySelect.description,
      owner: companySelect.owner,
    });
  }, [companySelect, form]);

  const mutation = useMutation({
    mutationFn: updateCompany,
    onSuccess: () => {
      enqueueSnackbar("Empresa actualizada correctamente", {
        variant: "success",
      });
    },
    onError: (error) => {
      if(error instanceof AxiosError && error.response){
              enqueueSnackbar(error.response.data.message, { variant: "error"});
            }else{
              enqueueSnackbar("Error al actualizar la empresa" , { variant: "error"})
            }
      
    },
  });

  const mutationDeleteCompany = useMutation({
    mutationFn: deleteCompany,
    onSuccess:(data)=>{
      console.log("id de la empresa a  borrar ", data)
      navigate("/companies")
      enqueueSnackbar("Empresa eliminada correctamente", {
        variant: "success",
      });
    },
    onError:(error)=>{
      console.log("Error delete company ", error)
      // navigate("/companies")
      if(error instanceof AxiosError && error.response){
              enqueueSnackbar(error.response.data.message, { variant: "error"});
            }else{
              enqueueSnackbar("Error al eliminar la empresa" , { variant: "error"})
            }
    }
  })

  const onHandleDeleteCompany = () => {
    mutationDeleteCompany.mutate(companySelect._id)
  }

  const onSubmit = (data: CompanySchema) => {
    const companyData = {
      companyId: companySelect._id,
      name: data.name,
      description: data.description,
    };
    mutation.mutate(companyData);
  };

  if (isLoadingCompanyData) return <FullScreenLoader />;
  if (mutationDeleteCompany.isPending) return <FullScreenLoader />;

  return (
    <section className="h-[calc(100vh-5rem)] overflow-hidden">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-wider">
            Configuración de la empresa
          </h1>
        </div>

        <div className="flex items-center justify-around gap-4">
          {/* <Button
            onClick={()=>onHandleDeleteCompany()}
            variant={"destructive"}
            className="text-lg rounded-lg px-5 py-2 font-semibold cursor-pointer"
          >
            <Trash />
          </Button> */}


          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="cursor-pointer">
                <Trash />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-center">Eliminar Empresa</DialogTitle>
                <DialogDescription className="flex items-center justify-center">
                  Esto eliminara permanentemente la empresa y los recursos relacionados como Productos, Categorias y Ventas
                </DialogDescription>
              </DialogHeader>
              {/* <div className="flex items-center gap-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue="https://ui.shadcn.com/docs/installation"
                    readOnly
                  />
                </div>
              </div> */}
              <DialogFooter>
                <div className="w-full flex items-center justify-center gap-4">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancelar
                    </Button>
                  </DialogClose>
                  
                  <Button onClick={onHandleDeleteCompany}>
                    Confirmar
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>

      </div>

      <div className="flex items-center justify-center w-full p-6 md:p-10 bg-background">
        <div className="w-full sm:w-1/2 space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input disabled={mutation.isPending} placeholder="Ingrese un nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={mutation.isPending}
                          placeholder="Ingrese una descripción"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">

                <Button type="submit" size={"sm"} disabled={mutation.isPending} className="cursor-pointer">
                  {mutation.isPending ? (
                      <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Guardando
                      </>
                    ):(
                      <>
                      <Save className="mr-2 h-4 w-4 " />
                      Guardar
                      </>
                    )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Configurations;
