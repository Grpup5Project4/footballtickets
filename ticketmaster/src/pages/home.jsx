import Available from "./ards";
import Discount from "./SellingFast";
import AboutUs from "./aboutUs";
import Sponsers from "./sponsers";
import Hero from "./hero";
import Navbar from "../components/navBar";
import Footer from "../components/footer";
import Faq from "./faq";
import DiscountCode from "./discount";
function Home (){

  return(

    <>
    <Navbar></Navbar>
<Hero></Hero>
<Available/>
<Sponsers></Sponsers>
<DiscountCode></DiscountCode>
<AboutUs></AboutUs>
     <Discount/>
     <Faq></Faq>
<Footer></Footer>

    
    
    
    
    </>
  )
}
export default Home ;
  