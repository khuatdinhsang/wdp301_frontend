import { useEffect, useState } from "react";
import CardWishList from "../../../components/component/CardWishList/CardWishList";
import "./WishList.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Pagination, Stack } from "@mui/material";

function WishList() {
  const [wishList, setWishList] = useState([]);
  const account = useSelector((state) => state.account);
  const [numberPage, setNumberPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPage, setLimitPage] = useState(6)
  
  useEffect(() => {
    axios
      .get(`/api/auth/getAllFavoriteBlogs?page=${currentPage}&&limit=${limitPage}`, {
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        if (res.data.allBlog !== null) {
          const data = res.data.allBlog;
          const size = Math.ceil(res.data.totalBlog / 6);
          setWishList(data);
          setNumberPage(size);
        } else {
          toast.warn("Có vấn đề khi tải blog yêu thích !");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`/api/auth/getAllFavoriteBlogs?page=${currentPage}&&limit=${limitPage}`, {
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
  },[currentPage])

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };


  return (
    <div className="wishListPage">
      <h2 className="favouriteWishList">Danh sách Yêu thích</h2>
      <div className="containerWishList">
        <div className="topListCard">
          {wishList[0]?.blogsFavorite.map((item, index) => {
            if(index<(limitPage*currentPage) && index >=(limitPage*(currentPage-1))){
              return (
              <div key={item} className='cardInWishList'>
                {/* <CardWishList item={item} /> */}
                <CardWishList item={item} key={item?._id} />
              </div>
            );
            }
          })}
        </div>
      </div>
      <div className="bottomListCard">
        <Stack spacing={2}>
          <Pagination
            count={numberPage}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
          />
        </Stack>
      </div>
    </div>
  );
}

export default WishList;
