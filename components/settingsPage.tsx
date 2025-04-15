import { useNoteContext } from "@/context/noteContext"
import ColorTheme from "./colortheme"
import FontTheme from "./font"
import ResetPwd from "./resetPwd"

export default function SettingsPage(){
    const{selectedSetting,showSettings } = useNoteContext()
    return(
        <>
        {showSettings && selectedSetting ===1 && <ColorTheme /> }
        {showSettings && selectedSetting===2 && <FontTheme /> }
        {showSettings && selectedSetting===3 && <ResetPwd /> }

        
        </>
    )
}