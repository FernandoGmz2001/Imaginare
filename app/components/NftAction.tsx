import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MdModeEdit, MdDelete } from "react-icons/md";

export default function NftAction(){
  return (<>
  <Dialog>
  <DialogTrigger><div className="flex ">
  <MdModeEdit /><p>Edit</p>
    </div></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
</>)
}