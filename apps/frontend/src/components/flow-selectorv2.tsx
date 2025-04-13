'use client';

import { Button } from '@/components/ui/button';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import mascotImage from '../assets/hikorea-mascot.webp';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

export function FlowSelector() {
  const navigate = useNavigate();

  return (
    <>
      <img
        src={mascotImage}
        alt="HiKorea Mascot"
        className="hidden w-60 py-4 md:inline md:w-72"
      />
      <h1 className="text-custom-grey my-10 px-1 text-center text-3xl font-bold">
        What can I help you with?
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ul className="grid justify-center gap-4 sm:grid-cols-2">
          <Card
            onClick={() => navigate('/step1')}
            className="bg-korea-blue cursor-pointer text-zinc-50 transition-colors hover:bg-[#014583]"
          >
            <CardHeader>
              <CardTitle className="text-inherit">
                Foreign resident registration
              </CardTitle>
              <CardDescription className="text-inherit">
                Register as a foreign resident to stay in Korea long-term.
                Required for visa holders after arrival.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card
            onClick={() => navigate('/step1')}
            className="bg-gray-300 text-gray-600 opacity-50"
          >
            <CardHeader>
              <CardTitle className="text-inherit">Extend visa</CardTitle>
              <CardDescription className="text-inherit">
                Apply to extend your stay in Korea before your current visa
                expires.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-gray-300 text-gray-600 opacity-50">
            <CardHeader>
              <CardTitle className="text-inherit">
                Change status of visa
              </CardTitle>
              <CardDescription className="text-inherit">
                Request a change to a different visa type without leaving Korea.
              </CardDescription>
            </CardHeader>
          </Card>
        </ul>
      </motion.div>
    </>
  );
}
