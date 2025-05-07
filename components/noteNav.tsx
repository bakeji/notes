import { useNoteContext } from "@/context/noteContext";
import Image from "next/image";
import ArchiveModal from "./archiveModal";
import DeleteModal from "./deletemodal";
import {
    AlertDialog,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

type NoteNavProps={
    saveNote: () => void;
    archiveNotes: ()=>void,
    restoreNotes: ()=>void,
     deleteNote:   ()=>void
}

export default function NoteNav({saveNote, archiveNotes,  restoreNotes, deleteNote}: NoteNavProps){
    const {setShowClickedNote, showArchivedNote,setIsNewNote} = useNoteContext()
    const archOrRestNote =showArchivedNote? restoreNotes: archiveNotes
     return(
        <div className={`hidden  items-center justify-between mb-5 py-3 border-b max-lg:flex`}>
            <button onClick={()=>{setShowClickedNote(false); setIsNewNote(false) }} className="flex items-center  text-[14px] font-[400]"> <Image width={18} height={18} src='/left.png' alt="go back"/>  Go back</button>
            <div className="flex items-center justify-center gap-3">
                            
                <AlertDialog>
                    <AlertDialogTrigger className=" border-none text-[14px] font-[500] text-[#0E121B]">
                    <Image width={18} height={18} src="/del-mob.png" alt="delete" />
                    </AlertDialogTrigger>
                    <DeleteModal deleteNote= {deleteNote} />
                </AlertDialog>  
                
                
                <AlertDialog>
                    <AlertDialogTrigger className=" border-none  text-[14px] font-[500] text-[#0E121B]">
                    <Image width={18} height={18} src={showArchivedNote?"/restore.png": "/arch-mob.png" }alt="Archive" />
                    
                    </AlertDialogTrigger>
                    <ArchiveModal archOrRestNote= {archOrRestNote} />
                </AlertDialog>
         
                <button>Cancel</button>
                <button onClick={saveNote} className="text-[#335CFF]"> Save Note</button>
            </div>
        </div>
    )
}