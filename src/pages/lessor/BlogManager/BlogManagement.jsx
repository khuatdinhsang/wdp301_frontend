import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Card from '../../../components/component/Card';
import SidebarAdmin from '../../admin/components/SideBarAdmin/SidebarAdmin';
import './BlogManagement.scss';
import { Button, Pagination, Stack } from '@mui/material';
import { toast } from 'react-toastify';

function BlogManager() {
    const [blogs, setBlogs] = useState([]);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberPage, setNumberPage] = useState();
    const [limit, setLimit] = useState(10); 
    const [search, setSearch] = useState('');
    const account = useSelector(state => state.account); 

   useEffect(() => {
        axios
        .get(`/api/auth/getAllBlogsPost`,{
            params: {
                    userId: account.userId,
                    limit: limit,
                    page: currentPage,
                    search: search
                },
                headers: {
                    Authorization: `Bearer ${account?.token}`
                }
        })
        .then(res => {
             setBlogs(res.data.allBlog);
            setTotalBlogs(res.data.totalBlog);
        })
        .catch(err => console.log(err))
   },[])


    useEffect(() => {
        axios
        .get(`/api/auth/getAllBlogsPost`,{
            params: {
                    userId: account.userId,
                    limit: limit,
                    page: currentPage,
                    search: search
                },
                headers: {
                    Authorization: `Bearer ${account?.token}`
                }
        })
        .then(res => {
             setBlogs(res.data.allBlog);
            setTotalBlogs(res.data.totalBlog);
        })
        .catch(err => console.log(err))
    },[currentPage])

    useEffect(() => {
        setNumberPage(Math.ceil(totalBlogs/limit));
    },[totalBlogs])

    const handleChangePage = (event, page) => {
        setCurrentPage(page);
    };

    const handleSearch = () => {
        setCurrentPage(1);
        axios
        .get(`/api/auth/getAllBlogsPost`,{
            params: {
                    userId: account.userId,
                    limit: limit,
                    page: 1,
                    search: search
                },
                headers: {
                    Authorization: `Bearer ${account?.token}`
                }
        })
        .then(res => {
             setBlogs(res.data.allBlog);
            setTotalBlogs(res.data.totalBlog);
        })
        .catch(err => console.log(err))
    }
  


    return (
        <div className="blogManagement">
            <SidebarAdmin className="sidebarLessorManagement" />
                <div className='mainBlogManagementContent'>
                    <div className="searchContainerLessor">
                        <input
                            className='inputSearchContainerLessor'
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                        />
                        <Button variant="contained" onClick={() => handleSearch()}>
                            Xác nhận
                        </Button>
                    </div>
                    <div className="blogManagementContentLessor">
                        {blogs.slice().reverse()?.map(blog => (
                            <Card key={blog.id} blog={blog} className="card" />
                        ))}
                            <Card className="card" />
                            <Card className="card" />

                    </div>
                    <div className="paginationLessor">
                        {/* {Array.from({ length: numberPage }, (_, index) => (
                            <button key={index + 1} onClick={() => handleChangePage(index + 1)}>
                                {index + 1}
                            </button>
                        ))} */}

                        <Stack spacing={2}>
                            <Pagination
                                count={numberPage}
                                page={currentPage}
                                variant="outlined"
                                shape="rounded"
                                onChange={handleChangePage}
                            />
                        </Stack>
                    </div>
                </div>
            
        </div>
    );
}

export default BlogManager;
