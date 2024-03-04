import axios from "axios"
import Slider from "rc-slider"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import CardHome from "../../../components/component/Card"
import 'rc-slider/assets/index.css';
import "./Home.scss"
import { Box, FormControl, InputLabel, NativeSelect, Button, Pagination, Stack } from "@mui/material"

function Home(){

    const [blogs, setBlogs] = useState()
    const [displayBlogs, setDisplayBlogs] = useState([])
    const [minPriceMin, setMinPriceMin] = useState(1500000);
    const [maxPriceMin, setMaxPriceMin] = useState(4000000);
    const [minPriceMax, setMinPriceMax] = useState(1500000);
    const [maxPriceMax, setMaxPriceMax] = useState(4000000);
    const [priceSearchMin, setPriceSearchMin] = useState(minPriceMin);
    const [priceSearchMax, setPriceSearchMax] = useState(maxPriceMax);
    const [minAreaMin, setMinAreaMin] = useState(20);
    const [maxAreaMin, setMaxAreaMin] = useState(40);
    const [areaSearchMin, setAreaSearchMin] = useState(minAreaMin);
    const [minAreaMax, setMinAreaMax] = useState(20);
    const [maxAreaMax, setMaxAreaMax] = useState(40);
    const [areaSearchMax, setAreaSearchMax] = useState(maxAreaMax);
    const [currentPage, setCurrentPage] = useState(1)
    const [status, setStatus] = useState(false);
    const [numberPage, setNumberPage] = useState();
    const [statusSearch, setStatusSearch] = useState('');

    useEffect(() => {
        window.scrollTo(0,0);

        axios
        .get(`/api/blog/getAllAccepted/rent?page=1&&limit=10`)
        .then(res => {
            if(res.data.isSuccess === true){
                const data = res.data.data.allBlog;
                const size = res.data.data.totalBlog;
                setStatus(false);
                setBlogs(data)
                setDisplayBlogs(data);
                setNumberPage(Math.ceil(size/10));
            }
        })
        .catch(err => console.log(err))
    },[])

    useEffect(() => {
        axios
        .get(`/api/blog/getAllAccepted/${statusSearch}?page=1&&limit=10`)
        .then(res => {
            if(res.data.isSuccess === true){
                const data = res.data.data.allBlog;
                const size = res.data.data.totalBlog;
                setStatus(false);
                setBlogs(data)
                setDisplayBlogs(data);
                setNumberPage(Math.ceil(size/10));
            }
        })
        .catch(err => console.log(err))
    },[statusSearch])

    useEffect(() => {
        if(status=== false){
            axios
            .get(`/api/blog/getAllAccepted/rent?page=${currentPage}&&limit=10`)
            .then(res => {
                if(res.data.isSuccess === true){
                    const data = res.data.data.allBlog;
                    const size = res.data.data.totalBlog;
                    setBlogs(data)
                    setDisplayBlogs(data);
                    setNumberPage(Math.ceil(size/10));
                }
            })
            .catch(err => console.log(err))
        }else{
             const dataSearch = {
                minPrice: priceSearchMin,
                maxPrice: priceSearchMax,
                minArea: areaSearchMin,
                maxArea: areaSearchMax
            }

            axios
            .post(`/api/blog/searchBlog?page=${currentPage}&&limit=10`,dataSearch)
            .then(res => {
                const data = res.data.data.allBlog;
                const size = res.data.data.totalBlog;
                const lengthData = data.filter(d => d.isAccepted === true)
                setDisplayBlogs(data);
                setBlogs(data)
                setNumberPage(Math.ceil(lengthData.length/10));
            })
            .catch(err => console.log(err))
        }
    }, [currentPage])


    useEffect(() => {
        if(priceSearchMin >= priceSearchMax){
            setPriceSearchMin(priceSearchMax-1);
        }
    },[priceSearchMin, priceSearchMax])

     useEffect(() => {
        if(areaSearchMin >= areaSearchMax){
            setAreaSearchMin(areaSearchMax-1);
        }
    },[areaSearchMin, areaSearchMax])


    const handlePriceMinChange = (price) => {
        setPriceSearchMin(price);
    }
    const handlePriceMaxChange = (price) => {
        setPriceSearchMax(price)
    }
    const handleAreaMinChange = (area) => {
        setAreaSearchMin(area);
    }
    const handleAreaMaxChange = (area) => {
        setAreaSearchMax(area);
    }

    const handleSearchHome = () => {
        setCurrentPage(1);
        const dataSearch = {
            minPrice: priceSearchMin,
            maxPrice: priceSearchMax,
            minArea: areaSearchMin,
            maxArea: areaSearchMax
        }

        axios
        .post(`/api/blog/searchBlog?page=1&&limit=10`,dataSearch)
        .then(res => {
            const data = res.data.data.allBlog;
             const size = res.data.data.totalBlog;
             const lengthData = data.filter(d => Boolean(d.isAccepted) === true)
             setStatus(true);
            setDisplayBlogs(data);
            console.log(lengthData);
            // setNumberPage(Math.ceil(lengthData.length/10));
        })
        .catch(err => console.log(err))
    }

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    }

    const handleChangeStatus = (status) => {
        setStatusSearch(status);
    }
    
    return(
        <div className="homePage">
            <div className="leftHomePage"> 
                <h1>Tìm kiếm</h1>
                <div className="minPrice">
                    <h3 className="h3Price">Giá thấp nhất</h3>
                    <Slider
                        min={minPriceMin}
                        max={maxPriceMin}
                        value={priceSearchMin}
                        onChange={handlePriceMinChange}
                    />
                    <p className="pPrice"> {priceSearchMin?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                </div>
                <div className="maxPrice">
                    <h3 className="h3Price">Giá cao nhất</h3>
                    <Slider
                        min={minPriceMax}
                        max={maxPriceMax}
                        value={priceSearchMax}
                        onChange={handlePriceMaxChange}
                    />
                    <p className="pPrice">{priceSearchMax?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                </div>
                <div className="maxPrice">
                    <h3 className="h3Price">Diện tích nhỏ nhất</h3>
                    <Slider
                        min={minAreaMin}
                        max={maxAreaMin}
                        value={areaSearchMin}
                        onChange={handleAreaMinChange}
                    />
                    <p className="pPrice">{areaSearchMin} m<m2>2</m2></p>
                </div>
                <div className="maxPrice">
                    <h3 className="h3Price">Diện tích lớn nhất</h3>
                    <Slider
                        min={minAreaMax}
                        max={maxAreaMax}
                        value={areaSearchMax}
                        onChange={handleAreaMaxChange}
                    />
                    <p className="pPrice">{areaSearchMax} m<m2>2</m2></p>
                </div>
                <div className="divSearchHome">
                    <Button variant="contained" onClick={() => handleSearchHome()}>Xác nhận</Button>
                </div>


            </div>
            <div className="listCard">
                <div className="typeListCard">
                    <Box sx={{ minWidth: 120 }} className={'selectType'}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Loại phòng
                            </InputLabel>
                            <NativeSelect
                                defaultValue={statusSearch}
                                inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                }}
                                onChange={e => handleChangeStatus(e.target.value)}
                            >
                            <option value={`rent`}>Thuê phòng</option>
                            <option value={`find_roommates`}>Tìm bạn ở ghép</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                </div>
                <div className="topListCard">
                    {displayBlogs?.slice().reverse().map(blog => {
                        if( blog?.isAccepted === true){
                            return (
                                <CardHome 
                                    blog={blog}
                                    key={blog?._id}
                                />
                                
                            )
                        }
                    })}
                    <CardHome/>
                    <CardHome/>
                    <CardHome/>
                    <CardHome/>
                    <CardHome/>
    
                </div>
                <div className="bottomListCard">
                    <Stack spacing={2}>
                        <Pagination count={numberPage} page={currentPage} variant="outlined" shape="rounded"  onChange={handleChangePage}/>
                    </Stack>
                </div>
            </div>
        </div>
    )
}

export default Home