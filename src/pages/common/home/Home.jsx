import { useEffect } from "react"
import Card from "../../../components/component/Card"
import Footer from "../../../components/component/Footer"
import Header from "../../../components/component/Header"
import "./Home.scss"

function Home(){
    useEffect(() => {
        window.scrollTo(0,0);
    },[])
    return(
        <>
            <div className="listCard">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </>
    )
}

export default Home