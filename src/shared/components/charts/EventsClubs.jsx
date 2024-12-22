import React, {useEffect, useState} from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import LoadingSpinner from "../utili/LoadingCompnent.jsx";
import {getChartForClubsEvents} from "../../../repositories/evenements.repository.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EventClubs = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [isLoading, setIsLoading] = useState(false);
    const [clubsEventsData, setClubsEventsData] = useState([]);

    // Static Data for Clubs and Events
    const chartLabels = clubsEventsData.map((item) => item.clubName);
    const chartData = clubsEventsData.map((item) => item.eventsCount);

    const data = {
        labels: chartLabels, // Clubs on X-axis
        datasets: [
            {
                label: `Events in ${selectedYear}`,
                data: chartData,
                backgroundColor: ["#1d4ed8", "#9333ea", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"],
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `Event Distribution for ${selectedYear}`,
            },
        },
    };
    const fetchData = async ()=>{
        try{
            const resp = await getChartForClubsEvents(selectedYear);
            setClubsEventsData(resp);
        }catch (err){
            console.log(err)
        }
    }
    useEffect(() => {
        fetchData().then();
    }, []);

    useEffect(() => {
        fetchData();
    }, [selectedYear]);

    // Dropdown options for last 6 years
    const years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div
            className="w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto justify-center items-center bg-gray-100 p-6 rounded shadow-md">
            <div className="flex items-center space-x-2">
                <label htmlFor="year-filter" className="text-lg font-semibold">
                    Filter by Year:
                </label>
                <select
                    id="year-filter"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div className="w-full ">
                <Bar data={data} options={options}/>
            </div>
        </div>

    );
};

export default EventClubs;
