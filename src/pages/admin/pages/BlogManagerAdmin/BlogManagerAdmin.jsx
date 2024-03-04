import { Box, FormControl, InputLabel, NativeSelect, Pagination, Stack } from '@mui/material';
import axios from 'axios';
import {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import CardAdmin from '../../components/CardAdmin/CardAdmin';
import SidebarAdmin from '../../components/SideBarAdmin/SidebarAdmin'
import './BlogManagerAdmin.scss'

function BlogManagerAdmin(){

    const account = useSelector(state => state.account);
    const [blogs, setBlogs] = useState([])
    const [statusSearch, setStatusSearch] = useState(true);
    const [displayBlogs, setDisplayBlogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [numberPage, setNumberPage] = useState()

    useEffect(() => {
        axios
        .get(`/api/blog/getAllAccepted/admin?limit=10&&page=1`,{
            headers: {
                    Authorization: `Bearer ${account?.token}`
                }
        })
        .then(res => {
            const data = res.data.data.allBlog;
            const size = res.data.data.totalBlog;
            setBlogs(data);
            setNumberPage(Math.ceil(size/10))
            setDisplayBlogs(data);
        })
        .catch(err => console.log(err))
    },[])

    const handleChangeStatus = (status) => {
        setStatusSearch(!statusSearch);
    }

    useEffect(() => {
        setCurrentPage(1);
        if(statusSearch === true){
            axios
            .get(`/api/blog/getAllAccepted/admin?limit=10&&page=1`,{
                headers: {
                        Authorization: `Bearer ${account?.token}`
                    }
            })
            .then(res => {
                const data = res.data.data.allBlog;
                const size = res.data.data.totalBlog;
                setBlogs(data);
                setNumberPage(Math.ceil(size/10))
                setDisplayBlogs(data);
            })
            .catch(err => console.log(err))
        }else{
            axios
            .get(`/api/blog/getAllUnaccepted/admin?limit=10&&page=1`,{
                headers: {
                        Authorization: `Bearer ${account?.token}`
                    }
            })
            .then(res => {
                const data = res.data.data.allBlog;
                const size = res.data.data.totalBlog;
                setBlogs(data);
                setNumberPage(Math.ceil(size/10))
                setDisplayBlogs(data);
            })
            .catch(err => console.log(err))
        }
        // setDisplayBlogs(resultSearch)
    },[statusSearch]);


    useEffect(() => {
        if(statusSearch === true){
            axios
            .get(`/api/blog/getAllAccepted/admin?limit=10&&page=${currentPage}`,{
                headers: {
                        Authorization: `Bearer ${account?.token}`
                    }
            })
            .then(res => {
                const data = res.data.data.allBlog;
                const size = res.data.data.totalBlog;
                setBlogs(data);
                setNumberPage(Math.ceil(size/10))
                setDisplayBlogs(data);
            })
            .catch(err => console.log(err))
        }else{
            axios
            .get(`/api/blog/getAllUnaccepted/admin?limit=10&&page=${currentPage}`,{
                headers: {
                        Authorization: `Bearer ${account?.token}`
                    }
            })
            .then(res => {
                const data = res.data.data.allBlog;
                const size = res.data.data.totalBlog;
                setBlogs(data);
                setNumberPage(Math.ceil(size/10))
                setDisplayBlogs(data);
            })
            .catch(err => console.log(err))
        }
    },[currentPage])

    const handleDeleteComment = () => {
         if(statusSearch === true){
            axios
            .get(`/api/blog/getAllAccepted/admin?limit=10&&page=1`,{
                headers: {
                        Authorization: `Bearer ${account?.token}`
                    }
            })
            .then(res => {
                const data = res.data.data.allBlog;
                const size = res.data.data.totalBlog;
                setBlogs(data);
                setNumberPage(Math.ceil(size/10))
                setDisplayBlogs(data);
            })
            .catch(err => console.log(err))
        }else{
            axios
            .get(`/api/blog/getAllUnaccepted/admin?limit=10&&page=1`,{
                headers: {
                        Authorization: `Bearer ${account?.token}`
                    }
            })
            .then(res => {
                const data = res.data.data.allBlog;
                const size = res.data.data.totalBlog;
                setBlogs(data);
                setNumberPage(Math.ceil(size/10))
                setDisplayBlogs(data);
            })
            .catch(err => console.log(err))
        }
    }

     const handleChangePage = (event, value) => {
        setCurrentPage(value);
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
                        {displayBlogs?.slice().reverse().map(blog =>{
                                return (
                                    <CardAdmin
                                        blog={blog}
                                        key={blog?._id}
                                        onDelete={handleDeleteComment} 
                                    />
                                )
                        })}
                    <CardAdmin/>
                    <CardAdmin/>
                    <CardAdmin/>
                    <CardAdmin/>
                </div>
                <div className="bottomListCard">
                    <Stack spacing={2}>
                        <Pagination count={numberPage} page={currentPage} variant="outlined" shape="rounded"  onChange={handleChangePage}/>
                    </Stack>
                </div>

            </div>
        </div>
    )
}

export default BlogManagerAdmin
