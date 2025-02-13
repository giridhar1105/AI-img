"use client"

import React, { useState } from 'react';

const Home: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const generateImage = async () => {
    if (!prompt) return;
    
    setLoading(true);
    try {
      // Replace this URL with your actual AI image generation API endpoint
      const response = await fetch('https://picsum.photos/200/300');
      setImage(response.url);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">AI Image Generator</h1>
        
        <div className="mb-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter image description..."
            className="px-4 py-2 border rounded-lg mr-2"
          />
          <button
            onClick={generateImage}
            disabled={loading || !prompt}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Generating...' : 'Generate Image'}
          </button>
        </div>

        {loading && <p className="text-gray-600">Generating image...</p>}
        
        {image && !loading && (
          <img 
            src={image} 
            alt="Generated" 
            width={200} 
            height={300} 
            className="rounded-lg shadow-md mx-auto"
          />
        )}
      </div>
    </div>
  );
};

export default Home;