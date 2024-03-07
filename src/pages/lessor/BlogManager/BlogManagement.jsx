import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Card from '../../../components/component/Card';
import SidebarAdmin from '../../admin/components/SideBarAdmin/SidebarAdmin';
import './BlogManagement.scss';

function BlogManager() {
    const [blogs, setBlogs] = useState([]);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10); 
    const [search, setSearch] = useState('');
    const [itemsPerPage] = useState(5);
    const account = useSelector(state => state.account); 

    useEffect(() => {
        fetchBlogs();
    }, [currentPage, limit, search]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`/api/auth/getAllBlogsPost`, {
                params: {
                    userId: account.userId,
                    limit,
                    page: currentPage,
                    search
                },
                headers: {
                    Authorization: `Bearer ${account?.token}`
                }
            });
            setBlogs(response.data.allBlog);
            setTotalBlogs(response.data.totalBlog);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const totalPages = Math.ceil(totalBlogs / itemsPerPage);

    return (
        <div className="blogManagement">
            <SidebarAdmin className="sidebarLessorManagement" />
            <div className="blogManagementContent">
                {blogs.map(blog => (
                    <Card key={blog.id} blog={blog} className="card" />
                ))}
            </div>
            <div className="searchContainer">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                />
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default BlogManager;
