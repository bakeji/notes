"use client"
import { useNoteContext } from "@/context/noteContext"
import Image from "next/image"
export default function NoteContent(){

    const {selectedNotes, formatDate, archivedNotes, showArchivedNote} = useNoteContext()
    const noteDate= selectedNotes? selectedNotes.lastEdited : ""
    return(
        <div className={`w-[60%] mt-[20px] ml-[20px]`}>
            <h1 className="font-inter font-[500] text-[24px] text-[#0E121B] mb-3">{selectedNotes?.title}</h1>
            <div className="flex items-start flex-col gap-3 border-b-[1px] border-solid w-[95%]">
                <div className="flex items-center justify-center gap-3">
                   <p className="flex items-center justify-center gap-1 font-inter text-[14px] font-[400] text-[#2B303B]"><span> <Image width={16} height={16} src="/Tag.png" alt="tag" /></span>Tags</p>
                   <p className="font-inter text-[14px] font-[400] text-[#2B303B]">{selectedNotes?.tags.join(", ")}</p> 
                </div>

                <div className="flex items-center justify-center gap-3 mb-[10px]">
                   <p className="flex items-center justify-center gap-1 font-inter text-[14px] font-[400] text-[#2B303B]"><span> <Image width={16} height={16} src="/clock.png" alt="clock" /></span>Date</p>
                   <p className=" font-inter text-[14px] font-[400] text-[#2B303B]">{formatDate(noteDate)}</p> 
                </div>
            </div>

            <div className="w-[95%]  border-b-[1px] border-solid whitespace-pre-wrap">
                <p className="font-inter text-[14px] font-[400] text-[#232530]">{selectedNotes?.content}</p>
            </div>
        

            <div className="flex items-start mt-[20px] gap-4 ">
                <button className="w-[107px] h-[37px] px-[12px] text-center rounded-[8px] font-inter font-[500] text-[14px] bg-[#335CFF] text-[#FFFFFF]">Save Note</button>
                <button className="w-[87px] h-[37px] px-[12px] text-center rounded-[8px] font-inter font-[500] text-[14px] bg-[#F3F5F8] text-[#525866]">Cancel</button>
            </div>
        </div>
    )
}