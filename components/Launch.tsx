// src/components/Launch.tsx
import React from 'react';

const Launch = () => {
  return (
    <section
      data-theme="forest"
      className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-24"
    >
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Ready to Dive into the World of NFTs?
        </h2>
        <button className="btn btn-primary btn-lg">Launch App</button>
      </div>
    </section>
  );
};

export default Launch;