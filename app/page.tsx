'use client'
import AllNotes from "@/components/allNotes";
import SideBar from "@/components/sidenav";
import { Note, NoteContext } from "@/context/noteContext";
import { useEffect, useState } from "react";
import { getDatabase, push, ref, set, get, onValue } from "firebase/database";
import { database } from "@/firebase";
import { app } from "@/firebase";
import { getAuth } from "firebase/auth";


export default function Page(){
  // const notes = data.notes;
  
  const userId = "YbzpPIhpIWfW7VNLE5FnJTCiU602" //getAuth(app).currentUser?.uid
  const [notes, setNotes] = useState<Note[]>([])
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([])
  const [selectedTag, setSelectedTag] = useState('')
  const showTags = notes?.filter(note => note?.tags?.includes(selectedTag))
  const [selectedNotes, setSelectedNote] = useState<Note | null>(null);
  const [showAllNote, setShowAllNote] = useState(true)
  const [showArchivedNote, setShowArchivedNote] = useState(false)
  const [isNewNote, setIsNewNote] = useState(true)

  console.log(archivedNotes)
  console.log(notes)
  console.log(showArchivedNote)
   const [textInput, setTextInput] = useState<Note>({
      title: ""  ,
      tags:[],
      content: "",
      lastEdited: '', 
      isArchived: false
    });


  function GetNotes(){
  const db = getDatabase(app);
  const noteRef = ref(db,'users/notes/'+ userId)
  onValue(noteRef, (snapshot) => {
    if (snapshot.exists()) {
      const notesData = snapshot.val();
     const allNotes= Object.values(notesData) as Note[];
     const sortedArray = allNotes.sort((a, b) =>b.lastEdited.localeCompare(a.lastEdited) )
     const notesArray = sortedArray.filter((note) => note.isArchived === false);
     const archivedNotesArray = sortedArray.filter((note) => note.isArchived === true);
      setNotes(notesArray)
      setArchivedNotes(archivedNotesArray)

}else{
  setNotes([])
}
  })
  }

  
 useEffect(()=>{
  GetNotes()
 },[])

 useEffect(() => {
  if (notes.length > 0 && !selectedNotes) {
    setSelectedNote(notes[0]);
    setIsNewNote(false)
  }
}, [notes]);
  
function handleNoteClick(id:number){
  if (showArchivedNote){
    setSelectedNote(archivedNotes[id])
  }
  
  else{
    setSelectedNote(notes[id]) 
    }
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

// create new note
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
    <NoteContext.Provider value={{notes, archivedNotes, selectedTag, textInput, setTextInput, showTags, showSelectedTagBtn, handleNoteClick, selectedNotes, formatDate, showAllNote, showArchivedNote, showAllNoteBtn, showArchivedNoteBtn, createNewNote, isNewNote}}>
    <div className="flex w-[100%] px-[20px] h-screen box-border " >
      <SideBar/>
      <hr className="h-[100%] border-[1px] border-[#E0E4EA]"/>
      <AllNotes />
    </div>
    </NoteContext.Provider>
  
  )
}