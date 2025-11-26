import { useAppSelector } from "@/hooks/hooks"

const Dashboard = () => {

  const companyData = useAppSelector((state)=> state.company)
  
  return (
    <div>
      {companyData.name}
    </div>
  )
}

export default Dashboard