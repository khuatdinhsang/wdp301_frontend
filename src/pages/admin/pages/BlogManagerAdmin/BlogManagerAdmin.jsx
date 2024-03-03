import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';
import axios from 'axios';
import {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import CardAdmin from '../../components/CardAdmin/CardAdmin';
import SidebarAdmin from '../../components/SideBarAdmin/SidebarAdmin'
import './BlogManagerAdmin.scss'

function BlogManagerAdmin(){

    const account = useSelector(state => state.account);
    const [blogsSize, setBlogsSize] = useState()
    const [blogs, setBlogs] = useState([])
    const [statusSearch, setStatusSearch] = useState(true);
    const [displayBlogs, setDisplayBlogs] = useState([])

    useEffect(() => {
        axios
        .get('/api/blog/getAll/admin',{
            headers: {
                    Authorization: `Bearer ${account?.token}`
                }
        })
        .then(res => {
            const data = res.data.data.allBlog;
            setBlogs(data);
            setBlogsSize(data.length)
            setDisplayBlogs(data);
        })
        .catch(err => console.log(err))
    },[])

    const handleChangeStatus = (status) => {
        setStatusSearch(!statusSearch);
    }

    useEffect(() => {
        const resultSearch = blogs.filter((blog) => blog.isAccepted == Boolean(statusSearch));
        setDisplayBlogs(resultSearch)
    },[statusSearch]);

    const handleDeleteComment = () => {
         axios
        .get('/api/blog/getAll/admin',{
            headers: {
                    Authorization: `Bearer ${account?.token}`
                }
        })
        .then(res => {
            const data = res.data.data.allBlog;
            setBlogs(data);
            setBlogsSize(data.length)
            setDisplayBlogs(data);
        })
        .catch(err => console.log(err))
    }
        

    return(
        <div className="blogManagement">
            <SidebarAdmin className="sidebarLessorManagement"/>
            <div className="blogManagementContent1">
                <div className='topBlogManagementContent1'>
                    <div></div>
                    <h3>Blog Manager</h3>
                    <Box sx={{ minWidth: 120 }} className={'selectType'}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Trạng thái
                            </InputLabel>
                            <NativeSelect
                                defaultValue={statusSearch}
                                inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                }}
                                onChange={e => handleChangeStatus(e.target.value)}
                            >
                            <option value={true}>Đã duyệt</option>
                            <option value={false}>Chưa duyệt</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                </div>
                <div className='listBlogManagerAdmin'>
                        {displayBlogs?.map(blog =>{
                            if(blog.isAccepted == Boolean(statusSearch)){
                                return (
                                    <CardAdmin
                                        blog={blog}
                                        key={blog?._id}
                                        onDelete={handleDeleteComment} 
                                    />
                                )
                            }
                        })}
                    <CardAdmin/>
                    <CardAdmin/>
                    <CardAdmin/>
                    <CardAdmin/>
                </div>

            </div>
        </div>
    )
}

export default BlogManagerAdmin
