'use client'
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { useNoteContext } from "@/context/noteContext"
import Image from "next/image"

  type ArchiveModalProps = {
    archOrRestNote: ()=>void,
   
}

  export default function ArchiveModal({archOrRestNote}: ArchiveModalProps){
    const {showArchivedNote} = useNoteContext()
    return(
  <AlertDialogContent>
    <AlertDialogHeader>
    
      <AlertDialogTitle className="flex items-center gap-6">
        <Image src="/archive.png" alt="archive" width={20} height={20}></Image>  
      Archive Notes
      </AlertDialogTitle>
      <AlertDialogDescription className="pl-10">
        Are you sure you want to archive this note? You can find it in the Archived Notes section 
        and restore it anytime.
      </AlertDialogDescription>
      
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className='bg-[#F3F5F8]'>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-[#335CFF]" onClick={archOrRestNote}>{showArchivedNote?'Restore Note': 'Archive Note'}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
    )
  }