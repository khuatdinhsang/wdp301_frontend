import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import CardAdmin from '../../components/CardAdmin/CardAdmin';
import SidebarAdmin from '../../components/SideBarAdmin/SidebarAdmin'
import './BlogManagerAdmin.scss'

function BlogManagerAdmin(){

    const account = useSelector(state => state.account);
    const [blogsSize, setBlogsSize] = useState()
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        axios
        .get('/api/blog/getAll/admin',{
            headers: {
                    Authorization: `Bearer ${account?.token}`
                }
        })
        .then(res => {
            const data = res.data.data;
            setBlogs(data);
            setBlogsSize(data.length)
        })
        .catch(err => console.log(err))
    },[])

    

    return(
        <div className="blogManagement">
            <SidebarAdmin className="sidebarLessorManagement"/>
            <div className="blogManagementContent1">
                <h3>Blog Manager</h3>
                <div className='listBlogManagerAdmin'>
                    {blogs?.map(blog =>{
                        return (
                            <CardAdmin
                                blog={blog}
                                key={blog?._id}
                            />
                        )
                    })}
                    <CardAdmin/>
                    <CardAdmin/>
                </div>

            </div>
        </div>
    )
}

export default BlogManagerAdmin
