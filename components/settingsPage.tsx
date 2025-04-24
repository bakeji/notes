import { useNoteContext } from "@/context/noteContext"
import ColorTheme from "./colortheme"
import FontTheme from "./font"
import ResetPwd from "./resetPwd"
import Image from "next/image"

export default function SettingsPage(){
    const{selectedSetting,showSettings, showSelectedSetting,setShowSelectedSetting } = useNoteContext()
    return(
        <>
        <button onClick={()=>setShowSelectedSetting(false)} className={`items-center  mb-3 font-inter text-[14px] font-[400] hidden max-lg:flex gap-2 `}> <Image width={18} height={18} src='/left.png' alt="go back"/>Settings</button>
        {showSettings && selectedSetting ===1 && <ColorTheme /> }
        {showSettings && selectedSetting===2 && <FontTheme /> }
        {showSettings && selectedSetting===3 && <ResetPwd /> }

        
        </>
    )
}