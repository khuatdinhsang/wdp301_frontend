import HeaderOnly from "../components/HeaderOnly"
import BlogManagerAdmin from "../pages/admin/pages/BlogManagerAdmin/BlogManagerAdmin"
import Dashboard from "../pages/admin/pages/Dashboard/Dashboard"
import EditBlogManager from "../pages/admin/pages/EditBlogManager/EditBlogManager"
import ChatWithLessor from "../pages/common/ChatWithLessor/ChatWithLessor"
import ContactLessor from "../pages/common/ContactLessor/ContactLessor"
import Detail from "../pages/common/detail/Detail"
import DetailWishList from "../pages/common/DetailWishList/DetailWishList"
import Home from "../pages/common/home/Home"
import Login from "../pages/common/Login/Login"
import Register from "../pages/common/register/Register"
import WishList from "../pages/common/WishList/WishList"
import BlogManager from "../pages/lessor/BlogManager/BlogManagement"
import Profile from "../pages/common/profile/Profile"
import HeaderNoSearch from "../components/component/HeaderNoSearch/HeaderNoSearch"import UploadBlog from "../pages/lessor/UploadBlog/UploadBlog"


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/detail/:slug', component: Detail },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/contact-host', component: ContactLessor },
    { path: '/wishlist', component: WishList, layout: HeaderOnly },
    { path: `/wishlist/:slug`, component: DetailWishList, layout: HeaderOnly },
    { path: '/inbox', component: ChatWithLessor, layout: null },
    { path: '/admin/dashboard', component: Dashboard, layout: null },
    { path: '/admin/blogManager', component: BlogManagerAdmin, layout: null },
    { path: '/admin/editBlog/:slug', component: EditBlogManager, layout: null },
    { path: '/lessor/blogManager', component: BlogManager, layout: null },
    { path: '/lessor/uploadBlog', component: UploadBlog, layout: null },
    { path: '/profile', component: Profile, layout: null },
]

const adminRoutes = [

]

const renterRoutes = [

]

const lessorRoutes = [

]

export { publicRoutes, adminRoutes, renterRoutes, lessorRoutes }