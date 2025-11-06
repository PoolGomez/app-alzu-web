import { cn } from "@/lib/utils"
import { Card, CardContent } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { FieldDescription, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import image_logo from "@/assets/images/logo.png";
import image_register from "@/assets/images/register.png";
// import { useAppDispatch } from "@/hooks/hooks"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { registerSchema, type RegisterSchema } from "@/schemas/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { register } from "@/https"
import { enqueueSnackbar } from "notistack"
import { AxiosError } from "axios"

const RegisterForm = ({ className, ...props }: React.ComponentProps<"div">) => {

  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<RegisterSchema>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        email: "",
        password: "",
        name: ""
      },
  });

   const onSubmit = (data: RegisterSchema) => {
      // e.preventDefault();
      registerMutation.mutate(data);
    };

  const registerMutation = useMutation({
    mutationFn: (reqData: RegisterSchema)=>register(reqData),
    onSuccess:(res)=>{
      const {data}= res
      enqueueSnackbar(data.message, { variant: "success"});

      navigate("/login");

    },
    onError:(error)=>{
      if (error instanceof AxiosError && error.response) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Ocurrió un error inesperado", { variant: "error" });
      }
    }
  })
  

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <img src={image_logo} alt="Alzu Logo" className="h-14 w-14 border-2 rounded-full p-1" />
                  <h1 className="text-2xl font-bold">Alzu</h1>
                  <p className="text-muted-foreground text-xl">
                    Iniciar sesión
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex items-center">
                        <FormLabel>Contraseña</FormLabel>
                        <a
                          href="/#"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          ¿Olvidaste tu contraseña?
                        </a>
                      </div>

                      <FormControl>
                        <Input
                          placeholder="password"
                          type="password"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name"
                          type="text"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* {error && <FormMessage>{error}</FormMessage>} */}
                <Button
                  type="submit"
                  // disabled={isPending}
                  className="w-full"
                >
                  Registrarse
                </Button>

                <div className="mt-4 text-center text-sm">
                  ¿No tienes una cuenta?{" "}
                  <a href="/register" className="underline underline-offset-4">
                    Registrate
                  </a>
                </div>
              </FieldGroup>
            </form>
          </Form>

          <div className="bg-muted relative hidden md:block">
            <img
              src={image_register}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Al hacer clic en continuar, aceptas nuestros <a href="#">Términos de Servicio</a>{" "}
        y nuestra <a href="#">Política de Privacidad</a>.
      </FieldDescription>
    </div>
  )
}

export default RegisterForm