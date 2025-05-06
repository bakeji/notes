import { getAuth,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { app } from "@/firebase";
import Image from "next/image";

export default function SignUpWithGoogle(){
    const router = useRouter()


    function signUpWithGoogleBtn(e:React.MouseEvent<HTMLButtonElement>){
    const auth =getAuth(app)
    e.preventDefault()
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)

    .then(() => {
        console.log('signup sucessful')
        router.push('/')
      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
      });
    }

  return(
  <button onClick={signUpWithGoogleBtn} className="flex items-center justify-center w-[100%] bg-transparent rounded-[12px] border-[1px] gap-3 text-[16px] font-inter font-[500] text-[#0E121B] border-s-[#CACFD8] h-[16px] p-[18px]"><Image width={25} height={24} src="/Google.png" alt="google"/> Google </button>
    )}                