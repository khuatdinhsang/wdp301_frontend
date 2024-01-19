import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from '../../../components/component/Card'
import SidebarAdmin from '../../admin/components/SideBarAdmin/SidebarAdmin'
import './BlogManagement.scss'

function BlogManager(){
    const [blogs, setBlogs] = useState()

    useEffect(() => {
        axios
        .get("/api/blog/getAll/rent")
        .then(res => {
            if(res.data.isSuccess === true){
                const data = res.data.data;
                setBlogs(data)
                
            }
        })
        .catch(err => console.log(err))
    },[])

    return (
        <div className="blogManagement">
            <SidebarAdmin className="sidebarLessorManagement"/>
            <div className="blogManagementContent">
                {blogs?.map((blog) => {
                    return (
                        <Card blog={blog}/>
                    )
                })}
                <Card/>
            </div>
        </div>
    )
}

export default BlogManager