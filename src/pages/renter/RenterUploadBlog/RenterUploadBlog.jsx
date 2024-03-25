import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function RenterUploadBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState();
  const [money, setMoney] = useState();
  const [addressDetail, setAddressDetail] = useState();
  const [rentalObject, setRentalObject] = useState();
  const [expiredTime, setExpiredTime] = useState();
  const [hospitalImages, setHospitalImages] = useState([]);
  const [hospitalImages1, setHospitalImages1] = useState([]);
  const account = useSelector((state) => state.account);
  const [dataImg, setDataImg] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);
  const [timeDuration, setTimeDuration] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pathBack, setPathBack] = useState();
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/blog/RentedBlogUser`, {
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setBlogs(data);
        console.log(currentBlog);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setTitle(currentBlog?.title);
    setDescription(currentBlog?.description);
    setArea(currentBlog?.area);
    setMoney(currentBlog?.money);
    setAddressDetail(currentBlog?.addressDetail);
    setRentalObject(currentBlog?.rentalObject);
    setHospitalImages1(currentBlog?.image);
    setHospitalImages([]);
    console.log(currentBlog);
  }, [currentBlog]);

  const handleChange = (event) => {
    setCurrentBlog(event.target.value);
  };

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
    account?.role === "renter"
      ? setPathBack("/renter/blogManager")
      : setPathBack("/lessor/blogManager");
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
          const data = res.data.data;
          setDataImg(data);
          var newDataImg = hospitalImages1;
          data?.forEach((img) => {
            newDataImg.push(img);
          });
          setHospitalImages1(newDataImg);
          setHospitalImages([]);
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
      hospitalImages1.length === 0 ||
      addressDetail === "" ||
      rentalObject === "" ||
      expiredTime === "" ||
      Number(money) <= 0 ||
      Number(area) <= 0
    ) {
      toast.warn("Vui lòng kiểm tra lại thông tin!!!");
    } else {
      showModal();
    }
  };

  const handleExpiredTime = (e) => {
    var today = new Date().toISOString().slice(0, 10);
    if (e.target.value < today) {
      toast.error("Bạn không được chọn ngày phía trước");
    } else {
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
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  //

  const handleOk = () => {
    const blog = {
      category: account.role === "lessor" ? "rent" : "find_roommates",
      title: title,
      description: description,
      area: +area,
      money: +money,
      image: hospitalImages1,
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
        toast.success("Tạo bài viết thành công,chờ một ít phút!!");
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
        
      >
        <ArrowBackIosRoundedIcon className="backToDashboard" />
      </span> */}
      <div className="uploadContain">
        <div className="mainTitle">
          <div className="noData"></div>
          <div className="uploadTitle">
            <h2>Đăng bài </h2>
          </div>
          <div className="noData">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Phòng
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={currentBlog}
                onChange={handleChange}
                label="Phòng"
              >
                {blogs?.map((blog, index) => {
                  return (
                    <MenuItem key={index} value={blog}>
                      {blog?.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
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
                  className="hospitalImage cursor-pointer  inputPrice"
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
          {account?.role === "renter" ? (
            <div className="listImg">
              {hospitalImages1?.map((img, index) => {
                return (
                  <img
                    key={index}
                    src={`http://${img}`}
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
          {hospitalImages ? (
            <div className="listImg">
              {hospitalImages?.map((img, index) => {
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
          width={500}
        >
          <p style={{ fontSize: "20px" }}>
            Xin vui lòng chuyển 3000 (phí) x {timeDuration} (ngày)={" "}
            <span style={{ marginBottom: 20, color: "red" }}>
              {3000 * timeDuration}
            </span>{" "}
            VND vào stk dưới đây với nội dung:
          </p>
          <b>SĐT đăng kí + tên phòng trọ vừa đăng bài</b>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="http://localhost:9999/file/1709531531645-Screenshot 2024-03-04 125142.png"
              alt="ảnh qr code"
              style={{ width: 300 }}
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

export default RenterUploadBlog;
