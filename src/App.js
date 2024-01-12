import { Button } from "antd";
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import Home from "./pages/common/home/Home";
import { publicRoutes } from "./routes";

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
     </BrowserRouter>
  );
}

export default App;
