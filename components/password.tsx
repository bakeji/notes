'use client'
import { useState } from "react"
import Image from "next/image";

type formTypes ={
    formPassword: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    name: string
}


export default function Password({formPassword, handleChange, name}:formTypes){
     const [showPassWord , setShowPassword] = useState(false)

     const showPasswordBtn = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setShowPassword(prev => !prev)
    }

    return(
         <div className="flex justify-between items-center  w-[100%] border rounded-[8px] h-[32px] p-[18px] shadow-sm ">
                            <input className="font-inter text-[14px] w-[90%] h-[32px] font-[400] border-none outline-none box-border bg-transparent" 
                            type={showPassWord? "text" : "password"} 
                            name={name}
                            id="password" 
                            onChange={handleChange}
                            value={formPassword}
                            required
                            />
                            <button onClick={showPasswordBtn} className="border-none bg-transparent"><Image width={20} height={20} src={showPassWord? "/show.png": "/eye-slash.png"} alt="show"/></button>
                        </div>
    )
}