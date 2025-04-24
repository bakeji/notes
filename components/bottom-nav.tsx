import { useNoteContext } from "@/context/noteContext"
import Image from "next/image"

export default function BottomNav(){
    const {navId, setNavId,showSettingsBtn, showAllTagsBtn,setShowSearchBar, showArchivedNoteBtn, showAllNoteBtn} = useNoteContext()

    const menuArray=[
        {id:1, icon: '/hm-mob.png', activeIcon:'/home2.png' , title: 'Home'},
        {id:2, icon: '/search.png', activeIcon:'/Search2.png', title:'Search'},
        {id:3, icon:'/arch-mob.png', activeIcon:'/arch2.png', title:'Archived'},
        {id:4, icon:'/tag-mob.png', activeIcon:'/Tag2.png', title:'Tags' },
        {id:5, icon:'/set-mob.png', activeIcon:'/Set-2.png', title:'Settings' }       
    ]

        function navBtn(id:number){
            setNavId(id)
            if(id ===1){
                showAllNoteBtn()
            } else if(id===3){
                showArchivedNoteBtn()
            }else if (id===4){
                showAllTagsBtn()
            }else if (id===2){
                setShowSearchBar(true)
            }
            else{
                showSettingsBtn()
            }
        }


    return(
        <div className="w-full h-[50px] shadow-md fixed bottom-0 border-t hidden border-[#E0E4EA] p-3 items-center justify-between max-lg:flex">
            {menuArray.map((menu)=>(
            <button onClick={()=>navBtn(menu.id)} className={`outline-none h-[42px] w-[80px] flex flex-col text-[12px] gap-2 items-center justify-center ${navId === menu.id? 'bg-[#EBF1FF] rounded-[4px] text-[#335CFF]': ''} `} key={menu.id}>
                <Image src={navId===menu.id? menu.activeIcon: menu.icon} width={24} height={navId===5? 26: 24} alt={menu.title} />
                {menu.title}
            </button>
            ))}
        </div>
    )
}