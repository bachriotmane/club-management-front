import PublicationCard from "../../shared/components/cards/PublicationCard";
import {useEffect, useState} from "react";
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx";
import {getPublications} from "../../repositories/publications.repository.js";
import FilterHeader from "../../shared/components/utili/filter-header.jsx";


const PublicationsList = () => {
    const [currentTab, setCurrentTab] = useState("All");
    const [isLoading, setIsLoading] = useState(false);
    const [filterDate, setFilterDate] = useState("last24Hours");
    const [searchKey, setSearchKey] = useState("");
    const [pubs, setPubs] = useState([]);
    const [page, setPage] = useState(0);
    const [error, setError] = useState(null);

    const fetchPubs = async ()=>{
        setIsLoading(true);
        try {
            const scrollPosition = window.scrollY;
            const response = await getPublications(
            {
                page :page
            });
            setPubs(prevProducts => [...prevProducts, ...response]);
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.log(
                "error", error.message
            )
            setError(error.message);
        } finally {
            setIsLoading(false);
            window.scrollTo(0, scrollPosition);
        }
    }
    useEffect(() => {
        fetchPubs().then();
    }, []);
    if(error){
        return <div>
            {error + ""}
        </div>
    }
    return (
        <div className="container w-full mx-auto py-8 px-4">
            <FilterHeader searchTerm={searchKey} setSearchTerm={setSearchKey} activeTab={currentTab}
                          setActiveTab={setCurrentTab} filterDate={filterDate}
                          setFilterDate={setFilterDate}></FilterHeader>
            {pubs.length === 0 ?
                <span className="flex justify-center font-bold text-2xl">Oops pas de publications!</span> :
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            pubs.map(
                                (item, index)=>{
                                    return <PublicationCard key={index} item={item}/>;
                        }
                            )
                        }
                    </div>
                    <div className="flex justify-center">
                        <button type="button" onClick={()=>{
                            fetchPubs();

                        }} disabled={isLoading} className="text-gray-900 bg-white border border-gray-300 rounded-xl p-2">
                            {
                                isLoading ? <LoadingSpinner></LoadingSpinner> : "Load More"
                            }
                        </button>
                    </div>
                </>}

        </div>
    );
};

export default PublicationsList;
