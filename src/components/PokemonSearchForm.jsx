import { useState } from 'react';
import { Search, Heart, ArrowLeft, Trash2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertMessage } from './AlertMessage';
import { usePokemonStore } from '../store/usePokemonStore';
import Swal from 'sweetalert2';

export const PokemonSearchForm = ({ title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();

  const { clearFavorites } = usePokemonStore();

  const isOnSpecificRoute = location.pathname === '/pokemons';

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    navigate(`/pokemon/${searchTerm}`);
    console.log('Searching for:', searchTerm);
  };

  const handleViewFavorites = () => {
    // Verifica si estás en una ruta específica

    navigate('/pokemons/favorites');
    console.log('Viewing favorites');
  };

  const handleDeleteFavorites = () => {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton: 'bg-red-500 ml-2 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300',
        cancelButton: 'bg-green-500 mr-2 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300'
      },
      buttonsStyling: false
    });
    
    swalWithTailwindButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        clearFavorites()
        swalWithTailwindButtons.fire({
          title: "Deleted!",
          text: "",
          icon: "success"
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithTailwindButtons.fire({
          title: "Cancelled",
          text: "",
          icon: "error"
        });
      }
    });
  }

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const onGoBack = () => {
    navigate('/')
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{title}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Enter Pokémon name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-200 ease-in-out"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
        <button
          type="submit"
          className="px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
        >
          Search
        </button>
      </form>


      {
        isOnSpecificRoute
          ?
          <button
            onClick={handleViewFavorites}
            className="w-full px-6 py-2 text-purple-600 bg-white border border-purple-600 rounded-lg hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            <Heart className="w-5 h-5 mr-2" />
            View Favorites
          </button>
          : <div className="flex gap-4">
            <button
              onClick={onGoBack}
              className="flex-1 px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>

            <button
              onClick={() => handleDeleteFavorites()}
              className="flex-1 px-6 py-2 text-red-600 bg-white border border-red-600 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Clear Favorites
            </button>
          </div>
      }


      {showAlert && (
        <AlertMessage
          message="Please enter a Pokémon name."
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
};
