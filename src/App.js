import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import { adminRoutes, lessorRoutes, publicRoutes } from "./routes";
import Page404 from "../src/pages/common/Page404/Page404.jsx"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomToastContainer from "./components/component/CustomToast/CustomToastContainer";
import { useSelector } from "react-redux";

axios.defaults.baseURL = "http://localhost:9999"

function App() {

  const account = useSelector(state => state.account);
  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    axios
    .get('/api/auth/profile',{
      headers: {
        Authorization: `Bearer ${account?.token}`
      }
    })
    .then(res => {
      const data = res.data.data;
      if(res.data.isSuccess === true){
        setUserDetail(data);
      }else{
        toast.warn("Có vấn đề khi tải thông tin người dùng!");
      }
    })
    .catch(err => console.log(err))
  },[])

  return (
     <BrowserRouter>
        <Routes>
            {publicRoutes?.map((route, index) => {
              const Page = route.component;
                let Layout = DefaultLayout;
                
                if(route.layout){
                  Layout = route.layout
                }
                else if(route.layout === null){
                  Layout = Fragment;
                }

                return(
                  <Route
                    path={route?.path}
                    element={
                      <Layout>
                          <Page/>
                      </Layout>
                    }
                    key={index}
                  />
                )
            })}
            {lessorRoutes?.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;
                
                if(route.layout){
                  Layout = route.layout
                }
                else if(route.layout === null){
                  Layout = Fragment;
                }

                return(
                  ((userDetail?.role == 'lessor') &&
                    <Route
                      path={route?.path}
                      element={
                        <Layout>
                            <Page/>
                        </Layout>
                      }
                      key={index}
                    />
                  )
                )
            })}

            {adminRoutes?.map((route, index) => {
              const Page = route.component;
                let Layout = DefaultLayout;
                
                if(route.layout){
                  Layout = route.layout
                }
                else if(route.layout === null){
                  Layout = Fragment;
                }

                return(
                  ((userDetail?.role == 'admin') &&
                    <Route
                      path={route?.path}
                      element={
                        <Layout>
                            <Page/>
                        </Layout>
                      }
                      key={index}
                    />
                  )
                )
            })}
            <Route path="*" element={<Page404/>}/>
        </Routes>
        <CustomToastContainer/>
     </BrowserRouter>
  );
}

export default App;
