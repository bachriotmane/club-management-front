import "../index.css";
import DemandesListing from "./features/demande listing/demande.listing.jsx";
import DemandeDetails from "./features/demande details/demande.details.jsx";
import ClubsListingPage from "./features/clubs listing/clubs.listing.page.jsx";
import EventsListing from "./features/events listing/event.listing.jsx";
import ClubDetails from "./features/club details/club.details.jsx";
import EventDetails from "./features/event details/event.details.jsx";
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import PrivateRoute from "./shared/components/auth/PrivateRoute.jsx";
import Login from "./shared/components/auth/Login.jsx";
import Unauthorized from "./shared/components/auth/Unauthorized.jsx";
import NotFound from "./shared/components/auth/NotFound.jsx";
import SideBarLayout from "./shared/components/SideBarLayout.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<SideBarLayout/>}>
          <Route index element={<DemandesListing />} />
          <Route path="/demande" element={<DemandesListing />} />
          <Route path="/demande/:id" element={<DemandeDetails />} />
          <Route path="/club/:id" element={<ClubDetails />} />
          <Route path="/events" element={<EventsListing />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route element={<PrivateRoute roles={['ROLE_ADMIN']} />}>
            <Route path="/clubs" element={<ClubsListingPage />} />
          </Route>
        </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
