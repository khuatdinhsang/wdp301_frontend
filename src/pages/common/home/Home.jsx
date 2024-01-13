import { useEffect } from "react"
import Card from "../../../components/component/Card"
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