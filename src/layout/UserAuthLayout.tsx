import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const UserAuthLayout = (): JSX.Element => {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <div id="content-wrapper" className="w-full max-w-[400px] mx-auto mt-[69px] py-[60px] flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default UserAuthLayout;