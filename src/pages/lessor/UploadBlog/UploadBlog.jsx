import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import "./UploadBlog.scss";
import { toast } from "react-toastify";
import { Button, Modal } from "antd";

function UploadBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState();
  const [money, setMoney] = useState();
  const [addressDetail, setAddressDetail] = useState();
  const [rentalObject, setRentalObject] = useState();
  const [expiredTime, setExpiredTime] = useState();
  const [hospitalImages, setHospitalImages] = useState([]);
  const account = useSelector((state) => state.account);
  const [dataImg, setDataImg] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);
  const [timeDuration, setTimeDuration] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pathBack, setPathBack] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setIsConfirm(false);
  }, [hospitalImages]);

  const getBase64Multiple = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  useEffect(() => {
    account?.role === "renter" ? setPathBack("/renter/blogManager") : setPathBack("/lessor/blogManager");
  }, [account]);

  const convertMultipleImage = (e) => {
    const files = e.target.files;
    const promises = Array.from(files).map((file) => getBase64Multiple(file));

    Promise.all(promises)
      .then((base64Results) => {
        const newImages = base64Results.map((base64, index) => ({
          file: files[index],
          base64: base64,
        }));
        setHospitalImages((prevImages) => [...prevImages, ...newImages]);
      })
      .catch((error) => {
        console.error("Error converting images to base64:", error);
      });
  };
  const submitMultipleImg = async (e) => {
    e.preventDefault();
    const formImage = new FormData();
    hospitalImages.forEach((image) => {
      formImage.append("files", image.file);
    });
    if (formImage) {
      await axios
        .post(`api/upload/files`, formImage, {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        })
        .then(async (res) => {
          setDataImg(res.data.data);
          setIsConfirm(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return console.log("Ảnh không được để trống");
    }
  };

  const handleOptionRental = (e) => {
    setRentalObject(e.target.value);
  };

  const handleUploadBlog = () => {
    if (
      title === "" ||
      description === "" ||
      area === "" ||
      money === "" ||
      dataImg.length === 0 ||
      addressDetail === "" ||
      rentalObject === "" ||
      expiredTime === ""
    ) {
      toast.warn("Có thông tin chưa điền!!!");
    } else {
      showModal();
    }
  };

  const handleExpiredTime = (e) => {
    setExpiredTime(e.target.value);
    const date = new Date(e.target.value);
    const timestampTo = date.getTime();
    const timestampFrom = Date.now();
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Số miligiây trong một ngày

    const differenceInMilliseconds = Math.abs(timestampTo - timestampFrom);
    const differenceInDays = Math.floor(
      differenceInMilliseconds / millisecondsPerDay
    );
    setTimeDuration(differenceInDays + 1);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const blog = {
      category: account.role === "lessor" ? "rent" : "find_roommates",
      title: title,
      description: description,
      area: +area,
      money: +money,
      image: dataImg,
      video: ["http://video1.jpg", "http://video2.jpg"],
      addressDetail: addressDetail,
      rentalObject: rentalObject,
      expiredTime: expiredTime,
    };
    axios
      .post("api/blog/create", blog, {
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        toast.success("Tạo blog thành công,chờ một ít phút!!");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="uploadPage">
      {/* <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate(pathBack);
          // {account?.role === "renter"? () => navigate("/") : navigate('/admin/dashboard')}
        }}
      >
        <ArrowBackIosRoundedIcon className="backToDashboard" />
      </span> */}
      <div className="uploadContain">
        <h2 className="uploadTitle">Đăng bài </h2>
        <div className="uploadContent">
          <div className="inputBox">
            <label htmlFor="inputName">Tiêu đề</label>
            <input
              type="text"
              className="inputName"
              id="inputName"
              placeholder="Nhập tiêu đề"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <label htmlFor="inputPrice">Miêu tả</label>
            <textarea
              value={description}
              placeholder="Nhập miêu tả"
              onChange={(e) => setDescription(e.target.value)}
              className="inputName"
            />
          </div>
          <div className="inputBox">
            <label htmlFor="description">Diện tích</label>
            <input
              className="inputPrice"
              id="description"
              placeholder="Nhập diện tích"
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <label htmlFor="inputQuantity">Giá</label>
            <input
              type="number"
              className="inputPrice"
              id="inputQuantity"
              placeholder="Nhập giá tiền"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <form onSubmit={submitMultipleImg}>
              <div className="inputBox">
                <label htmlFor="">Ảnh</label>
                <input
                  type="file"
                  multiple="true"
                  className="hospitalImage absolute bottom-0 right-0 w-8 h-8 rounded-[50%] cursor-pointer opacity-0 inputPrice"
                  onChange={(e) => {
                    convertMultipleImage(e);
                  }}
                  name="files"
                />
                {isConfirm ? (
                  ""
                ) : (
                  <button
                    type="submit"
                    className="submitImgUpload"
                    onClick={submitMultipleImg}
                  >
                    Xác nhận
                  </button>
                )}
              </div>
            </form>
          </div>
          {hospitalImages ? (
            <div className="=listImg">
              {hospitalImages.map((img, index) => {
                return (
                  <img
                    key={index}
                    src={img.base64}
                    alt="abc"
                    width={100}
                    height={100}
                  />
                );
              })}
            </div>
          ) : (
            <></>
          )}

          <div className="inputBox">
            <label htmlFor="inputQuantity">Địa chỉ </label>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                className="inputPrice"
                id="inputQuantity"
                placeholder="Thành phố Hà nội"
                readOnly="true"
                style={{ border: 0 }}
              />
              <input
                type="text"
                className="inputPrice"
                id="inputQuantity"
                placeholder=" Huyện Thạch Thất"
                readOnly="true"
                style={{ border: 0 }}
              />
              <input
                type="text"
                className="inputPrice"
                id="inputQuantity"
                placeholder="Xã Thạch Hòa"
                readOnly="true"
                style={{ border: 0 }}
              />
            </div>
          </div>
          <div className="inputBox">
            <label htmlFor="inputQuantity">Địa chỉ cụ thể </label>
            <input
              type="text"
              className="inputPrice"
              id="inputQuantity"
              placeholder="Nhập địa cụ thể VD: số nhà 24, thôn 6"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <label htmlFor="inputQuantity">Đối tượng</label>
            <div className="inputRadio">
              <label htmlFor="both">
                <input
                  type="radio"
                  className="inputPrice"
                  name="rental"
                  id="both"
                  value={"both"}
                  checked={rentalObject === "both"}
                  onChange={handleOptionRental}
                />
                Cả 2
              </label>
              <label htmlFor="male">
                <input
                  type="radio"
                  className="inputPrice"
                  id="male"
                  name="rental"
                  value={"male"}
                  checked={rentalObject === "male"}
                  onChange={handleOptionRental}
                />
                Nam
              </label>
              <label htmlFor="female">
                <input
                  type="radio"
                  className="inputPrice"
                  name="rental"
                  value={"female"}
                  id="female"
                  checked={rentalObject === "female"}
                  onChange={handleOptionRental}
                />
                Nữ
              </label>
            </div>
          </div>
          <p style={{ color: "red" }}>
            Note: Chi phí đăng bài : mỗi ngày tương đương với 3000đ
          </p>
          <div className="inputBox">
            <label htmlFor="inputQuantity">Ngày hết hạn bài đăng</label>
            <input
              type="date"
              className="inputPrice"
              id="inputQuantity"
              placeholder="Ngày hết hạn"
              value={expiredTime}
              onChange={(e) => handleExpiredTime(e)}
            />
          </div>
          {expiredTime && (
            <p>
              Thời gian tồn tại bài viết với{" "}
              <span style={{ color: "red" }}>{timeDuration}</span> ngày
            </p>
          )}
          <div className="submitForm">
             <span 
              className="uploadBtn1" 
              onClick={() => {
                navigate(pathBack);
              }}
            >
              Quay lại
            </span>
            <span className="uploadBtn" onClick={() => handleUploadBlog()}>
              Đăng bài
            </span>
          </div>
        </div>
      </div>
      <>
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={600}
        >
          <p style={{ marginBottom: "50px", fontSize: "20px" }}>
            Xin vui lòng chuyển 3000 (phí) x {timeDuration} (ngày)={" "}
            <span style={{ color: "red" }}>{3000 * timeDuration}</span> VND vào
            stk dưới đây
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="http://localhost:9999/file/1709531531645-Screenshot 2024-03-04 125142.png"
              alt="ảnh qr code"
            />
          </div>
          <p style={{ color: "red", marginTop: "50px", fontSize: "20px" }}>
            Lưu ý bài viết sẽ tự động ẩn đi sau {timeDuration} (ngày)
          </p>
        </Modal>
      </>
    </div>
  );
}

export default UploadBlog;
