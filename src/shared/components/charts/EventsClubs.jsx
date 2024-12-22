import React, { useState } from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EventClubs = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // Static Data for Clubs and Events
    const data = {
        labels: ["BAC", "Club 2", "Club 3", "Club 4", "C", "V"], // Clubs on X-axis
        datasets: [
            {
                label: `Events in ${selectedYear}`,
                data: [5, 8, 3, 7, 8, 10],
                backgroundColor: ["#1d4ed8", "#9333ea", "#22c55e"],
            },
        ],
    };

    // Options for Chart
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

    // Dropdown options for last 6 years
    const years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);

    return (
        <div className="w-full sm:w-1/2 lg:w-1/2 justify-center items-center bg-gray-100 p-4 rounded shadow-md">
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

            <div className="w-full h-40">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default EventClubs;
