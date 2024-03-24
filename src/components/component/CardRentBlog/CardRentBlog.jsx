import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { logDOM } from '@testing-library/react';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { pathBackViewProfile } from '../../../actions/pathActions';
import './CardRentBlog.scss'

function CardRentBlog({item, statusSearch}){

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const account = useSelector(state => state.account);
    const [status, setStatus] = useState();
    const [userId, setUserId] = useState();
    const [roomate, setRoomate] = useState();
    const [pathName, setPathName] = useState();
    const path = useLocation();
    const dispatch = useDispatch();

     useEffect(() => {
      setPathName(path.pathname);
      setStatus(statusSearch)
    }, [])

    useEffect(() => {
        setUserId(account.accessToken.id);

         axios
        .get(`/api/blog/GetRoomate/${item?._id}`, {
            headers: {
            Authorization: `Bearer ${account?.token}`,
            },
        })
        .then(res => {
            const data = res.data;
            if(data.statusCode === 200){
                setRoomate(data.data);
            }
        })
        .catch(err => console.log(err))
    },[])

    const handleClickOpen = () => {
        if(status === 'confirm' ){
            setOpen(true);
        }else{
            const id = item?._id;
            handleShowData(id);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleShowData = () => {
        const id = item?._id;
        navigate(`/detail/${id}`)
    }
     const handleViewProfile = (id) => {
            const action = pathBackViewProfile(pathName);
            dispatch(action);
            navigate(`/viewProfile/${id}`);
        
    }

    return(
         <div className="cardWishListPage" >
            <div className="imageWishList">
                <img
                src={`http://${item?.image[0]}`}
                alt="anh minh hoa"
                width="350px"
                height="350px"
                onClick={() => handleClickOpen()}
                />
            </div>
            <div className="titleWishList">
                <h4>{item?.title}</h4>
                {/* <i>Đã lưu 2 mục</i> */}
            </div>
            {status === 'confirm' ?<Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Hola Rent - Ứng dụng tìm trọ khu vực Hoà Lạc`}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`Thông tin bạn cùng phòng`}
                </DialogContentText>
                 <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell align="left">Tên người dùng</TableCell>
                        <TableCell align="left">Số điện thoại</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {roomate?.map((user,index) => ( 
                        user?._id !== userId ? <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }} 
                        key={user?._id}
                        >
                            <TableCell component="th" scope="row">
                                {index}
                            </TableCell>
                            <TableCell align="left" className='cursorPointer' onClick={() => handleViewProfile(user?._id)}>{user?.fullName}</TableCell>
                            <TableCell align="left" className='cursorPointer'>{user?.phone}</TableCell>
                            <TableCell align="left" ></TableCell>
                        </TableRow>:<></>
                    ))}
                    
                    </TableBody>
                </Table>
                </TableContainer>    
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
                <Button onClick={() => handleShowData()} autoFocus>
                    Xem kỹ hơn
                </Button>
                </DialogActions>
            </Dialog>:<></>}
        </div>
    )
}

export default CardRentBlog