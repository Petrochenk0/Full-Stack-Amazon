interface HomePageProps {
  title: string;
  img: string;
  link: string;
}

export default function HomeCard({ title, img, link }: HomePageProps) {
  return (
    <div className="h-[430px] bg-white z-10 m-4">
      <div className="text-lg xl:text-xl font-semibold ml-4 mt-4">{title}</div>
      <div className="h-[300px] m-4">
        <img className="h-[100%] w-[100%] object-cover" src={img} alt={title} />
      </div>
      <div className="text-xs xl-text-sm text-blue-400 ml-4">{link}</div>
    </div>
  );
}
