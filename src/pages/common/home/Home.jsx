import Card from "../../../components/component/Card"
import Footer from "../../../components/component/Footer"
import Header from "../../../components/component/Header"
import "./Home.scss"

function Home(){
    return(
        <>
            <Header/>
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
            <Footer/>
        </>
    )
}

export default Home