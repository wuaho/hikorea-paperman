import React from 'react';
import { Progress } from './progress';

interface DelayProgressProps {
  initialValue?: number;
  targetValue?: number;
  delay?: number;
  className?: string;
}

const DelayProgress: React.FC<DelayProgressProps> = ({
  initialValue = 0,
  targetValue = 100,
  delay = 1000,
  className,
}) => {
  const [progress, setProgress] = React.useState(initialValue);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(targetValue), delay);
    return () => clearTimeout(timer);
  }, [targetValue, delay]);

  return <Progress className={className} value={progress} />;
};

DelayProgress.displayName = 'DelayProgress';

export { DelayProgress };
