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
import Image from "next/image"

  type ArchiveModalProps = {
    deleteNote: ()=>void,
   
}

  export default function DeleteModal({deleteNote}: ArchiveModalProps){
    return(
  <AlertDialogContent>
    <AlertDialogHeader>
    
      <AlertDialogTitle className="flex items-center gap-6">
        <Image src="/delete.png" alt="archive" width={20} height={20}></Image>  
      Archive Notes
      </AlertDialogTitle>
      <AlertDialogDescription className="pl-10">
      Are you sure you want to permanently delete this note? This action cannot be undone.
      </AlertDialogDescription>
      
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className='bg-[#F3F5F8]'>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-[#FB3748]" onClick={deleteNote}>Delete Note</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
    )
  }