import { useNoteContext } from "@/context/noteContext";
import Image from "next/image";

export default function ArcAndDel(){
    const {showArchivedNote} = useNoteContext()
    return(
        <div className="w-[25%] flex flex-col items-start gap-4 border-l-[1px] ">
            <button className="mt-[20px] ml-[20px] p-[8px] flex items-center justify-start gap-2 border-[1px] w-[90%] rounded-[8px] border-[#CACFD8] font-inter text-[14px] font-[500] text-[#0E121B]"><Image width={20} height={20} src={showArchivedNote?"/restore": "/Archive.png" }alt="Archive" />{showArchivedNote? "Restore Note": "Archive"}</button>
            <button className=" ml-[20px] p-[8px] flex items-center justify-start gap-2 border-[1px] w-[90%] rounded-[8px] border-[#CACFD8] font-inter text-[14px] font-[500] text-[#0E121B]"><Image width={20} height={20} src="/Delete.png" alt="delete" />Delete Note</button>
        </div>
    )
}