import axios from "axios";
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import { publicRoutes } from "./routes";
import Page404 from "../src/pages/common/Page404/Page404.jsx"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomToastContainer from "./components/component/CustomToast/CustomToastContainer";

axios.defaults.baseURL = "http://localhost:9999"

function App() {
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
            <Route path="*" element={<Page404/>}/>
        </Routes>
        <CustomToastContainer/>
     </BrowserRouter>
  );
}

export default App;
