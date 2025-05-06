'use client'
import Password from "@/components/password";
import Image from "next/image";
import { useState } from "react";
import { getAuth, updatePassword, User } from "firebase/auth";
import {app} from "@/firebase";
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import Loading from "@/components/loading";
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"



export default function ResetPassword(){
const [formDetails, setFormDetails] = useState({
    password : "",
    repeatPassword: ""
})
const [passwordMatch, setPasswordMatch] = useState(false)
const [goodPasswordLength, setGoodPasswordLength] = useState(true)
const [loading, setLoading] = useState(false)
const [showError, setShowError] = useState(false)
const [errorMessages, setErrorMessages] = useState('')
const router = useRouter()
const { toast } = useToast()

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
            toast({
                description: 'Password reset successful'
            })
            router.push('/login');
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
        <div className="w-[100%] h-[100vh]  flex justify-center items-center bg-[#F3F5F8]">
            
            <div className="bg-white h-fit w-[39%] my-[0] mx-[auto] flex flex-col items-center border-[1px] border-s-[#E0E4EA] shadow-lg rounded-[12px] p-[20px] max-lg:w-[60%] max-md:w-[90%]">
            {showError && 
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {errorMessages}
                    </AlertDescription>
                </Alert>}
                <div className="mb-[20px]"> 
                    <Image width={95} height={28} src="/logo.png" alt="logo"/>
                </div>
                <h1 className="font-inter mb-[4px]  text-[24px] font-[700]">Reset Your Password</h1>
                <p className="font-inter text-center w-[90%] text-[#525866] font-[400] text-[14px]">Choose a new password to secure your account.</p>
                <form onSubmit={handleSubmit} className="flex items-center flex-col justify-center mt-6 w-[90%] gap-3">

                   <div className=" flex flex-col w-[100%] gap-2">
                        <label className="font-inter text-[14px] font-[500] text-[#0E121B]" htmlFor="password">Password</label>
                    
                        <Password formPassword = {formDetails.password} handleChange = {handleChange} name ='password'/>
                        <p className={`text-[12px] font-inter flex items-center gap-2 text-[#525866] ${ !goodPasswordLength?'text-red-600': 'font-[400]'}`}> <Image width={16} height={16} src={!goodPasswordLength ?'/info red.png' : '/info.png'} alt="info"/>At least 8 characters</p>
                    </div>

                    <div className=" flex flex-col w-[100%] gap-2">
                        <label className="font-inter text-[14px] font-[500] text-[#0E121B]" htmlFor="password">Confirm New Password</label>
                    
                        <Password formPassword = {formDetails.repeatPassword} name="repeatPassword" handleChange = {handleChange}/>
                       {!passwordMatch && <p className="text-[12px] gap-2 font-inter flex items-center font-[500 ] text-red-600"> <Image width={16} height={16} src="/info red.png" alt="info"/>password do not match</p>}
                    </div>
                  

                        <button type="submit" className="w-[100%] h-[44px] p-[14px] text-white text-[16px] font-[600] font-inter rounded-[8px] bg-[#335CFF] ">{loading? <Loading /> : 'Reset Password'}</button>
                   
                </form>
            </div>
        </div>
    )
}