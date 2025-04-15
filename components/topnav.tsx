import { useNoteContext } from "@/context/noteContext"
import Image from "next/image"
export default function Topnav(){
    const{searchValue, showSearchResult,showSettingsBtn, selectedTag, handleSearchValue, showArchivedNote, showAllNote} = useNoteContext()
    
    return(
        <div className="w-[90%] flex items-center justify-between ml-8 py-4">
            {!showSearchResult && <h1 className={`font-inter font-[700] text-[24px] ${selectedTag? 'text-[#525866]' : 'text-[#0E121B]'} `}>{showAllNote? 'All Notes': showArchivedNote? "Archived Notes": `Notes Tagged:`} <span className="text-[#0E121B]">{selectedTag}</span></h1>}
           {searchValue!=='' && showSearchResult &&  <p className="font-inter text-[24px] font-[700] text-[#525866]">Showing results for: <span className="text-[#0E121B]">{searchValue}</span></p>}

            <div className="flex items-center justify-center gap-5  ">
                <div className="flex items-center gap-2 p-[10px] w-[300px] border-[1px] border-[#E0E0E0] h-[40px]">
                    <Image width={20} height={21} src="/search.png" alt="search" />
                    <input
                    className="w-[100%] h-[35px] outline-none placeholder:text-[14px] placeholder:font-[400] font-inter placeholder:text-[#717784]"  type="search" 
                    name="searchValue"
                    id="search" 
                    placeholder="Search by title, content or tags…" 
                    value={searchValue}
                    onChange={handleSearchValue}
                        />
                </div>

               <button  onClick={showSettingsBtn} className="cursor-pointer outline-none border-none"> <Image width={42} height={43} src="/settings.png" alt="settings" /></button>
            </div>
          
        </div>
    )
}