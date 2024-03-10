import { useNavigate } from "react-router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./CardWishList.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CardWishList({ item, onDelete }) {
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  const [status, setStatus] = useState();

  useEffect(() => {
     axios
    .get(`/api/auth/checkFavoutireBlog/${item?._id}`,{
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
    .then(res => {
      setStatus(res.data.data);
    })
    .catch(err => console.log(err))
  },[])

  const handleNavigate = () => {
    navigate(`/detail/${item?._id}`);
  };

   const handleFavouriteRoom = () => {
    const blogFavorite = {
      id: item?._id,
    };
    axios
    .post("/api/auth/blog/favorite", blogFavorite, {
      headers: {
        Authorization: `Bearer ${account?.token}`,
      },
    })
    .then((res) => {
      if(status === false){
        toast.success("Yêu thích blog thành công");
      }else{
        toast.success("Bỏ yêu thích blog thành công");
      }
      onDelete();
      setStatus(!status);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="cardWishListPage" >
      <div className="imageWishList">
        <img
          src={`http://${item?.image[0]}`}
          alt="anh minh hoa"
          // width="350px"
          // height="350px"
          onClick={() => handleNavigate()}
        />
      </div>
      <div className="titleWishList">
        <h4>{item?.title}</h4>
        {/* <i>Đã lưu 2 mục</i> */}
      </div>
      <FavoriteIcon
            className="heartCard"
            style={{ color: status === true ? "pink" : "" }}
            onClick={() => handleFavouriteRoom()}
          />
    </div>
  );
}

export default CardWishList;
