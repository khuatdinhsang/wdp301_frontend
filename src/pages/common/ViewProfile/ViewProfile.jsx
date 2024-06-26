import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { pathBackViewProfile } from "../../../actions/pathActions";
import "./ViewProfile.scss";

function ViewProfile() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [userDetail, setUserDetail] = useState();
  const [splitName, setSplitName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const account = useSelector((state) => state.account);
  const pathBack = useSelector((state) => state.path);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/auth/getProfileUserOther/${slug}`, {
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setUserDetail(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleBack = () => {
    navigate(pathBack);
    const action = pathBackViewProfile("");
    dispatch(action);
  };

  useEffect(() => {
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
    setSplitName(arrName);
  }, [userDetail]);
  const createRoom = () => {
    axios
      .post(
        `/api/room/create`,
        { users: [account?.accessToken?.id, userDetail?._id] },
        {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.users?.length > 0) {
          navigate("/inbox");
        }
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
              {userDetail?.avatar !== undefined ? (
                <img
                  className="avatarProfile"
                  src={`http://${userDetail?.avatar}`}
                />
              ) : (
                <img
                  className="avatarProfile"
                  src={`https://cdn-icons-png.freepik.com/512/219/219986.png`}
                />
              )}
            </div>
            <h1>
              {firstName} <br />
              <span>{lastName}</span>
            </h1>
            <p>
              <span>Email: {userDetail?.email}</span>
              <br />
              <span>SDT:{userDetail?.phone}</span>
              <br />
              <span>
                Giới tính:
                {userDetail?.gender === undefined
                  ? ""
                  : userDetail?.gender
                  ? "Nam"
                  : "Nữ"}
              </span>
            </p>

            <div className="rowProfile">
              <div className="colProfile">
                <h2>{userDetail?.blogsFavorite.length}</h2>
                <p>Liked Blogs</p>
              </div>
              <div className="colProfile">
                <h2>250</h2>
                <p>days</p>
              </div>
              <div className="colProfile">
                <h2>{userDetail?.blogsPost.length}</h2>
                <p>Blogs Post</p>
              </div>
            </div>

            <div className="rowProfile">
              <button variant="outlined" onClick={() => handleBack()}>
                Quay lại
              </button>
              <button onClick={() => createRoom()}>Inbox me</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
