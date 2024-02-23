import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../../../components/component/Card'
import SidebarAdmin from '../../admin/components/SideBarAdmin/SidebarAdmin'
import './BlogManagement.scss'

function BlogManager(){
    // const [blogs, setBlogs] = useState()
    // const [img, setImg] = useState()
    // const [isTrueFile, setIsTrueFile] = useState()
    // const [showImg, setShowImg] = useState()
    // const account = useSelector(state => state.account);
    // const [imgResult, setImgResult] = useState()
    

    

    return (
        <div className="blogManagement">
            <SidebarAdmin className="sidebarLessorManagement"/>
            <div className="blogManagementContent">
                {/* {blogs?.map((blog) => {
                    return (
                        <Card blog={blog}/>
                    )
                })} */}
                {/* <Card/> */}
                
                

            </div>
        </div>
    )
}

export default BlogManager