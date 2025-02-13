"use client";

import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(200);
  const [height, setHeight] = useState<number>(300);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchImage = async () => {
    setLoading(true);
    const response = await fetch(`https://picsum.photos/${width}/${height}`);
    setImage(response.url);
    setLoading(false);
  };

  const handleGenerateImage = () => {
    fetchImage();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Random Image Generator</h1>

        <div className="mb-4">
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="border p-2 mr-2"
            placeholder="Width"
          />
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="border p-2 mr-2"
            placeholder="Height"
          />
          <button
            onClick={handleGenerateImage}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Generate Image
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          image && (
            <img
              src={image}
              alt="Random"
              width={width}
              height={height}
              className="rounded-lg shadow-md"
            />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
