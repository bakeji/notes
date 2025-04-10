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
    showArchivedNote: boolean, 
     showAllNoteBtn: ()=>void, 
     showArchivedNoteBtn: ()=>void,
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
      setShowSettings: React.Dispatch<React.SetStateAction<boolean>>,
    setTextInput: React.Dispatch<React.SetStateAction<Note>>,
    
  };

export const NoteContext = createContext<notestype | undefined>(undefined);

export const useNoteContext = () => {
    const context = useContext(NoteContext);
    if (!context) {
      throw new Error('useNoteContext must be used within a NoteProvider');
    }
    return context;
  };