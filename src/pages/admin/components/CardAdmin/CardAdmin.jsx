import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import StarIcon from "@mui/icons-material/Star";
import "./CardAdmin.scss";

function CardAdmin({ blog }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sizeImage, setSizeImage] = useState(blog?.image.length);
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
  return (
    <div className="cardHome">
      {blog?.title ? (
        <>
          <div
            className="imageContainer"
            onClick={() => navigate(`/admin/editBlog/${blog?._id}`)}
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
              <h2 className="titleCard">{blog?.title}</h2>
              <div className="showStar">
                <StarIcon className="starCard" />
                <span className="numberStarCard"> 5,0</span>
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
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CardAdmin;
