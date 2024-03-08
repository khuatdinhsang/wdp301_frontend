import "./style.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CardHome({ blog, isHome }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sizeImage, setSizeImage] = useState(blog?.image?.length);
  const account = useSelector((state) => state.account);
  const [listFavorite, setListFavorite] = useState();
  console.log("cas", blog);
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

  useEffect(() => {}, []);

  const handleFavouriteRoom = () => {
    setStatus(!status);
    const blogFavorite = {
      id: blog?._id,
    };
    axios
      .post("/api/auth/blog/favorite", blogFavorite, {
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        toast.success("Yêu thích blog thành công");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="cardHome">
      {blog?.title ? (
        <>
          <div
            className="imageContainer"
            onClick={() => navigate(`/detail/${blog?._id}`)}
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
                  {blog?.avgBlogRate.toFixed(1)}
                </span>
              </div>
            </div>
            <span className="dateBuilding">{blog?.description}</span>
            {!isHome ? (
              account.role === "lessor" && blog.isAccepted ? (
                <p style={{ color: "green", fontSize: "16px" }}>Đã duyệt</p>
              ) : (
                <p style={{ color: "red", fontSize: "16px" }}>Đang chờ duyệt</p>
              )
            ) : (
              <></>
            )}
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
          <FavoriteIcon
            className="heartCard"
            style={{ color: status === true ? "" : "pink" }}
            onClick={() => handleFavouriteRoom()}
          />
          <div className="favouriteChoosen">
            <span>Được khách yêu thích</span>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CardHome;
