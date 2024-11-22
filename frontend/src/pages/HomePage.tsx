import Carousel from '../widgets/Carousel';

import CarouselCategory from '../widgets/CarouselCategory';
import CarouselProduct from '../features/CarouselProduct';

import HomeCard from '../shared/HomeCard';

export default function HomePage() {
  return (
    <div className="bg-amazonColors-background">
      <div className="max-w-[1500px] min-w-[1000px] bg-gray-300 m-auto">
        <Carousel />
        <div className="grid grid-cols-3 xl:grid-cols-4 -mt-80">
          <HomeCard
            title="We have a surprise for you"
            img="../images/home_grid_1.jpg"
            link="See terms and conditions"
          />
          <HomeCard
            title="Wath the Rings of Power"
            img="../images/home_grid_2.jpg"
            link="Start sreaming now"
          />
          <HomeCard
            title="Ultimited Streaming"
            img="../images/home_grid_3.jpg"
            link="Browse Kindle Ulimited"
          />
          <HomeCard
            title="More titles to explore"
            img="../images/home_grid_4.jpg"
            link="See more"
          />
          <HomeCard title="Shop pet" img="../images/home_grid_5.jpg" link="Sea the deals" />
          <HomeCard title="Spring sale" img="../images/home_grid_6.jpg" link="Learn more" />
          <HomeCard title="Echo bud" img="../images/home_grid_7.jpg" link="See more" />
          <HomeCard
            title="Family Plan: 3 month free"
            img="../images/home_grid_8.jpg"
            link="Learn more"
          />
          <div className="m-4 pt-11">
            <img className="xl:hidden" src="../images/banner_image_2.jpg" />
          </div>
        </div>
        <CarouselProduct />
        <CarouselCategory />
        <div className="h-[200px]">
          <img className="h-[100%] m-auto" src={'../images/banner_image.jpg'} />
        </div>
      </div>
    </div>
  );
}
