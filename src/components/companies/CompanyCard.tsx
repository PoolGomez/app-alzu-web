
import type { Company } from "@/types/company";
// import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface CompanyCardProps {
    company: Company,
    handleClickButton: (company: Company)=>void
}

const CompanyCard = ({ company, handleClickButton }: CompanyCardProps) => {

    // const handleClick = (id : string) => {
    //     console.log("click company: ", id)
    //     handleClickButton(id)
    // }
  return (
     <Card className="hover:shadow-lg transition cursor-pointer" onClick={ () => handleClickButton(company)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          <span>{company.name}</span>
          {/* {company.role === 'collaborator' && (
            <Badge variant="outline" className="text-xs">
              Colaborador
            </Badge>
          )} */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
            {
                // company.description || 
                "Description"
            } </p>
      </CardContent>
    </Card>

    // /* h-full + flex-col para que el card llene la celda del grid */
    // <Card 
    //     className="h-full flex flex-col hover:shadow-lg transition cursor-pointer"
    // >
    //   <CardHeader className="flex-none">
    //     <CardTitle className="flex items-center justify-between text-base">
    //       <span className="truncate">{company.name}</span>
    //       {company.role === 'collaborator' && (
    //         <Badge variant="outline" className="text-xs ml-2">
    //           Colaborador
    //         </Badge>
    //       )}
    //     </CardTitle>
    //   </CardHeader>

    //   {/* El contenido ocupa el espacio restante */}
    //   <CardContent className="flex-1">
    //     <p className="text-sm text-muted-foreground line-clamp-3">
    //       {company.description}
    //     </p>

    //     {/* ejemplo de footer alineado al final */}
    //     <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
    //       <span>Última actividad: —</span>
    //       <span>Ver</span>
    //     </div>
    //   </CardContent>
    // </Card>
  )
}

export default CompanyCard;

{/* <Card className="hover:shadow-lg transition cursor-pointer">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          <span>{company.name}</span>
          {company.role === 'collaborator' && (
            <Badge variant="outline" className="text-xs">
              Colaborador
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{company.description || "Description"} </p>
      </CardContent>
    </Card> */}