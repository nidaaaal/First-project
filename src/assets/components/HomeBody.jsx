import { useNavigate } from "react-router-dom";

export default function HomeBody({ image, title, description, link ,colour}) {
  const navigator = useNavigate();

  return (
    <div className="grid grid-cols-2 items-center gap-8 p-8">
      <div>
        <img src={image} className="w-full h-auto object-cover rounded-lg shadow-md" alt={title} />
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <button
          onClick={() => navigator(link)}
          style={{backgroundColor:`${colour}`}}
          className="text-white px-6 py-3 rounded-lg text-lg font-sans hover:bg-black-800 transition"
        >
          Explore {title}
        </button>
      </div>
    </div>
  );
}
