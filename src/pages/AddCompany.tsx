import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    name : z
        .string()
        .min(3, {message : "Company name should be minimum 3 characters"})
})

const AddCompany = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

  return (
   <div className="flex items-center justify-center w-full p-6 md:p-10 bg-background">
                <div className="w-full sm:w-1/2 space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form 
                        // onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField 
                                control={form.control} 
                                name="name"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                // disabled={isLoading}
                                                placeholder="El nombre de tu empresa..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button 
                                    // disabled={isLoading} 
                                    type="button"  variant={"outline"} size={"sm"} 
                                    // onClick={companyModal.onClose}
                                >
                                    Cancelar
                                </Button>
                                <Button 
                                    // disabled={isLoading} 
                                    type="submit" size={"sm"}>Continuar</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
  )
}

export default AddCompany