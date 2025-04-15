'use client'
import { createContext, useContext } from "react"


export interface Note{
  id?: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;

}
 export type notestype = {
    notes: Note[],
    selectedNotes: Note | null ,
    formatDate: (isoDateString: string) => string
    handleNoteClick: (id:number) => void;
    showAllNote: boolean,
    setShowAllNote:React.Dispatch<React.SetStateAction<boolean>>,
    showArchivedNote: boolean, 
     showAllNoteBtn: ()=>void, 
     showArchivedNoteBtn: ()=>void,
     setShowArchivedNote: React.Dispatch<React.SetStateAction<boolean>>,
     archivedNotes: Note[],
     showSelectedTagBtn: (tag:string)=>void,
     selectedTag: string,
     showTags: Note[],
     createNewNote: ()=>void,
     isNewNote: boolean,
     textInput: {
      title: string;
      tags: string[];
      content: string;
      lastEdited: string;
      isArchived: boolean;
     },
     searchValue: string,
      handleSearchValue: (e: React.ChangeEvent<HTMLInputElement>)=> void,
      showSearchResult: boolean,
      showSettings: boolean,
      showSettingsBtn:()=>void,
      setShowSettings: React.Dispatch<React.SetStateAction<boolean>>,
    setTextInput: React.Dispatch<React.SetStateAction<Note>>,
    selectedSetting: number,
    colorTheme: string,
    setColorTheme: React.Dispatch<React.SetStateAction<string>>,
    fontTheme:string,
    setFontTheme: React.Dispatch<React.SetStateAction<string>>,
    setSelectedSetting:React.Dispatch<React.SetStateAction<number>>,
    
  };

export const NoteContext = createContext<notestype | undefined>(undefined);

export const useNoteContext = () => {
    const context = useContext(NoteContext);
    if (!context) {
      throw new Error('useNoteContext must be used within a NoteProvider');
    }
    return context;
  };