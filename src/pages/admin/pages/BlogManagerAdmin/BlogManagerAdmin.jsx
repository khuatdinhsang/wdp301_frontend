import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import CardAdmin from "../../components/CardAdmin/CardAdmin";
import SidebarAdmin from "../../components/SideBarAdmin/SidebarAdmin";
import "./BlogManagerAdmin.scss";

function BlogManagerAdmin() {
  const account = useSelector((state) => state.account);
  const [blogs, setBlogs] = useState([]);
  const [statusSearch, setStatusSearch] = useState(false);
  const [displayBlogs, setDisplayBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberPage, setNumberPage] = useState();
  const [searchTitle, setSearchTitle] = useState("");
  const [numberBlogsNotAccept, setNumberBlogsNotAccept] = useState();
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`/api/blog/getAllAccepted/admin?limit=10&&page=1`, {
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        const data = res.data.data.allBlog;
        const size = res.data.data.totalBlog;
        setBlogs(data);
        setNumberPage(Math.ceil(size / 10));
        setDisplayBlogs(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangeStatus = (status) => {
    setStatusSearch(!statusSearch);
  };

  const handleSearchChange = (event) => {
    setSearchTitle(event.target.value);
  };

  // const handleSearchSubmit = () => {
  //   setCurrentPage(1);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/blog/getAllAccepted/admin?limit=10&page=${currentPage}&title=${searchTitle}`,
          {
            headers: {
              Authorization: `Bearer ${account?.token}`,
            },
          }
        );
        const data = response.data.data.allBlog;
        const size = response.data.data.totalBlog;
        setBlogs(data);
        setNumberPage(Math.ceil(size / 10));
        setDisplayBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage, searchTitle, account?.token]);

  useEffect(() => {
    setCurrentPage(1);
    const fetchData = async () => {
      try {
        let apiUrl = "";
        if (statusSearch === true) {
          apiUrl = `/api/blog/getAllAccepted/admin?limit=10&&page=1&title=${searchTitle}`;
        } else {
          apiUrl = `/api/blog/getAllUnaccepted/admin?limit=10&&page=1&title=${searchTitle}`;
        }

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        });

        const data = response.data.data.allBlog;
        const size = response.data.data.totalBlog;
        setNumberBlogsNotAccept(size);
        setBlogs(data);
        setNumberPage(Math.ceil(size / 10));
        setDisplayBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [statusSearch, searchTitle, account?.token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "";
        if (statusSearch === true) {
          apiUrl = `/api/blog/getAllAccepted/admin?limit=10&&page=${currentPage}&title=${searchTitle}`;
        } else {
          apiUrl = `/api/blog/getAllUnaccepted/admin?limit=10&&page=${currentPage}&title=${searchTitle}`;
        }

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        });

        const data = response.data.data.allBlog;
        const size = response.data.data.totalBlog;
        setBlogs(data);
        setNumberPage(Math.ceil(size / 10));
        setDisplayBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage, statusSearch, searchTitle, account?.token]);

  const handleDeleteComment = () => {
    if (statusSearch === true) {
      axios
        .get(`/api/blog/getAllAccepted/admin?limit=10&&page=1`, {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        })
        .then((res) => {
          const data = res.data.data.allBlog;
          const size = res.data.data.totalBlog;
          setBlogs(data);
          setNumberPage(Math.ceil(size / 10));
          setDisplayBlogs(data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`/api/blog/getAllUnaccepted/admin?limit=10&&page=1`, {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        })
        .then((res) => {
          const data = res.data.data.allBlog;
          const size = res.data.data.totalBlog;
          setBlogs(data);
          setNumberPage(Math.ceil(size / 10));
          setDisplayBlogs(data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="blogManagement">
      <SidebarAdmin className="sidebarLessorManagement" />
      <div className="blogManagementContent1">
        <div className="topBlogManagementContent1">
          <div></div>
          <h3>Blogs Manager</h3>
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
                onChange={(e) => handleChangeStatus(e.target.value)}
              >
                <option value={true}>Đã duyệt</option>
                <option value={false}>Chưa duyệt</option>
              </NativeSelect>
            </FormControl>
          </Box>
          <TextField
            type="text"
            value={searchTitle}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm theo tiêu đề"
          />
        </div>
        <div className="listBlogManagerAdmin">
          {displayBlogs
            ?.slice()
            .reverse()
            .map((blog) => {
              return (
                <CardAdmin
                  blog={blog}
                  key={blog?._id}
                  onDelete={handleDeleteComment}
                />
              );
            })}
        </div>
        <div className="bottomListCard">
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Có {numberBlogsNotAccept} blogs chờ được duyệt!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BlogManagerAdmin;
