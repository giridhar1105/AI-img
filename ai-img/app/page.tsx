"use client"

import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch('https://picsum.photos/200/300');
      setImage(response.url);
    };

    fetchImage();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Random Image</h1>
        {image ? (
          <img 
            src={image} 
            alt="Random" 
            width={200} 
            height={300} 
            className="rounded-lg shadow-md"
          />
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Home;