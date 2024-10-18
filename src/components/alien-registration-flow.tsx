"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronRight, FileDown, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import mascotImage from "./../assets/hikorea-mascot.png";

const countries = [
  { code: "kr", name: "Korea", flag: "🇰🇷" },
  { code: "us", name: "United States", flag: "🇺🇸" },
  { code: "jp", name: "Japan", flag: "🇯🇵" },
  { code: "cn", name: "China", flag: "🇨🇳" },
  { code: "gb", name: "United Kingdom", flag: "🇬🇧" },
  { code: "de", name: "Germany", flag: "🇩🇪" },
  { code: "fr", name: "France", flag: "🇫🇷" },
  { code: "ca", name: "Canada", flag: "🇨🇦" },
  { code: "au", name: "Australia", flag: "🇦🇺" },
  { code: "in", name: "India", flag: "🇮🇳" },
];

const generatePDF = (data: unknown) => {
  console.log("Generating PDF with data:", data);
  alert("PDF generated! (This is a mock function)");
};

const fieldLabels: { [key: string]: string } = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  birthday: "Date of Birth",
  nationality: "Nationality",
  sex: "Sex",
  telephone: "Telephone Number",
  mobile: "Mobile Number",
  addressKorea: "Address in Korea",
  addressHome: "Address in Home Country",
};

const fieldHelpers: { [key: string]: string } = {
  firstName:
    "Enter your given name as it appears on passport (2-50 characters, no special characters)",
  lastName:
    "Enter your family name as it appears on passport (2-50 characters, no special characters)",
  email: "Provide a valid email address for communication",
  birthday:
    "Enter your date of birth as shown on passport (must be in the past)",
  nationality: "Select your country of citizenship",
  sex: "Select your gender as it appears on official documents",
  telephone: "Enter your landline number (if available)",
  mobile: "Enter your mobile phone number",
  addressKorea:
    "Provide your current address in Korea (if applicable, 5-100 characters)",
  addressHome:
    "Enter your permanent address in home country (5-100 characters)",
};

const validateField = (field: string, value: string): string | null => {
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{9,11}$/;
  const addressRegex = /^.{5,100}$/;

  switch (field) {
    case "firstName":
    case "lastName":
      return nameRegex.test(value)
        ? null
        : "Name must be 2-50 characters long and contain only letters spaces";
    case "email":
      return emailRegex.test(value)
        ? null
        : "Please enter a valid email address";
    case "birthday": {
      const date = new Date(value);
      return date <= new Date()
        ? null
        : "Date of birth cannot be in the future";
    }
    case "telephone":
    case "mobile":
      return phoneRegex.test(value) ? null : "Phone number must be 9-11 digits";
    case "addressKorea":
    case "addressHome":
      return addressRegex.test(value)
        ? null
        : "Address must be 5-100 characters long";
    default:
      return null;
  }
};

export function AlienRegistrationFlow() {
  const [step, setStep] = useState(-1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    nationality: "",
    sex: "",
    telephone: "",
    mobile: "",
    addressKorea: "",
    addressHome: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const steps = [
    {
      title: "Personal Information",
      fields: ["firstName", "lastName", "email"],
    },
    {
      title: "Additional Details",
      fields: ["birthday", "nationality", "sex"],
    },
    { title: "Contact Information", fields: ["telephone", "mobile"] },
    {
      title: "Address Information",
      fields: ["addressKorea", "addressHome"],
    },
    { title: "Review and Submit", fields: [] },
  ];

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const isStepValid = (stepIndex: number) => {
    if (stepIndex === -1) return true;
    return steps[stepIndex].fields.every(
      (field) =>
        (field === "telephone" || field === "mobile" || field === "addressKorea"
          ? true
          : formData[field as keyof typeof formData]?.trim() !== "") &&
        !errors[field]
    );
  };

  const progress = step === -1 ? 0 : ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
      <img
        src={mascotImage}
        alt="HiKorea Mascot"
        className="absolute top-0 right-0 h-64 w-64 object-contain"
      />
      <div className="flex items-center mb-8">
        <h1 className="text-4xl font-bold text-[#013563]">HiKorea Assistant</h1>
      </div>
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="bg-[#013563] text-white">
          <CardTitle>{step === -1 ? "Welcome" : steps[step].title}</CardTitle>
          <CardDescription className="text-gray-200">
            {step === -1
              ? "What help do you need?"
              : "Please fill in the required information"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {step > -1 && <Progress value={progress} className="mb-6" />}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {step === -1 && (
              <div className="space-y-4">
                <Button
                  className="w-full justify-start bg-[#013563] hover:bg-[#014583] transition-colors"
                  onClick={() => setStep(0)}
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
            )}
            {step >= 0 && step < steps.length - 1 && (
              <div className="space-y-4">
                {steps[step].fields.map((field) => (
                  <div key={field}>
                    <div className="flex items-center">
                      <Label htmlFor={field} className="mr-2">
                        {fieldLabels[field]}
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{fieldHelpers[field]}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {field === "nationality" ? (
                      <Select
                        onValueChange={(value) => updateField(field, value)}
                      >
                        <SelectTrigger id={field} className="w-full mt-1">
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              <span className="flex items-center">
                                <span
                                  className="mr-2"
                                  role="img"
                                  aria-label={`Flag of ${country.name}`}
                                >
                                  {country.flag}
                                </span>
                                {country.name}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field === "sex" ? (
                      <RadioGroup
                        onValueChange={(value) => updateField(field, value)}
                        className="flex space-x-4 mt-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                      </RadioGroup>
                    ) : field === "telephone" || field === "mobile" ? (
                      <div className="flex items-center mt-1">
                        <span className="mr-2">+82</span>
                        <Input
                          id={field}
                          type="tel"
                          value={formData[field as keyof typeof formData]}
                          onChange={(e) => updateField(field, e.target.value)}
                          className="flex-grow"
                        />
                      </div>
                    ) : (
                      <Input
                        id={field}
                        type={
                          field === "email"
                            ? "email"
                            : field === "birthday"
                            ? "date"
                            : "text"
                        }
                        value={formData[field as keyof typeof formData]}
                        onChange={(e) => updateField(field, e.target.value)}
                        className="w-full mt-1"
                      />
                    )}
                    {errors[field] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#013563]">
                  Review Your Information
                </h3>
                {Object.entries(formData).map(([key, value]) => (
                  <p
                    key={key}
                    className="flex justify-between border-b border-gray-200 py-2"
                  >
                    <strong className="text-[#013563]">
                      {fieldLabels[key]}:
                    </strong>
                    <span>
                      {key === "nationality"
                        ? `${countries.find((c) => c.code === value)?.flag} ${
                            countries.find((c) => c.code === value)?.name
                          }`
                        : (key === "telephone" || key === "mobile"
                            ? `+82 ${value}`
                            : value) || "Not provided"}
                    </span>
                  </p>
                ))}
              </div>
            )}
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-between bg-gray-50">
          {step >= 0 && (
            <Button
              variant="outline"
              onClick={() => setStep((prev) => prev - 1)}
              className="border-[#013563] text-[#013563] hover:bg-[#013563] hover:text-white"
            >
              Back
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button
              onClick={() => setStep((prev) => prev + 1)}
              disabled={!isStepValid(step)}
              className="bg-[#013563] hover:bg-[#014583] transition-colors"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : step === steps.length - 1 ? (
            <Button
              onClick={() => generatePDF(formData)}
              className="bg-[#013563] hover:bg-[#014583] transition-colors"
            >
              Generate PDF <FileDown className="ml-2 h-4 w-4" />
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
}
