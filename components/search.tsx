import { useNoteContext } from "@/context/noteContext";
import Image from "next/image";

export default function Search() {
    const { searchValue, handleSearchValue } = useNoteContext();
    
    return (
       <div className="flex items-center gap-2 p-[10px] w-[300px] border-[1px] border-[#E0E0E0] h-[40px] max-lg:w-[100%] rounded-[8px] bg-transparent">
            <Image width={20} height={21} src="/search.png" alt="search" />
            <input
            className="w-[100%] h-[35px] outline-none bg-transparent placeholder:text-[14px] placeholder:font-[400] font-inter placeholder:text-[#717784]"  type="search" 
            name="searchValue"
            id="search" 
            placeholder="Search by title, content or tags…" 
            value={searchValue}
            onChange={handleSearchValue}
                />
       </div>
    );
}