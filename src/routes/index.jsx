import HeaderOnly from "../components/HeaderOnly";
import BlogManagerAdmin from "../pages/admin/pages/BlogManagerAdmin/BlogManagerAdmin";
import UsersManagerAdmin from "../pages/admin/pages/UsersManagerAdmin/UsersManagerAdmin";
import Dashboard from "../pages/admin/pages/Dashboard/Dashboard";
import EditBlogManager from "../pages/admin/pages/EditBlogManager/EditBlogManager";
import ChatWithLessor from "../pages/common/ChatWithLessor/ChatWithLessor";
import ContactLessor from "../pages/common/ContactLessor/ContactLessor";
import Detail from "../pages/common/detail/Detail";
import DetailWishList from "../pages/common/DetailWishList/DetailWishList";
import Home from "../pages/common/home/Home";
import Login from "../pages/common/Login/Login";
import Register from "../pages/common/register/Register";
import WishList from "../pages/common/WishList/WishList";
import BlogManager from "../pages/lessor/BlogManager/BlogManagement";
import Profile from "../pages/common/profile/Profile";
import HeaderNoSearch from "../components/component/HeaderNoSearch/HeaderNoSearch";
import UploadBlog from "../pages/lessor/UploadBlog/UploadBlog";
import ChangePassword from "../pages/common/ChangePassword/ChangePassword";
import ViewProfile from "../pages/common/ViewProfile/ViewProfile";
import RentRoomList from "../pages/common/RentRoomList/RentRoomList";
import BlogRentManager from "../pages/lessor/BlogRentManager/BlogRentManager";
import EditBlog from "../pages/common/editBlog/editBlog";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/detail/:slug", component: Detail },
  { path: "/login", component: Login, layout: null },
  { path: "/changePassword", component: ChangePassword, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: "/contact-host", component: ContactLessor },
  { path: "/inbox", component: ChatWithLessor, layout: null },
  { path: "/admin/editBlog/:slug", component: EditBlogManager, layout: null },
  { path: "/profile", component: Profile, layout: null },
  { path: "/viewProfile/:slug", component: ViewProfile, layout: null },
];

const adminRoutes = [
  { path: "/admin/dashboard", component: Dashboard, layout: null },
  { path: "/admin/blogManager", component: BlogManagerAdmin, layout: null },
  { path: "/admin/users", component: UsersManagerAdmin, layout: null },
];

const renterRoutes = [
  { path: "/uploadBlog", component: UploadBlog, layout: null },
  { path: "/rentRoomList", component: RentRoomList, layout: HeaderOnly },
  { path: "/wishlist", component: WishList, layout: HeaderOnly },
  { path: `/wishlist/:slug`, component: DetailWishList, layout: HeaderOnly },
];

const lessorRoutes = [
  { path: "/lessor/blogManager", component: BlogManager, layout: null },
  { path: "/uploadBlog", component: UploadBlog, layout: null },
  { path: "/lessor/blogRentManager", component: BlogRentManager, layout: null },
  { path: "/editBlog/:slug", component: EditBlog, layout: null },
];

export { publicRoutes, adminRoutes, renterRoutes, lessorRoutes };
