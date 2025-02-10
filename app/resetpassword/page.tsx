import Image from "next/image";

export default function signup(){
    return(
        <div className="w-[100%] h-[100vh]  flex justify-center items-center bg-[#F3F5F8]">
            <div className="bg-white h-fit w-[39%] my-[0] mx-[auto] flex flex-col items-center border-[1px] border-s-[#E0E4EA] shadow-lg rounded-[12px] p-[20px]">
                <div className="mb-[20px]"> 
                    <Image width={95} height={28} src="/logo.png" alt="logo"/>
                </div>
                <h1 className="font-inter mb-[4px]  text-[24px] font-[700]">Reset Your Password</h1>
                <p className="font-inter text-center w-[90%] text-[#525866] font-[400] text-[14px]">Choose a new password to secure your account.</p>
                <form action="" className="flex items-center flex-col justify-center mt-6 w-[90%] gap-3">
                   

                    <div className=" flex flex-col w-[100%] gap-2">
                        <label className="font-inter text-[14px] font-[500] text-[#0E121B]" htmlFor="password">New Password</label>
                    
                        <div className="flex justify-between items-center border-s-[#CACFD8] w-[100%] border-[1px] rounded-[8px] h-[32px] p-[18px] shadow-sm ">
                            <input className="font-inter text-[14px] w-[90%] h-[32px] font-[400] border-none outline-none box-border bg-transparent" type="password" name="password" id="password" />
                            <button className="border-none bg-transparent"><Image width={20} height={20} src="/show.png" alt="show"/></button>
                        </div>
                        <p className="text-[12px] font-inter flex items-center gap-2 text-[#525866] font-[400]"> <Image width={16} height={16} src="/info.png" alt="info"/>At least 8 characters</p>
                    </div>

                    <div className=" flex flex-col w-[100%] gap-2">
                        <label className="font-inter text-[14px] font-[500] text-[#0E121B]" htmlFor="password">Confirm New Password</label>
                    
                        <div className="flex justify-between items-center border-s-[#CACFD8] w-[100%] border-[1px] rounded-[8px] h-[32px] p-[18px] shadow-sm ">
                            <input className="font-inter text-[14px] w-[90%] h-[32px] font-[400] border-none outline-none box-border bg-transparent" type="password" name="password" id="password" />
                            <button className="border-none bg-transparent"><Image width={20} height={20} src="/show.png" alt="show"/></button>
                        </div>
                    </div>

                
                        <button className="w-[100%] h-[44px] p-[14px] text-white text-[16px] font-[600] font-inter rounded-[8px] bg-[#335CFF] ">Reset Password</button>
                   
                </form>
            </div>
        </div>
    )
}