'use client'
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
     AlertDialog,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useNoteContext } from "@/context/noteContext";
export default function LogOut(){
       const router = useRouter()
    const {theme} = useNoteContext()
    function logOutBtn(){
        const auth = getAuth();
            signOut(auth).then(() => {
                router.push('/login')
            
            })

    }
    
    return(
         <AlertDialog>
            <AlertDialogTrigger className={`flex items-center gap-2  text-[14px] font-[500] text-[#0E121B] border-none outline-none ${theme==='Dark Mode'? 'text-white':'' }`}> 
                <Image width={20} height={20} src={theme==='Dark Mode'? '/Logout-drk.png' :'/Logout.png'} alt='logout' />
                Logout
            </AlertDialogTrigger>
            <AlertDialogContent className={`${theme==='Dark Mode'? 'bg-[#232530] ':'' }`}>
                <AlertDialogHeader className={`${theme==='Dark Mode'? ' text-white':'' }`}>
                
                <AlertDialogTitle className={` flex items-center gap-6 `}>
                    <Image src="/Logout.png" alt="archive" width={20} height={20}></Image>  
                Logout
                </AlertDialogTitle>
                <AlertDialogDescription className="pl-10">
                Are you sure you want to Logout?
                </AlertDialogDescription>
                
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel className='bg-[#F3F5F8]'>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={logOutBtn} className="bg-[#FB3748]" >Logout</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>       
    )
}