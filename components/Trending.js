import { DotsHorizontalIcon, SearchIcon } from "@heroicons/react/outline";
import Iman from '../public/assets/iman.jpg'
import Elon from '../public/assets/elon.jpg'
import Kylie from '../public/assets/kim.jpg'
import Image from "next/image";

export default function Trending() {
  return (
    <div className="sticky top-0 h-max hidden lg:flex flex-col items-center w-[400px] p-3 ps-10">
      <div className="bg-[#EFF3F4] text-[#89959D] flex items-center ps-5 h-[44px] rounded-full w-full">
        <SearchIcon className="w-[20px] h-[20px] me-3 w-100" />
        <input
          type="text"
          placeholder="Search Busy Bee"
          className="outline-none bg-transparent h-full w-full"
        />
      </div>
      <div className="bg-[#EFF3F4] rounded-xl w-full mt-4 p-3 pb-5">
        <p className="text-xl font-bold mb-2">What's Happening?</p>
        <TrendingTopic topic={"#ReactJS"} number={"240K"} />
        <TrendingTopic topic={"Angular"} number={"14K"} />
        <TrendingTopic topic={"Donald Trump"} number={"200K"} />
        <TrendingTopic topic={"JavaScript"} number={"190K"} />
      </div>
      <div className="bg-[#EFF3F4] rounded-xl w-full mt-4 p-3 pb-5">
        <p className="text-xl font-bold mb-2">Who to Follow</p>
        <TrendingFollow name={'Iman Musa'} username={'imanmcodes'} profilePicture={Iman}/>
        <TrendingFollow name={'Elon Musk'} username={'elonmusk'} profilePicture={Elon}/>
        <TrendingFollow name={'Kim Kardashian'} username={'kimkardashian'} profilePicture={Kylie}/>
      </div>
    </div>
  );
}

function TrendingTopic({ topic, number }) {
  return (
    <div className="flex flex-col text-sm py-3 cursor-pointer">
      <div className="flex text-[#536471] justify-between text-[13px] mb-0.5">
        <span>Trending in Australia</span>
        <DotsHorizontalIcon className="w-[20px]" />
      </div>
      <span className="font-bold text-md mb-0.5">{topic}</span>
      <span className="text-xs text-[#536471]">{number} Bumbles</span>
    </div>
  );
}

function TrendingFollow({name, username, profilePicture}) {
  return (
    <div className="flex justify-between items-center text-sm py-3">
      <div className="flex items-center">
        <Image src={profilePicture} className="w-14 h-14 rounded-full me-3 object-cover" alt={`Profile Picture of @${username}`}/>
        <div className="flex flex-col">
          <span className="font-bold">{name}</span>
          <span>@{username}</span>
        </div>
      </div>
      <button className="bg-[#0F1419] text-white h-[40px] w-[72px] rounded-full">Follow</button>
    </div>
  );
}
