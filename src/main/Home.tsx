import Study from "../views/Study";
import Carousel from "../components/common/ui/Carousel";

const Home = ():JSX.Element =>{

    return (
        <>
        <Carousel/>
        <Study isHome={true}/>
        </>
    )
}

export default Home;