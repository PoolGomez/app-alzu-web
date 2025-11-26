import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getCompanies } from "@/https";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { setCompany } from "@/redux/slices/companySlice";
import { enqueueSnackbar } from "notistack";

const Test = () => {

    const userData = useAppSelector((state) => state.user);
const dispatch = useAppDispatch();
// const navigate = useNavigate()

    const {data: resData, isError} = useQuery({
        queryKey:["companies"],
        queryFn: async()=>{
        return await getCompanies(userData._id)
        },
        placeholderData: keepPreviousData
    });

    const handleClickCompany = (companyId: string, companyName: string) => {
        console.log(companyId)
        dispatch(setCompany({_id: companyId, name: companyName }))
        // navigate("/dashboard")
      }

    if(isError){
        enqueueSnackbar("Something went wrong!", {variant: "error"})
    }

  return (
    <div className="p-4 space-x-4 space-y-4">
        {
            resData?.data.data.map((company )=>(
            <Button key={company._id} onClick={()=>handleClickCompany(company._id, company.name)}>
              {company.name}
            </Button>
          ))
        }
    </div>
  )
}

export default Test