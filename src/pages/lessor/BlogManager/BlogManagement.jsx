import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../../../components/component/Card'
import SidebarAdmin from '../../admin/components/SideBarAdmin/SidebarAdmin'
import './BlogManagement.scss'

function BlogManager(){
    const [blogs, setBlogs] = useState()
    const [img, setImg] = useState()
    const [isTrueFile, setIsTrueFile] = useState()
    const [showImg, setShowImg] = useState()
    const account = useSelector(state => state.account);
    const [imgResult, setImgResult] = useState()
    

     const handleFileUpload = (e) => {
        setImg(e.target.files[0])
        const fileImg = e.target.files[0];

        if(fileImg.type === 'image/jpeg' || fileImg.type === 'image/png'){
            fileImg.preview = URL.createObjectURL(fileImg)
            setIsTrueFile(true)
            setShowImg(fileImg)
        }else{
            setIsTrueFile(false)
        }

       
    }

    useEffect(() => {
        axios
        .post('api/upload/image', showImg,{
            headers: {
                    Authorization: `Bearer ${account?.token}`
                }
        })
        .then(res => {
            if(res.data.isSuccess === true){
                setImgResult(res.data.data);
                console.log(res.data);
            }
        })
        .catch(err => console.log(err))
    },[showImg])

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
                <form>
                    <div className="inputBox">
                        <label htmlFor="">Image</label>
                        <input
                            type="file"
                            className='inputImg'
                            onChange={handleFileUpload} 
                            />
                    </div>
                    <button>
                        Upload
                    </button>
                </form>
                <div className="inputBox">
                        {showImg && (
                            <img src={showImg.preview} alt='' width={"100%"} />
                        )}
                    </div>

            </div>
        </div>
    )
}

export default BlogManager