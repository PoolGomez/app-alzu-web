import { useEffect, useState } from "react";
import { getCompany, } from "../https";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCompany, setCompany } from "@/redux/slices/companySlice";
import { useAppSelector } from "./hooks";

const useCompanySelect = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const companyId = useAppSelector((state) => state.company._id);

    useEffect(()=>{
        const fetchCompany = async () => {
           try {
           
            if(!companyId){
                // setIsLoading(false)
                return false
            }
            const { data } = await getCompany(companyId);

            const { _id, name, description, owner } = data.data;
            dispatch(setCompany({_id, name, description, owner, isSelect: true}));

           } catch (error) {
                dispatch(removeCompany());
                navigate("/companies");
                console.log("error useCompanySelect")
                console.log(error);
           } finally{
                setIsLoading(false);
           }
        }

        fetchCompany();
    }, [dispatch, navigate, companyId]);
    
    return isLoading;
    
}

export default useCompanySelect;