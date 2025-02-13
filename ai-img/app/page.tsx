// // MyComponent.tsx
// import React from 'react';
// import Picsum from './Picsum/page';

// const MyComponent: React.FC = () => {
//   return (
//     <div>
//       <Picsum />
//     </div>
//   );
// }

// export default MyComponent;



"use client";

import React, { useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setLoading(true);
    setError(null);  // Reset error before making the request
    try {
      const response = await axios.post(
        "https://api.deepai.org/api/text2img",
        { text: prompt },
        {
          headers: {
            "Api-Key": "f3332e25-08d5-4fd8-bd7e-26f26f51df97", // Make sure the key is valid
            "Content-Type": "application/json",  // Explicitly setting Content-Type header
          },
        }
      );
      setImage(response.data.output_url);
    } catch (error) {
      // Check if it's an Axios error and log the response
      if (axios.isAxiosError(error)) {
        console.error("Error message:", error.message);
        console.error("Error details:", error.response?.data);
        setError("Failed to generate image. Please check your API key or try again later.");
      } else {
        console.error("Unknown error:", error);
        setError("An unexpected error occurred.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Generate Image from Text</h1>

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border p-2 mb-4"
          placeholder="Enter prompt..."
        />

        <button
          onClick={generateImage}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Generate Image
        </button>

        {loading && <p>Loading...</p>}
        
        {error && <p className="text-red-500">{error}</p>}  {/* Display error message if there is one */}

        {image && !loading && (
          <div>
            <h2 className="mt-4">Generated Image:</h2>
            <img src={image} alt="Generated" className="mt-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;