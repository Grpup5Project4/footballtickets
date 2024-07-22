import NavBar from './components/navBar';
import Footer from './components/footer';
import SignUp from './pages/signUp';
import LogIn from './pages/logIn';
import Profile from './pages/profile';
import Home from './pages/home';
import EventCatalog from './pages/eventCatalog';
import EventDetails from './pages/eventDetails';
import CheckOut from './pages/checkOut';
import Confirmation from './pages/confirmation';
import DashBoard from './pages/dashBoard';
import ContactUs from './pages/contactUs';
import AboutUs from './pages/aboutUs';
import {createBrowserRouter,RouterProvider} from 'react-router-dom' ;
// import './styles/Signup.css';
// import './styles/profile.css';


function App(){
  const router = createBrowserRouter([
  {path:'/',element:<Home />,errorElement : <div>404 Not Found</div>}
 ,{path:'aboutus',element:<AboutUs/> ,errorElement : <div>404 Not Found</div>}
 ,{path:'contactus',element:<ContactUs/> ,errorElement : <div>404 Not Found</div>}
 ,{path:'signup',element:<SignUp/> ,errorElement : <div>404 Not Found</div>}
 ,{path:'catalog',element:<EventCatalog/> ,errorElement : <div>404 Not Found</div>}
 ,{path:'eventdetails',element:<EventDetails/> ,errorElement : <div>404 Not Found</div>}
 ,{path:'login',element:<LogIn/> ,errorElement : <div>404 Not Found</div>}
 ,{path:'checkout',element:<CheckOut/> ,errorElement : <div>404 Not Found</div>}
 ,{path:'confirmation',element:<Confirmation/> ,errorElement : <div>404 Not Found</div>}
 ,{path:'dashboard',element:<DashBoard/> ,errorElement : <div>404 Not Found</div>}
 ,{path:'profile',element:<Profile/> ,errorElement : <div>404 Not Found</div>}

]);

return(
<>

<RouterProvider router={router}/>

</>

  )
}
export default App ;