import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Star, Facebook, Instagram, Twitter, Menu, X, Utensils } from 'lucide-react';

declare global {
  interface Window {
    OmnidimWidget: {
      open: () => void;
    };
  }
}

function Homepage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCallBooking = () => {
    if (window.OmnidimWidget) {
      window.OmnidimWidget.open();
    } else {
      // Fallback if widget isn't loaded
      alert('Booking system is loading. Please try again in a moment.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Utensils className={`h-8 w-8 ${isScrolled ? 'text-orange-600' : 'text-white'}`} />
              <h1 className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                Spice Garden
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className={`hover:text-orange-600 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>Home</a>
              <a href="#about" className={`hover:text-orange-600 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>About</a>
              <a href="#contact" className={`hover:text-orange-600 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>Contact</a>
              
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-4">
              <a href="#home" className="block text-gray-700 hover:text-orange-600">Home</a>
              <a href="#about" className="block text-gray-700 hover:text-orange-600">About</a>
              <a href="#contact" className="block text-gray-700 hover:text-orange-600">Contact</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 via-red-600 to-orange-800">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <br />
            <span className="text-orange-300">Spice Garden</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Book Your Table Instantly with Our AI Assistant
          </p>
          <p className="text-lg mb-10 opacity-80 max-w-2xl mx-auto">
            Experience authentic flavors and exceptional service in our cozy atmosphere. 
            Let our AI-powered booking system make your reservation effortless.
          </p>
        </div>
        
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Spice Garden</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              For over 15 years, Spice Garden has been serving authentic cuisine with 
              a passion for flavor and hospitality that brings families and friends together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
                  <p className="text-gray-600">Fresh ingredients sourced daily from local markets to ensure the highest quality in every dish.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Utensils className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentic Recipes</h3>
                  <p className="text-gray-600">Traditional recipes passed down through generations, prepared with love and expertise.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Booking Assistant</h3>
                  <p className="text-gray-600">Book your table instantly with our intelligent AI assistant - available 24/7 for your convenience.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="h-6 w-6 text-orange-600 mr-3" />
                Opening Hours
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Monday - Thursday</span>
                  <span className="text-gray-600">11:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Friday - Saturday</span>
                  <span className="text-gray-600">11:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Sunday</span>
                  <span className="text-gray-600">12:00 PM - 11:00 PM</span>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                <p className="text-orange-800 font-medium text-center">
                  🎉 Happy Hour: Monday-Friday 3:00 PM - 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Visit Us Today</h2>
            <p className="text-xl text-gray-600">We're located in the heart of the city, ready to serve you!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600">123  Street<br />Ahmedabad<br />Gujarat,00000</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone & Reservations</h3>
                  <p className="text-gray-600 mb-2">+91-9876543210</p>

                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-orange-100 p-3 rounded-full hover:bg-orange-200 transition-colors">
                    <Facebook className="h-6 w-6 text-orange-600" />
                  </a>
                  <a href="#" className="bg-orange-100 p-3 rounded-full hover:bg-orange-200 transition-colors">
                    <Instagram className="h-6 w-6 text-orange-600" />
                  </a>
                  <a href="#" className="bg-orange-100 p-3 rounded-full hover:bg-orange-200 transition-colors">
                    <Twitter className="h-6 w-6 text-orange-600" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-medium">Interactive Map</p>
                <p className="text-sm">Map integration would be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Utensils className="h-8 w-8 text-orange-600" />
              <h3 className="text-2xl font-bold">Spice Garden Restaurant</h3>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Bringing authentic flavors and warm hospitality to your dining experience. 
              Book instantly with our AI assistant and taste the difference.
            </p>
            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-400">
                © 2025 Spice Garden Restaurant. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Fixed Mobile Call Button */}
      <button 
        onClick={handleCallBooking}
        className="md:hidden fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-full shadow-2xl hover:bg-orange-700 transition-all duration-300 z-50 flex items-center space-x-2"
      >
        <Phone className="h-6 w-6" />
        <span className="font-medium">📞 Book</span>
      </button>
    </div>
  );
}

export default Homepage;