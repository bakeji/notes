import { useState } from "react";
import Image from "next/image";

type ToastProps = {
    toastMessage: string
}

export default function ToastError({toastMessage}:ToastProps) {
    const [visible, setVisible] = useState(true); 

    if ( !visible) return null;

    return (
        <div className="fixed top-3 left-1/2 transform -translate-x-1/2 w-1/2 border-red-600  border-[1px] text-center p-3 shadow-md z-50 flex justify-between text-red-600 items-center rounded-[8px]">
            <span className="flex items-center gap-4"> {toastMessage}</span>
            <button className="ml-4 cursor-pointer text-white " onClick={() => setVisible(false)}> <Image width={10} height={10} src="/close.png" alt="close" /> </button>
        </div>
    );
}