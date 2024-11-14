const FilterHeader = ({ activeTab = "All", setActiveTab, filterDate, setFilterDate, searchTerm, setSearchTerm }) => {
    return (
        <div className="flex justify-between items-center mb-6 bg-white p-4 shadow-md rounded-lg">
            <div className="flex space-x-4">
                <button
                    onClick={() => setActiveTab("All")}
                    className={`px-6 py-2 rounded-lg font-semibold transition duration-300 ${
                        activeTab === "All"
                            ? "bg-orange-500 text-white shadow-md"
                            : "bg-orange-100 text-gray-700 hover:bg-orange-100"
                    }`}
                >
                    All
                </button>
                <button
                    onClick={() => setActiveTab("Publications")}
                    className={`px-6 py-2 rounded-lg font-semibold transition duration-300 ${
                        activeTab === "Publications"
                            ? "bg-orange-500 text-white shadow-md"
                            : "bg-orange-100 text-gray-700 hover:bg-orange-100"
                    }`}
                >
                    For me
                </button>
            </div>

            <div className="flex space-x-4 items-center">
                {/* Date Filter */}
                <select
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm text-gray-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300"
                >
                    <option value="last24Hours">Last 24 hours</option>
                    <option value="lastWeek">Last week</option>
                    <option value="lastMonth">Last month</option>
                </select>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300"
                />
            </div>
        </div>
    );
};

export default FilterHeader;
