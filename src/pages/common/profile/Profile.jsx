import React, { useEffect, useRef, useState } from "react";
import "./Profile.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import InstagramIcon from '@mui/icons-material/Instagram';
// import FacebookIcon from '@mui/icons-material/Facebook';
import { toast } from "react-toastify";
import HomeIcon from "@mui/icons-material/Home";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export default function Profile() {
  const [userDetail, setUserDetail] = useState();
  const account = useSelector((state) => state.account);
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [smallName, setSmallName] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isChangeImg, setIsChangeImg] = useState(false);
  const [gender, setGender] = useState();
  const [dayCreated, setDayCreated] = useState(0);
  const [hospitalImage, setHospitalImage] = useState({
    file: "",
    base64: "",
  });
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fileInputRef = useRef(null);

  // Hàm xử lý khi click vào hình ảnh
  const handleImageClick = () => {
    // Kích hoạt sự kiện click cho input file khi click vào hình ảnh
    fileInputRef.current.click();
  };

  // Hàm xử lý khi có sự thay đổi trong input file
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    getBase64(file).then((res) => {
      setHospitalImage({
        file: file,
        base64: res,
      });
    });
  };

  useEffect(() => {
    submit();
  }, [hospitalImage]);

  const getBase64 = (file) => {
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

  const submit = async (e) => {
    const formImage = new FormData();
    formImage.append("file", hospitalImage.file);
    if (hospitalImage.file.name) {
      await axios
        .post(`api/upload/file`, formImage, {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        })
        .then(async (res) => {
          setAvatar(res.data.data);
          setIsChangeImg(true);

          const userProfile = {
            fullName: userDetail?.fullName,
            email: userDetail?.email,
            avatar: res.data.data,
            gender: userDetail?.gender,
            phone: userDetail?.phone,
            address: userDetail?.address,
          };
          axios
            .post(`/api/auth/editProfile`, userProfile, {
              headers: {
                Authorization: `Bearer ${account?.token}`,
              },
            })
            .then((res) => {
              toast.success("Thay đổi ảnh đại diện thành công");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return console.log("Ảnh không được để trống", 1);
    }
  };

  useEffect(() => {
    axios
      .get("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        if (res.data.isSuccess === true) {
          setUserDetail(data);
        } else {
          toast.warn("Có vấn đề khi tải thông tin người dùng!");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        if (res.data.isSuccess === true) {
          setUserDetail(data);
        } else {
          toast.warn("Có vấn đề khi tải thông tin người dùng!");
        }
      })
      .catch((err) => console.log(err));
  }, [isEdit]);

  useEffect(() => {
    setFullName(userDetail?.fullName);
    setEmail(userDetail?.email);
    setAvatar(userDetail?.avatar);
    setAddress(userDetail?.address);
    setGender(userDetail?.gender);
    var arrName = userDetail?.fullName.split(" ");
    arrName?.forEach((element, index) => {
      var last = "";
      if (index === 0) {
        setFirstName(element);
      } else {
        last += element;
      }
      setLastName(last);
    });
    setSmallName(arrName);
    const dateFrom = new Date(userDetail?.createdAt).getTime();
    const dateTo = new Date(Date.now());
    const differenceInMilliseconds = Math.abs(dateTo - dateFrom);
    const differenceInDate = differenceInMilliseconds / (60 * 1000 * 60 * 24);
    setDayCreated(Math.ceil(differenceInDate));
  }, [userDetail]);
  const handleEditProfile = () => {
    console.log("gender", gender);
    const userInfor = {
      fullName: fullName,
      email: email,
      avatar: userDetail?.avatar,
      gender: Boolean(gender),
      phone: userDetail?.phone,
      address: address,
    };
    axios
      .post(`/api/auth/editProfile`, userInfor, {
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        toast.success("Thay đổi thông tin thành công");
        handleClose();
        setIsEdit(!isEdit);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profilePage">
      <div className="cardProfile">
        <div className="card-inner">
          <div className="front">
            <h2>{userDetail?.fullName}</h2>
            <p>{userDetail?.address}</p>
            <button>hover me</button>
          </div>
          <div className="back">
            <div className="topBack">
              <span className="homeIcon" onClick={() => navigate("/")}>
                <HomeIcon />
              </span>
              <form onSubmit={submit}>
                {/* <input
                  type="file"
                  className="hospitalImage absolute bottom-0 right-0 w-8 h-8 rounded-[50%] cursor-pointer opacity-0"
                  onChange={(e) => {
                    convertImage(e);
                  }}
                  name="file"
                /> */}
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  name="file"
                />
                {isChangeImg !== true ? (
                  userDetail?.avatar === undefined ? (
                    <img
                      onClick={handleImageClick}
                      className="avatarProfile"
                      src={`https://cdn-icons-png.freepik.com/512/219/219986.png`}
                    />
                  ) : (
                    <img
                      onClick={() => handleImageClick()}
                      className="avatarProfile"
                      src={`http://${userDetail?.avatar}`}
                    />
                  )
                ) : (
                  <img
                    onClick={() => handleImageClick()}
                    className="avatarProfile"
                    src={`http://${avatar}`}
                  />
                )}
                {/* <button type="submit">Submit</button> */}
              </form>
            </div>
            <h1>
              {firstName} <span>{lastName}</span>
            </h1>
            <p>
              <span>Email: {userDetail?.email}</span>
              <br />
              <span>SDT:{userDetail?.phone}</span>
              <br />
              <span>Giới tính:{userDetail?.gender ? "Nam" : "Nữ"}</span>
            </p>
            <div className="rowProfile">
              <div className="colProfile">
                <h2>{userDetail?.blogsFavorite.length}</h2>
                <p>Liked Blogs</p>
              </div>
              <div className="colProfile">
                <h2>{dayCreated}</h2>
                <p>days</p>
              </div>
              <div className="colProfile">
                <h2>{userDetail?.blogsPost.length}</h2>
                <p>Blogs Post</p>
              </div>
            </div>

            <div className="rowProfile">
              <button variant="outlined" onClick={handleClickOpen}>
                Edit
              </button>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  component: "form",
                  onSubmit: (event) => {
                    handleClose();
                  },
                }}
              >
                <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Vui lòng điền đầy đủ thông tin vào trong khung
                  </DialogContentText>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="Tên đầy đủ"
                    // type="email"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="Email "
                    // type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="Địa chỉ"
                    // type="email"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                    variant="standard"
                  />
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={gender}
                    name="radio-buttons-group"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="Nữ"
                      />
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Nam"
                      />
                      {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                    </div>
                  </RadioGroup>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Bỏ qua</Button>
                  <Button onClick={handleEditProfile}>Thay đổi</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
