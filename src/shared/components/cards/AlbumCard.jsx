import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { LuSubtitles } from "react-icons/lu";
import { MdDateRange } from "react-icons/md";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import ImageCard from "./ImageCard";

// eslint-disable-next-line react/prop-types
const AlbumCard = ({title,date,location,images}) => {
  return (
    <div className="bg-[#f2f2f2] rounded-xl overflow-hidden">
        <div className="overflow-hidden rounded-xl">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="w-full h-[250px] relative"
            >
                {
                    // eslint-disable-next-line react/prop-types
                    images.map((imageId, idx)=>{
                        return (
                            <SwiperSlide key={idx}>
                                 <ImageCard  imageId={imageId}/>
                            </SwiperSlide>
                        )
                    })
                }
              <CustomSwiperNavButtons />
            </Swiper>
        </div>  
        <div className="flex flex-col text-lg px-4 py-2">
            <div className=" flex gap-2 items-center font-semibold text-xl">
            <LuSubtitles className="text-green-500" />
              {title}
            </div>
            <div className="flex gap-2 items-center text-lg">
              <IoLocation className="text-green-500"/>
              <p>{location}</p>
            </div>
            <div className="flex gap-2 items-center text-lg">
              <MdDateRange className="text-blue-600"/>
              {date}
            </div>
        </div>
    </div> 
  )
}

export default AlbumCard ;

// CustomSwiperNavButtons
const CustomSwiperNavButtons = () => {
    const swiper = useSwiper();  
    return (
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4 z-10">
        <FaChevronCircleLeft
          className="text-white text-3xl cursor-pointer  "
          onClick={() => swiper.slidePrev()} 
        />
        <FaChevronCircleRight
          className="text-white text-3xl cursor-pointer "
          onClick={() => swiper.slideNext()}  
        />
      </div>
    );
}