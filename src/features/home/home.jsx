
import React from 'react';
import StatSection from './components/StatSection';
import Carousel from './components/Carousel';
import ClubCard from '../../shared/components/cards/ClubCard';
import EventCard from '../../shared/components/cards/EventCard';
import PublicationCard from '../../shared/components/cards/PublicationCard';
const Home = () => {
  const clubs = [
    { id: "1", nom: "Club de Danse", description: "Un club pour les passionnés de danse.", createdAt: "2022-01-10", logo: null, instagramme: "https://www.instagram.com/" },
    { id: "2", nom: "Club de Musique", description: "Un club pour les mélomanes.", createdAt: "2023-03-15", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "3", nom: "Club de Théâtre", description: "Un club pour les passionnés de théâtre.", createdAt: "2022-06-05", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "4", nom: "Club de Lecture", description: "Pour les amoureux des livres.", createdAt: "2021-09-01", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "5", nom: "Club de Cuisine", description: "Un club pour les gourmets.", createdAt: "2022-11-20", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "6", nom: "Club de Sport", description: "Pour les passionnés de sport et de fitness.", createdAt: "2020-04-14", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "7", nom: "Club de Voyage", description: "Voyageurs en herbe.", createdAt: "2023-02-25", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "8", nom: "Club d'Art", description: "Un espace pour les créateurs d'art.", createdAt: "2021-12-12", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "9", nom: "Club de Photographie", description: "Pour les passionnés de photographie.", createdAt: "2020-08-30", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "10", nom: "Club de Jardinage", description: "Pour ceux qui aiment cultiver la nature.", createdAt: "2021-07-10", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "11", nom: "Club d'Histoire", description: "Un club pour les passionnés d'histoire.", createdAt: "2022-03-05", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "12", nom: "Club de Cinéma", description: "Pour les amateurs de films.", createdAt: "2023-01-19", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "13", nom: "Club de Débat", description: "Un club pour les orateurs et les penseurs.", createdAt: "2022-04-10", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "14", nom: "Club de Yoga", description: "Un club pour ceux qui aiment la tranquillité et le bien-être.", createdAt: "2021-10-05", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "15", nom: "Club d'Astronomie", description: "Pour les passionnés d'astronomie.", createdAt: "2020-05-15", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "16", nom: "Club de Technologie", description: "Pour les passionnés de gadgets et nouvelles technologies.", createdAt: "2023-06-17", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "17", nom: "Club de Mode", description: "Un club pour les passionnés de mode.", createdAt: "2022-02-22", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "18", nom: "Club de Programmation", description: "Pour ceux qui aiment coder.", createdAt: "2021-11-01", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "19", nom: "Club de Poker", description: "Un club pour les joueurs de poker.", createdAt: "2022-07-25", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
    { id: "20", nom: "Club de Football", description: "Pour les passionnés de football.", createdAt: "2023-09-12", logo: "/bac.jpeg", instagramme: "https://www.instagram.com/" },
  ];
  const events = [
    { id: "1", nom: "Concert de Musique", description: "Un événement de musique live avec plusieurs artistes.", image: "/bac.jpeg", date: "2024-12-15", location: "Salle de Concert, Paris", budget: 5000 },
    { id: "2", nom: "Festival de Danse", description: "Un festival de danse avec des performances exceptionnelles.", image: "/bac.jpeg", date: "2024-11-30", location: "Théâtre Royal, Marrakech", budget: 3000 },
    { id: "3", nom: "Conférence de Technologie", description: "Conférence sur l'avenir de la technologie et de l'IA.", image: "/bac.jpeg", date: "2025-01-10", location: "Centre de Conférence, Casablanca", budget: 10000 },
    { id: "4", nom: "Exposition d'Art", description: "Exposition des artistes locaux.", image: "/bac.jpeg", date: "2024-10-05", location: "Galerie d'Art, Fès", budget: 2000 },
    { id: "5", nom: "Séminaire sur la Durabilité", description: "Séminaire sur les pratiques durables et écologiques.", image: "/bac.jpeg", date: "2024-09-20", location: "Université d'Agadir", budget: 4000 },
    { id: "6", nom: "Festival de Musique Électronique", description: "Un événement vibrant avec des DJs internationaux.", image: "/bac.jpeg", date: "2024-12-25", location: "Plage de Taghazout", budget: 15000 },
    { id: "7", nom: "Hackathon de Programmation", description: "Un hackathon pour les développeurs et programmeurs.", image: "/bac.jpeg", date: "2024-11-12", location: "Campus d'Innovation, Rabat", budget: 8000 },
    { id: "8", nom: "Salon de l'Automobile", description: "Exposition des dernières voitures et innovations automobiles.", image: "/bac.jpeg", date: "2025-02-18", location: "Palais des Expositions, Marrakech", budget: 25000 },
    { id: "9", nom: "Festival de Film", description: "Un festival pour les cinéastes et les passionnés de films.", image: "/bac.jpeg", date: "2024-10-10", location: "Cinéma Le Majestic, Tanger", budget: 6000 },
    { id: "10", nom: "Foire de l'Éducation", description: "Foire éducative pour les étudiants et les jeunes professionnels.", image: "/bac.jpeg", date: "2025-03-05", location: "Université de Marrakech", budget: 5000 },
    { id: "11", nom: "Concert de Jazz", description: "Un concert de jazz avec des musiciens célèbres.", image: "/bac.jpeg", date: "2024-12-05", location: "Jazz Café, Casablanca", budget: 10000 },
    { id: "12", nom: "Marathon International", description: "Un marathon à travers les rues de Casablanca.", image: "/bac.jpeg", date: "2024-11-25", location: "Casablanca, Morocco", budget: 7000 },
    { id: "13", nom: "Carnaval de Marrakech", description: "Célébration culturelle avec des costumes traditionnels.", image: "/bac.jpeg", date: "2025-01-01", location: "Place Jemaa el-Fna", budget: 9000 },
    { id: "14", nom: "Atelier de Photographie", description: "Apprenez la photographie avec des professionnels.", image: "/bac.jpeg", date: "2024-12-08", location: "Studio Photo, Rabat", budget: 3000 },
    { id: "15", nom: "Fête de la Musique", description: "Célébration de la musique avec des concerts gratuits.", image: "/bac.jpeg", date: "2025-06-21", location: "Place Mohammed V, Casablanca", budget: 12000 },
    { id: "16", nom: "Exposition Scientifique", description: "Exposition de projets scientifiques innovants.", image: "/bac.jpeg", date: "2024-11-02", location: "Musée de Science, Rabat", budget: 6000 },
    { id: "17", nom: "Tournée des Startups", description: "Rencontrez les startups les plus innovantes du pays.", image: "/bac.jpeg", date: "2024-10-30", location: "TechHub, Casablanca", budget: 4000 },
    { id: "18", nom: "Compétition de Cuisine", description: "Un concours pour les chefs en herbe.", image: "/bac.jpeg", date: "2025-04-18", location: "Palais des Congrès, Marrakech", budget: 3000 },
    { id: "19", nom: "Festival de Théâtre", description: "Des pièces de théâtre incroyables à voir.", image: "/bac.jpeg", date: "2025-01-17", location: "Théâtre Royal, Casablanca", budget: 8000 },
    { id: "20", nom: "Exposition de Mode", description: "Des créateurs de mode marocains présentent leurs collections.", image: "/bac.jpeg", date: "2024-12-03", location: "Palais des Expositions, Fès", budget: 15000 },
  ];
  const publications = [
    { id: "1", titre: "L'Art de la Photographie", auteur: "Jean Dupont", date: "2024-03-10", image: "/bac.jpeg", description: "Une exploration approfondie de la photographie.",isPublic: true },
    { id: "2", titre: "Les Nouvelles Technologies", auteur: "Marc Lefevre", date: "2023-11-01", image: "/bac.jpeg", description: "Un regard sur l'avenir des technologies." },
    { id: "3", titre: "La Cuisine Marocaine", auteur: "Fatima El Amrani", date: "2024-02-25", image: "/bac.jpeg", description: "Recettes et traditions culinaires du Maroc." },
    { id: "4", titre: "Voyager Autrement", auteur: "Amine Benali", date: "2024-04-10", image: "/bac.jpeg", description: "Des idées de voyages en dehors des sentiers battus." },
    { id: "5", titre: "Le Développement Durable", auteur: "Sofia Lahlou", date: "2023-10-18", image: "/bac.jpeg", description: "Des solutions écologiques pour un futur durable." },
    { id: "6", titre: "L'Art Contemporain", auteur: "Rachid Boulahdour", date: "2024-01-15", image: "/bac.jpeg", description: "Une étude sur les tendances de l'art moderne." },
    { id: "7", titre: "La Révolution Digitale", auteur: "Yassir Zaidi", date: "2024-03-22", image: "/bac.jpeg", description: "L'impact des technologies sur la société moderne." },
    { id: "8", titre: "Les Grandes Découvertes", auteur: "Zineb Amrani", date: "2024-05-05", image: "/bac.jpeg", description: "Une histoire des découvertes scientifiques majeures." },
    { id: "9", titre: "Le Sport au Maroc", auteur: "Khalid Aswat", date: "2023-12-12", image: "/bac.jpeg", description: "L'évolution du sport dans le pays." },
    { id: "10", titre: "L'Économie de Demain", auteur: "Moulay Hicham", date: "2024-02-14", image: "/bac.jpeg", description: "Les tendances économiques à suivre." },
    { id: "11", titre: "Histoire du Maroc", auteur: "Moulay Ali", date: "2024-06-17", image: "/bac.jpeg", description: "Une analyse des événements marquants de l'histoire marocaine." },
    { id: "12", titre: "Les Arts Visuels", auteur: "Khalil Bensaid", date: "2024-08-08", image: "/bac.jpeg", description: "Un focus sur les arts visuels au Maroc." },
    { id: "13", titre: "Le Cinéma Moderne", auteur: "Hassan Belkadi", date: "2024-05-30", image: "/bac.jpeg", description: "Les dernières tendances du cinéma mondial." },
    { id: "14", titre: "Les Mystères de l'Univers", auteur: "Rym Ait", date: "2024-07-01", image: "/bac.jpeg", description: "Une exploration fascinante des secrets de l'univers." },
    { id: "15", titre: "Philosophie et Vie", auteur: "Sami El Khatib", date: "2024-03-10", image: "/bac.jpeg", description: "Réflexions sur la philosophie appliquée à la vie quotidienne." },
    { id: "16", titre: "Réussir sa Carrière", auteur: "Moulay Lahcen", date: "2024-04-22", image: "/bac.jpeg", description: "Des conseils pour réussir dans le monde professionnel." },
    { id: "17", titre: "Architecture du Futur", auteur: "Amine Bouzid", date: "2023-12-25", image: "/bac.jpeg", description: "Les tendances architecturales du futur." },
    { id: "18", titre: "Le Voyage Écologique", auteur: "Samira Baha", date: "2024-03-18", image: "/bac.jpeg", description: "Voyager en respectant l'environnement." },
    { id: "19", titre: "Les Sciences Sociales", auteur: "Nadia Ait", date: "2024-02-20", image: "/bac.jpeg", description: "Une approche des sciences sociales dans la société moderne." },
    { id: "20", titre: "La Mode Durable", auteur: "Sara Jada", date: "2024-04-01", image: "/bac.jpeg", description: "Comment la mode peut devenir plus durable." },
  ];
    
  
    return (
      <div className="space-y-10">
        <StatSection/>
        <Carousel items={clubs}  CardComponent={ClubCard} title="Liste des Clubs"/>
        <Carousel items={events}  CardComponent={EventCard} title="Liste des Events"/>
        <Carousel items={publications}  CardComponent={PublicationCard} title="Liste des Publications"/>
      </div>
    );
  };
  
  export default Home;