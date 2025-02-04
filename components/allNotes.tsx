"use client"
import { useState } from "react";
import ArcAndDel from "./arcAndDel";
import NoteContent from "./notecontent";
import NoteList from "./notelist";
import Topnav from "./topnav";
import { useNoteContext } from "@/context/noteContext";


export default function AllNotes(){ 
    const {archivedNotes, showArchivedNote, showAllNote } = useNoteContext()
    return(
            <div className="w-[100%]">
                <Topnav/>
                <hr />
                <div className="ml-8 flex justify-between ">
                    <NoteList />
                    <hr />
        
                    
                    <NoteContent />
                    <hr />
                    <ArcAndDel />
                    

                </div>
            </div>
    )
}