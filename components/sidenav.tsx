'use client'
import { useNoteContext } from "@/context/noteContext";
import Image from "next/image"

export default function SideBar(){
    const {notes, showAllNote, showAllNoteBtn, showAllTags,  theme, showArchivedNote, showArchivedNoteBtn, showSelectedTagBtn, selectedTag} = useNoteContext()
    const allTags = notes.flatMap((note) => note.tags);
    const uniqueTags = [...new Set(allTags)].sort();
    return(
        <div className={` w-[20%] pt-[20px] box-border max-lg:border-none border-r h-[100vh]  max-lg:w-[90%] max-lg:mx-auto ${showAllTags? '': 'max-lg:hidden'}  `}>
            <div className="max-lg:hidden ">
                <Image width={95} height={28} src={theme==='Dark Mode'? "/logo-drk.png":"/logo.png"} alt="logo" />
            </div>

            <div className="mt-[25px] w-[95%] flex flex-col gap-5 max-lg:hidden ">
               <div className={`flex items-center p-2 justify-between ${showAllNote? theme==='Dark Mode'? 'bg-[#232530]': 'bg-[#F3F5F8]': ""}`}>
                    <button onClick={showAllNoteBtn} className={`flex items-center gap-2  text-[14px] ${theme==='Dark Mode'? ' text-white  ': ''}  font-[500] text-[#0E121B]`}>
                        <Image width={20} height={20} src={showAllNote? '/home.png' : theme==='Dark Mode'? '/home-drk.png': "/home2.png"} alt="home" />
                        All Notes
                    </button>
                    {showAllNote && <Image width={6} height={10} src={ theme==='Dark Mode'? "/right-drk.png":"/right.png"} alt="right" />}
                   
               </div>

               <div className={`flex items-center  p-2 justify-between ${showArchivedNote? theme==='Dark Mode'? 'bg-[#232530]': 'bg-[#F3F5F8]': ""}`}>
                    <button onClick={showArchivedNoteBtn} className={`flex items-center gap-2 text-[14px] font-[500] text-[#0E121B] ${theme==='Dark Mode'? ' text-white  ': ''} `}>
                    <Image width={20} height={20} src={showArchivedNote? "/arch2.png": theme==='Dark Mode'? '/arch-drk.png':  "/Archive.png"} alt="Archive" />
                    Archived Notes
                    </button>
                    {showArchivedNote && <Image width={6} height={10} src={ theme==='Dark Mode'? "/right-drk.png":"/right.png"} alt="right" />}
               </div>

                <hr/>
            </div>


            <div className={`mt-[5px] w-[90%] flex flex-col gap-5 ${showAllTags? 'max-lg:flex max-lg:w-full' : 'max-lg:hidden'} `}>
                <p className={`text-[#717784]  font-[500] ${theme==='Dark Mode'? ' text-white max-lg:text-white  ': ''}  text-[14px] max-lg:text-[#0E121B] max-lg:text-[24px] max-lg:font-[700] `}>Tags</p>

                <div className={`flex flex-col ml-3 gap-5 justify-center max-lg:ml-0 max-lg:gap-3 `} >
                    {uniqueTags?.map((tag, index) => (
                        <div key={index} className={`flex items-center max-lg:border-b justify-between  p-2 ${selectedTag && selectedTag==tag ? (theme==='Dark Mode'? 'bg-[#232530]': 'bg-[#F3F5F8] max-lg:bg-transparent'): '' }`}>
                    <button onClick={()=>showSelectedTagBtn(tag)} key={index} className="flex items-center max-lg:pb-2 gap-3" > 
                        <Image  width={20} height={20} src={!showAllTags && selectedTag===tag? "/Tag2.png": theme==='Dark Mode'?'/tag-drk.png':  "/Tag.png"} alt="tag" />
                        <p className=" font-[500] text-[14px]">{tag}</p>
                    </button>
                    {selectedTag && selectedTag===tag && <Image width={6} alt="arrow" height={10} src={ theme==='Dark Mode'? "/right-drk.png":"/right.png"} />}
                    </div>
                    ))}
                     
                </div>
            </div>
        </div>
    )
}