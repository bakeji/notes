import Image from "next/image";

export default function ForgotPassword(){
    return(
        <div className="w-[100%] h-[100vh]  flex justify-center items-center bg-[#F3F5F8]">
            <div className="bg-white h-fit w-[39%] my-[0] mx-[auto] flex flex-col items-center border-[1px] border-s-[#E0E4EA] shadow-lg rounded-[12px] p-[20px] max-lg:w-[60%] max-md:w-[90%]">
                <div className="mb-[20px]"> 
                    <Image width={95} height={28} src="/logo.png" alt="logo"/>
                </div>
                <h1 className="font-inter mb-[4px]  text-[24px] font-[700]">Forgotten your password?</h1>
                <p className="font-inter text-center w-[90%] text-[#525866] font-[400] text-[14px]">Enter your email below, and we’ll send you a link to reset it.</p>
                <form action="" className="flex items-center flex-col justify-center mt-6 w-[90%] gap-3">
                    <div className=" flex flex-col w-[100%] gap-2">
                        <label className="font-inter text-[14px] font-[500] text-[#0E121B]" htmlFor="email">Email Address</label>
                        <input className="font-inter text-[14px] font-[400] border-s-[#CACFD8] w-[100%] border-[1px] rounded-[8px] h-[32px] p-[18px] shadow-sm outline-none box-border bg-transparent"
                         placeholder="email@example.com" type="email" name="email" id="email" />
                    </div>

        
                
                    <button className="w-[100%] h-[44px] p-[14px] text-white text-[16px] font-[600] font-inter rounded-[8px] bg-[#335CFF] ">Send Reset Link</button>
                   
                </form>
            </div>
        </div>
    )
}