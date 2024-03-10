import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux"
import { toast } from "react-toastify";
import CardRentBlog from "../../../components/component/CardRentBlog/CardRentBlog";
import "./RentRoomList.scss"

function RentRoomList(){

    const account = useSelector(state => state.account);
    const [blogList, setBlogList] = useState();

    useEffect(() => {
        axios
        .get(`/api/blog/RentedBlogUser`, {
            headers: {
            Authorization: `Bearer ${account?.token}`,
            },
        })
        .then(res => {
            if(res.data.statusCode === 200){
                const data =res.data.data;
                setBlogList(data);
                console.log(data);
            }
        })
        .catch(err => console.log(err))
    },[])

    return(
        <div className="rentRoom">
            <div className="titleRentRoom">
                <h2>Danh sách phòng đã thuê</h2>
            </div>
            <div className="rentRoomList">
                {blogList?.map(item => {
                    return(
                        <div key={item} className='cardInWishList'>
                            <CardRentBlog 
                                item={item}
                                key={item?._id}
                                />
                        </div>
                    ) 
                })}
               {blogList?.map(item => {
                    return(
                        <div key={item} className='cardInWishList'>
                            <CardRentBlog 
                                item={item}
                                key={item?._id}
                                />
                        </div>
                    ) 
                })}
            </div>
        </div>
    )
}

export default RentRoomList