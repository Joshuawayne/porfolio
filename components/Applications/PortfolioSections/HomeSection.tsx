import React from 'react';
import profilePic from '../../../src/assets/profile.gif';

const HomeSection: React.FC = () => {
  return (
    <div className="p-4 space-y-6 text-sm">
      {/* Header Section */}
      <section className="text-center p-6 y2k-raised bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-700 mb-2 animate-pulse">JOSHUA ODHIAMBO'S DIGITAL DOMAIN!</h1>
        <p className="text-lg text-gray-700">Innovating at the intersection of agriculture and technology, one byte at a time.</p>
      </section>

      {/* Profile Picture and Welcome Message Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Profile Picture Column */}
        <div className="md:col-span-1 flex justify-center">
          <div className="w-40 h-40 y2k-sunken bg-gray-300 flex items-center justify-center text-gray-500 overflow-hidden">
            {/* Image Tag - Ensure 'profilePic' is correctly imported above */}
            <img
              src={profilePic}
              alt="Joshua Odhiambo" // Important for accessibility
              className="w-full h-full object-cover" // Styles to fill the container and maintain aspect ratio
            />
          </div>
        </div>

        {/* Welcome Message Column */}
        <div className="md:col-span-2 y2k-raised bg-gray-50 p-4">
          <h2 className="text-xl font-semibold text-purple-600 mb-2">Welcome, Cyber-Explorer!</h2>
          <p className="mb-2">
            I'm a software developer passionate about web design, web development, and currently pioneering a <strong className="text-green-700">Cow Heat Tracking System</strong>.
            This portfolio is a blast from the past, showcasing my skills through a fun, Y2K-inspired interface.
          </p>
          <p>
            When I'm not coding, you might find me dancing or painting! Explore my creations, learn about my journey, and let's connect.
          </p>
        </div>
      </div>

      {/* Motto Section */}
      <section className="y2k-raised bg-gray-100 p-4">
        <h3 className="text-lg font-semibold text-green-600 mb-2">My Motto:</h3>
        <p className="italic">"Code with passion, build for impact, and maybe add a little retro flair😉."</p>
      </section>
    </div>
  );
};

export default HomeSection;
