import Image from "next/image"
export default function Topnav(){
    return(
        <div className="w-[90%] flex items-center justify-between ml-8 py-4">
            <h1 className="font-inter font-[700] text-[24px] text-[#0E121B]">All Notes</h1>

            <div className="flex items-center justify-center gap-5  ">
                <div className="flex items-center gap-2 p-[10px] w-[300px] border-[1px] border-[#E0E0E0] h-[40px]">
                    <Image width={20} height={21} src="/search.png" alt="search" />
                    <input className="w-[100%] h-[35px] outline-none placeholder:text-[14px] placeholder:font-[400] font-inter placeholder:text-[#717784]"  type="search" name="search" id="search" placeholder="Search by title, content or tags…" />
                </div>

                <Image width={42} height={43} src="/settings.png" alt="settings" />
            </div>
          
        </div>
    )
}