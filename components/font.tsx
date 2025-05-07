import { useNoteContext } from '@/context/noteContext'
import Image from 'next/image'

export default function FontTheme(){
    const {fontTheme, theme, setFontType, setFontTheme} = useNoteContext()
    const fonts =[
        {id:1, title:'Sans-serif', desc:"Clean and modern, easy to read.", img:'/sansserif.png', drk: '/sansserif-drk.png'},
        {id:2, title:'Serif', desc:"Classic and elegant for a timeless feel.", img: '/Serif.png', drk:'/serif-drk.png'},
        {id:3, title:'Monospace', desc:"Code-like, great for a technical vibe.", img:'/mono.png' , drk:'/mono-drk.png'}
    ]

    function handleFontChange(e: React.ChangeEvent<HTMLInputElement>){
        setFontTheme(e.target.value)
    }
    return(
        <div className='flex flex-col max-lg:w-full' >
            <h1 className={`text-[#0E121B] text-[16px] font-[600] ${theme==='Dark Mode'? 'text-white':'' }`}>Font Theme</h1>
            <p className={` ${theme==='Dark Mode'? 'text-white':'' } text-[14px] font-[400] text-[#2B303B]`}>Choose your font theme:</p>
            
            <div className='mt-6 flex flex-col gap-4 max-lg:w-full'>
                {fonts.map((themes)=>(
                <div className={`flex items-center border border-[#E0E4EA] rounded-[12px] p-2 w-[65%] max-lg:w-full pl-4 `} key={themes.id}>
                    <div className='flex items-center gap-4 w-[95%]'>
                        <div className='h-[40px] w-[40px] rounded-[12px] flex items-center justify-center border  bg-transparent'>
                        <Image width='18' height='12' src={theme==='Dark Mode'? themes.drk :themes.img} alt={themes.title} />
                        </div>
                        <label className='flex flex-col' htmlFor={themes.title}>
                            <span className={` ${theme==='Dark Mode'? 'text-white':'' } text-[14px]  font-[500]  text-[#0E121B]`}>{themes.title}</span>
                            <span className={` ${theme==='Dark Mode'? 'text-white':'' } text-[14px]  font-[400] text-[#2B303B]'`}>{themes.desc}</span>
                        </label>
                    </div>
                    <input
                    className={`${theme==='Dark Mode'? 'text-white':'' } cursor-pointer`} 
                    type="radio" 
                    name="fontTheme" 
                    id={themes.title} 
                    value={themes.title}
                    checked={fontTheme === themes.title}
                    onChange={handleFontChange}
                    />
                </div>
                ))}
            </div>
            
            <div className='mt-8 flex items-center justify-end w-[65%] max-lg:w-full'>
                <button onClick={()=>setFontType(fontTheme)} className='bg-[#335CFF] p-3 text-white rounded-[8px]  font-[500] text-[14px]' >Apply Changes</button>
            </div>

        </div>
    )
}