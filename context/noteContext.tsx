'use client'
import { createContext, useContext } from "react"


export type Note={
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;

}
 export type notestype = {
    notes: Note[],
    selectedNotes: Note ,
    formatDate: (isoDateString: string) => string
    handleNoteClick: (note: Note) => void;
    showAllNote: boolean,
    showArchivedNote: boolean, 
     showAllNoteBtn: ()=>void, 
     showArchivedNoteBtn: ()=>void,
     archivedNotes: Note[],
     showSelectedTagBtn: (tag:string)=>void,
     selectedTag: string,
     showTags: Note[]
    
  };

export const NoteContext = createContext<notestype | undefined>(undefined);

export const useNoteContext = () => {
    const context = useContext(NoteContext);
    if (!context) {
      throw new Error('useNoteContext must be used within a NoteProvider');
    }
    return context;
  };