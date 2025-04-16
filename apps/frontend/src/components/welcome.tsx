'use client';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import mascotImage from '../assets/hikorea-mascot.webp';
import { Button } from './ui/button';

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <>
      <img
        src={mascotImage}
        alt="HiKorea Mascot"
        className="mt-32 w-60 py-4 md:inline md:w-72"
      />
      <h1 className="text-custom-grey mb-10 mt-3 max-w-80 px-1 text-center text-3xl/normal font-bold md:max-w-lg">
        Start your immigration process in Korea now!
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          onClick={() => navigate('/selectFlow')}
          className="bg-korea-blue shadow-korea-blue/50 hover:bg-korea-blue-hover mt-14 h-12 rounded-lg px-24 shadow-md"
        >
          <span>
            <b> GET STARTED</b>
          </span>
        </Button>
      </motion.div>
    </>
  );
}
