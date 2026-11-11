import { motion, useScroll, useSpring } from 'framer-motion';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import FeaturesTabs from './components/FeaturesTabs.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import RoomControls from './components/RoomControls.jsx';
import PersonalRoom from './components/PersonalRoom.jsx';
import StreamsDashboard from './components/StreamsDashboard.jsx';
import Recordings from './components/Recordings.jsx';
import Faq from './components/Faq.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <Header />
      <main>
        <Hero />
        <FeaturesTabs />
        <HowItWorks />
        <RoomControls />
        <PersonalRoom />
        <StreamsDashboard />
        <Recordings />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
