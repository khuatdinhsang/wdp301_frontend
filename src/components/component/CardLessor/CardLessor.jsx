import "./CardLessor.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, TableContainer } from "@mui/material";

function CardLessor({ blog }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sizeImage, setSizeImage] = useState(blog?.image?.length);
  const account = useSelector((state) => state.account);
  const [open, setOpen] = useState(false);
  const [renterConfirm, setRenterConfirm] = useState(blog?.Renterconfirm)
  const [listUserRent, setListUserRent] = useState([]);

    useEffect(() => {
        setRenterConfirm(blog?.Renterconfirm);
    }, [])

    useEffect(() => {
        if(renterConfirm !== []){
            var list = []
            renterConfirm.forEach((renter) => {
                 axios
                .get(`/api/auth/getProfileUserOther/${renter}`,{
                        headers: {
                            Authorization: `Bearer ${account?.token}`
                        }
                    })
                .then(res => {
                    const data = res.data.data;
                    list.push(data);
                })
                .catch(err => console.log(err))
            })
            setListUserRent([...listUserRent, list]);
        }
    },[renterConfirm])

    useEffect(() => {
        console.log(listUserRent,22);
    },[listUserRent])
    
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

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
    }

    const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    ];

  

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
            <span className="dateBuilding">{blog?.description}</span>
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
          
          <div className="favouriteChoosen">
            <span>Được khách yêu thích</span>
          </div>
        </>
      ) : (
        <></>
      )}
      <Dialog
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
                {`Thông tin người thuê phòng`}
            </DialogContentText>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell align="left">Tên người dùng</TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {listUserRent.map((user,index) => (
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell align="left">{user?.fullName}</TableCell>
                            <TableCell align="left"><CheckIcon/></TableCell>
                            <TableCell align="left"><DeleteIcon/></TableCell>
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
        </Dialog>
    </div>
  );
}

export default CardLessor;
