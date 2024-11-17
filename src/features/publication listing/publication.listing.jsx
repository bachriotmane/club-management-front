import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx";
import {useEffect, useState} from "react";
import FilterHeader from "../../shared/components/utili/filter-header.jsx";
import {getPublications} from "../../repositories/publications.repository.js";
import PublicationCard from "../../shared/components/cards/PublicationCard.jsx";
import {getDateRange} from "../../shared/components/utili/mappers.js";
import logo from '../../assets/not-items-found.png';

const PublicationsList = () => {
    const [currentTab, setCurrentTab] = useState("All");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [filterDate, setFilterDate] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [pubs, setPubs] = useState([]);
    const [page, setPage] = useState(0);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const userId = 'bb4a46c7-7b33-4e32-9ff7-3a50efa4ed1b';
    const fetchPubs = async (reset = false) => {
        if (reset) {
            setPubs([]);
            setFilterDate("")
            setPage(0);
        }

        setIsLoadingMore(true);
        const currentScrollPosition = window.scrollY;
        const { fromDate, toDate } = getDateRange(filterDate);
        try {
            const response = await getPublications({
                page: reset ? 0 : page,
                search: searchKey,
                fromDate,
                toDate,
                isPublic : currentTab === "All",
                userId : userId
            });
            setHasMore(response && !response.last);
            setPubs((prevPubs) => (reset ? response.content : [...prevPubs, ...response.content]));
            setPage((prevPage) => (reset ? 1 : prevPage + 1));
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoadingMore(false);
            window.scrollTo(0, currentScrollPosition);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchPubs(true).then(() => {
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchPubs(true).then(() => {
            setIsLoading(false);
        });
    }, [filterDate]);

    useEffect(() => {
        console.log(currentTab);
        setIsLoading(true);
        setFilterDate("")
        fetchPubs(true).then(() => {
            setIsLoading(false);
        });
    }, [currentTab]);

    const handleSearch = () => {
        fetchPubs(true).then();
    };

    if (error) {
        return (
            <div
                className="flex mt-20 text-2xl font-bold bg-red-100 text-red-950 p-2 rounded-xl justify-center items-center">
                {error}
            </div>
        );
    }

    return (
        <>
                <div className="container w-full mx-auto py-8 px-4">
                    <FilterHeader
                        onTitleClicked={()=>fetchPubs(true)}
                        title="Publications"
                        searchTerm={searchKey}
                        setSearchTerm={setSearchKey}
                        activeTab={currentTab}
                        setActiveTab={setCurrentTab}
                        filterDate={filterDate}
                        setFilterDate={setFilterDate}
                        onSearchComplete={handleSearch}
                    />
                    {pubs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center mt-20 ">
                            <img className="w-1/6 h-1/4 object-cover" src={logo} alt="salam"/>
                            <span className="font-bold text-2xl">Oops pas de publications!</span>
                        </div>
                    ) : isLoading ? <div className="h-screen flex justify-center items-start mt-36">
                        <LoadingSpinner></LoadingSpinner>
                    </div> : (
                        <>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {
                                    pubs.map((item, index) => ( <PublicationCard key={index} item={item}/>
                            ))
                                }
                            </div>

                            {hasMore && (
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() => fetchPubs()}
                                        disabled={isLoadingMore}
                                        className="text-gray-900 bg-white border border-gray-300 rounded-xl p-2"
                                    >
                                        {isLoadingMore ? <LoadingSpinner/> : "Load More"}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
        </>
    );
};

export default PublicationsList;
