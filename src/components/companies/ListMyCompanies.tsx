import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import CreateCompanyCard from "./CreateCompanyCard"
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/https";
import { enqueueSnackbar } from "notistack";
import type { Company } from "@/types/company";
import CompanyCard from "./CompanyCard";
import { setCompany } from "@/redux/slices/companySlice";
import { useNavigate } from "react-router-dom";

const ListMyCompanies = () => {

    const userData = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

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
          dispatch(setCompany({_id: company._id, name: company.name, isSelect: true }))
          navigate("/dashboard")
        }


  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
          {/* Card para crear empresa */}
          <CreateCompanyCard />

          {/* Empresas propias */}
          
          
          {resData?.data.data.map( (company : Company) => {
            // console.log("company: ", company)
            return (
              <CompanyCard key={company._id} company={company} handleClickButton={()=>handleClickCompany(company)}/>
            )
          })}
        </div>
  )
}

export default ListMyCompanies