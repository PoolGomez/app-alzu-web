import ListMyCompanies from "@/components/companies/ListMyCompanies";

import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

import { removeCompany } from "@/redux/slices/companySlice";

import { Building2 } from "lucide-react";
import { useEffect } from "react";


const Companies = () => {

 const companySelect = useAppSelector((state) => state.company);
  
 const dispatch =useAppDispatch()

//  if(companySelect.isSelect){
//   dispatch(removeCompany())
//  }

 useEffect(() => {
   const validateCompany =()=>{
      if(companySelect.isSelect){
        dispatch(removeCompany())
      }
   }

   validateCompany();
   
 }, [])



 

  //  const [companies] = useState<CompanyData[]>([
  //   { id: '1', name: 'Mi Restaurante', description: 'Gestión de pedidos y mesas', role: 'owner' },
  //   { id: '2', name: 'La Pizzería', description: 'Pedidos online y delivery', role: 'owner' },
  //   { id: '3', name: 'Café Central', description: 'Sistema de comandas', role: 'collaborator' },
  // ])

  // const myCompanies = companies.filter(c => c.role === 'owner')
  // const sharedCompanies = companies.filter(c => c.role === 'collaborator')



  return (
    <div className="min-h-screen w-full p-6 md:p-10 bg-background">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Empresas</h1>
        <p className="text-muted-foreground">
          Gestiona tus empresas o colabora en las que te compartieron.
        </p>
      </header>

      {/* Grid de empresas propias */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Mis Empresas
          </h2>
          <Separator className="flex-1 ml-3" />
        </div>

        <ListMyCompanies />
        
        
      </section>

      {/* Grid de empresas compartidas */}
      {/* {sharedCompanies.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5" />
              Empresas Compartidas
            </h2>
            <Separator className="flex-1 ml-3" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
            {sharedCompanies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </section>
      )} */}
    </div>
  )
}



export default Companies