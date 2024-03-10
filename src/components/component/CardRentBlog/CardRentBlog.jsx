import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { logDOM } from '@testing-library/react';
import { useState } from 'react'
import { useNavigate } from 'react-router';
import './CardRentBlog.scss'

function CardRentBlog({item}){

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleShowData = () => {
        const id = item?._id;
        navigate(`/detail/${id}`)
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
                    {`Thông tin bạn cùng phòng`}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
                <Button onClick={() => handleShowData()} autoFocus>
                    Xem kỹ hơn
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CardRentBlog