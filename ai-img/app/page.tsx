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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Random Image</h1>
        {image ? (
          <img src={image} alt="Random" width={200} height={300} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
