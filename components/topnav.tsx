import { useNoteContext } from "@/context/noteContext"
import Image from "next/image"
import Search from "./search"
export default function Topnav(){
    const{searchValue, theme, showSearchResult,showSettingsBtn, selectedTag, showArchivedNote, showAllNote} = useNoteContext()
    
    return(
        <div className="w-[90%] flex items-center justify-between ml-8 py-4 max-lg:hidden">
            {!showSearchResult && <h1 className={`font-inter font-[700] text-[24px] text-[#0E121B] ${selectedTag? 'text-[#525866]' : ''} ${theme==='Dark Mode'? ' text-white  ': ''}${theme==='Dark Mode'? 'dark bg-background text-white  ': ''} `}>{showAllNote? 'All Notes': showArchivedNote? "Archived Notes": `Notes Tagged:`} <span className="text-[#0E121B]">{selectedTag}</span></h1>}
           {searchValue!=='' && showSearchResult &&  <p className={` ${theme==='Dark Mode'? ' text-white  ': ''} font-inter text-[24px] font-[700] text-[#525866]`}>Showing results for: <span className="text-[#0E121B]">{searchValue}</span></p>}

            <div className="flex items-center justify-center gap-5  ">
                <Search />

               <button  onClick={showSettingsBtn} className="cursor-pointer outline-none border-none"> <Image width={42} height={43} src="/settings.png" alt="settings" /></button>
            </div>
          
        </div>
    )
}