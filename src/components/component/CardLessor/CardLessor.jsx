import "./CardLessor.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import StarIcon from "@mui/icons-material/Star";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, TableContainer } from "@mui/material";
import { pathBackViewProfile } from "../../../actions/pathActions";

function CardLessor({ blog, statusSearch, onUpdate }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sizeImage, setSizeImage] = useState(blog?.image?.length);
  const account = useSelector((state) => state.account);
  const [open, setOpen] = useState(false);
  const [renterConfirm, setRenterConfirm] = useState()
  const [openConfirm, setOpenConfirm] = useState(false);
  const [statusOpen, setStatusOpen] = useState();
  const [currentUserId, setCurrentId] = useState();
  const [index, setIndex] = useState()
  const path = useLocation();
  const [pathName, setPathName] = useState();
  const dispatch = useDispatch();

    useEffect(() => {
      setStatus(statusSearch);
      setPathName(path.pathname);
    }, [])

    const handleAccept = (id) => {
      setStatusOpen(true);
      setCurrentId(id);
      handleClickOpenConfirm();
    }

    const handleDecline = (id) => {
      setStatusOpen(false);
      setCurrentId(id);
      handleClickOpenConfirm();
    }
    
    const handleClickOpenConfirm = () =>{
      setOpenConfirm(true);
    }

    const handleCloseConfirm = () => {
      setOpenConfirm(false);
    }

    const handleViewProfile = (id) => {
            const action = pathBackViewProfile(pathName);
            dispatch(action);
            navigate(`/viewProfile/${id}`);
        
    }

    const handleToRent = () =>{
      if(statusOpen === true){
        axios
        .put(`/api/blog/RentedRoomConfirm/${blog?._id}/${currentUserId}`,{},{
                headers: {
                    Authorization: `Bearer ${account?.token}`
                }
            })
          .then(res => {
            toast.success("Xác nhận thuê trọ cho người dùng thành công!");
            setOpen(false);
            setOpenConfirm(false);
            onUpdate();
          })
          .catch(err => console.log(err))
          
      }else{
        axios
        .put(`/api/blog/RentedRoomUnConfirm/${blog?._id}/${currentUserId}`,{},{
                headers: {
                    Authorization: `Bearer ${account?.token}`
                }
            })
          .then(res => {
            toast.success("Từ chối thuê trọ của người dùng thành công!");
            setOpen(false);
            setOpenConfirm(false);
            onUpdate();
          })
          .catch(err => console.log(err))
      }
    }

   const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    const handleShowData = () => {
         const id = blog?._id;
        navigate(`/detail/${id}`)
    }

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : sizeImage - 1
    );
  };

  const handleForwardImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < sizeImage - 1 ? prevIndex + 1 : 0
    );
  };



  

  return (
    <div className="cardHome">
      {blog?.title ? (
        <>
          <div
            className="imageContainer"
            onClick={handleClickOpen}
          >
            <img alt="" src={`http://${blog?.image[currentImageIndex]}`} />
          </div>
          {currentImageIndex !== 0 ? (
            <ArrowBackIosRoundedIcon
              className="backIcon"
              onClick={() => handlePreviousImage()}
            />
          ) : (
            ""
          )}
          {currentImageIndex !== sizeImage - 1 ? (
            <ArrowForwardIosRoundedIcon
              className="nextIcon"
              onClick={() => handleForwardImage()}
            />
          ) : (
            ""
          )}
          <div className="infoCard">
            <div className="titleRow">
              <h2 className="titleCard">{blog?.title}</h2>
              <div className="showStar">
                <StarIcon className="starCard" />
                <span className="numberStarCard">
                  {" "}
                  {blog?.avgBlogRate.toFixed(1)}
                </span>
              </div>
            </div>
            <span className="dateBuilding">{blog?.description.slice(0, 100)}...</span>
            <p className="priceCard">
              <span className="pricePer">
                {blog?.money?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>{" "}
              / tháng
            </p>
          </div>
          
          {blog?.totalFavorite >= 5 ?<div className="favouriteChoosen">
            <span>Được khách yêu thích</span>
          </div>:<></>}
        </>
      ) : (
        <></>
      )}
      {status === 'unrent' ?<></>:<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialogCardLessor"
        >
            <DialogTitle id="alert-dialog-title">
                {`Hola Rent - Ứng dụng tìm trọ khu vực Hoà Lạc`}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {statusSearch === 'unrent'?`Thông tin người đăng ký thuê phòng`:'Thông tin người thuê phòng'}
            </DialogContentText>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell align="left">Tên người dùng</TableCell>
                        <TableCell align="left">{statusSearch === 'isProcess' ? "Đồng ý" : "Số điện thoại"}</TableCell>
                        <TableCell align="left">{statusSearch === 'isProcess' ? "Từ chối" : ""}</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {status === 'rent' && blog?.Renterid?.map((user,index) => (
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }} 
                        key={user?._id}
                        >
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell align="left" onClick={() => handleViewProfile(user?._id)}>{user?.fullName}</TableCell>
                           {statusSearch === 'isProcess'? <TableCell align="left" onClick={() => handleAccept(user?._id)}><CheckIcon  /></TableCell>
                           : <TableCell align="left" >{user?.phone}</TableCell>}
                            {statusSearch === 'isProcess' ? <TableCell align="left"  className="deleteIconCard"  onClick={()=> handleDecline(user?._id)}><DeleteIcon/></TableCell>:<></>}
                        </TableRow>
                    ))}
                    {status === 'isProcess' && blog?.Renterconfirm?.map((user,index) => (
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }} 
                        key={user?._id}
                        >
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell align="left" onClick={() => handleViewProfile(user?._id)}>{user?.fullName}</TableCell>
                           {statusSearch === 'isProcess'? <TableCell align="left" onClick={() => handleAccept(user?._id)}><CheckIcon/></TableCell>
                           : <TableCell align="left" >{user?.phone}</TableCell>}
                            {statusSearch === 'isProcess' ? <TableCell align="left" onClick={()=> handleDecline(user?._id)}><DeleteIcon/></TableCell>:<></>}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Đóng</Button>
            <Button onClick={() => handleShowData()} autoFocus>
                Xem thông tin phòng
            </Button>
            </DialogActions>
        </Dialog>}

        <Dialog
                        open={openConfirm}
                        onClose={handleCloseConfirm}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {`Hola Rent - Ứng dụng tìm trọ khu vực Hoà Lạc`}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        {statusOpen === true ? "Bạn muốn xác nhận cho người dùng này thuê phòng?":"Bạn muốn từ chối yêu cầu thuê phòng của người dùng này?"}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseConfirm}>Để sau</Button>
                        <Button onClick={() => handleToRent()} autoFocus>
                            Đồng ý
                        </Button>
                        </DialogActions>
                    </Dialog>
    </div>
  );
}

export default CardLessor;
