"use client";
import { useNoteContext } from "@/context/noteContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Note } from "@/context/noteContext";
import { getDatabase, push, ref, set, get } from "firebase/database";
import { database } from "@/firebase";
import { app } from "@/firebase";
import { getAuth } from "firebase/auth";
import ColorTheme from "./colortheme";
import ResetPwd from "./resetPwd";
import SettingsPage from "./settingsPage";
export default function NoteContent() {
  const { selectedNotes, formatDate, showSettings, selectedSetting, isNewNote, textInput, setTextInput} = useNoteContext();
  const userId = "YbzpPIhpIWfW7VNLE5FnJTCiU602" //getAuth(app).currentUser?.uid
  
 
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
  },[selectedNotes, isNewNote])



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
    const db = getDatabase(app);
    const noteRef  = ref(db,'users/notes/'+ userId);
    const currentTimestamp = new Date().toISOString();
    
    try {
      if (userId) {
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
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  }




  return (
    <div className={`w-[60%] mt-[20px] ${showSettings? 'ml-[5px] w-[70%]': 'ml-[20px]'}`}>
      {showSettings? <SettingsPage /> :
        
         <>
         {(selectedNotes || isNewNote) &&
         <>
        <input
        className="border-none outline-none w-[100%] h-[30px] font-inter font-[500] text-[24px] text-[#0E121B] mb-3 placeholder:text-[#0E121B] placeholder:font-[700]"
        type="text"
        value={textInput?.title}
        onChange={handleChange}
        name="title"
        placeholder={textInput?.title ? "" : "Enter a title..."}
      />
      <div className="flex items-start flex-col gap-3 border-b-[1px] border-solid w-[95%]">
        <div className="flex w-[100%] items-center justify-center ">
          <p className="flex items-center justify-start w-[30%] gap-1 font-inter text-[14px] font-[400] text-[#2B303B]">
            <span>
              {" "}
              <Image width={16} height={16} src="/Tag.png" alt="tag" />
            </span>
            Tags
          </p>
          <input
            className="w-[100%] border-none outline-none font-inter text-[14px] font-[400] text-[#2B303B] "
            type="text"
            value={(textInput?.tags || []).join(", ")}
            onChange={handleChange}
            name="tags"
            placeholder={textInput?.tags?.length > 0 ? "" : "Add tags separated by commas (e.g. Work, Planning)"}
          />
        </div>

        <div className="flex w-[100%] items-center justify-center mb-[10px]">
          <p className="flex items-center justify-start w-[30%] gap-1 font-inter text-[14px] font-[400] text-[#2B303B]">
            <span>
              {" "}
              <Image width={16} height={16} src="/clock.png" alt="clock" />
            </span>
            Last edited
          </p>
          <p className="w-[100%] border-none outline-none font-inter text-[14px] font-[400] text-[#99A0AE] ">
            {textInput.lastEdited? formatDate(textInput.lastEdited): "Not yet saved"}            
          </p>
        </div>
      </div>

      <div className="w-[95%] h-[60%]  border-b-[1px] border-solid">
        <textarea
          className=" whitespace-pre-wrap font-inter resize-none text-[14px] w-[100%] h-[100%] font-[400] text-[#232530] border-none outline-none placeholder:text-[#2B303B]"
          value={textInput.content}
          onChange={handleChange}
          name="content"
          placeholder="Start typing your note here…"
        />
      </div>

      <div className="flex items-start mt-[20px] gap-4 ">
        <button onClick={saveNote} className="w-[107px] h-[37px] px-[12px] text-center rounded-[8px] font-inter font-[500] text-[14px] bg-[#335CFF] text-[#FFFFFF]">
          Save Note
        </button>
        <button className="w-[87px] h-[37px] px-[12px] text-center rounded-[8px] font-inter font-[500] text-[14px] bg-[#F3F5F8] text-[#525866]">
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
