'use client'
import AllNotes from "@/components/allNotes";
import SideBar from "@/components/sidenav";
import data from "@/data.json";
import { Note, NoteContext } from "@/context/noteContext";
import { useEffect, useState } from "react";


export default function Page(){
  const notes = data.notes;
  const archivedNotes = notes.filter(note=>note.isArchived)
  const [selectedTag, setSelectedTag] = useState('')
  const showTags = notes.filter(note => note.tags.includes(selectedTag))
  const [selectedNotes, setSelectedNote] = useState<Note | null>(notes[0]);
  const [showAllNote, setShowAllNote] = useState(true)
  const [showArchivedNote, setShowArchivedNote] = useState(false)
  const [isNewNote, setIsNewNote] = useState(false) 
  

  
function handleNoteClick(note: Note){
    setSelectedNote(note) 
    setIsNewNote(false)
}

// show all note button
function showAllNoteBtn(){
  setIsNewNote(false)
  setShowAllNote(true)
  setShowArchivedNote(false)
  setSelectedNote(notes[0])
  setSelectedTag('')
}

//  show Archived Notes button
function showArchivedNoteBtn(){
  setShowAllNote(false)
  setShowArchivedNote(true)
  setSelectedNote(archivedNotes[0])
  setIsNewNote(false)
  setSelectedTag('')
}
// show selected tags
function showSelectedTagBtn(tag:string){
  setShowAllNote(false)
  setShowArchivedNote(false)
  setIsNewNote(false)
  setSelectedTag(tag)
}

useEffect(()=>{
  if(selectedTag !== ''){
  setSelectedNote(showTags[0])
  }
},[selectedTag, showSelectedTagBtn])
console.log(selectedNotes)

function createNewNote(){
  setIsNewNote(true)
  console.log('new')
  setSelectedNote(null)
}


function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const monthNames = [ 
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const monthName = monthNames[month];

  return `${day} ${monthName} ${year}`;
}
  return(
    <NoteContext.Provider value={{notes,archivedNotes,selectedTag, showTags, showSelectedTagBtn, handleNoteClick, selectedNotes, formatDate, showAllNote, showArchivedNote, showAllNoteBtn, showArchivedNoteBtn, createNewNote, isNewNote}}>
    <div className="flex w-[100%] px-[20px] h-screen box-border " >
      <SideBar/>
      <hr className="h-[100%] border-[1px] border-[#E0E4EA]"/>
      <AllNotes />
    </div>
    </NoteContext.Provider>
  
  )
}