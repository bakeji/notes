'use client'
import { useNoteContext } from "@/context/noteContext"
import Settings from "./settings";
import Image from "next/image";
import Search from "./search";


export default function NoteList(){
    const {handleNoteClick, showClickedNote, showSearchBar, formatDate, showAllTags, theme, isNewNote, selectedNotes, createNewNote, showSettings, archivedNotes, notes, showAllNote,  showTags, selectedTag, showArchivedNote, searchValue, showSearchResult, setShowAllTags, showSelectedSetting} =useNoteContext();
    const notesArrays = showAllNote? notes :archivedNotes
    const searchResults = notesArrays?.filter((note) => note.title.toLowerCase().includes(searchValue.toLowerCase()) || note.content.toLowerCase().includes(searchValue.toLowerCase()) ||note.tags.some((tag) => tag.toLowerCase().includes(searchValue.toLowerCase())))
    const notesArray = showSearchResult? searchResults: notesArrays
    const allNotesArray = selectedTag!==''? showTags: notesArray
    

    return(
        <div className={`w-[25%] border-r  border-solid ${showSelectedSetting ||isNewNote?'max-lg:hidden' : 'max-lg:block'}  max-lg:flex max-lg:flex-col max-lg:justify-between max-lg:w-[90%]   max-lg:border-none ${showClickedNote||showAllTags? 'max-lg:hidden': ''}`}>
           {showSettings?
           <Settings /> :
           (<>
                   
            <button onClick={createNewNote} className="max-lg:hidden mt-[10px] w-[95%]  text-[#ffffff] font-[500] text-[14px] bg-[#335CFF] rounded-[8px] p-[10px]"> + Create New Note</button>
            <div className="w-[95%] flex justify-center gap-2 flex-col mt-[20px]">
           {showSearchBar && <div className="flex flex-col gap-2">
                <p className={`text-[24px] text-[#0E121B] ${theme==='Dark Mode'? 'text-white': ''}  font-[700]`}>Search</p>
                <Search />
            </div>}
           {selectedTag && <button onClick={()=>setShowAllTags(true)} className={`items-center  mb-3 text-[14px] font-[400] hidden max-lg:flex`}> <Image width={18} height={18} src='/left.png' alt="go back"/>  Go back</button>}
            {!showSearchResult && <h1 className={`hidden max-lg:flex  font-[700] text-[24px] ${selectedTag?  'text-[#525866]' :theme==='Dark Mode'? 'text-white max-lg:text-white': 'text-[#0E121B]'} `}>{showAllNote? 'All Notes': showArchivedNote? "Archived Notes": `Notes Tagged:`} <span className="text-[#0E121B]">{selectedTag}</span></h1>}
               {selectedTag!=="" && <p className={` text-[14px] font-[400] text-[#2B303B] ${theme==='Dark Mode'? 'text-white max-lg:text-white': ''}`}>{`All notes with the ”${selectedTag}” tag are shown here.`}</p> }
               {showArchivedNote && <p className={` text-[14px] font-[400] text-[#2B303B] ${theme==='Dark Mode'? 'text-white max-lg:text-whi  ': ''}`}>All your archived notes are stored here. You can restore or delete them anytime.</p>}
               {showArchivedNote && notesArray.length < 1  && <div className={` rounded-[6px] w-[100%] border-[1px] border-solid border-[#E0E4EA] p-[2px] ${theme==='Dark Mode'? ' bg-[#232530] text-white max-lg:bg-[#232530]':'bg-[#F3F5F8]' }`}>
                    <p>No notes have been archived yet. Move notes here for safekeeping, or create a new note.</p>
                </div>}
              {showSearchResult && searchResults.length <1 &&  <div className={` ${theme==='Dark Mode'? 'bg-[#232530] text-white max-lg:text-whi ':'' }bg-[#F3F5F8] rounded-[6px] w-[100%] border-[1px] border-solid border-[#E0E4EA] p-[1px] `}>
                    <p>No notes match your search. Try a different keyword or <span className="text-[#0E121B]"><button onClick={createNewNote} className="underline  outline-none">create a new note.</button></span></p>
                </div>}

                { showAllNote && notes.length < 1 && <div className={` ${theme==='Dark Mode'? 'bg-[#232530]':'' }bg-[#F3F5F8] rounded-[6px] w-[100%] border-[1px] border-solid border-[#E0E4EA] p-[1px] `}>
                    <p>You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</p>
                </div>}
                

                {allNotesArray?.map((note, index)=>(
                <div key={index} className={`w-[100%] border-t-[1px] ${theme==='Dark Mode'? 'text-white':'' } border-solid p-[2px] ${selectedNotes && selectedNotes === note? "bg-[#F3F5F8] rounded-[6px] border-none max-lg:bg-transparent": ''}`} >
                    <p onClick={()=>{handleNoteClick(index)}} className=" cursor-pointer text-[16px] font-[600]  lin">{note?.title}</p>
                    <div className="flex gap-2">
                        {note?.tags?.map((tag, index)=>(
                         <p className={` ${theme==='Dark Mode'? 'bg-[#232530] text-white':'' } p-[4px] bg-[#E0E4EA] text-[#0E121B] text-[12px] font-[400] mt-2`} key={index}>{tag}</p>
                        ))}
                    </div>
                    <p className="text-[12px] font-[400] text-[#2B303B] mt-2 ">{formatDate(note?.lastEdited)}</p>
                </div>
                ))}
            </div>
            </>
        )}
        <div className="hidden max-lg:flex items-end justify-end mb-40 max-md:mb-28 ">
            <button onClick={createNewNote} className=" w-[64px] h-[64px] max-sm:w-[42px] max-sm:h-[42px] max-sm:text-[21px] fixed bg-[#335CFF] font-[400] text-[32px] text-center text-white outline-none rounded-[50%]">+</button>
        </div>

        </div>
    )
}