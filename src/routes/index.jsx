import React from "react";
import { Navigate } from "react-router-dom";
import PathConstants from "./pathConstants";

// Every page is its own chunk, loaded when first visited.
const Home = React.lazy(() => import("../components/Home"));
const Missions = React.lazy(() => import("../components/about/Mission"));
const OurTeam = React.lazy(() => import("../components/about/OurTeam"));
const ApplyTutor = React.lazy(() => import("../components/getInvolved/ApplyTutor"));
const ExecTeam = React.lazy(() => import("../components/getInvolved/ExecTeam"));
const VolunteerOpp = React.lazy(() => import("../components/getInvolved/VolunteerOpportunities"));
const EventPrograms = React.lazy(() => import("../components/programs/EventsPrograms"));
const MakingDiff = React.lazy(() => import("../components/programs/MakingDifference"));
const TutoringServices = React.lazy(() => import("../components/programs/TutoringServices"));
const ContactUs = React.lazy(() => import("../components/navBar/ContactUs"));
const DonateNow = React.lazy(() => import("../components/navBar/DonateNow"));
const Charities = React.lazy(() => import("../components/charities/Charities"));
const NotFound = React.lazy(() => import("../components/NotFound"));

const routes = [
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.MISSION, element: <Missions /> },
  { path: PathConstants.OUR_TEAM, element: <OurTeam /> },
  { path: PathConstants.TUTORING_SERVICES, element: <TutoringServices /> },
  { path: PathConstants.MAKING_DIFF, element: <MakingDiff /> },
  { path: PathConstants.EVENTS, element: <EventPrograms /> },
  { path: PathConstants.VOLUNTEER_OPPORTUNITIES, element: <VolunteerOpp /> },
  { path: PathConstants.TUTOR, element: <ApplyTutor /> },
  { path: PathConstants.EXEC_TEAM, element: <ExecTeam /> },
  { path: PathConstants.CONTACT_US, element: <ContactUs /> },
  { path: PathConstants.DONATE_NOW, element: <DonateNow /> },
  { path: PathConstants.CHARITIES, element: <Charities /> },
  // Old URL for the charities page, kept so existing links still work
  { path: "/Charities", element: <Navigate to={PathConstants.CHARITIES} replace /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
