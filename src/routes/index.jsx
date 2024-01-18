import HeaderOnly from "../components/HeaderOnly"
import Dashboard from "../pages/admin/pages/Dashboard/Dashboard"
import ChatWithLessor from "../pages/common/ChatWithLessor/ChatWithLessor"
import ContactLessor from "../pages/common/ContactLessor/ContactLessor"
import Detail from "../pages/common/detail/Detail"
import DetailWishList from "../pages/common/DetailWishList/DetailWishList"
import Home from "../pages/common/home/Home"
import Login from "../pages/common/Login/Login"
import Register from "../pages/common/register/Register"
import WishList from "../pages/common/WishList/WishList"
import UploadBlog from "../pages/lessor/UploadBlog/UploadBlog"


const publicRoutes = [
    {path: '/', component: Home },
    {path: '/detail', component: Detail},
    {path: '/login', component: Login, layout: null},
    {path: '/register', component: Register, layout: null},
    {path: '/contact-host', component: ContactLessor},
    {path: '/wishlist', component: WishList, layout: HeaderOnly},
    {path: `/wishlist/:slug`, component: DetailWishList, layout: HeaderOnly},
    {path: '/inbox', component: ChatWithLessor, layout: null},
    {path: '/admin/dashboard', component: Dashboard, layout: null},
    {path: '/lessor/uploadBlog', component: UploadBlog, layout: null}
]

const adminRoutes = [

]

const renterRoutes = [
    
]

const lessorRoutes = [

]

export {publicRoutes, adminRoutes, renterRoutes, lessorRoutes}