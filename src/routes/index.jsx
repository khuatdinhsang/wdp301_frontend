import Detail from "../pages/common/detail/Detail"
import Home from "../pages/common/home/Home"
import Login from "../pages/common/Login/Login"


const publicRoutes = [
    {path: '/', component: Home },
    {path: '/detail', component: Detail},
    {path: '/login', component: Login, layout: null}
]

const adminRoutes = [

]

const renterRoutes = [
    
]

const lessorRoutes = [

]

export {publicRoutes, adminRoutes, renterRoutes, lessorRoutes}