import { useNoteContext } from "@/context/noteContext";
import Image from "next/image";
import ArchiveModal from "./archiveModal";
import DeleteModal from "./deletemodal";
import {
    AlertDialog,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

type ArcAndDelProps = {
    archiveNotes: ()=>void,
    restoreNotes: ()=>void,
     deleteNote:   ()=>void
}

export default function ArcAndDel({archiveNotes, restoreNotes, deleteNote}: ArcAndDelProps){
    const {showArchivedNote} = useNoteContext()
    const archOrRestNote =showArchivedNote? restoreNotes: archiveNotes
    return(
        <div className="w-[25%] flex flex-col items-start gap-4 border-l-[1px] ">
              <AlertDialog>
                <AlertDialogTrigger className="mt-[20px] ml-[20px] p-[8px] flex items-center justify-start gap-2 border-[1px] w-[90%] rounded-[8px] border-[#CACFD8] font-inter text-[14px] font-[500] text-[#0E121B]">
                <Image width={20} height={20} src={showArchivedNote?"/restore.png": "/Archive.png" }alt="Archive" />
                {showArchivedNote? "Restore Note": "Archive"}
                </AlertDialogTrigger>
                <ArchiveModal archOrRestNote= {archOrRestNote} />
              </AlertDialog>
            
              <AlertDialog>
                <AlertDialogTrigger className="ml-[20px] p-[8px] flex items-center justify-start gap-2 border-[1px] w-[90%] rounded-[8px] border-[#CACFD8] font-inter text-[14px] font-[500] text-[#0E121B]">
                <Image width={20} height={20} src="/delete.png" alt="delete" />
                Delete Note
                </AlertDialogTrigger>
                <DeleteModal deleteNote= {deleteNote} />
              </AlertDialog>
        </div>
    )
}