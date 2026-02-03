import 'animate.css';
import React, { useEffect, useState } from 'react';
import photo from './photo.jpg';

const Profile = () => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const words = ["Welcome", "to", "Your", "Notes", "Dashboard"];
    let index = 0;

    const interval = setInterval(() => {
      if (index < words.length) {
        setDisplayedText((prev) =>
          prev + (prev ? ' ' : '') + words[index]
        );
        index++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-300 text-white flex flex-col justify-between">
      <header className="flex flex-col items-center p-8 text-center animate__animated animate__fadeIn">
        <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeInDown m-6">
          {displayedText}
        </h1>

        <p className="text-lg mb-6 animate__animated animate__fadeInUp animate__delay-1s">
          To Make Notes and Save This Website
        </p>

        <section className="flex justify-center items-center p-8 mx-2 animate__animated animate__fadeInRight m-2 animate__delay-3s">
          <img
            src={photo}
            alt="Featured Product"
            className="w-96 h-auto rounded-md shadow-2xl transition-all duration-500 transform hover:scale-105"
          />
        </section>
      </header>
    </div>
  );
};

export default Profile;
