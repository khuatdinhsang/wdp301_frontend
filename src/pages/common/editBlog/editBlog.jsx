/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Button, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import "./editBlog.scss";

function EditBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [area, setArea] = useState("");
  const [money, setMoney] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [totalRoom, setTotalRoom] = useState("");
  const [rentalObject, setRentalObject] = useState("");
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  const [hospitalImages, setHospitalImages] = useState([]);
  const [dataImg, setDataImg] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);
  useEffect(() => {
    axios
      .get(`/api/blog/detail/${slug}`)
      .then((res) => {
        const data = res.data.data;
        setBlog(data);
        setTitle(data.title);
        setDescription(data.description);
        setImages(data.image || []); // If the 'images' field is not present in the data, default to an empty array
        setArea(data.area);
        setMoney(data.money);
        setAddressDetail(data.addressDetail);
        setTotalRoom(data.totalRoom);
        setRentalObject(data.rentalObject);
      })
      .catch((err) => console.log(err));
  }, [slug]);

  const handleEditBlog = async () => {
    if (
      title === "" ||
      description === "" ||
      area === "" ||
      money === "" ||
      addressDetail === "" ||
      dataImg.length === 0
    ) {
      toast.warn("Có thông tin chưa điền!!");
      return;
    }

    const blogEdit = {
      category: "rent",
      title: title,
      description: description,
      area: +area,
      money: +money,
      image: [...dataImg, ...image],
      addressDetail: addressDetail,
      rentalObject: rentalObject,
    };
    console.log("img", [...dataImg, ...image]);
    try {
      await axios.put(`/api/blog/edit/${slug}`, blogEdit, {
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      });
      toast.success("Chỉnh sửa thông tin blog thành công!!");
      navigate("/lessor/blogManager");
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi khi chỉnh sửa blog!!");
    }
  };

  const handleOptionRental = (e) => {
    setRentalObject(e.target.value);
  };

  useEffect(() => {
    setTitle(blog?.title);
    setDescription(blog?.description);
    setArea(blog?.area);
    setMoney(blog?.money);
    setImages(blog?.image || []);
    setAddressDetail(blog?.addressDetail);
    setTotalRoom(blog?.totalRoom);
    setRentalObject(blog?.rentalObject);
  }, [blog]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    const imageObjects = files.map((file) => ({
      file: file,
      preview: URL.createObjectURL(file),
    }));

    setNewImages([...newImages, ...imageObjects]);
  };

  const removeImage = (index) => {
    if (index < image.length) {
      const updatedImages = [...image];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
    } else {
      const updatedNewImages = [...newImages];
      updatedNewImages.splice(index - image.length, 1);
      setNewImages(updatedNewImages);
    }
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
  return (
    <div className="uploadPage">
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/admin/blogManager");
        }}
      >
        <ArrowBackIosRoundedIcon className="backToDashboard" />
      </span>
      <div className="uploadContain">
        <h3 className="uploadTitle">Edit Blog</h3>
        <div className="uploadContent">
          <div className="inputBox">
            <label htmlFor="inputName">Tiêu đề Blog</label>
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
            <input
              type="text"
              className="inputPrice"
              id="inputPrice"
              placeholder="Nhập miêu tả"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            <label htmlFor="inputImages">Ảnh</label>
            <div>
              {image.map((image, index) => {
                return (
                  <div key={index} className="imageItem">
                    <img
                      className="previewImage"
                      src={`http://${image}`}
                      alt={`Image ${index}`}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <button onClick={() => removeImage(index)}>Xóa</button>
                  </div>
                );
              })}
            </div>
            <div className="inputBox">
              <form onSubmit={submitMultipleImg}>
                <div className="inputBox">
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
          </div>
          <div className="inputBox">
            <label htmlFor="inputQuantity">
              Địa chỉ{" "}
              <span style={{ fontSize: "15px", color: "grey" }}>
                Hòa Lạc, Thạch Thất, Hà Nội
              </span>
            </label>

            <input
              type="text"
              className="inputPrice"
              id="inputQuantity"
              placeholder="Nhập địa chỉ trọ"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <label htmlFor="inputQuantity">Đối tượng thuê</label>
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
          <div className="submitForm">
            <span className="uploadBtn" onClick={() => handleEditBlog()}>
              Edit Blog
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBlog;
