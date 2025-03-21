import React from 'react';
import { Menu, X, Heart, Cake, GlassWater, PartyPopper, ChevronRight, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Music2, MessageCircle, Star, ArrowRight } from 'lucide-react';
import ReactGA from 'react-ga4';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showWhatsApp, setShowWhatsApp] = React.useState(false);
  const [activeService, setActiveService] = React.useState<number | null>(null);
  const [videoPlaying, setVideoPlaying] = React.useState(true);

  // Intersection Observer hooks for animations
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [galleryRef, galleryInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Track page view and scroll depth
  React.useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll >= 25) ReactGA.event({ category: "Scroll", action: "Depth", label: "25%" });
        if (maxScroll >= 50) ReactGA.event({ category: "Scroll", action: "Depth", label: "50%" });
        if (maxScroll >= 75) ReactGA.event({ category: "Scroll", action: "Depth", label: "75%" });
        if (maxScroll >= 90) ReactGA.event({ category: "Scroll", action: "Depth", label: "90%" });
      }
    };

    window.addEventListener('scroll', trackScrollDepth);
    return () => window.removeEventListener('scroll', trackScrollDepth);
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

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const services = [
    { 
      icon: Heart, 
      title: 'Wedding Decorations', 
      description: 'Transform your special day into a magical celebration with our elegant wedding decorations. We specialize in both traditional African and modern wedding themes.',
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
      description: 'Create unforgettable birthday memories with our creative and vibrant party setups.',
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
      description: 'Elevate your corporate events with our professional and sophisticated decoration services.',
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
      description: 'Celebrate your cultural heritage with our authentic and traditional decoration themes.',
      features: [
        'Traditional ceremony setups',
        'Cultural symbol integration',
        'Custom backdrop designs',
        'Traditional color schemes',
        'Ceremonial area styling'
      ]
    }
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
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-md fixed w-full z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-800 text-white">
                <PartyPopper className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-purple-800">Petals Decor</h1>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Services', 'Gallery', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => trackNavClick(item)}
                  className="text-gray-700 hover:text-purple-800 relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.div 
              className="md:hidden flex items-center"
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['Home', 'Services', 'Gallery', 'Contact'].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => {
                      trackNavClick(item);
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-gray-700 hover:text-purple-800"
                    whileHover={{ x: 10 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-16">
        <div className="relative h-[600px]">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
            poster="/images/hero-poster.jpg"
            onClick={() => {
              setVideoPlaying(!videoPlaying);
              ReactGA.event({
                category: "Video",
                action: videoPlaying ? "Pause" : "Play",
                label: "Hero Video"
              });
            }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div className="text-center text-white px-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                Creating Magical Moments
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl mb-8"
              >
                Transform your events into unforgettable experiences
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-purple-800 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition duration-300"
                  onClick={() => trackNavClick("Contact")}
                >
                  Book Now
                </motion.a>
                <p className="text-sm mt-4 opacity-80">Trusted by 500+ happy clients</p>
              </motion.div>
            </div>
          </motion.div>
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-sm cursor-pointer">
            {videoPlaying ? 'Click to pause' : 'Click to play'}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <motion.section 
        ref={servicesRef}
        initial="hidden"
        animate={servicesInView ? "visible" : "hidden"}
        variants={staggerChildren}
        id="services" 
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Services
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
                onClick={() => {
                  setActiveService(activeService === index ? null : index);
                  ReactGA.event({
                    category: "Service",
                    action: "Click",
                    label: service.title
                  });
                }}
              >
                <service.icon className="w-12 h-12 text-purple-800 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <AnimatePresence>
                  {activeService === index ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center text-gray-600"
                          >
                            <ChevronRight className="w-4 h-4 text-purple-800 mr-2" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="flex items-center text-purple-800 mt-4"
                      whileHover={{ x: 5 }}
                    >
                      <span className="mr-2">Learn more</span>
                      <ArrowRight size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section 
        ref={galleryRef}
        initial="hidden"
        animate={galleryInView ? "visible" : "hidden"}
        variants={staggerChildren}
        id="gallery" 
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Work
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => {
                  ReactGA.event({
                    category: "Gallery",
                    action: "Click",
                    label: `Image ${index + 1}`
                  });
                }}
              >
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="w-full h-64 object-cover rounded-lg shadow-md" 
                  loading="lazy"
                />
                <motion.div 
                  className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="text-white text-center p-4">
                    <p className="text-sm">{image.alt}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Contact Us
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <Phone className="w-6 h-6 mr-3" />
                  <span>+256 782713764</span>
                </motion.div>
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="w-6 h-6 mr-3" />
                  <span>info@petalsdeco.com</span>
                </motion.div>
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-6 h-6 mr-3" />
                  <span>Kampala, Uganda</span>
                </motion.div>
                <div className="flex space-x-4 mt-6">
                  {[
                    { icon: Facebook, url: "https://facebook.com", label: "Facebook" },
                    { icon: Twitter, url: "https://twitter.com", label: "Twitter" },
                    { icon: Instagram, url: "https://instagram.com", label: "Instagram" },
                    { icon: Linkedin, url: "https://linkedin.com", label: "LinkedIn" },
                    { icon: Music2, url: "https://tiktok.com", label: "TikTok" }
                  ].map(({ icon: Icon, url, label }) => (
                    <motion.a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackSocialClick(label)}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="hover:text-purple-300 transition duration-300"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                  <motion.button
                    onClick={handleWhatsAppClick}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="hover:text-purple-300 transition duration-300"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleFormSubmit}
              className="space-y-4"
            >
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                type="text" 
                placeholder="Your Name" 
                className="w-full px-4 py-2 rounded-lg text-gray-900" 
                required 
              />
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                type="email" 
                placeholder="Your Email" 
                className="w-full px-4 py-2 rounded-lg text-gray-900" 
                required 
              />
              <motion.textarea 
                whileFocus={{ scale: 1.02 }}
                placeholder="Your Message" 
                rows={4} 
                className="w-full px-4 py-2 rounded-lg text-gray-900"
                required 
              ></motion.textarea>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit" 
                className="bg-white text-purple-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* WhatsApp Modal */}
      <AnimatePresence>
        {showWhatsApp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-lg max-w-md w-full"
            >
              <h3 className="text-xl font-semibold mb-4">Contact us on WhatsApp</h3>
              <p className="mb-4">Click the button below to start a conversation with us on WhatsApp.</p>
              <div className="flex justify-between">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/256782713764"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Open WhatsApp
                </motion.a>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowWhatsApp(false)}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
