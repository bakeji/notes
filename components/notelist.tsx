'use client'
import { useNoteContext } from "@/context/noteContext"


export default function NoteList(){
    const {handleNoteClick, formatDate, selectedNotes, createNewNote, archivedNotes, notes, showAllNote, showTags, selectedTag, showArchivedNote} =useNoteContext();
    const notesArray = showAllNote? notes :archivedNotes
    const allNotesArray = selectedTag!==''? showTags: notesArray
    
    

    return(
        <div className="w-[25%] border-r-[1px] border-solid border-[#E0E4EA]">
            <button onClick={createNewNote} className="mt-[10px] w-[95%] font-inter text-[#ffffff] font-[500] text-[14px] bg-[#335CFF] rounded-[8px] p-[10px]"> + Create New Note</button>

            <div className="w-[95%] flex justify-center gap-2 flex-col mt-[20px]">
               {selectedTag!=="" && <p className="font-inter text-[14px] font-[400] text-[#2B303B] ">{`All notes with the ”${selectedTag}” tag are shown here.`}</p> }
               {showArchivedNote && <p className="font-inter text-[14px] font-[400] text-[#2B303B] ">All your archived notes are stored here. You can restore or delete them anytime.</p>}
               {!archivedNotes && showArchivedNote  && <div className="bg-[#F3F5F8] rounded-[6px] w-[100%] border-[1px] border-solid border-[#E0E4EA] p-[2px]">
                    <p>No notes have been archived yet. Move notes here for safekeeping, or create a new note.</p>
                </div>}
                {allNotesArray?.map((note, index)=>(
                <div key={index} className={`w-[100%] border-t-[1px] border-solid border-[#E0E4EA] p-[2px] ${selectedNotes && selectedNotes === note? "bg-[#F3F5F8] rounded-[6px] border-none": ''}`} >
                    <p onClick={()=>{handleNoteClick(index)}} className=" cursor-pointer font-inter text-[16px] font-[600] text-[#0E121B] lin">{note?.title}</p>
                    <div className="flex gap-2">
                        {note?.tags?.map((tag, index)=>(
                         <p className="p-[4px] bg-[#E0E4EA] text-[#0E121B] text-[12px] font-[400] mt-2" key={index}>{tag}</p>
                        ))}
                    </div>
                    <p className="font-inter text-[12px] font-[400] text-[#2B303B] mt-2 ">{formatDate(note?.lastEdited)}</p>
                </div>
                ))}
            </div>
        </div>
    )
}