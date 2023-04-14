// src/components/Features.tsx
import Image from 'next/image';
import React from 'react';

interface CardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: CardProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="p-4 bg-white rounded-full mb-4 border border-gray-300">
        {/* <Image src={icon} alt={title} className="h-12 w-12" /> */}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: '/path/to/your/icon1.png',
      title: 'Mint ERC20 Tokens',
      description:
        'Mint ERC20 tokens that represent the floor price of NFTs, allowing you to gain exposure to NFT price gains.',
    },
    {
      icon: '/path/to/your/icon2.png',
      title: 'Fractionalize Your Investment',
      description:
        'Invest in NFTs with a limited budget by owning a fraction of the wrapped NFT price.',
    },
    {
      icon: '/path/to/your/icon3.png',
      title: 'Connect Your Wallet',
      description:
        'Easily connect your Metamask wallet to interact with our platform and manage your assets.',
    },
    {
      icon: '/path/to/your/icon4.png',
      title: 'Redeem USDT',
      description:
        'Turn your ERC20 tokens back into USDT, enjoying the profits from NFT price gains.',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;