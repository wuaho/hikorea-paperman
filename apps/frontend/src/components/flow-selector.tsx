'use client';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

export function FlowSelector() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-custom-grey my-10 px-1 text-center text-3xl font-bold">
        What can I help you with?
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-center gap-4">
          <Card
            onClick={() => navigate('/step1')}
            className="bg-korea-blue hover:bg-korea-blue-hover cursor-pointer text-zinc-50 transition-colors"
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
          <Card className="bg-gray-300 text-gray-600 opacity-50">
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
          <Card className="bg-gray-300 text-gray-600 opacity-50">
            <CardHeader>
              <CardTitle className="text-inherit">
                Reissue residence card
              </CardTitle>
              <CardDescription className="text-inherit">
                Request a new residence card if yours is lost, damaged, or needs
                an update.
              </CardDescription>
            </CardHeader>
          </Card>
        </ul>
      </motion.div>
    </>
  );
}
