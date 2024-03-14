import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardHome from '../../../components/component/Card';
import CardLessor from '../../../components/component/CardLessor/CardLessor';
import SidebarAdmin from '../../admin/components/SideBarAdmin/SidebarAdmin';
import './RenterBlogManagement.scss'

function RenterBlogManagement(){
     const [statusSearch, setStatusSearch] = useState("unrent");
    const [blogs, setBlogs] = useState([])
    const account = useSelector(state => state.account);
    const [isUpdate, setIsUpdate] = useState(false);
    const [numberNotRent, setNumberNotRent] = useState(0);
    const [open, setOpen] = useState(true);


    const handleClose = () => {
        setOpen(false);
    }

    const handleChangeStatus = (status) => {
        setStatusSearch(status);
    }


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
                    var num = 0;
                    data?.forEach(blog => {
                        if(blog?.Renterconfirm.length > 0){
                            num++;
                        }
                    })
                    setNumberNotRent(num);
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
                           
                    </div>
                </div>
                <div className="blogRentManagerList">
                    {blogs.slice().reverse()?.map(blog => (
                        <CardLessor key={blog?._id} blog={blog} statusSearch={statusSearch} onUpdate={handleUpdateRent}  className="card"/>
                    ))}
                    <CardHome className="card" />
                    <CardHome className="card" />
                    <CardHome className="card" />
                    <CardHome className="card" />
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
                    Có {numberNotRent} blogs có người đăng ký!
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Đóng
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RenterBlogManagement