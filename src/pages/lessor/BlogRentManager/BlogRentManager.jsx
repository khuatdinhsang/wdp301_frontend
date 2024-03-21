import "./BlogRentManager.scss";
import SidebarAdmin from "../../admin/components/SideBarAdmin/SidebarAdmin";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import Card from "../../../components/component/Card";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CardLessor from "../../../components/component/CardLessor/CardLessor";
import { toast } from "react-toastify";

function BlogRentManager() {
  const [statusSearch, setStatusSearch] = useState("isProcess");
  const [blogs, setBlogs] = useState([]);
  const account = useSelector((state) => state.account);
  const [isUpdate, setIsUpdate] = useState(false);
  const [numberNotRent, setNumberNotRent] = useState(0);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeStatus = (status) => {
    setStatusSearch(status);
  };

  useEffect(() => {
    if (statusSearch === "rent") {
      axios
        .get(`/api/blog/GetRentedRoomLessorRentOut`, {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            const data = res.data.data;
            setBlogs(data);
          }
        })
        .catch((err) => console.log(err));
    } else if (statusSearch === "unrent") {
      axios
        .get(`/api/blog/GetUnrentedRoomLessorRentOut`, {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            const data = res.data.data;
            setBlogs(data);
            var num = 0;
            data?.forEach((blog) => {
              if (blog?.Renterconfirm.length > 0) {
                num++;
              }
            });
            setNumberNotRent(num);
          }
        })
        .catch((err) => console.log(err));
    } else if (statusSearch === "isProcess") {
      axios
        .get(`/api/blog/findAllConfirmWaitingBlog/{userId}`, {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          setBlogs(data);
        })
        .catch((err) => console.log(err));
    }
  }, [statusSearch, isUpdate]);


    useEffect(() => {
        axios
            .get(`/api/blog/findAllConfirmWaitingBlog/{userId}`,{
                headers: {
                    Authorization: `Bearer ${account?.token}`
                }
            })
            .then(res => {
                const data = res.data;
                setBlogs(data);
                setNumberNotRent(data.length);
            })
            .catch(err => console.log(err))
    },[])


    useEffect(() => {
        if(statusSearch === 'rent'){
            axios
            .get(`/api/blog/GetRentedRoomLessorRentOut`,{
                headers: {
                    Authorization: `Bearer ${account?.token}`
                }
            })
            .then(res => {
                if(res.data.statusCode === 200){
                    const data = res.data.data;
                    setBlogs(data);
                }
            })
            .catch(err => console.log(err))
        }else if(statusSearch === 'unrent'){
            axios
            .get(`/api/blog/GetUnrentedRoomLessorRentOut`,{
                headers: {
                    Authorization: `Bearer ${account?.token}`
                }
            })
            .then(res => {
                if(res.data.statusCode === 200){
                    const data = res.data.data;
                    setBlogs(data);
                }
            })
            .catch(err => console.log(err))
        }else if(statusSearch === 'isProcess'){
            axios
            .get(`/api/blog/findAllConfirmWaitingBlog/{userId}`,{
                headers: {
                    Authorization: `Bearer ${account?.token}`
                }
            })
            .then(res => {
                const data = res.data;
                setBlogs(data);
                setNumberNotRent(data.length);
            })
            .catch(err => console.log(err))
        }
    },[statusSearch, isUpdate])



    const handleUpdateRent = () => {
        setIsUpdate(!isUpdate)
    }

    return(
        <div className="blogRentManager1">
            <SidebarAdmin className={'sidebarBlogRent'}/>
            <div className="blogRentManagerContent1">
                <div className="blogRentManagerTitle">
                    <h3>Quản lý các blog được thuê</h3>
                    <div className="typeShowContent">
                            <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Loại phòng
                            </InputLabel>
                            <NativeSelect
                                defaultValue={statusSearch}
                                inputProps={{
                                name: "age",
                                id: "uncontrolled-native",
                                }}
                                onChange={(e) => handleChangeStatus(e.target.value)}
                            >
                                <option value={`rent`}>Đã được thuê</option>
                                <option value={`unrent`}>Đang có sẵn</option>
                                <option value={`isProcess`}>Đang có người chờ duyệt</option>
                            </NativeSelect>
                            </FormControl>
                    </div>
                </div>
                <div className="blogRentManagerList">
                    {blogs.slice().reverse()?.map(blog => (
                        <CardLessor key={blog?._id} blog={blog} statusSearch={statusSearch} onUpdate={handleUpdateRent}  className="card"/>
                    ))}
                    <Card className="card" />
                    <Card className="card" />
                    <Card className="card" />
                    <Card className="card" />
                </div>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Thông báo"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Có {numberNotRent} bài đăng có người đăng ký thuê phòng!
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

export default BlogRentManager;
