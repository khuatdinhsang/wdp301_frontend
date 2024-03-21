import {
  Box,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../../components/component/Card";
import SidebarAdmin from "../../admin/components/SideBarAdmin/SidebarAdmin";
import "./RenterBlogManagement.scss";

function RenterBlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberPage, setNumberPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const account = useSelector((state) => state.account);
  const [statusSearch, setStatusSearch] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/auth/getAllBlogsPost`, {
        params: {
          userId: account.userId,
          limit: limit,
          page: currentPage,
          search: search,
        },
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        if (statusSearch) {
          const newAllBlogsAccepted = res.data.allBlog.filter(
            (item) => item.isAccepted
          );
          setBlogs(newAllBlogsAccepted);
          // setTotalBlogs(newAllBlogsAccepted.length);
          setTotalBlogs(res.data.totalBlog);
        } else {
          const newAllBlogsUnAccepted = res.data.allBlog.filter(
            (item) => !item.isAccepted
          );
          setBlogs(newAllBlogsUnAccepted);
          // setTotalBlogs(newAllBlogsUnAccepted.length);
          setTotalBlogs(res.data.totalBlog);
        }
      })
      .catch((err) => console.log(err));
  }, [currentPage, statusSearch]);

  useEffect(() => {
    setNumberPage(Math.ceil(totalBlogs / limit));
  }, [totalBlogs, statusSearch]);

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    axios
      .get(`/api/auth/getAllBlogsPost`, {
        params: {
          userId: account.userId,
          limit: limit,
          page: 1,
          search: search,
        },
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        setBlogs(res.data.allBlog);
        setTotalBlogs(res.data.totalBlog);
      })
      .catch((err) => console.log(err));
  };
  const handleChangeStatus = (status) => {
    setStatusSearch((status) => !status);
  };

  return (
    <div className="blogManagement">
      <SidebarAdmin />

      <div className="mainBlogManagementContent">
        <div className="searchContainerLessor">
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
          <h1>Quản lý bài đăng</h1>
          <div className="btnSearch">
            {/* <input
              className="inputSearchContainerLessor"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            /> */}
            <TextField 
                id="standard-basic" 
                label="Tìm kiếm" 
                variant="standard"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="contained" onClick={() => handleSearch()}>
              Xác nhận
            </Button>
          </div>
        </div>
        <div className="blogManagementContentLessor">
          {blogs
            .slice()
            .reverse()
            ?.map((blog) => (
              <Card key={blog.id} blog={blog} className="card" />
            ))}
          <Card className="card" />
          <Card className="card" />
        </div>
        <div className="paginationLessor">
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

export default RenterBlogManagement;
