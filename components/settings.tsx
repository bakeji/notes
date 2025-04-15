'use client'

import { useNoteContext } from "@/context/noteContext"
import Image from "next/image"

export default function Settings(){
    const {selectedSetting, setSelectedSetting} = useNoteContext()
    const settingContent = [
        {title:"Color Theme", img:"/sun.png", id:1},
        {title:"Font Theme", img:"/Type.png", id:2},
        {title:"Change Password", img:"/pwd.png", id:3},
    ]
    function selectSetting(id:number){
        setSelectedSetting(id)
    }

    return(
        <div className="flex flex-col mt-[20px]">
            {settingContent.map((content)=>(
            <div key={content.id}  className={`flex items-center w-[90%] p-2 justify-between mt-[10px] ${selectedSetting=== content.id?'bg-[#F3F5F8]': "" } `}>
               <button onClick={()=>selectSetting(content.id)} className="flex items-center gap-2 font-inter text-[14px] font-[500] text-[#0E121B]" >
               <Image width={20} height={20} src={content.img} alt={content.img} />
                {content.title}
               </button>
              {selectedSetting===content.id && <img src="/right.png" alt="arrow" />}
            </div>
            ))}
             <div  className={`flex items-center p-3 mt-[20px] border-t w-[90%] justify-between {'bg-[#F3F5F8]': "" } `}>
               <button  className="flex items-center gap-2 font-inter text-[14px] font-[500] text-[#0E121B]" >
               <Image width={20} height={20} src='/Logout.png' alt='logout' />
               Logout
               </button>
              {/* { <img src="/right.png" alt="arrow" />} */}
            </div>
        </div>

    )
}