export const getTypeColor = (type) => {
    switch (type) {
      case 'fire':
        return 'bg-red-500';
      case 'water':
        return 'bg-blue-500';
      case 'grass':
        return 'bg-green-500';
      case 'electric':
        return 'bg-yellow-500';
      case 'psychic':
        return 'bg-purple-500';
      case 'bug':
        return 'bg-green-400';
      case 'normal':
        return 'bg-gray-500';
      case 'fighting':
        return 'bg-red-600';
      case 'flying':
        return 'bg-blue-400';
      case 'poison':
        return 'bg-purple-600';
      case 'ground':
        return 'bg-brown-500';
      case 'rock':
        return 'bg-gray-700';
      case 'ice':
        return 'bg-cyan-400';
      case 'dragon':
        return 'bg-blue-600';
      case 'dark':
        return 'bg-gray-800';
      case 'steel':
        return 'bg-gray-600';
      case 'fairy':
        return 'bg-pink-500';
      default:
        return 'bg-gray-200';
    }
  };
  