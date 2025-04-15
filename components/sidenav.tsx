'use client'
import { useNoteContext } from "@/context/noteContext";
import Image from "next/image"

export default function SideBar(){
    const {notes, showAllNote, showAllNoteBtn, showArchivedNote, showArchivedNoteBtn, showSelectedTagBtn, selectedTag} = useNoteContext()
    const allTags = notes.flatMap((note) => note.tags);
    const uniqueTags = [...new Set(allTags)].sort();
    return(
        <div className="w-[18%] pt-[20px] box-border border-r h-[100vh]  ">
            <div>
                <Image width={95} height={28} src="/logo.png" alt="logo" />
            </div>

            <div className="mt-[25px] w-[95%] flex flex-col gap-5">
               <div className={`flex items-center p-2 justify-between ${showAllNote? 'bg-[#F3F5F8]': ""}`}>
                    <button onClick={showAllNoteBtn} className="flex items-center gap-2 font-inter text-[14px] font-[500] text-[#0E121B]">
                        <Image width={20} height={20} src={showAllNote? '/home.png' : "/home2.png"} alt="home" />
                        All Notes
                    </button>
                    {showAllNote && <Image width={6} height={10} src="/right.png" alt="right" />}
                   
               </div>

               <div className={`flex items-center  p-2 justify-between ${showArchivedNote? 'bg-[#F3F5F8]': ""}`}>
                    <button onClick={showArchivedNoteBtn} className="flex items-center gap-2 font-inter text-[14px] font-[500] text-[#0E121B]">
                    <Image width={20} height={20} src={showArchivedNote? "/arch2.png":"/Archive.png"} alt="Archive" />
                    Archived Notes
                    </button>
                    {showArchivedNote && <Image width={6} height={10} src="/right.png" alt="right" />}
               </div>

                <hr />
            </div>


            <div className="mt-[5px] w-[90%] flex flex-col gap-5">
                <p className="text-[#717784] font-inter font-[500] text-[14px]">Tags</p>

                <div className="flex flex-col ml-3 gap-5 justify-center " >
                    {uniqueTags?.map((tag, index) => (
                        <div key={index} className={`flex items-center justify-between p-2 ${selectedTag && selectedTag==tag? 'bg-[#F3F5F8]': ""}`}>
                    <button onClick={()=>showSelectedTagBtn(tag)} key={index} className="flex items-center gap-3" > 
                        <Image width={20} height={20} src={selectedTag && selectedTag===tag? "/Tag2.png": "/Tag.png"} alt="tag" />
                        <p className="font-inter font-[500] text-[14px]">{tag}</p>
                    </button>
                    {selectedTag && selectedTag===tag && <Image width={6} height={10} src="/right.png" alt="right" />}
                    </div>
                    ))}
                     
                </div>
            </div>
        </div>
    )
}