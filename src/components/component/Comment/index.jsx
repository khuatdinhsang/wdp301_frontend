
import "./style.scss"
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Box, Rating } from "@mui/material";

function Comment({content, onDelete, onUpdate}){

    const [isUpdating, setIsUpdating] = useState(false);
    const account = useSelector(state => state.account);
    const [commentId, setCommentId] = useState('')
    const [blogId, setBlogId] = useState('');
    const [star, setStar] = useState()
    const navigate = useNavigate();

    function getLabelText(value) {
      return `${value} Star${value !== 1 ? 's' : ''}`;
    }

    useEffect(() => {
        setCommentId(content?._id);
        setBlogId(content?.blogId);
        setStar(content?.star);
    },[])

    const handleUpdate = () =>{
        onUpdate(content);
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
            toast.success("Delete successfully!");
            navigate(`/detail/${blogId}`)
        })
        .catch(err => console.log(err))

        onDelete(commentId)
    }

    return (
        <div className="comment">
            <div className="userComment">
                <div className="avatarComment">
                    <img class="i9if2t0 atm_e2_idpfg4 atm_vy_idpfg4 atm_mk_stnw88 atm_e2_1osqo2v__1lzdix4 atm_vy_1osqo2v__1lzdix4 atm_mk_pfqszd__1lzdix4 i1cqnm0r atm_jp_pyzg9w atm_jr_nyqth1 i1de1kle atm_vh_yfq0k3 dir dir-ltr" aria-hidden="true" alt="Gaby" decoding="async" elementtiming="LCP-target" src="https://a0.muscache.com/im/pictures/user/4225ae51-026e-4a06-b468-59bbad9b93b8.jpg?im_w=240" data-original-uri="https://a0.muscache.com/im/pictures/user/4225ae51-026e-4a06-b468-59bbad9b93b8.jpg?im_w=240" style={{objectFit: "cover"}}></img>
                </div>
                <div className="detailUserComment">
                    <div className="topDetailUserComment">
                        <span className="usernameComment">
                            {content?.fullname}
                        </span>
                        {content?.userId === account?.accessToken?.id?<>
                            <span onClick={() => handleUpdate()}><EditIcon className="editIcon"/></span>
                            <span onClick={() => handleDelete()}><DeleteIcon className="deleteIcon"/></span>
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
                        value={content.star}
                        precision={1}
                        getLabelText={getLabelText}
                        readOnly
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                </Box>
                <b className="numberStarComment">3 tuần trước</b>
            </div>
            <div className="commentContent">
                <p>{content.title}</p>
            </div>
        </div>
    )
}

export default Comment
