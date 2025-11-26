import { IoArrowBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

const BackButton = () => {
    const navigate = useNavigate();
  return (
    <button onClick={
      () => navigate(-1)
      // ()=>navigate("/")
      
      } 
      // className="bg-[#025cca] p-3 text-2xl font-bold rounded-full text-white cursor-pointer"
      className="p-3 text-2xl font-bold rounded-full cursor-pointer"
      >
        <IoArrowBackOutline />
    </button>
  )
}

export default BackButton