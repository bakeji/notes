"use client"
import Image from "next/image";
import { useState } from "react";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { app } from "@/firebase";
import SignUpWithGoogle  from "../google";
import Password from "@/components/password";
import Loading from "@/components/loading";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
 
export default function LogIn(){
   
    const [formDetails, setFormDetails] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMessages, setErrorMessages] = useState('')
     const { toast } = useToast()


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormDetails({
            ...formDetails,
            [e.target.name]: e.target.value
        })
        setShowError(false)
    }

    const router = useRouter()

    async function handleLogIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); 
        setLoading(true);
        try {
            const auth = getAuth(app);
        if (formDetails.email !== "" && formDetails.password !== "") {
            const userCredential = await signInWithEmailAndPassword(auth, formDetails.email, formDetails.password);
            const user = userCredential.user;
            toast({
                description: 'Login sucessful'
            })
            router.push('/');
          }  else {
            setShowError(true);
            setErrorMessages('Please fill in all fields');
            setLoading(false);
          }}
          catch (error) {
            const errorMessage = (error as Error).message;
            setShowError(true); 
            setErrorMessages(errorMessage);
          } finally {
            setLoading(false);
          }
        }
      
    return(
        <div className="w-[100%] h-[100vh] flex justify-center items-center bg-[#F3F5F8]">

            <div className="bg-white h-fit w-[35%] my-[0] mx-[auto] flex flex-col items-center border-[1px] border-s-[#E0E4EA] shadow-lg rounded-[12px] p-[24px] max-lg:w-[60%] max-md:w-[90%]">
                           {showError && <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {errorMessages}
                    </AlertDescription>
                    </Alert>}
                <div className="mb-[20px]"> 
                    <Image width={95} height={28} src="/logo.png" alt="logo"/>
                </div>
                <h1 className="font-inter mb-[4px]  text-[24px] font-[700]">Welcome to Note</h1>
                <p className="font-inter text-[#525866] font-[400] text-[14px]">Please log in to continue</p>
                <form onSubmit={handleLogIn} className="flex items-center flex-col justify-center mt-6 w-[90%] gap-3">
                    <div className=" flex flex-col w-[100%] gap-2">
                        <label className="font-inter text-[14px] font-[500] text-[#0E121B]" htmlFor="email">Email Address</label>
                        <input className="font-inter text-[14px] font-[400] border-s-[#CACFD8] w-[100%] border-[1px] rounded-[8px] h-[32px] p-[18px] shadow-sm outline-none box-border bg-transparent"
                         placeholder="email@example.com" 
                         type="email"
                          name="email" 
                          id="email"
                          onChange={handleChange}
                          value={formDetails.email} 
                          />
                    </div>

                    <div className=" flex flex-col w-[100%] gap-2">
                        <span className=" flex justify-between">
                        <label className="font-inter text-[14px] font-[500] text-[#0E121B]" htmlFor="password">Password</label>
                        <a className="underline text-[12px] font-inter text-[#525866] font-[400]" href="#">forgot</a>
                        </span>
                        
                       <Password formPassword = {formDetails.password} name='password' handleChange = {handleChange}/>
                    </div>

                
                        <button type="submit" className="w-[100%] h-[44px] p-[14px] text-white text-[16px] font-[600] font-inter rounded-[8px] bg-[#335CFF] ">{loading? <Loading /> : "LogIn"}</button>
                   
                   <div className="w-[100%] py-[10px] border-y border-s-[#E0E4EA] flex flex-col items-center justify-center">
                        <p className ="mb-[12px] font-inter text-[14px] font-[400] text-[#525866]">Or log in with:</p>
                        <SignUpWithGoogle/>
                    </div>
                   <p className="font-inter text-[14px] text-[#525866] font-[400]">No Account yet? <span><a className="text-[#0E121B] font-inter" href="/signup">Sign up</a></span></p>
                </form>
            </div>
        </div>
    )
}