import React from 'react';
import Navbar from '../navbar/Navbar';

const AnonymousSharing = () => {
  const user = localStorage.getItem('tokenUser');
  const links = [
    { name: 'Create a post right now', href: `/${user}/createanonymouspost` },
    { name: 'View all anonymous posts', href: `/${user}/allanonymousposts` },
  ];

  return (
    <>
      <Navbar />

      <div className="relative isolate overflow-hidden bg-white min-h-screen flex flex-col items-center justify-center">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 opacity-20" />

        {/* Content */}
        <div className="text-center px-6">
          <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
            Anonymous Sharing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Share your experiences without any fear of judgement, <br /> helping others along the way.
          </p>

          {/* Links Section */}
          <div className="mt-10 flex justify-center gap-x-8 text-base font-semibold leading-7 text-black">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="hover:underline">
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnonymousSharing;
