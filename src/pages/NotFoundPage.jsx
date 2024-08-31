import React from 'react';
import { ErrorMessage, Footer } from '../components';

export const NotFoundPage = () => {
  return (
    <div className='h-full'>
        <ErrorMessage message="Pokémon could not be found. Please try another name." />;
        <Footer />
    </div>
  );
};
