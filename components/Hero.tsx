// src/components/Hero.tsx
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-gray-50 mt-12 py-16 px-4 lg:px-0">
      <div className="container mx-auto max-w-5xl">
        <div className="lg:flex lg:items-center">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              EIP-4337 Account Recovery on ChatGPT
            </h1>
            <p className="text-lg mb-8">
              Use cases: <br />
              1. Private key lost <br />
              2. Account compromised <br />
              3. Transfer ownership after death <br />
              4. Change authorized person after resignation <br />
            </p>
            <Link href="/app/recovery" className="btn btn-primary">
              Start Now
            </Link>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            {/* You can add an image or illustration here */}
            {/* <img src="/path/to/your/image.png" alt="Hero illustration" className="w-full h-auto" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
