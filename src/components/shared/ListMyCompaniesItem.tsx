import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
// import CreateCompanyCard from "./CreateCompanyCard"
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/https";
import { enqueueSnackbar } from "notistack";
import type { Company } from "@/types/company";
// import CompanyCard from "./CompanyCard";
import { setCompany } from "@/redux/slices/companySlice";

import { Check, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "../ui/dropdown-menu";
// import { useNavigate } from "react-router-dom";

const ListMyCompaniesItem = () => {

    const userData = useAppSelector((state) => state.user);
    const companyData = useAppSelector((state)=> state.company);
    const dispatch = useAppDispatch();
    // const navigate = useNavigate()
    

    const { data: resData, isError } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      return await getCompanies(userData._id)
    },
    placeholderData: keepPreviousData
  });

  if(isError){
    enqueueSnackbar("Something went wrong!", {variant: "error"})
  }

  const handleClickCompany = (company : Company) => {
          console.log(company)
          dispatch(setCompany({_id: company._id, name: company.name, description: company.description, owner: company.owner, isSelect: true }))
          // navigate("/dashboard")
          
        }


  return (
    <div 
    // className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr"
    >
          {/* Card para crear empresa */}
          {/* <CreateCompanyCard /> */}

          {/* Empresas propias */}
          
          
          {resData?.data.data.map( (company : Company) => {
            // console.log("company: ", company)
            return (
            //   <CompanyCard key={company._id} company={company} handleClickButton={()=>handleClickCompany(company)}/>
              <DropdownMenuItem
              key={company._id}
                className="flex items-center px-2 py-1 cursor-pointer hover: bg-grat-50 text-muted-foreground hover:text-primary"
                // onClick={() => onSelect(company)}
                onClick={()=>handleClickCompany(company)}
                >
                <Store className="mr-2 h-4 w-4" />
                <p className="w-full truncate text-sm whitespace-nowrap">{company.name}</p>
                <Check
                    className={cn(
                    "ml-auto w-4 h-4",
                    companyData.name === company.name ? "opacity-100" : "opacity-0"
                    )}
                />
                </DropdownMenuItem>
            )
          })}
        </div>
  )
}

export default ListMyCompaniesItem