'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Github, Linkedin, Mail } from 'lucide-react';

// ... (previous imports and constants remain unchanged)

export default function Footer() {
  // ... (previous state and functions remain unchanged)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between p-4 relative">
      <footer className="mt-8 w-full max-w-2xl flex justify-center items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/wuaho"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#013563] text-white rounded-full hover:bg-[#014583] transition-colors"
              >
                <Github size={24} />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>View on GitHub</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://www.linkedin.com/in/juanjorequena"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#0077B5] text-white rounded-full hover:bg-[#006396] transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Connect on LinkedIn</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="mailto:juanjorek@gmail.com"
                className="p-2 bg-[#013563] text-white rounded-full hover:bg-[#014583] transition-colors"
              >
                <Mail size={24} />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Send an Email</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </footer>
    </div>
  );
}
