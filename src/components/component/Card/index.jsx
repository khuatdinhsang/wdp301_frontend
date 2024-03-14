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
  const [status, setStatus] = useState();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sizeImage, setSizeImage] = useState(blog?.image?.length);
  const account = useSelector((state) => state.account);

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

  useEffect(() => {
    axios
      .get(`/api/auth/checkFavoutireBlog/${blog?._id}`, {
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        setStatus(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFavouriteRoom = () => {
    if (account?.token) {
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
          if (status === false) {
            toast.success("Yêu thích blog thành công");
          } else {
            toast.success("Bỏ yêu thích blog thành công");
          }
          setStatus(!status);
        })
        .catch((err) => console.log(err));
    } else {
      toast.warn("Vui lòng đăng nhập để yêu thích!");
    }
  };

  return (
    <div className="cardHome">
      {blog?.title ? (
        <>
          <div
            className="imageContainer"
            onClick={() =>
              isHome
                ? navigate(`/detail/${blog?._id}`)
                : navigate(`/editBlog/${blog?._id}`)
            }
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
            <span className="dateBuilding">
              {blog?.description.slice(0, 100)}...
            </span>
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
          {account?.role === "renter" ? (
            <FavoriteIcon
              className="heartCard"
              style={{ color: status === true ? "pink" : "" }}
              onClick={() => handleFavouriteRoom()}
            />
          ) : (
            <></>
          )}
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
