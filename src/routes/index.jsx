import React from "react";
import PathConstants from "./pathConstants";
import Missions from "../components/about/Mission";
import OurTeam from "../components/about/OurTeam";
import ApplyTutor from "../components/getInvolved/ApplyTutor";
import ExecTeam from "../components/getInvolved/ExecTeam";
import VolunteerOpp from "../components/getInvolved/VolunteerOpportunities";
import EventPrograms from "../components/programs/EventsPrograms";
import MakingDiff from "../components/programs/MakingDifference";
import TutoringServices from "../components/programs/TutoringServices";
import ContactUs from "../components/navBar/ContactUs";
import DonateNow from "../components/navBar/DonateNow";
import Charities from "../components/charities/Charities";

const Home = React.lazy(() => import("../components/Home"));

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
];

export default routes;
