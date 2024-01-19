import axios from "axios";
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DefaultLayout from "./components/DefaultLayout";
import { publicRoutes } from "./routes";

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
        </Routes>
        <ToastContainer/>
     </BrowserRouter>
  );
}

export default App;
