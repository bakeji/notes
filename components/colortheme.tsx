import { useNoteContext } from '@/context/noteContext'
import Image from 'next/image'

export default function ColorTheme(){
    const {colorTheme, setColorTheme, setTheme, theme} = useNoteContext()
    const themes =[
        {id:1, title:'Light Mode', desc:"Pick a clean and classic light theme", img:'/sun.png', drk: '/Sun-drk.png'},
        {id:2, title:'Dark Mode', desc:"Select a sleek and modern dark theme", img: '/Dark mode.png', drk: '/Dark-drk.png'},
        {id:3, title:'System', desc:"Adapts to your device’s theme", img:'/system.png', drk: '/Light-drk.png'}
    ]
    function handleThemeChange(e: React.ChangeEvent<HTMLInputElement>){
        setColorTheme(e.target.value)
    }

    function handleThemeApply(){
        if(colorTheme === 'System'){
            const systemTheme =window.matchMedia('(prefers-color-scheme: dark)').matches
            setTheme(systemTheme ? 'Dark Mode' : 'Light Mode')
        }else{
        setTheme(colorTheme)
        }
    }
    return(
        <div className='flex flex-col max-lg:w-full ' >
            <h1 className={`text-[#0E121B] font-inter text-[16px] font-[600] ${theme==='Dark Mode'? 'text-white':'' }`}>Color Theme</h1>
            <p className={`font-inter text-[14px] font-[400] text-[#2B303B] ${theme==='Dark Mode'? 'text-white':'' }`}>Choose your color theme:</p>
            
            <div className='mt-6 flex flex-col gap-4 max-lg:w-full'>
                {themes.map((themes)=>(
                <div className='flex items-center border rounded-[12px] p-2 w-[65%] max-lg:w-full pl-4' key={themes.id}>
                    <div className='flex items-center gap-4 w-[95%]'>
                        <div className='h-[40px] w-[40px] rounded-[12px] flex  items-center justify-center border border-[#E0E4EA] bg-transparent'>
                        <Image width='24' height='24' src={theme==='Dark Mode'? themes.drk :themes.img} alt={themes.title} />
                        </div>
                        <label className='flex flex-col' htmlFor={themes.title}>
                            <span className={`text-[14px] font-inter font-[500]  text-[#0E121B] ${theme==='Dark Mode'? 'text-white':'' } `}>{themes.title}</span>
                            <span className={`last:text-[14px] font-inter font-[400] text-[#2B303B] ${theme==='Dark Mode'? 'text-white':'' }`}>{themes.desc}</span>
                        </label>
                    </div>
                    <input 
                    className='cursor-pointer'
                    type="radio"
                    name="colorTheme" 
                    id={themes.title}
                    value={themes.title}
                    checked={colorTheme === themes.title}
                    onChange={handleThemeChange} 
                    />
                </div>
                ))}
            </div>
            
            <div className='mt-8 flex items-center justify-end w-[65%] max-lg:w-full '>
                <button onClick={handleThemeApply} className='bg-[#335CFF] p-3 text-white rounded-[8px]  font-[500] text-[14px]' >Apply Changes</button>
            </div>

        </div>
    )
}