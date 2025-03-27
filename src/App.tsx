import React from 'react';
import {
    Menu,
    X,
    Heart,
    Cake,
    GlassWater,
    PartyPopper,
    ChevronRight,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Music2,
    MessageCircle,
    Star,
    ArrowRight,
    Send,
} from 'lucide-react';
import ReactGA from 'react-ga4';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BlurImage } from './components/BlurImage';

function App() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [showWhatsApp, setShowWhatsApp] = React.useState(false);
    const [activeService, setActiveService] = React.useState<number | null>(null);
    const [activeNavItem, setActiveNavItem] = React.useState<'home' | 'services' | 'gallery' | 'contact'>('home');
    const [chatMessage, setChatMessage] = React.useState('');
    const [isNavVisible, setIsNavVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);

    // Adjusted threshold values to be more consistent
    const [homeRef, homeInView] = useInView({ threshold: 0.6 });
    const [servicesRef, servicesInView] = useInView({ threshold: 0.6 });
    const [galleryRef, galleryInView] = useInView({ threshold: 0.6 });
    const [contactRef, contactInView] = useInView({ threshold: 0.6 });

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsNavVisible(currentScrollY < lastScrollY || currentScrollY < 100);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    React.useEffect(() => {
        if (homeInView) setActiveNavItem('home');
        if (servicesInView) setActiveNavItem('services');
        if (galleryInView) setActiveNavItem('gallery');
        if (contactInView) setActiveNavItem('contact');
    }, [homeInView, servicesInView, galleryInView, contactInView]);

    React.useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

        let maxScroll = 0;
        const trackScrollDepth = () => {
            const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll >= 25) ReactGA.event({ category: 'Scroll', action: 'Depth', label: '25%' });
                if (maxScroll >= 50) ReactGA.event({ category: 'Scroll', action: 'Depth', label: '50%' });
                if (maxScroll >= 75) ReactGA.event({ category: 'Scroll', action: 'Depth', label: '75%' });
                if (maxScroll >= 90) ReactGA.event({ category: 'Scroll', action: 'Depth', label: '90%' });
            }
        };

        window.addEventListener('scroll', trackScrollDepth);
        return () => window.removeEventListener('scroll', trackScrollDepth);
    }, []);

    const handleWhatsAppSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (chatMessage.trim()) {
            const encodedMessage = encodeURIComponent(chatMessage);
            window.open(`https://wa.me/256782713764?text=${encodedMessage}`, '_blank');
            ReactGA.event({
                category: 'Chat',
                action: 'Send',
                label: 'WhatsApp Message',
            });
            setChatMessage('');
        }
    };

    const trackNavClick = (section: string) => {
        ReactGA.event({
            category: 'Navigation',
            action: 'Click',
            label: section,
        });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        ReactGA.event({
            category: 'Form',
            action: 'Submit',
            label: 'Contact Form',
        });
    };

    const trackSocialClick = (platform: string) => {
        ReactGA.event({
            category: 'Social',
            action: 'Click',
            label: platform,
        });
    };

    const services = [
        {
            icon: Heart,
            title: 'Wedding Decorations',
            description:
                'Transform your special day into a magical celebration with our elegant wedding decorations. We specialize in both traditional African and modern wedding themes.',
            features: [
                'Custom backdrop designs',
                'Traditional ceremony setups',
                'Reception area styling',
                'Floral arrangements',
                'Lighting design',
            ],
        },
        {
            icon: Cake,
            title: 'Birthday Parties',
            description: 'Create unforgettable birthday memories with our creative and vibrant party setups.',
            features: ['Theme-based decorations', 'Balloon Work', 'Custom photoBooth', 'Table settings', 'Kids party specialties'],
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
                'Networking event ambiance',
            ],
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
                'Ceremonial area styling',
            ],
        },
    ];

    const galleryImages = [
        { url: '/images/wedding1.jpg', alt: 'Elegant wedding decoration with traditional elements' },
        { url: '/images/wedding2.jpg', alt: 'Traditional ceremony setup' },
        { url: '/images/reception1.jpg', alt: 'Luxurious wedding reception decoration' },
        { url: '/images/reception2.jpg', alt: 'Contemporary wedding setup' },
        { url: '/images/corporate1.jpg', alt: 'Corporate event decoration' },
        { url: '/images/corporate2.jpg', alt: 'Professional business event setup' },
        { url: '/images/birthday1.jpg', alt: 'Vibrant birthday party decoration' },
        { url: '/images/birthday2.jpg', alt: "Children's party setup" },
        { url: '/images/cultural1.jpg', alt: 'Traditional cultural ceremony decoration' },
        { url: '/images/cultural2.jpg', alt: 'Cultural celebration setup' },
        { url: '/images/outdoor1.jpg', alt: 'Outdoor event decoration' },
        { url: '/images/outdoor2.jpg', alt: 'Garden party setup' },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{
                    y: isNavVisible ? 0 : -100,
                    opacity: isNavVisible ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-lg"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <motion.div
                            className="flex items-center space-x-3"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white">
                                <PartyPopper className="w-7 h-7" />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text">
                                Petals Decor
                            </h1>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-2">
                            {['Home', 'Services', 'Gallery', 'Contact'].map((item) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => {
                                        trackNavClick(item);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`relative px-4 py-2 transition-colors duration-300 ${
                                        activeNavItem === item.toLowerCase()
                                            ? 'text-purple-800'
                                            : 'text-gray-700 hover:text-purple-800'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item}
                                    {activeNavItem === item.toLowerCase() && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-800"
                                            initial={false}
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </motion.a>
                            ))}
                        </div>

                        {/* Mobile menu button */}
                        <motion.button
                            className="md:hidden flex items-center"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isMenuOpen ? 'close' : 'menu'}
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: isMenuOpen ? 90 : 0 }}
                                    exit={{ rotate: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white/95 backdrop-blur-md"
                        >
                            <div className="px-4 py-3 space-y-2">
                                {['Home', 'Services', 'Gallery', 'Contact'].map((item) => (
                                    <motion.a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        onClick={() => {
                                            trackNavClick(item);
                                            setIsMenuOpen(false);
                                        }}
                                        className={`block px-4 py-2 rounded-lg transition-colors duration-300 ${
                                            activeNavItem === item.toLowerCase()
                                                ? 'bg-purple-100 text-purple-800'
                                                : 'text-gray-700 hover:bg-purple-50'
                                        }`}
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
            <section ref={homeRef} id="home" className="relative pt-16">
                <div className="relative h-[600px]">
                    <BlurImage
                        src="/images/wedding1.jpg"
                        alt="Beautiful wedding decoration"
                        className="w-full h-full object-cover"
                        sizes="100vw"
                    />
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
                                className="space-y-4"
                            >
                                <motion.a
                                    href="#contact"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-block bg-purple-800 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition duration-300"
                                    onClick={() => trackNavClick('Contact')}
                                >
                                    Book Now
                                </motion.a>
                                <div className="flex justify-center items-center space-x-4 mt-8">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Star className="w-5 h-5 text-yellow-400" />
                                        <span className="text-sm">Trusted by 500+ happy clients</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <motion.section
                ref={servicesRef}
                initial="hidden"
                animate={servicesInView ? 'visible' : 'hidden'}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.2,
                        },
                    },
                }}
                id="services"
                className="py-20 bg-gray-50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                        }}
                        className="text-3xl font-bold text-center mb-12"
                    >
                        Our Services
                    </motion.h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                                }}
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
                                onClick={() => {
                                    setActiveService(activeService === index ? null : index);
                                    ReactGA.event({
                                        category: 'Service',
                                        action: 'Click',
                                        label: service.title,
                                    });
                                }}
                            >
                                <service.icon className="w-12 h-12 text-purple-800 mb-4" />
                                <h3 className="text-xl font-semibold mb
