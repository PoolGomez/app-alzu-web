import { useEffect, useState } from "react";
import { getUserData } from "../https";
import { removeUser, setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";


const useLoadData = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const userDatos = useAppSelector(state => state.user)
    

    useEffect(()=>{
        const fetchUser = async () => {
           try {
            //validar usuario en sesion
            if(!userDatos.isAuth){
                return false
            }
            const { data } = await getUserData();
            // console.log(data);

            const { _id, name, email } = data.data;
            dispatch(setUser({_id, name, email}));

           } catch (error) {
                dispatch(removeUser());
                navigate("/login");
                console.log(error);
           } finally{
                setIsLoading(false);
           }
        }

        fetchUser();
    }, [dispatch, navigate]);
    
    return isLoading;
    
}

export default useLoadData;