import { useNavigate } from "react-router";
import "./CardWishList.scss";

function CardWishList({ item }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/detail/${item?._id}`);
  };

  return (
    <div className="cardWishListPage" onClick={() => handleNavigate()}>
      <div className="imageWishList">
        <img
          src={`http://${item?.image[0]}`}
          alt="anh minh hoa"
          width="350px"
          height="350px"
        />
      </div>
      <div className="titleWishList">
        <h4>{item?.title}</h4>
        {/* <i>Đã lưu 2 mục</i> */}
      </div>
    </div>
  );
}

export default CardWishList;
