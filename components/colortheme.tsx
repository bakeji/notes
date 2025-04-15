import { useNoteContext } from '@/context/noteContext'
import Image from 'next/Image'

export default function ColorTheme(){
    const {colorTheme, setColorTheme} = useNoteContext()
    const themes =[
        {id:1, title:'Light Mode', desc:"Pick a clean and classic light theme", img:'/sun.png'},
        {id:2, title:'Dark Mode', desc:"Select a sleek and modern dark theme", img: '/Dark mode.png'},
        {id:3, title:'System', desc:"Adapts to your device’s theme", img:'/system.png'}
    ]
    function handleThemeChange(e: React.ChangeEvent<HTMLInputElement>){
        setColorTheme(e.target.value)
    }
    return(
        <div className='flex flex-col ' >
            <h1 className='text-[#0E121B] font-inter text-[16px] font-[600]'>Color Theme</h1>
            <p className='font-inter text-[14px] font-[400] text-[#2B303B]'>Choose your color theme:</p>
            
            <div className='mt-6 flex flex-col gap-4'>
                {themes.map((theme)=>(
                <div className='flex items-center border border-[#E0E4EA] rounded-[12px] p-2 w-[65%] pl-4' key={theme.id}>
                    <div className='flex items-center gap-4 w-[95%]'>
                        <div className='h-[40px] w-[40px] rounded-[12px] flex items-center justify-center border border-[#E0E4EA] bg-[#ffffff]'>
                        <Image width='24' height='24' src={theme.img} alt={theme.title} />
                        </div>
                        <label className='flex flex-col' htmlFor={theme.title}>
                            <span className='text-[14px] font-inter font-[500]  text-[#0E121B]'>{theme.title}</span>
                            <span className='text-[14px] font-inter font-[400] text-[#2B303B]'>{theme.desc}</span>
                        </label>
                    </div>
                    <input 
                    className='cursor-pointer'
                    type="radio"
                    name="colorTheme" 
                    id={theme.title}
                    value={theme.title}
                    checked={colorTheme === theme.title}
                    onChange={handleThemeChange} 
                    />
                </div>
                ))}
            </div>
            
            <div className='mt-8 flex items-center justify-end w-[65%]'>
                <button className='bg-[#335CFF] p-3 text-white rounded-[8px]  font-[500] text-[14px]' >Apply Changes</button>
            </div>

        </div>
    )
}