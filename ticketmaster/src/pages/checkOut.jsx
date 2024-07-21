import NavBar from "../components/navBar";
import Footer from "../components/footer";
import CartView from "./cart/CartView";

function CheckOut() {
    return (

        <>
            <header>
                <NavBar></NavBar>
            </header>
            <main>
                <CartView></CartView>
            </main>
         
            <Footer></Footer>
        
        </>
    )
}
export default CheckOut;