"use client"
import Image from "next/image";
import { useState } from "react";
import { app } from "@/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'
import SignUpWithGoogle from "../google";
import Toast from "@/components/toast";
import Password from "@/components/password";
import Loading from "@/components/loading";
import ToastError from "@/components/errortoast";

export default function signup(){
    const [formDetails, setFormDetails] = useState({
        email: "",
        password: ""
    })
    const [goodPasswordLength, setGoodPasswordLength] = useState(true)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [showError, setShowError] = useState(false)
    const [errorMessages, setErrorMessages] = useState('')
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(true);
    const router = useRouter()

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormDetails({
            ...formDetails,
            [e.target.name]: e.target.value
        })
        setGoodPasswordLength(formDetails.password.length>=8? true: false)
    }
    

    async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        
        try {
          const auth = getAuth(app);
          
          if (goodPasswordLength && formDetails.password !== '' && formDetails.email !== '') {
            const userCredential = await createUserWithEmailAndPassword(auth, formDetails.email, formDetails.password);
            const user = userCredential.user;
            setShowToast(true);
            console.log(showToast)
            setToastMessage('sign up successful');
           router.push('/login');
          } else {
            setShowError(true);
            setErrorMessages('Password should be at least 8 characters');
          }
        } catch (error) {
          const errorMessage = (error as Error).message;
          setShowError(true);
          setErrorMessages(errorMessage);
         
          
        } finally {
          setLoading(false);
        }
      }
      console.log(showError, showToast)
    
  
    return(
        <div className="w-[100%] h-[100vh]  flex justify-center items-center bg-[#F3F5F8]">
           {showToast && <Toast toastMessage= {toastMessage}/>}
           {showError && <ToastError toastMessage={errorMessages}/>}
            <div className="bg-white h-fit w-[39%] my-[0] mx-[auto] flex flex-col items-center border-[1px] border-s-[#E0E4EA] shadow-lg rounded-[12px] p-[20px]">
                <div className="mb-[20px]"> 
                    <Image width={95} height={28} src="/logo.png" alt="logo"/>
                </div>
                <h1 className="font-inter mb-[4px]  text-[24px] font-[700]">Create Your Account</h1>
                <p className="font-inter text-center w-[90%] text-[#525866] font-[400] text-[14px]">Sign up to start organizing your notes and boost your productivity.</p>
                <form onSubmit={handleSignUp} className="flex items-center flex-col justify-center mt-6 w-[90%] gap-3">
                    <div className=" flex flex-col w-[100%] gap-2">
                        <label className="font-inter text-[14px] font-[500] text-[#0E121B]" htmlFor="email">Email Address</label>
                        <input className="font-inter text-[14px] font-[400] border-s-[#CACFD8] w-[100%] border-[1px] rounded-[8px] h-[32px] p-[18px] shadow-sm outline-none box-border bg-transparent"
                         placeholder="email@example.com" 
                         type="email" 
                         name="email" 
                         id="email" 
                         value = {formDetails.email}
                         onChange = {handleChange}
                         required
                         />
                         
                    </div>

                    <div className=" flex flex-col w-[100%] gap-2">
                        <label className="font-inter text-[14px] font-[500] text-[#0E121B]" htmlFor="password">Password</label>
                    
                       <Password formPassword = {formDetails.password} handleChange = {handleChange} name = 'password'/>
                            <p className={`text-[12px] font-inter flex items-center gap-2 text-[#525866] ${ !goodPasswordLength?'text-red-600': 'font-[400]'}`}> <Image width={16} height={16} src={!goodPasswordLength ?'/info red.png' : '/info.png'} alt="info"/>At least 8 characters</p>
                        </div>

                
                        <button type="submit" className="w-[100%] h-[44px] flex items-center justify-center p-[14px] text-white text-[16px] font-[600] font-inter rounded-[8px] bg-[#335CFF] ">{loading? <Loading /> : 'Sign up'}</button>
                   
                   <div className="w-[100%] py-[10px] border-y border-s-[#E0E4EA] flex flex-col items-center justify-center">
                        <p className ="mb-[12px] font-inter text-[14px] font-[400] text-[#525866]">Or log in with:</p>
                        <SignUpWithGoogle/>
                    </div>
                   <p className="font-inter text-[14px] text-[#525866] font-[400]">Already have an account? <span><a className="text-[#0E121B] font-inter" href="/login">Login</a></span></p>
                </form>
            </div>
        </div>
    )
}