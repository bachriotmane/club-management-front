import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx";
import {useEffect, useState} from "react";
import FilterHeader from "../../shared/components/utili/filter-header.jsx";
import {getDateRange} from "../../shared/components/utili/mappers.js";
import logo from '../../assets/not-items-found.png';
import {getEvents} from "../../repositories/evenements.repository.js";
import EventCard from "../../shared/components/cards/EventCard.jsx";

const EventListing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);


  const fetchEvents = async (reset = false) => {
    if (reset) {
      setEvents([]);
      setFilterDate("")
      setPage(0);
    }

    setIsLoadingMore(true);
    const currentScrollPosition = window.scrollY;
    const { fromDate, toDate } = getDateRange(filterDate);
    try {
      const response = await getEvents({
        page: reset ? 0 : page,
        search: searchKey,
        fromDate,
        toDate,
      });
      setHasMore(response && !response.last);
      setEvents((prevPubs) => (reset ? response.content : [...prevPubs, ...response.content]));
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
    fetchEvents(true).then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchEvents(true).then(() => {
      setIsLoading(false);
    });
  }, [filterDate]);

  const handleSearch = () => {
    fetchEvents(true).then();
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
              onTitleClicked={()=>fetchEvents(true)}
              title="Événements"
              searchTerm={searchKey}
              setSearchTerm={setSearchKey}
              filterDate={filterDate}
              setFilterDate={setFilterDate}
              onSearchComplete={handleSearch}
          />
          {events.length === 0 ? (
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
                    events.map((item, index) => ( <EventCard key={index} item={item}/>
                    ))
                  }
                </div>

                {hasMore && (
                    <div className="flex justify-center">
                      <button
                          type="button"
                          onClick={() => fetchEvents()}
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

export default EventListing;
