import { Route,Routes,Router } from "react-router-dom";
import Dashboard from "../pages/dashboard/dashboard";
import Ecobazar from "../pages/e-commerce/ecobazar";
import ProductDetail from "../pages/e-commerce/ProductDetail";
import SignIn from "../pages/auth/entry/signin";
import RegisterPage from "../pages/auth/registerpage/registerpage";
import WeatherApp from "../pages/weather/weather"
import NewsApp from "../pages/news/News";
import News1 from "../pages/news1/news1"




export default function AppRoutes() {
    return (
        <Routes>
             <Route path="/" element={<Dashboard/>}/>
             <Route path="/login" element={<SignIn/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/ecobazar" element={ <Ecobazar/>} />
            <Route path="/productdetail/:id" element={<ProductDetail/>}/>
            <Route path="/weather" element={<WeatherApp/>}/>
            <Route path="/news" element={<NewsApp/>}/>
            <Route path="/news1" element= {<News1/>}/>
        </Routes>
    );
}