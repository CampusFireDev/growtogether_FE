import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";

const Layout = ():JSX.Element => {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <div id="content-wrapper" className="max-w-[1200px] mx-auto mt-[69px] flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
        
    )
}

export default Layout;