'use client';

import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

export function FlowSelector() {
  const navigate = useNavigate();

  return (
    <>
      <CardHeader className="bg-[#013563] text-white">
        <CardTitle>Welcome</CardTitle>
        <CardDescription className="text-gray-200">
          What can I help you with?
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <Button
              className="w-full justify-start bg-[#013563] hover:bg-[#014583] transition-colors"
              onClick={() => navigate('/step1')}
            >
              Foreign Resident Registration
            </Button>
            <Button
              className="w-full justify-start bg-gray-300 text-gray-600 cursor-not-allowed"
              disabled
            >
              Extend visa
            </Button>
            <Button
              className="w-full justify-start bg-gray-300 text-gray-600 cursor-not-allowed"
              disabled
            >
              Change status of visa
            </Button>
          </div>
        </motion.div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={() => navigate('/step1')}
          className="bg-[#013563] hover:bg-[#014583] transition-colors"
        >
          Start <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  );
}
