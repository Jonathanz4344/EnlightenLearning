import React from "react";
import PathConstants from "./pathConstants";
// import Booking from "../components/navBar/Booking";
// import ContactUs from "../components/navBar/ContactUs";

const Home = React.lazy(() => import("../components/Home"));

const routes = [
  { path: PathConstants.HOME, element: <Home /> },
  // { path: PathConstants.BOOKING, element: <Booking /> },
  // { path: PathConstants.CONTACTUS, element: <ContactUs /> },


];

export default routes;
