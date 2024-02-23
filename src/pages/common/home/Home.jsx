import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import CardHome from "../../../components/component/Card"
import "./Home.scss"

function Home(){

    const [blogs, setBlogs] = useState()

    useEffect(() => {
        window.scrollTo(0,0);

        axios
        .get("/api/blog/getAll/rent")
        .then(res => {
            if(res.data.isSuccess === true){
                const data = res.data.data;
                setBlogs(data)
                
            }
        })
        .catch(err => console.log(err))
    },[])

    
    return(
        <>
            <div className="listCard">
                {blogs?.map(blog => {
                    return (
                        <CardHome 
                            blog={blog}
                            key={blog?._id}
                        />
                        
                    )
                })}
                <CardHome/>
                <CardHome/>
                <CardHome/>
            </div>
        </>
    )
}

export default Home