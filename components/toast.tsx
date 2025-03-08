import { useState } from "react";

type ToastProps = {
    toastMessage: string
}

export default function Toast({toastMessage}:ToastProps) {
    const [visible, setVisible] = useState(true);
   

    if ( !visible) return null;

    return (
        <div className="fixed top-3 left-1/2 transform -translate-x-1/2 w-1/2 border-[#E0E4EA]  border-[1px] text-center p-3 shadow-md z-50 flex justify-between items-center rounded-[8px]">
            <span className="flex items-center gap-4"> <img src="/check.png" alt="check"/>{toastMessage}</span>
            <button className="ml-4 cursor-pointer text-white " onClick={() => setVisible(false)}> <img src="/close.png" alt="close" /> </button>
        </div>
    );
}