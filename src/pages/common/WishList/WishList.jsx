import { useEffect, useState } from "react";
import CardWishList from "../../../components/component/CardWishList/CardWishList";
import "./WishList.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CardHome from "../../../components/component/Card";
import { Pagination, Stack } from "@mui/material";

function WishList() {
  const [wishList, setWishList] = useState([]);
  const account = useSelector((state) => state.account);
  useEffect(() => {
    axios
      .get("/api/auth/getAllFavoriteBlogs", {
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        if (res.data.allBlog !== null) {
          const data = res.data.allBlog;
          setWishList(data);
        } else {
          toast.warn("Có vấn đề khi tải blog yêu thích !");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("da", wishList);
  return (
    <div className="wishListPage">
      <h2 className="favouriteWishList">Danh sách Yêu thích</h2>
      <div className="container">
        <div className="topListCard">
          {wishList[0]?.blogsFavorite.map((item) => {
            return (
              <div key={item}>
                {/* <CardWishList item={item} /> */}
                <CardHome blog={item} key={item?._id} />
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="bottomListCard">
        <Stack spacing={2}>
          <Pagination
            count={numberPage}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
          />
        </Stack>
      </div> */}
    </div>
  );
}

export default WishList;
