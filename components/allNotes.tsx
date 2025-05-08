"use client"
import { useState } from "react";
import ArcAndDel from "./arcAndDel";
import NoteContent from "./notecontent";
import NoteList from "./notelist";
import  Image from "next/image";
import { app } from "@/firebase";
import { getDatabase, ref,  update, remove } from "firebase/database";
import Topnav from "./topnav";
import { getAuth } from "firebase/auth";
import { useNoteContext } from "@/context/noteContext";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"


export default function AllNotes(){ 
    const userId = getAuth(app).currentUser?.uid
    const { selectedNotes, setShowAllNote,showSettings,setShowArchivedNote, showSelectedSetting, isNewNote, textInput } = useNoteContext()
    const { toast } = useToast()
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
     async function archiveNotes(){
       const db = getDatabase(app);
       try{
        if(userId){
            const specificNoteRef = ref(db, `users/notes/${userId}/${selectedNotes?.id}`);
            console.log("specificNoteRef", specificNoteRef)
            await update(specificNoteRef, {
              ...textInput,
              isArchived: true
            });
         }
       } catch (error) {
          const errorMessage =(error as Error).message;
          setShowError(true)
          setErrorMessage(errorMessage)

        }
        finally{
          toast({
            description: <p className="flex items-center justify-center gap-2"> <Image src="/check.png" width={10} height={6} alt="check" /> Note archived </p>,
            action: <ToastAction onClick={()=>{setShowArchivedNote(true); setShowAllNote(false)}} altText="achived note">Archived Notes</ToastAction>,
          })

          
        }
     }

     async function restoreNotes(){
      const db = getDatabase(app);
    
      try{
       if(userId ){
           const specificNoteRef = ref(db, `users/notes/${userId}/${selectedNotes?.id}`);
           
           await update(specificNoteRef, {
             ...textInput,
             isArchived: false
           });
        }
      } catch (error) {
        const errorMessage =(error as Error).message;
        setShowError(true)
        setErrorMessage(errorMessage)

      }
       finally{
        toast({
          description: <p className="flex items-center justify-center gap-2"> <Image src="/check.png" width={10} height={6} alt="check" /> Note Restored </p>,
          action: <ToastAction onClick={()=>{setShowAllNote(true); setShowArchivedNote(false)}} altText="achived note">All Notes</ToastAction>,
        })
       }
    }
    async function deleteNote(){
      const db = getDatabase(app);
    
      try{
       if(userId ){
           const specificNoteRef = ref(db, `users/notes/${userId}/${selectedNotes?.id}`);
           await remove(specificNoteRef);
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        toast({
          description: errorMessage
        })
      }
       finally{
        toast({
          description: 'note deleted'
        })
       }

    }

    
    return(
            <div className="w-[100%] h-full min-h-screen flex flex-col">
                <Topnav/>
                <hr  className=" max-lg:hidden" />
                {showError && 
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {errorMessage}
                    </AlertDescription>
                  </Alert>}
                <div className="ml-8  max-lg:ml-4 flex flex-1 justify-between overflow-hidden">
                   <div className={`overflow-y-auto max-h-[calc(100vh-80px)] w-[25%] max-lg:w-[90%] ${showSelectedSetting ||isNewNote?'max-lg:hidden' : 'max-lg:block'}`}>
                   <NoteList />
                   </div>
                    <hr />
        
                    
                    <NoteContent archiveNotes={archiveNotes} deleteNote={deleteNote} restoreNotes={restoreNotes}  />
                    <hr  />
                 {(selectedNotes && !showSettings) && (<ArcAndDel archiveNotes={archiveNotes} deleteNote={deleteNote} restoreNotes={restoreNotes} />)}
                    

                </div>
            </div>
    )
}