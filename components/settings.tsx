import { title } from "process"

export default function Settings(){
    const settingContent = [
        {title:"Color Theme", img:"/sun.png", id:1},
        {title:"Font Theme", img:"/Type.png", id:2},
        {title:"Change Password", img:"/pwd.png", id:3},
        {title:"Color Theme", img:"/sun.png", id:4},
    ]

    return(
        <div>
            {settingContent.map((content)=>(
            <div>
                <img src={content.img} alt={content.title} />
                <p> {content.title}</p>
                <img src="/right.png" alt="arrow" />
            </div>
            ))}
            <div>
                <img src="/Logout.png" alt="logout" />
                <p>Logout</p>
                <img src="/right.png" alt="arrow" />
            </div>
        </div>

    )
}