import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import image_login from "@/assets/images/login.png";
import image_logo from "@/assets/images/logo.png";
import { Card, CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/loginSchema";
import { login } from "@/https";
import { enqueueSnackbar } from "notistack";
import { useAppDispatch } from "@/hooks/hooks";
import { setUser } from "@/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { cn } from "@/lib/utils";
import { FieldDescription, FieldGroup } from "../ui/field";

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {
    // e.preventDefault();
    loginMutation.mutate(data);
  };

  const loginMutation = useMutation({
    mutationFn: (reqData: LoginSchema) => login(reqData),
    onSuccess: (res) => {
      const { data } = res;
      const { _id, name, email, publicId } = data.data;
      dispatch(setUser({ _id, name, email , publicId}));
      navigate("/companies");
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Ocurrió un error inesperado", { variant: "error" });
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <img src={image_logo} alt="Alzu Logo" className="h-14 w-14 border-2 rounded-full p-1  bg-black dark:bg-transparent" />
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
                          href="/send-reset-password"
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
                {/* {error && <FormMessage>{error}</FormMessage>} */}
                <Button
                  type="submit"
                  // disabled={isPending}
                  className="w-full"
                >
                  Iniciar Sesión
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
              src={image_login}
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
  );
};

export default LoginForm;
