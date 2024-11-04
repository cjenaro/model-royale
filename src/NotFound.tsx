import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-8 pt-32 flex flex-col xl:flex-row gap-8 justify-center container mx-auto items-center text-center">
      <div className="flex flex-col gap-8 items-center xl:items-start">
        <h1 className="font-title -rotate-3 text-7xl md:text-9xl flex gap-4 flex-col w-fit bg-amber-700 py-4 px-6">
          whoops
        </h1>
        <p className="text-xl max-w-96">Couldn't find that route</p>
        <Link to="/">&larr; go back</Link>
      </div>
    </div>
  );
}
