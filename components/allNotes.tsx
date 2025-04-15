"use client"
import { useState } from "react";
import ArcAndDel from "./arcAndDel";
import NoteContent from "./notecontent";
import NoteList from "./notelist";
import { app } from "@/firebase";
import { getAuth } from "firebase/auth";
import { getDatabase, push, ref, set, get, update, remove } from "firebase/database";
import Topnav from "./topnav";
import { useNoteContext } from "@/context/noteContext";
export default function AllNotes(){ 
    const userId = "YbzpPIhpIWfW7VNLE5FnJTCiU602" //getAuth(app).currentUser?.uid
    const { selectedNotes, showSettings,notes, archivedNotes, textInput } = useNoteContext()

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
          console.error("Error saving note:", error);
        }
        finally{
          alert("archived")
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
         console.error("Error saving note:", error);
       }
       finally{
         alert("restored")
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
         console.error("Error deleting note:", error);
       }
       finally{
         alert("deleted")
       }

    }

    
    return(
            <div className="w-[100%]">
                <Topnav/>
                <hr />
                <div className="ml-8 flex justify-between ">
                    <NoteList />
                    <hr />
        
                    
                    <NoteContent />
                    <hr />
                 {(selectedNotes && !showSettings) && (<ArcAndDel archiveNotes={archiveNotes} deleteNote={deleteNote} restoreNotes={restoreNotes} />)}
                    

                </div>
            </div>
    )
}