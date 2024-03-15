import { FormControl, InputLabel, NativeSelect } from "@mui/material";
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
    const [statusSearch, setStatusSearch] = useState("confirm");

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
            }
        })
        .catch(err => console.log(err))
    },[])

    const handleChangeStatus = (status) => {
        setStatusSearch(status);
    }

    useEffect(() => {
        if(statusSearch === 'confirm'){
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
                }
            })
            .catch(err => console.log(err))
        } else if(statusSearch === 'wait'){
            axios
            .get(`api/blog/ConfirmBlogUser`, {
                headers: {
                Authorization: `Bearer ${account?.token}`,
                },
            })
            .then(res => {
                if(res.data.statusCode === 200){
                    const data =res.data.data;
                    setBlogList(data);
                }
            })
            .catch(err => console.log(err))
        }
    },[statusSearch])

    return(
        <div className="rentRoom">
            <div className="titleRentRoom">
                <h2>Danh sách phòng đã thuê</h2>
                <div className="searchRentRoom">
                    <FormControl fullWidth>
                         <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Loại phòng
                        </InputLabel>
                        <NativeSelect
                            defaultValue={statusSearch}
                            inputProps={{
                            name: "age",
                            id: "uncontrolled-native",
                            }}
                            onChange={(e) => handleChangeStatus(e.target.value)}
                        >
                            <option value={'confirm'}>Đã thuê</option>
                            <option value={'wait'}>Đang chờ duyệt</option>
                        </NativeSelect>
                    </FormControl>
                </div>
            </div>
            <div className="rentRoomList">
                {blogList?.map(item => {
                    return(
                        <div key={item} className='cardInWishList'>
                            <CardRentBlog 
                                item={item}
                                key={item?._id}
                                statusSearch={statusSearch}
                                />
                        </div>
                    ) 
                })}
               
            </div>
        </div>
    )
}

export default RentRoomList