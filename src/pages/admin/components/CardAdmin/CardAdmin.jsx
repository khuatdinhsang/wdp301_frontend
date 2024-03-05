import { createContext, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import StarIcon from "@mui/icons-material/Star";
import GppGoodIcon from "@mui/icons-material/GppGood";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./CardAdmin.scss";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Typography,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

function CardAdmin({ blog, onDelete }) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sizeImage, setSizeImage] = useState(blog?.image.length);
  const account = useSelector((state) => state.account);
  const [isAccept, setIsAccept] = useState(blog?.isAccepted);
  const [open, setOpen] = useState(false);
  const [openShowData, setOpenShowData] = useState(false);
  const [newBlog, setNewBlog] = useState();
  const [timeAfter, setTimeAfter] = useState("");
  const [timeUnit, setTimeUnit] = useState("phút");
  useEffect(() => {
    const timestampInSeconds = Math.floor(new Date(blog?.createdAt).getTime());
    const dateFrom = new Date(timestampInSeconds);
    const dateTo = new Date(Date.now());
    const differenceInMilliseconds = Math.abs(dateTo - dateFrom);
    const differenceInDate = differenceInMilliseconds / (60 * 1000 * 60);
    if (differenceInDate > 60) {
      setTimeAfter(Math.ceil(differenceInDate / 60));
      setTimeUnit("giờ");
    } else if (differenceInDate > 60 * 24) {
      setTimeAfter(Math.ceil(differenceInDate / 60 / 24));
      setTimeUnit("ngày");
    } else {
      setTimeAfter(Math.ceil(differenceInDate));
      setTimeUnit("phút");
    }
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setNewBlog(blog);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenShowData = () => {
    setOpenShowData(true);
  };

  const handleCloseShowData = () => {
    setOpenShowData(false);
  };

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

  const handleAcceptBlog = (status) => {
    var accept = {
      isAccepted: !isAccept,
    };
    if (isAccept === true) {
      axios
        .put(`/api/blog/BlogDecline/${blog?._id}`, accept, {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        })
        .then((res) => {
          toast.success("Ẩn Blog thành công");
          setIsAccept(false);
          onDelete();
          handleClose();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(`/api/blog/BlogAccept/${blog?._id}`, accept, {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          // if(data.statusCode === 200){
          toast.success("Blog được chuyển sang public thành công");
          setIsAccept(true);
          onDelete();
          handleClose();
          // }else{
          //     toast.error("Chuyển đổi trạng thái Blog không thành công!");
          // }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="cardHome">
      {blog?.title ? (
        <>
          <div
            className="imageContainer"
            onClick={() => handleClickOpenShowData()}
          >
            <img alt="" src={`http://${blog?.image[currentImageIndex]}`} />
          </div>
          <ArrowBackIosRoundedIcon
            className="backIcon"
            onClick={() => handlePreviousImage()}
          />
          <ArrowForwardIosRoundedIcon
            className="nextIcon"
            onClick={() => handleForwardImage()}
          />
          <div className="infoCard">
            <div className="titleRow1">
              <h2 className="titleCard" style={{ color: "red" }}>
                {blog.category === "rent"
                  ? "Cho thuê phòng trọ"
                  : "Tìm người ở ghép"}
              </h2>
              <h2 className="titleCard">
                Người đăng bài: {account.accessToken.fullName}
              </h2>

              {!isAccept ? (
                <h2 className="titleCard">
                  Thời gian:{" "}
                  <span style={{ color: "red" }}>
                    {timeAfter} {timeUnit}
                  </span>{" "}
                  trước
                </h2>
              ) : (
                <></>
              )}
              {isAccept ? (
                <h2 className="titleCard">Tên: {blog.title}</h2>
              ) : (
                <></>
              )}
            </div>

            {/* <p className="priceCard">
              <span className="pricePer">
                {blog?.money?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>{" "}
              / tháng
            </p> */}
          </div>
          {isAccept === true ? (
            <span onClick={() => handleClickOpen()}>
              <GppGoodIcon className="isAcceptIcon" />
            </span>
          ) : (
            <span onClick={() => handleClickOpen()}>
              <HighlightOffIcon className="notAcceptIcon" />
            </span>
          )}
          <Dialog
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
                {`Bạn đã kiểm duyệt Blog này kỹ càng`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Để sau</Button>
              <Button onClick={() => handleAcceptBlog()} autoFocus>
                Đồng ý
              </Button>
            </DialogActions>
          </Dialog>

          <Modal
            open={openShowData}
            onClose={handleCloseShowData}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ borderRadius: "10px" }}
          >
            <Box sx={style}>
              <h2>Thông tin chi tiết </h2>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Tên phòng trọ: {blog?.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Miêu tả: {blog?.description}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Chủ trọ:{account.accessToken.fullName}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Diện tích: {blog?.area} m<m2>2</m2>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Giá tiền:{" "}
                {blog?.money?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Hình ảnh minh họa:
                {blog.image.map((item) => {
                  return (
                    <div key={item}>
                      <img
                        width={100}
                        height={100}
                        src={`http://${item}`}
                        alt="ảnh minh họa"
                      />
                    </div>
                  );
                })}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Địa chỉ: {blog?.addressDetail}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Thời gian hết hạn: {blog?.expiredTime.split("T")[0]}
              </Typography>
            </Box>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CardAdmin;
