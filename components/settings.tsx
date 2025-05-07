'use client'

import { useNoteContext } from "@/context/noteContext"
import Image from "next/image"
import LogOut from "./logoutModal"

export default function Settings(){
    const {selectedSetting, setSelectedSetting, theme, setShowSelectedSetting} = useNoteContext()
    const settingContent = [
        {title:"Color Theme", img:"/sun.png", drk: "/color-drk.png", id:1},
        {title:"Font Theme", img:"/Type.png", drk:"/type-drk.png", id:2},
        {title:"Change Password", img:"/pwd.png", drk: "/pwd-drk.png", id:3},
    ]
    function selectSetting(id:number){
        setSelectedSetting(id)
        setShowSelectedSetting(true)
    }

    return(
        <div className="flex flex-col mt-[20px]">
            <h1 className={`hidden max-lg:block text-[24px] text-[#0E121B] font-[700] ${theme==='Dark Mode'? 'text-white':'' }`}>Settings</h1>
            {settingContent.map((content)=>(
            <div key={content.id}  className={`flex items-center w-[90%] p-2 justify-between mt-[10px] ${selectedSetting=== content.id? theme==='Dark Mode'? 'bg-[#232530]':'bg-[#F3F5F8] max-lg:bg-transparent': "" } `}>
               <button onClick={()=>selectSetting(content.id)} className={`flex items-center gap-2  text-[14px] font-[500] text-[#0E121B] ${theme==='Dark Mode'? 'text-white':'' }`} >
               <Image width={20} height={20} src={ theme==='Dark Mode'? content.drk : content.img} alt={content.img} />
                {content.title}
               </button>
              {selectedSetting===content.id && <Image className="max-lg:hidden" width={6} alt="arrow" height={10} src={ theme==='Dark Mode'? "/right-drk.png":"/right.png"}/>}
            </div>
            ))}
             <div  className={`flex items-center p-3 mt-[20px] ${theme==='Dark Mode'? 'text-white':'' } border-t w-[90%] justify-between {'bg-[#F3F5F8]': "" } `}>
               <LogOut />
            </div>
        </div>

    )
}