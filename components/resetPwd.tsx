'use client'
import Password from "@/components/password";
import Image from "next/image";
import { useState } from "react";
import { getAuth, updatePassword, User } from "firebase/auth";
import {app} from "@/firebase";
import Toast from "@/components/toast";



export default function ResetPwd(){
const [formDetails, setFormDetails] = useState({
    password : "",
    repeatPassword: ""
})
const [passwordMatch, setPasswordMatch] = useState(false)
const [goodPasswordLength, setGoodPasswordLength] = useState(true)
const [showToast, setShowToast] = useState(false)
const [toastMessage, setToastMessage] = useState('')
const [loading, setLoading] = useState(false)
const [showError, setShowError] = useState(false)
const [errorMessages, setErrorMessages] = useState('')


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormDetails({
            ...formDetails,
            [e.target.name]: e.target.value
        })
        setGoodPasswordLength(formDetails.password.length>=8? true: false)
        setPasswordMatch(formDetails.password === formDetails.repeatPassword ? true: false)

    }
    console.log(formDetails.password.length)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        try {
            const auth = getAuth(app);
        if (passwordMatch && goodPasswordLength) {
            const user = auth.currentUser as User;
            await updatePassword(user, formDetails.password);
            setShowToast(true);
            setToastMessage('Password reset successful');
          }else {
            setShowError(true);
            setErrorMessages('Password do not match or password is less than 8 characters');
          } 
        }catch (error) {
            const errorMessage = (error as Error).message;
            setShowError(true);
            setErrorMessages(errorMessage);
          }finally{
            setLoading(false);
          }
        
        
      }
    return(
        <div className="flex flex-col">
             { showToast && <Toast toastMessage= {toastMessage}/>}
            <div className="mt-4 flex flex-col gap-4">
             
                <h1 className="text-[14px] font-inter font-[500] text-[#0E121B]">Change Password</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className=" flex flex-col w-[65%] gap-2">
                            <label className="font-inter text-[14px] font-[500] text-[#0E121B]" htmlFor="password">Old Password</label>
                            <Password formPassword = {formDetails.password} handleChange = {handleChange} name ='password'/>
                    </div>

                   <div className=" flex flex-col w-[65%] gap-2">
                        <label className="font-inter text-[14px] font-[500] text-[#0E121B]" htmlFor="password">New Password</label>
                        <Password formPassword = {formDetails.password} handleChange = {handleChange} name ='password'/>
                        <p className={`text-[12px] font-inter flex items-center gap-2 text-[#525866] ${ !goodPasswordLength?'text-red-600': 'font-[400]'}`}> <Image width={16} height={16} src={!goodPasswordLength ?'/info red.png' : '/info.png'} alt="info"/>At least 8 characters</p>
                    </div>

                    <div className=" flex flex-col w-[65%] gap-2">
                        <label className="font-inter text-[14px] font-[500] text-[#0E121B]" htmlFor="password">Confirm New Password</label>
                        <Password formPassword = {formDetails.repeatPassword} name="repeatPassword" handleChange = {handleChange}/>
                       {!passwordMatch && <p className="text-[12px] gap-2 font-inter flex items-center font-[500 ] text-red-600"> <Image width={16} height={16} src="/info red.png" alt="info"/>password do not match</p>}
                    </div>
                  

                    <div className='mt-4 flex items-center justify-end w-[65%]'>
                <button type="submit" className='bg-[#335CFF] p-3 text-white rounded-[8px] text-[14px] font-[500]' >Save Password</button>
            </div>
                   
                </form>
            </div>
        </div>
    )
}