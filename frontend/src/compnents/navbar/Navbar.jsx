import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from "react-js-loader";
const API_URL = process.env.REACT_APP_API_URL;



const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem('tokenUser');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    console.log('toggleMobileMenu clicked, current state:', mobileMenuOpen);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenUser');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };
  
  const handleDelete = () => {
    // Show delete modal
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      // Call the backend route to delete the user
      await fetch(${API_URL}/delete-user/${user}, {
        method: 'DELETE',
      });
      // Perform logout after deletion
      localStorage.removeItem('token');
      localStorage.removeItem('tokenUser');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const closeModal = () => {
    // Close the delete modal
    setShowDeleteModal(false);
  };

  // Function to handle restricted link clicks
  const handleRestrictedClick = (e, path) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-white w-full z-50 shadow-lg">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="absolute top-0 left-0 w-full py-4 px-6 bg-pink-100 flex justify-between items-center shadow-sm" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-10 w-auto" src="/images/meditation.jpg" alt="Your Company" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Hamburger button clicked!');
                toggleMobileMenu();
              }}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a 
              href="#"
              onClick={(e) => handleRestrictedClick(e, /${user}/mood)} 
              className="text-sm font-semibold leading-6 text-gray-900">Mood Tracker</a>
            <a 
              href="#"
              onClick={(e) => handleRestrictedClick(e, /${user}/therapist)} 
              className="text-sm font-semibold leading-7 text-gray-900">AI Therapist</a>
            <a 
              href="#"
              onClick={(e) => handleRestrictedClick(e, /${user}/quiz)} 
              className="text-sm font-semibold leading-6 text-gray-900">Quiz</a>
            <a 
              href="#"
              onClick={(e) => handleRestrictedClick(e, /${user}/anonymoussharing)} 
              className="text-sm font-semibold leading-6 text-gray-900">Anonymous Sharing</a>
            <a href="/aboutus" className="text-sm font-semibold leading-6 text-gray-900">About Us</a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716336000&semt=ais_user" alt="Profile" />
                  </button>
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                    <a href={/${user}/profile} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
                    <a onClick={(e) => handleLogout(e)} href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
                    <a onClick={handleDelete} href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Delete Profile</a>
                  </div>
                )}
              </div>
            ) : (
              <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                Login <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </nav>
        
      </header>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (console.log('Mobile menu should be visible now') ||
        <div className="lg:hidden">
          <div className="fixed inset-0 z-[60] bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto" src="/images/meditation.jpg" alt="Your Company" />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={toggleMobileMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <a 
                      href="#"
                      onClick={(e) => {
                        handleRestrictedClick(e, /${user}/mood);
                        setMobileMenuOpen(false);
                      }} 
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Mood Tracker
                    </a>
                    <a 
                      href="#"
                      onClick={(e) => {
                        handleRestrictedClick(e, /${user}/therapist);
                        setMobileMenuOpen(false);
                      }} 
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      AI Therapist
                    </a>
                    <a 
                      href="#"
                      onClick={(e) => {
                        handleRestrictedClick(e, /${user}/quiz);
                        setMobileMenuOpen(false);
                      }} 
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Quiz
                    </a>
                    <a 
                      href="#"
                      onClick={(e) => {
                        handleRestrictedClick(e, /${user}/anonymoussharing);
                        setMobileMenuOpen(false);
                      }} 
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Anonymous Sharing
                    </a>
                    <a 
                      href="/aboutus" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      About Us
                    </a>
                  </div>
                  <div className="py-6">
                    {isLoggedIn ? (
                      <div className="space-y-2">
                        <a 
                          href={/${user}/profile}
                          onClick={() => setMobileMenuOpen(false)}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Your Profile
                        </a>
                        <a 
                          href="#"
                          onClick={(e) => {
                            handleLogout(e);
                            setMobileMenuOpen(false);
                          }}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Sign out
                        </a>
                        <a 
                          href="#"
                          onClick={() => {
                            handleDelete();
                            setMobileMenuOpen(false);
                          }}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-red-600 hover:bg-gray-50">
                          Delete Profile
                        </a>
                      </div>
                    ) : (
                      <a 
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Login
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      {/* Delete Profile Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-title">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Delete Profile
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete your profile? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={confirmDelete} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Delete
                </button>
                <button onClick={closeModal} type="button" className="ml-3 bg-pink-400 text-gray-700 px-4 py-2 rounded-md">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;