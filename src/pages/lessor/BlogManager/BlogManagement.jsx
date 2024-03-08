import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Card from "../../../components/component/Card";
import SidebarAdmin from "../../admin/components/SideBarAdmin/SidebarAdmin";
import "./BlogManagement.scss";
import { Box, FormControl, InputLabel, NativeSelect } from "@mui/material";

function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [itemsPerPage] = useState(5);
  const account = useSelector((state) => state.account);
  const [statusSearch, setStatusSearch] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, limit, search, statusSearch]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`/api/auth/getAllBlogsPost`, {
        params: {
          userId: account.userId,
          limit,
          page: currentPage,
          search,
        },
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      });
      if (statusSearch) {
        const newAllBlogsAccepted = response.data.allBlog.filter(
          (item) => item.isAccepted
        );
        setBlogs(newAllBlogsAccepted);
        setTotalBlogs(newAllBlogsAccepted.length);
      } else {
        const newAllBlogsUnAccepted = response.data.allBlog.filter(
          (item) => !item.isAccepted
        );
        setBlogs(newAllBlogsUnAccepted);
        setTotalBlogs(newAllBlogsUnAccepted.length);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleChangeStatus = (status) => {
    setStatusSearch((status) => !status);
  };
  const totalPages = Math.ceil(totalBlogs / itemsPerPage);

  return (
    <div className="blogManagement" style={{ marginTop: "200px" }}>
      <div>
        <h1>Quản lí bài đăng</h1>
        <Box sx={{ minWidth: 120 }} className={"selectType"}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Trạng thái
            </InputLabel>
            <NativeSelect
              defaultValue={statusSearch}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
              onChange={(e) => handleChangeStatus(Boolean(e.target.value))}
            >
              <option value={true}>Đã duyệt</option>
              <option value={false}>Chưa duyệt</option>
            </NativeSelect>
          </FormControl>
        </Box>
        <div className="blogManagementContent">
          {blogs.map((blog) => (
            <Card key={blog.id} blog={blog} className="card" isHome={false} />
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
    </div>
  );
}

export default BlogManager;
