
import {
    MenuFoldOutlined,
    UserOutlined,
    FileExcelOutlined,
    HomeOutlined,
    TeamOutlined
  } from "@ant-design/icons";

const Admin= [
    {
        path:"/",
        title:"Home",
        icon:<HomeOutlined/>,
    },
    {
        path:"/User",
        title:"Users",
        icon:<TeamOutlined />,
    },
    {
        path:"/spo",
        title:"SPO",
        icon:<FileExcelOutlined/>,
    },
    {
        path:"/profile",
        title:"Profile",
        icon:<UserOutlined/>,
    }
]


const Standart= [
    {
        path:"/",
        title:"Task",
        icon:<HomeOutlined/>,
    },
]



export {Standart,Admin}