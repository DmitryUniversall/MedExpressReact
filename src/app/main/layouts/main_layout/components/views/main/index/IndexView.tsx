import { FC } from "react";
import "./index.css"
import Header from "./components/Header.tsx";
import Features from "./components/Features.tsx";
import About from "./components/About.tsx";
import Services from "./components/Services.tsx";
import FAQ from "./components/FAQ.tsx";
import Contact from "./components/Contact.tsx";
import PopularProducts from "./components/PopularProducts.tsx";

const IndexView: FC = () => {
    return (
        <div id="index" className="w-100">
            <Header/>
            <Features/>
            <PopularProducts/>
            <About/>
            <Services/>
            <FAQ/>
            <Contact/>
        </div>
    )
}


export default IndexView;
