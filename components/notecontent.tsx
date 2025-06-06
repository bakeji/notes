"use client";
import { useNoteContext } from "@/context/noteContext";
import Image from "next/image";
import { useEffect, useState} from "react";
import { getDatabase, push, ref, set} from "firebase/database";
import { app } from "@/firebase";
import { getAuth } from "firebase/auth";
import SettingsPage from "./settingsPage";
import NoteNav from "./noteNav";
import { useRouter } from "next/navigation";
import Loading from "./loading";


export type ArcAndDelProps = {
  archiveNotes: ()=>void,
  restoreNotes: ()=>void,
   deleteNote:   ()=>void
}

export default function NoteContent({archiveNotes, restoreNotes,  deleteNote}: ArcAndDelProps) {
  const { selectedNotes, formatDate, showSettings, showSelectedSetting, setNavId, theme, showClickedNote, isNewNote, textInput, setTextInput} = useNoteContext();
  const userId = getAuth(app).currentUser?.uid
  const router = useRouter()
  const [loading, setLoading] = useState(false)
 
  useEffect(()=>{
    if(isNewNote){
      setTextInput({
        title: ""  ,
        tags:[],
        content: "",
        lastEdited: "", 
        isArchived: false 
      })
    }
    else if(selectedNotes){
      setTextInput({
        title: selectedNotes.title,
        tags:selectedNotes.tags,
        content: selectedNotes.content,
        lastEdited: selectedNotes.lastEdited ,
        isArchived: selectedNotes.isArchived,
      });
      
    }
  },[selectedNotes, isNewNote, setTextInput])



  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    if (name === "tags") {
      const tagsArray = value.split(",").map((tag) => tag.trim());
      setTextInput((prevState) => ({
        ...prevState,
        [name]: tagsArray,
      }));
    } else {
      setTextInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  async function saveNote() {
    setLoading(true)
    const db = getDatabase(app);
    const noteRef  = ref(db,'users/notes/'+ userId);
    const currentTimestamp = new Date().toISOString();
    
    try {
      if (!userId) {
        router.push('/login')
        return;
      }
        if (!isNewNote && selectedNotes && selectedNotes.id) {
          const specificNoteRef = ref(db, `users/notes/${userId}/${selectedNotes.id}`);
          
          await set(specificNoteRef, {
            ...textInput,
            lastEdited: currentTimestamp,
            id: selectedNotes.id
          });
        } else {
          const newNoteRef = push(noteRef);
          const newKey = newNoteRef.key;
          await set(newNoteRef, {
            ...textInput,
           lastEdited: currentTimestamp,
            id: newKey
          });
        }
    
    } catch (error) {
      console.error("Error saving note:", error);
    }
    finally{
      setNavId(1)
      setLoading(false)
    }
  }

  return (
    <div className={`w-[50%] pt-5 pl-4 mr-auto border-r max-lg:border-none ${showSettings? 'ml-[5px] w-[70%] max-lg:block ': 'ml-[20px'} ${showClickedNote || showSelectedSetting||isNewNote?'max-lg:block max-lg:ml-0 max-lg:w-[95%] max-lg:mx-auto ' : 'max-lg:hidden'}  `}>
      {showSettings? <SettingsPage /> :
        
         <>
         {(selectedNotes || isNewNote) &&
         <>
          <NoteNav saveNote={saveNote} archiveNotes={archiveNotes} deleteNote={deleteNote} restoreNotes={restoreNotes} />
        <input
        className={`border-none outline-none  max-lg:mb-4 w-[100%] h-[30px] bg-transparent  font-[500] text-[24px] text-[#0E121B] mb-3 placeholder:text-[#0E121B] placeholder:font-[700] ${theme==='Dark Mode'? 'placeholder:text-white text-white':'' }`}
        type="text"
        value={textInput?.title}
        onChange={handleChange}
        name="title"
        placeholder={textInput?.title ? "" : "Enter a title..."}
      />
      <div className={` ${theme==='Dark Mode'? 'text-white':'' } text-[#2B303B] flex items-start flex-col gap-3 border-b-[1px] border-solid w-[95%]`}>
        <div className="flex w-[100%] items-center justify-center max-lg:mb-5 ">
          <p className="flex items-center justify-start w-[30%] gap-1  text-[14px] font-[400] ">
            <span>
              {" "}
              <Image width={16} height={16} src="/Tag.png" alt="tag" />
            </span>
            Tags
          </p>
          <input
            className={` w-[100%] border-none outline-none bg-transparent  text-[14px] font-[400]  ${theme==='Dark Mode'? 'placeholder:text-white text-white':'' } `}
            type="text"
            value={(textInput?.tags || []).join(", ")}
            onChange={handleChange}
            name="tags"
            placeholder={textInput?.tags?.length > 0 ? "" : "Add tags separated by commas (e.g. Work, Planning)"}
          />
        </div>

        <div className="flex w-[100%] items-center justify-center mb-[10px] max-lg:mb-5">
          <p className="flex items-center justify-start w-[30%] gap-1  text-[14px] font-[400]">
            <span>
              {" "}
              <Image width={16} height={16} src="/clock.png" alt="clock" />
            </span>
            Last edited
          </p>
          <p className="w-[100%] border-none outline-none text-[14px] font-[400] text-[#99A0AE] ">
            {textInput.lastEdited? formatDate(textInput.lastEdited): "Not yet saved"}            
          </p>
        </div>
      </div>

      <div className="w-[95%] h-[60%] max-lg:pt-3  border-b-[1px] border-solid max-lg:border-none">
        <textarea
          className={`${theme==='Dark Mode'? 'text-white placeholder:text-white':'' } whitespace-pre-wrap  resize-none text-[14px] bg-transparent w-[100%] h-[100%] font-[400] text-[#232530] border-none outline-none placeholder:text-[#2B303B]`}
          value={textInput.content}
          onChange={handleChange}
          name="content"
          placeholder="Start typing your note here…"
        />
      </div>

      <div className="flex items-start py-4  gap-4 max-lg:hidden ">
        <button onClick={saveNote} disabled={textInput.content.trim() ==='' } className={`w-[107px] h-[37px] px-[12px] text-center rounded-[8px] font-[500] text-[14px] bg-[#335CFF] text-[#FFFFFF] ${textInput.content.trim()=== ''? 'cursor-not-allowed bg-[#A7B2C1] text-[#FFFFFF]': ''}`}>
          { loading? <Loading /> :'Save Note'}
        </button>
        <button className="w-[87px] h-[37px] px-[12px] text-center bg-transparent border rounded-[8px]  font-[500] text-[14px] bg-[#F3F5F8] text-[#525866]">
          Cancel
        </button>
      </div>
      </>
        }
        </>
}
    
    </div>
  );
}
