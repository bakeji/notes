'use client'
import AllNotes from "@/components/allNotes";
import SideBar from "@/components/sidenav";
import { Note, NoteContext } from "@/context/noteContext";
import { useCallback, useEffect, useState } from "react";
import { getDatabase, ref,  onValue } from "firebase/database";
import { app } from "@/firebase";
import { getAuth } from "firebase/auth";
import BottomNav from "@/components/bottom-nav";
import Image from "next/image";
import { useAppPersistence } from "@/hooks/appDb";


export default function Page(){
  
  const userId = getAuth(app).currentUser?.uid
  const [notes, setNotes] = useState<Note[]>([])
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([])
  const [selectedTag, setSelectedTag] = useState('')
  const showTags = notes?.filter(note => note?.tags?.includes(selectedTag))
  const [selectedNotes, setSelectedNote] = useState<Note | null>(null);
  const [showAllNote, setShowAllNote] = useState(true)
  const [showArchivedNote, setShowArchivedNote] = useState(false)
  const [isNewNote, setIsNewNote] = useState(false)
  const [searchValue, setSearchValue]= useState('')
  const [showSearchResult, setShowSearchResult] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedSetting, setSelectedSetting] = useState(1)
  const [showSelectedSetting, setShowSelectedSetting] = useState(false)
  const [colorTheme, setColorTheme] = useState('Light Mode')
  const [theme, setTheme] = useState(colorTheme)
  const [fontTheme, setFontTheme] = useState('Sans-serif')
  const [fontType, setFontType] = useState(fontTheme)
  const [navId, setNavId]= useState(1)
  const [showAllTags, setShowAllTags] = useState(false)
  const [showClickedNote, setShowClickedNote] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
   const [textInput, setTextInput] = useState<Note>({
      title: ""  ,
      tags:[],
      content: "",
      lastEdited: '', 
      isArchived: false
    });


  
  const setters = {
   userId: (_val:string) => {}, 
   textInput: setTextInput,
    colorTheme: setColorTheme,
    theme: setTheme,
    fontTheme: setFontTheme,
    fontType: setFontType,
    selectedTag: setSelectedTag,
    navId: setNavId,
    selectedSetting: setSelectedSetting,
    isNewNote: setIsNewNote,
  };

  // Initialize persistence
  const { saveState } = useAppPersistence({
      userId,
      textInput,
      colorTheme,
      theme,
      fontTheme,
      fontType,
      selectedTag,
      navId,
      selectedSetting,
      isNewNote,
    }, setters);

  // Save state when important values change
  useEffect(() => {
      if (userId) { 
        saveState({
          userId,
          textInput,
          colorTheme,
          theme,
          fontTheme,
          fontType,
          selectedTag,
          navId,
          selectedSetting,
          isNewNote,
        });
      }
    }, [userId, textInput, colorTheme, theme, fontTheme, fontType, selectedTag, navId, selectedSetting]);
  

  
 useEffect(()=>{
  const GetNotes = ()=>{
    if(!userId) return;
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
  }})
    }
  GetNotes()
}, [userId])

 useEffect(() => {
  if (notes.length > 0 && !selectedNotes) {
    setSelectedNote(notes[0]);
    setIsNewNote(false)
  }
}, [notes, selectedNotes]);
  
function handleNoteClick(id:number){
  if (showArchivedNote){
    setSelectedNote(archivedNotes[id])
  }
  
  else{
    setSelectedNote(notes[id]) 
    }
    setIsNewNote(false)
    setShowClickedNote(true)  //for mobile and tab screen
}
console.log(userId)


// show all note button
function showAllNoteBtn(){
  setIsNewNote(false)
  setShowAllNote(true)
  setShowArchivedNote(false)
  setSelectedNote(notes[0])
  setSelectedTag('')
  setShowSearchBar(false)
  setShowSearchResult(false)
  setShowSettings(false)
  setShowAllTags(false)
  setShowSelectedSetting(false)
}

//  show Archived Notes button
function showArchivedNoteBtn(){
  setShowAllNote(false)
  setShowArchivedNote(true)
  setSelectedNote(archivedNotes[0])
  setIsNewNote(false)
  setSelectedTag('')
  setShowSearchResult(false)
  setShowSearchBar(false)
  setShowSettings(false)
  setShowAllTags(false)
}
// show all tags for mobile and tab screens
function showAllTagsBtn(){
  setShowAllTags(true)
  setShowSearchBar(false)
  setIsNewNote(false)
  setShowSettings(false)
}

// show selected tags
const showSelectedTagBtn= useCallback((tag:string)=>{
  setShowAllNote(false)
  setShowArchivedNote(false)
  setIsNewNote(false)
  setSelectedTag(tag)
  setShowSearchResult(false)
  // setShowClickedNote(true)   // mobile and tab screen
  setShowSettings(false)
  setShowAllTags(false) // mobile and tab screen
}, [])
function showSettingsBtn(){
  setShowSettings(true)
  setIsNewNote(false)
  setShowAllNote(false)
  setShowAllNote(false)
  setShowSearchBar(false)
  setShowAllTags(false)
}
useEffect(()=>{
  if(selectedTag !== ''){
  setSelectedNote(showTags[0])
  }
},[selectedTag, showTags])

// create new note
function createNewNote(){
  setIsNewNote(true)
  setSelectedNote(null)
  setShowSearchResult(false)
  setShowSettings(false)
  setShowAllTags(false)
  setShowSearchBar(false)
  setNavId(0)
}
function handleSearchValue(e:React.ChangeEvent<HTMLInputElement>){
  setSearchValue(e.target.value)

}

useEffect(()=>{
  if(searchValue !== ''){
  setShowSearchResult(true)
  if(showSettings){
    setShowSettings(false)
    setShowAllNote(true)
  }
}else{
  setShowSearchResult(false)
}
}, [searchValue, showSettings])

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
    <NoteContext.Provider value={{notes, setIsNewNote, fontType, setFontType, theme,showSelectedSetting, setShowSelectedSetting, setShowClickedNote, showAllTags,showAllTagsBtn, setShowAllTags, showClickedNote , setTheme,navId, setNavId, setShowArchivedNote, setShowAllNote ,colorTheme,fontTheme, setFontTheme, setColorTheme, showSettings, showSettingsBtn, selectedSetting, setSelectedSetting, setShowSettings, showSearchResult, archivedNotes, selectedTag, searchValue, handleSearchValue, textInput, setTextInput, showTags, showSelectedTagBtn, handleNoteClick, selectedNotes, formatDate, showAllNote, showArchivedNote, showAllNoteBtn, showArchivedNoteBtn, createNewNote, isNewNote, showSearchBar, setShowSearchBar}}>
    <div className={`flex  w-[100%] px-[20px] h-screen box-border ${theme==='Dark Mode'? 'dark bg-background text-white  ': ''}  max-lg:flex-col max-lg:px-0 ${fontType ==='Sans-serif'? 'font-sans' : fontType==='Serif'? 'font-serif' : 'font-mono'}`}   >
        <div className={`hidden max-lg:block ${theme==='Dark Mode'? 'bg-transparent':  'bg-[#F3F5F8]' }h-[74px] p-3`}>
          <Image width={95} height={28} src={theme==='Dark Mode'? "/logo-drk.png":"/logo.png"} alt="logo" />
        </div>
        <SideBar/>
        <AllNotes />
        <BottomNav />
    </div>
    </NoteContext.Provider>
  
  )
}