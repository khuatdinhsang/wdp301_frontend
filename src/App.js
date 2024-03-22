import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import { adminRoutes, lessorRoutes, publicRoutes, renterRoutes } from "./routes";
import Page404 from "../src/pages/common/Page404/Page404.jsx"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomToastContainer from "./components/component/CustomToast/CustomToastContainer";
import { useSelector } from "react-redux";
// import { StylesProvider } from '@material-ui/core/styles';


axios.defaults.baseURL = "http://localhost:9999"

function App() {

  const account = useSelector(state => state.account);
 
  

  return (
    
    // <StylesProvider>
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
          {renterRoutes?.map((route, index)=> {
              const Page = route.component;
              let Layout = DefaultLayout;
              
              if(route.layout){
                Layout = route.layout
              }
              else if(route.layout === null){
                Layout = Fragment;
              }

              return(
                ((account.role === 'renter') &&
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
                ((account.role === 'lessor') &&
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
                ((account.role === 'admin') &&
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
  // </StylesProvider>
  );
}

export default App;
