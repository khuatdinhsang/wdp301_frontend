
import "./style.scss"
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { pathBackViewProfile } from "../../../actions/pathActions";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating } from "@mui/material";

function Comment({content, onDelete, onUpdate}){

    const account = useSelector(state => state.account);
    const [commentId, setCommentId] = useState('')
    const [blogId, setBlogId] = useState('');
    const [star, setStar] = useState()
    const path = useLocation();
    const [time, setTime] = useState()
    const [open, setOpen] = useState(false);
    const [pathName, setPathName] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();


   

    function getLabelText(value) {
      return `${value} Star${value !== 1 ? 's' : ''}`;
    }

    useEffect(() => {
        setCommentId(content?._id);
        setBlogId(content?.blogId);
        setStar(content?.star);
        const timeComment = content?.time.split('T')[0];
        setTime(timeComment);
        setPathName(path.pathname)
    },[])

    const handleMoveToProfile = () => {
        if(account?.phone !== undefined){
            const action = pathBackViewProfile(pathName);
            dispatch(action);
            navigate(`/viewProfile/${content?.userId}`);
        }else{
            const action = pathBackViewProfile(pathName);
            dispatch(action);
            navigate("/login")
            toast.warn("Vui lòng đăng nhập để xem thông tin người dùng này");
        }
    }

    const handleUpdate = () =>{
        onUpdate(content);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickOpen =() => {
        setOpen(true);
    }

    const handleDelete = () => {
        axios
        .delete(`/api/blog_rate/delete/${commentId}`,{
                headers: {
                        Authorization: `Bearer ${account?.token}`
                    }
            })
        .then(res => {
            const data = res.data;
            if(data.statusCode === 200){
                setOpen(false);
                toast.success("Delete successfully!");
                navigate(`/detail/${blogId}`)
            }else{
                toast.error("Không thể xoá bình luận")
            }
        })
        .catch(err => console.log(err))

        onDelete(commentId)
    }

    return (
        <div className="comment">
            <div className="userComment">
                <div className="avatarComment" onClick={() => handleMoveToProfile()} >
                    {content?.avt !== undefined?<img class="i9if2t0 atm_e2_idpfg4 atm_vy_idpfg4 atm_mk_stnw88 atm_e2_1osqo2v__1lzdix4 atm_vy_1osqo2v__1lzdix4 atm_mk_pfqszd__1lzdix4 i1cqnm0r atm_jp_pyzg9w atm_jr_nyqth1 i1de1kle atm_vh_yfq0k3 dir dir-ltr" aria-hidden="true" alt="Gaby" decoding="async" elementtiming="LCP-target" src={`http://${content?.avt}`} data-original-uri="https://a0.muscache.com/im/pictures/user/4225ae51-026e-4a06-b468-59bbad9b93b8.jpg?im_w=240" style={{objectFit: "cover"}}></img>
                    :<img className="avatarProfile" src={`https://cdn-icons-png.freepik.com/512/219/219986.png`} />}
                </div>
                <div className="detailUserComment">
                    <div className="topDetailUserComment">
                        <span className="usernameComment">
                            {content?.fullname}
                        </span>
                        {content?.userId === account?.accessToken?.id?<>
                            <span onClick={() => handleUpdate()}><EditIcon className="editIcon"/></span>
                            <span onClick={() => handleClickOpen()}><DeleteIcon className="deleteIcon"/></span>
                        </>:''}
                    </div>
                    <i className="placeComment">
                        Thach That, Ha Noi
                    </i>
                </div>
            </div>
            <div className="userRating">
                {/* <StarIcon  className='starCard'/>
                <StarIcon  className='starCard'/>
                <StarIcon  className='starCard'/>
                <StarIcon  className='starCard'/>
                <StarIcon  className='starCard'/> */}
                <Box
                    sx={{
                        width: 200,
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                    <Rating
                        name="hover-feedback"
                        value={content?.star}
                        precision={1}
                        getLabelText={getLabelText}
                        readOnly
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                </Box>
                <b className="numberStarComment">{time}</b>
            </div>
            <div className="commentContent">
                <p>{content?.title}</p>
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
                   {`Bạn chắc chắn muốn xoá bình luận này`}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Để sau</Button>
                <Button onClick={() => handleDelete()} autoFocus>
                    Đồng ý
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Comment
