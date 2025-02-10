import Image from "next/image";

export default function signup(){
    return(
        <div className="w-[100%] h-[100vh]  flex justify-center items-center bg-[#F3F5F8]">
            <div className="bg-white h-fit w-[39%] my-[0] mx-[auto] flex flex-col items-center border-[1px] border-s-[#E0E4EA] shadow-lg rounded-[12px] p-[20px]">
                <div className="mb-[20px]"> 
                    <Image width={95} height={28} src="/logo.png" alt="logo"/>
                </div>
                <h1 className="font-inter mb-[4px]  text-[24px] font-[700]">Create Your Account</h1>
                <p className="font-inter text-center w-[90%] text-[#525866] font-[400] text-[14px]">Sign up to start organizing your notes and boost your productivity.</p>
                <form action="" className="flex items-center flex-col justify-center mt-6 w-[90%] gap-3">
                    <div className=" flex flex-col w-[100%] gap-2">
                        <label className="font-inter text-[14px] font-[500] text-[#0E121B]" htmlFor="email">Email Address</label>
                        <input className="font-inter text-[14px] font-[400] border-s-[#CACFD8] w-[100%] border-[1px] rounded-[8px] h-[32px] p-[18px] shadow-sm outline-none box-border bg-transparent"
                         placeholder="email@example.com" type="email" name="email" id="email" />
                    </div>

                    <div className=" flex flex-col w-[100%] gap-2">
                        <label className="font-inter text-[14px] font-[500] text-[#0E121B]" htmlFor="password">Password</label>
                    
                        <div className="flex justify-between items-center border-s-[#CACFD8] w-[100%] border-[1px] rounded-[8px] h-[32px] p-[18px] shadow-sm ">
                            <input className="font-inter text-[14px] w-[90%] h-[32px] font-[400] border-none outline-none box-border bg-transparent" type="password" name="password" id="password" />
                            <button className="border-none bg-transparent"><Image width={20} height={20} src="/show.png" alt="show"/></button>
                        </div>
                        <p className="text-[12px] font-inter flex items-center gap-2 text-[#525866] font-[400]"> <Image width={16} height={16} src="/info.png" alt="info"/>At least 8 characters</p>
                    </div>

                
                        <button className="w-[100%] h-[44px] p-[14px] text-white text-[16px] font-[600] font-inter rounded-[8px] bg-[#335CFF] ">Login</button>
                   
                   <div className="w-[100%] py-[10px] border-y border-s-[#E0E4EA] flex flex-col items-center justify-center">
                        <p className ="mb-[12px] font-inter text-[14px] font-[400] text-[#525866]">Or log in with:</p>
                        <button className="flex items-center justify-center w-[100%] bg-transparent rounded-[12px] border-[1px] gap-3 text-[16px] font-inter font-[500] text-[#0E121B] border-s-[#CACFD8] h-[16px] p-[18px]"><Image width={25} height={24} src="/Google.png" alt="google"/> Google </button>
                   </div>
                   <p className="font-inter text-[14px] text-[#525866] font-[400]">No Account yet? <span><a className="text-[#0E121B] font-inter" href="">Sign Up</a></span></p>
                </form>
            </div>
        </div>
    )
}