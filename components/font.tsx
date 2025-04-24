import { useNoteContext } from '@/context/noteContext'
import Image from 'next/Image'

export default function FontTheme(){
    const {fontTheme, setFontTheme} = useNoteContext()
    const fonts =[
        {id:1, title:'Sans-serif', desc:"Clean and modern, easy to read.", img:'/sansserif.png'},
        {id:2, title:'Serif', desc:"Classic and elegant for a timeless feel.", img: '/Serif.png'},
        {id:3, title:'Monospace', desc:"Code-like, great for a technical vibe.", img:'/mono.png'}
    ]

    function handleFontChange(e: React.ChangeEvent<HTMLInputElement>){
        setFontTheme(e.target.value)
    }
    return(
        <div className='flex flex-col max-lg:w-full' >
            <h1 className='text-[#0E121B] font-inter text-[16px] font-[600]'>Font Theme</h1>
            <p className='font-inter text-[14px] font-[400] text-[#2B303B]'>Choose your font theme:</p>
            
            <div className='mt-6 flex flex-col gap-4 max-lg:w-full'>
                {fonts.map((theme)=>(
                <div className='flex items-center border border-[#E0E4EA] rounded-[12px] p-2 w-[65%] max-lg:w-full pl-4' key={theme.id}>
                    <div className='flex items-center gap-4 w-[95%]'>
                        <div className='h-[40px] w-[40px] rounded-[12px] flex items-center justify-center border border-[#E0E4EA] bg-[#ffffff]'>
                        <Image width='18' height='12' src={theme.img} alt={theme.title} />
                        </div>
                        <label className='flex flex-col' htmlFor={theme.title}>
                            <span className='text-[14px] font-inter font-[500]  text-[#0E121B]'>{theme.title}</span>
                            <span className='text-[14px] font-inter font-[400] text-[#2B303B]'>{theme.desc}</span>
                        </label>
                    </div>
                    <input
                    className='cursor-pointer' 
                    type="radio" 
                    name="fontTheme" 
                    id={theme.title} 
                    value={theme.title}
                    checked={fontTheme === theme.title}
                    onChange={handleFontChange}
                    />
                </div>
                ))}
            </div>
            
            <div className='mt-8 flex items-center justify-end w-[65%] max-lg:w-full'>
                <button className='bg-[#335CFF] p-3 text-white rounded-[8px]  font-[500] text-[14px]' >Apply Changes</button>
            </div>

        </div>
    )
}