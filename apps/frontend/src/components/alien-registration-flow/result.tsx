import { GlobalStateData, useStateMachine } from 'little-state-machine';
import { Button } from '../ui/button';
import updateAction from './update-action';
import {
  CardContent,
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from '../ui/card';
import { useNavigate } from 'react-router';
import { DelayProgress } from '../ui/delay-progress';
import { motion } from 'framer-motion';

const fieldLabelsOrdered: [string, string][] = [
  ['firstName', 'First name'],
  ['lastName', 'Last name'],
  ['email', 'Email'],
  ['birthdate', 'Date of birth'],
  ['sex', 'Sex'],
  ['nationality', 'Nationality'],
  ['passportNumber', 'Passport number'],
  ['passportIssueDate', 'Passport issue date'],
  ['passportExpiryDate', 'Passport expiration date'],
  ['mobile', 'Mobile number'],
  ['telephone', 'Telephone number'],
  ['addressKorea', 'Address in South Korea'],
  ['addressHomeCountry', 'Address in home country'],
];

export const FormResult = () => {
  const { state } = useStateMachine({ updateAction });
  const navigate = useNavigate();

  return (
    <>
      <DelayProgress
        className="mb-10 mt-4"
        initialValue={60}
        targetValue={80}
        delay={0}
      />
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-korea-blue mb-7 text-2xl font-bold">
          Review your information
        </h1>
        {/* <h2> Take a moment to review and confirm your information</h2> */}
        <Card>
          <CardHeader className="bg-[#013563] text-white">
            <CardTitle> Your information</CardTitle>
            <CardDescription className="text-gray-200">
              Take a moment to review and confirm your information
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </motion.div>
      <div className="mt-8 flex w-full justify-center sm:justify-between">
        <Button
          variant="outline"
          onClick={() => {
            navigate('/step3');
          }}
          className="hover:bg-korea-blue-hover hidden border-[#013563] text-[#013563] hover:text-white sm:inline-flex"
        >
          Back
        </Button>

        <Button
          variant="next"
          onClick={() => {
            navigate('/signAndDownload');
          }}
          className="w-full sm:w-auto"
        >
          Next
        </Button>
      </div>
    </>
  );
};
