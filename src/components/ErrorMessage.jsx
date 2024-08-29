import { useNavigate } from "react-router-dom";
import PokemonLogo from '../assets/pokemon-logo.png'

export const ErrorMessage = ({ message }) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-24 h-24 bg-gray-100 rounded-full mb-3 flex items-center justify-center overflow-hidden">
                  <img
                    src={ PokemonLogo}
                    alt={'pokemon logo'}
                    className="w-20 h-20 object-contain"
                  />
                </div>
      <h2 className="text-2xl font-bold text-purple-500 mb-4">¡Oops!</h2>
      <p className="text-lg mb-4 text-gray-700 text-center">{message}</p>
      <button
        className="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-700"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};
