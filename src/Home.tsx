import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-8 pt-32 flex flex-col xl:flex-row gap-8 justify-between container mx-auto items-center">
      <div className="flex flex-col gap-8 items-center xl:items-start">
        <h1 className="font-title -rotate-3 text-7xl md:text-9xl flex gap-4 flex-col w-fit bg-amber-700 py-4 px-6">
          <span>Model</span>
          <span className="ml-10">Royale</span>
        </h1>
        <p className="text-xl max-w-96">
          Compare models against each other and pick the one that best fits your
          case
        </p>
        <Link
          to="/app"
          className="bg-amber-700 text-white hover:text-white hover:bg-amber-600 px-4 py-2 rounded-full w-fit uppercase font-bold cursor-pointer"
        >
          Try it out
        </Link>
      </div>
      <iframe
        className="rounded-2xl shadow-lg max-w-full"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/WQIYiGQ8qUk?si=GIrmQ_DK74ybLjL6"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
}
