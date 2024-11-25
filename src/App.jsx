import "../index.css";
import DemandesListing from "./features/demande listing/demande.listing.jsx";
import DemandeDetails from "./features/demande details/demande.details.jsx";
import ClubsListingPage from "./features/clubs listing/clubs.listing.page.jsx";
import EventsListing from "./features/events listing/event.listing.jsx";
import ClubDetails from "./features/club details/club.details.jsx";
import EventDetails from "./features/event details/event.details.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./shared/components/auth/Login.jsx";
import Unauthorized from "./shared/components/auth/Unauthorized.jsx";
import NotFound from "./shared/components/auth/NotFound.jsx";
import SideBarLayout from "./shared/components/SideBarLayout.jsx";
import Home from "./features/home/home.jsx";
import PublicationsList from "./features/publication listing/publication.listing.jsx";
import PublicationDetails from "./features/publication details/publication.details.jsx";
import Profile from "./shared/components/auth/Profile.jsx";
import EnterEmail from "./shared/components/auth/EnterEmailPage.jsx";
import ForgetPassword from "./shared/components/auth/ForgetPassword.jsx";
import ClubMembersListing from "./features/club members listing/ClubMembersListing.jsx";
import CreatePublication from "./features/create-new-pub/CreatePublication.jsx";
import SignUp from "./shared/components/auth/SignUp.jsx";
import Confirmation from "./shared/components/auth/Confirmation.jsx";
import ChangePasswordPage from "./shared/components/auth/ChangePassword.jsx";
import Historiques from "./features/historiques/historiques.jsx";
import DeposeDemande from "./features/deposer demande/demande.depose.jsx";
import DemandeHistorique from "./features/demande historique/DemandeHistorique.jsx";
import ChangeProfile from "./shared/components/auth/ChangeProfil.jsx";
import PrivateRoute from "./shared/components/auth/PrivateRoute.jsx";
import UpdatePublication from "./features/update publication/update.publication.jsx";
import React from "react";
import Albums from "./features/AlbumListing/Albums.jsx";
import CreateAlbum from "./features/addAlbum/CreateAlbum.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<EnterEmail />} />
        <Route path="/reset-password" element={<ForgetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/confirmation" element={<Confirmation />} />

      <Route element={<PrivateRoute />} >
        <Route element={<SideBarLayout />}>
          <Route index element={<Home />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/change-profile" element={<ChangeProfile />} />
          <Route path="/demandes" element={<DemandesListing />} />
          <Route path="/demandes/deposer" element={<DeposeDemande />} />
          <Route path="/demandes/:id" element={<DemandeDetails />} />
          <Route path="/demandes/historique/:id" element={<DemandeHistorique />} />
          <Route path="/club/:uuid" element={<ClubDetails />} />
          <Route path="/club/albums/:clubId" element={<Albums/>}/>
          <Route path="/albums/:clubId" element={<CreateAlbum />}/>
          <Route path="/club/:uuid/membres" element={<ClubMembersListing />} />
          <Route path="/events" element={<EventsListing />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/clubs" element={<ClubsListingPage />} />
          <Route path="/publications" element={<PublicationsList />} />
          <Route path="/historiques/:id" element={<Historiques />} />
          <Route path="/publication/:id" element={<PublicationDetails />} />
          <Route path="/publication/update/:id" element={<UpdatePublication />} />
          <Route path="/publication/create" element={<CreatePublication />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
