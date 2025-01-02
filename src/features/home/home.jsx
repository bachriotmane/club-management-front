import React from 'react';
import StatSection from './components/StatSection';
import Carousel from './components/Carousel';
import ClubCard from '../../shared/components/cards/ClubCard';
import EventCard from '../../shared/components/cards/EventCard';
import PublicationCard from '../../shared/components/cards/PublicationCard';
import {getUser} from "../../auth/auth.js";
import HomeClubListing from '../clubs listing/HomeClubListing.jsx';
import HomeEventsListing from '../events listing/HomeEventsListing.jsx';
import HomePublicationListing from '../publication listing/HomePublicationListing.jsx';
import SecureComponenet from "../../shared/components/utili/SecureComponenet.jsx";
import EventClubs from "../../shared/components/charts/EventsClubs.jsx";
import Charts from "./components/charts.jsx";

const Home = () => {


    return (
        <div className="space-y-10">
            <StatSection/>
            <Charts></Charts>
            <HomeClubListing/>
            <HomeEventsListing/>
            <HomePublicationListing/>
        </div>
    );
};

export default Home;