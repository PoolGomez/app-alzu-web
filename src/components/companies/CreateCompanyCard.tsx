import { Plus } from "lucide-react"
import { Card, CardHeader, CardTitle } from "../ui/card"
import { Dialog, DialogContent } from "../ui/dialog"
import ModalContentAddCompany from "../shared/ModalContentAddCompany"
import { useState } from "react"

const CreateCompanyCard = () => {


  const [isOpenDialog, setIsOpenDialog] = useState(false);
      const openDialog = () => setIsOpenDialog(true);
      const closeDialog = () => setIsOpenDialog(false);

  return (
<>
    <Card className="hover:shadow-lg transition cursor-pointer border-dashed border-2 border-muted-foreground/20 hover:border-primary/50 flex flex-col justify-center" 
    // onClick={()=>navigate("/add-company")}
    onClick={openDialog}
    >
      <CardHeader className="flex flex-col items-center justify-center text-center py-10">
        <div className="flex flex-col items-center gap-3">
          {/* <Button size="icon-lg" className="rounded-full" variant="outline" onClick={()=>navigate("/add-company")}> */}
            <Plus 
            className="w-12 h-12 rounded-full border-2 p-1" 
            
            />
          {/* </Button> */}
          <CardTitle className="text-base font-medium text-muted-foreground group-hover:text-primary">
            Crear nueva empresa
          </CardTitle>
        </div>
      </CardHeader>
    </Card>

    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}  >

                <DialogContent onInteractOutside={(e)=>e.preventDefault()}>
                    <ModalContentAddCompany onClose={closeDialog}/>
                    
                </DialogContent>
    
    </Dialog>


  </>  
  )
}

export default CreateCompanyCard


// <Card className="hover:shadow-lg transition cursor-pointer border-dashed border-2 border-muted-foreground/20 hover:border-primary/50 flex flex-col justify-center">
    //   <CardHeader className="flex flex-col items-center justify-center text-center py-10">
    //     <div className="flex flex-col items-center gap-3">
    //       <Button size="icon" className="rounded-full" variant="outline">
    //         <Plus className="w-5 h-5" />
    //       </Button>
    //       <CardTitle className="text-base font-medium text-muted-foreground group-hover:text-primary">
    //         Crear nueva empresa
    //       </CardTitle>
    //     </div>
    //   </CardHeader>
    // </Card>