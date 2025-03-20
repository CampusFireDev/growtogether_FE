import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";

const StudyDashboardLayout = ():JSX.Element => {

    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <div id="content-wrapper" className="bg-white9 flex-grow">
                <div className="w-full max-w-[1200px] mx-auto mt-[69px] py-[60px]">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
        
    )
}

export default StudyDashboardLayout;