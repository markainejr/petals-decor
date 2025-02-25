import React from 'react';
import { Menu, X, Heart, Cake, GlassWater, PartyPopper, ChevronRight, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Music2, MessageCircle } from 'lucide-react';
import ReactGA from 'react-ga4';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showWhatsApp, setShowWhatsApp] = React.useState(false);

  // Track page view on component mount
  React.useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    
    // Update page title based on scroll position
    const updateTitle = () => {
      const sections = ['home', 'services', 'gallery', 'contact'];
      const currentSection = sections.find((section): section is keyof typeof titles => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      const titles = {
        home: 'Petals Decor - Premier Event Decoration Services in Uganda',
        services: 'Our Services - Wedding, Cultural & Corporate Event Decoration | Petals Decor',
        gallery: 'Our Work Gallery - Event Decoration Portfolio | Petals Decor',
        contact: 'Contact Us - Book Your Event Decoration | Petals Decor'
      };

      document.title = titles[currentSection ?? 'home'];
    };

    window.addEventListener('scroll', updateTitle);
    return () => window.removeEventListener('scroll', updateTitle);
  }, []);

  // Track navigation clicks
  const trackNavClick = (section: string) => {
    ReactGA.event({
      category: "Navigation",
      action: "Click",
      label: section
    });
  };

  // Track form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ReactGA.event({
      category: "Form",
      action: "Submit",
      label: "Contact Form"
    });
    // Add your form submission logic here
  };

  // Track social media clicks
  const trackSocialClick = (platform: string) => {
    ReactGA.event({
      category: "Social",
      action: "Click",
      label: platform
    });
  };

  // Track WhatsApp button click
  const handleWhatsAppClick = () => {
    setShowWhatsApp(true);
    ReactGA.event({
      category: "Chat",
      action: "Open",
      label: "WhatsApp"
    });
  };

  const services = [
    { 
      icon: Heart, 
      title: 'Wedding Decorations', 
      description: 'Transform your special day into a magical celebration with our elegant wedding decorations. We specialize in both traditional African and modern wedding themes, offering:',
      features: [
        'Custom backdrop designs',
        'Traditional ceremony setups',
        'Reception area styling',
        'Floral arrangements',
        'Lighting design'
      ]
    },
    { 
      icon: Cake, 
      title: 'Birthday Parties', 
      description: 'Create unforgettable birthday memories with our creative and vibrant party setups. Our birthday decoration services include:',
      features: [
        'Theme-based decorations',
        'Balloon arrangements',
        'Custom photo areas',
        'Table settings',
        'Kids party specialties'
      ]
    },
    { 
      icon: GlassWater, 
      title: 'Corporate Events', 
      description: 'Elevate your corporate events with our professional and sophisticated decoration services. We offer:',
      features: [
        'Conference room styling',
        'Award ceremony setups',
        'Brand-aligned designs',
        'Exhibition booth decoration',
        'Networking event ambiance'
      ]
    },
    { 
      icon: PartyPopper, 
      title: 'Cultural Ceremonies', 
      description: 'Celebrate your cultural heritage with our authentic and traditional decoration themes. We specialize in:',
      features: [
        'Traditional ceremony setups',
        'Cultural symbol integration',
        'Custom backdrop designs',
        'Traditional color schemes',
        'Ceremonial area styling'
      ]
    },
  ];

  const galleryImages = [
    { url: "/images/wedding-1.jpg", alt: "Elegant African wedding decoration with traditional elements and modern touches" },
    { url: "/images/wedding-2.jpg", alt: "Traditional African wedding ceremony setup with cultural symbols" },
    { url: "/images/wedding-3.jpg", alt: "Luxurious wedding reception decoration with African-inspired designs" },
    { url: "/images/wedding-4.jpg", alt: "Contemporary African wedding setup with traditional accents" },
    { url: "/images/wedding-5.jpg", alt: "Modern wedding reception hall decorated with African art and flowers" },
    { url: "/images/wedding-6.jpg", alt: "Outdoor wedding venue decorated with traditional African elements" },
    { url: "/images/cultural-1.jpg", alt: "Traditional ceremony space with authentic African decorations" },
    { url: "/images/cultural-2.jpg", alt: "Cultural celebration venue with traditional symbols and modern lighting" },
    { url: "/images/cultural-3.jpg", alt: "Corporate event space with African-inspired professional decor" },
    { url: "/images/cultural-4.jpg", alt: "Birthday celebration setup with vibrant African themes" },
    { url: "/images/cultural-5.jpg", alt: "Traditional gathering space with cultural decorative elements" },
    { url: "/images/cultural-6.jpg", alt: "Modern event venue with traditional African art and decor" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full z-50" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-800 text-white">
                <PartyPopper className="w-6 h-6" aria-hidden="true" />
              </div>
              <h1 className="text-2xl font-bold text-purple-800">Petals Decor</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" onClick={() => trackNavClick("Home")} className="text-gray-700 hover:text-purple-800">Home</a>
              <a href="#services" onClick={() => trackNavClick("Services")} className="text-gray-700 hover:text-purple-800">Services</a>
              <a href="#gallery" onClick={() => trackNavClick("Gallery")} className="text-gray-700 hover:text-purple-800">Gallery</a>
              <a href="#contact" onClick={() => trackNavClick("Contact")} className="text-gray-700 hover:text-purple-800">Contact</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-gray-700"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" onClick={() => trackNavClick("Home")} className="block px-3 py-2 text-gray-700 hover:text-purple-800">Home</a>
              <a href="#services" onClick={() => trackNavClick("Services")} className="block px-3 py-2 text-gray-700 hover:text-purple-800">Services</a>
              <a href="#gallery" onClick={() => trackNavClick("Gallery")} className="block px-3 py-2 text-gray-700 hover:text-purple-800">Gallery</a>
              <a href="#contact" onClick={() => trackNavClick("Contact")} className="block px-3 py-2 text-gray-700 hover:text-purple-800">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-16">
        <video 
          autoPlay 
          loop 
          muted 
          className="w-full h-[600px] object-cover"
          poster="/images/hero-poster.jpg"
          aria-label="Showcase of our event decoration services"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Creating Magical Moments</h1>
            <p className="text-xl md:text-2xl mb-8">Transform your events into unforgettable experiences</p>
            <a 
              href="#contact" 
              className="bg-purple-800 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition duration-300"
              aria-label="Book your event decoration now"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <service.icon className="w-12 h-12 text-purple-800 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <ChevronRight className="w-4 h-4 text-purple-800 mr-2" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="w-full h-64 object-cover rounded-lg shadow-md transition duration-300 transform group-hover:scale-110" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition duration-300">
                    <ChevronRight className="w-8 h-8" aria-hidden="true" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-3" aria-hidden="true" />
                  <span>+256 782713764</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-3" aria-hidden="true" />
                  <span>info@petalsdeco.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 mr-3" aria-hidden="true" />
                  <span>Kampala, Uganda</span>
                </div>
                <div className="flex space-x-4 mt-6">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => trackSocialClick("Facebook")}
                    className="hover:text-purple-300 transition duration-300"
                    aria-label="Visit our Facebook page"
                  >
                    <Facebook className="w-6 h-6" aria-hidden="true" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => trackSocialClick("Twitter")}
                    className="hover:text-purple-300 transition duration-300"
                    aria-label="Visit our Twitter profile"
                  >
                    <Twitter className="w-6 h-6" aria-hidden="true" />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => trackSocialClick("Instagram")}
                    className="hover:text-purple-300 transition duration-300"
                    aria-label="Visit our Instagram profile"
                  >
                    <Instagram className="w-6 h-6" aria-hidden="true" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => trackSocialClick("LinkedIn")}
                    className="hover:text-purple-300 transition duration-300"
                    aria-label="Visit our LinkedIn page"
                  >
                    <Linkedin className="w-6 h-6" aria-hidden="true" />
                  </a>
                  <a 
                    href="https://tiktok.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => trackSocialClick("TikTok")}
                    className="hover:text-purple-300 transition duration-300"
                    aria-label="Visit our TikTok profile"
                  >
                    <Music2 className="w-6 h-6" aria-hidden="true" />
                  </a>
                  <button 
                    onClick={handleWhatsAppClick}
                    className="hover:text-purple-300 transition duration-300"
                    aria-label="Open WhatsApp chat"
                  >
                    <MessageCircle className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-4 py-2 rounded-lg text-gray-900" 
                aria-label="Your name"
                required 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full px-4 py-2 rounded-lg text-gray-900" 
                aria-label="Your email address"
                required 
              />
              <textarea 
                placeholder="Your Message" 
                rows={4} 
                className="w-full px-4 py-2 rounded-lg text-gray-900"
                aria-label="Your message"
                required 
              ></textarea>
              <button 
                type="submit" 
                className="bg-white text-purple-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* WhatsApp Modal */}
      {showWhatsApp && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="whatsapp-modal-title"
        >
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 id="whatsapp-modal-title" className="text-xl font-semibold mb-4">Contact us on WhatsApp</h3>
            <p className="mb-4">Click the button below to start a conversation with us on WhatsApp.</p>
            <div className="flex justify-between">
              <a 
                href="https://wa.me/256782713764"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Open WhatsApp
              </a>
              <button 
                onClick={() => setShowWhatsApp(false)}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                aria-label="Close WhatsApp chat modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} Petals Decor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;