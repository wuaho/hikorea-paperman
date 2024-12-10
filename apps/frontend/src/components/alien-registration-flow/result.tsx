import { GlobalStateData, useStateMachine } from 'little-state-machine';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import updateAction from './update-action';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { useNavigate } from 'react-router';
import { DelayProgress } from '../ui/delay-progress';
import { motion } from 'framer-motion';

const fieldLabelsOrdered: [string, string][] = [
  ['firstName', 'First Name'],
  ['lastName', 'Last Name'],
  ['email', 'Email'],
  ['birthdate', 'Date of Birth'],
  ['sex', 'Sex'],
  ['nationality', 'Nationality'],
  ['passportNumber', 'Passport Number'],
  ['passportIssueDate', 'Passport Issue Date'],
  ['passportExpiryDate', 'Passport Expiration Date'],
  ['mobile', 'Mobile Number'],
  ['telephone', 'Telephone Number'],
  ['addressKorea', 'Address in Korea'],
  ['addressHomeCountry', 'Address in Home Country'],
];

export const FormResult = () => {
  const { state } = useStateMachine({ updateAction });
  const navigate = useNavigate();

  return (
    <>
      <CardHeader className="bg-[#013563] text-white">
        <CardTitle> Review Your Information</CardTitle>
        <CardDescription className="text-gray-200">
          Take a moment to review and confirm your information
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <DelayProgress
          className="mb-6"
          initialValue={60}
          targetValue={80}
          delay={0}
        />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="space-y-4">
            {fieldLabelsOrdered.map((field) => (
              <p
                key={field[0]}
                className="flex justify-between border-b border-gray-200 py-2"
              >
                <strong className="text-[#013563]">{field[1]}:</strong>

                <span className="ml-32">
                  {state.data[field[0] as keyof GlobalStateData] || 'N/A'}
                </span>
              </p>
            ))}
          </div>
        </motion.div>
      </CardContent>
      <CardFooter className="flex justify-between ">
        <Button
          variant="outline"
          onClick={() => {
            navigate('/step3');
          }}
          className="border-[#013563] text-[#013563] hover:bg-[#013563] hover:text-white"
        >
          Back
        </Button>

        <Button
          onClick={() => {
            navigate('/step4');
          }}
          className="bg-[#013563] hover:bg-[#014583] transition-colors"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  );
};
