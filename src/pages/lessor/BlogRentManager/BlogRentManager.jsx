import "./BlogRentManager.scss"
import SidebarAdmin from '../../admin/components/SideBarAdmin/SidebarAdmin';
import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import Card from '../../../components/component/Card';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CardLessor from "../../../components/component/CardLessor/CardLessor";


function BlogRentManager(){

    const [statusSearch, setStatusSearch] = useState("rent");
    const [blogs, setBlogs] = useState([])
    const account = useSelector(state => state.account);

    const handleChangeStatus = (status) => {
        setStatusSearch(status);
    }

    useEffect(() => {
        if(statusSearch === 'rent'){
            axios
            .get(`/api/blog/GetRentedRoomLessorRentOut`,{
                headers: {
                    Authorization: `Bearer ${account?.token}`
                }
            })
            .then(res => {
                if(res.data.statusCode === 200){
                    const data = res.data.data;
                    setBlogs(data);
                }
            })
            .catch(err => console.log(err))
        }else if(statusSearch === 'unrent'){
            axios
            .get(`/api/blog/GetUnrentedRoomLessorRentOut`,{
                headers: {
                    Authorization: `Bearer ${account?.token}`
                }
            })
            .then(res => {
                if(res.data.statusCode === 200){
                    const data = res.data.data;
                    setBlogs(data);
                }
            })
            .catch(err => console.log(err))
        }
    },[statusSearch])

    return(
        <div className="blogRentManager">
            <SidebarAdmin className={'sidebarBlogRent'}/>
            <div className="blogRentManagerContent">
                <div className="blogRentManagerTitle">
                    <h2>Quản lý các blog được thuê</h2>
                    <div className="typeShowContent">
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
                                <option value={`rent`}>Đã được thuê</option>
                                <option value={`unrent`}>Chưa được thuê</option>
                            </NativeSelect>
                            </FormControl>
                    </div>
                </div>
                <div className="blogRentManagerList">
                    {blogs.slice().reverse()?.map(blog => (
                        <CardLessor key={blog?._id} blog={blog} className="card"/>
                    ))}
                    <Card className="card" />
                    <Card className="card" />
                    <Card className="card" />
                    <Card className="card" />
                </div>
            </div>
        </div>
    )
}

export default BlogRentManager