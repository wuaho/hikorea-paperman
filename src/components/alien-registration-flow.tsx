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
import { ChevronRight, FileDown } from "lucide-react";
import { motion } from "framer-motion";

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

  const steps = [
    {
      title: "Personal Information",
      fields: ["firstName", "lastName", "email"],
    },
    { title: "Additional Details", fields: ["birthday", "nationality", "sex"] },
    { title: "Contact Information", fields: ["telephone", "mobile"] },
    { title: "Address Information", fields: ["addressKorea", "addressHome"] },
    { title: "Review and Submit", fields: [] },
  ];

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = (stepIndex: number) => {
    if (stepIndex === -1) return true;
    return steps[stepIndex].fields.every((field) =>
      field === "telephone" || field === "mobile" || field === "addressKorea"
        ? true
        : formData[field as keyof typeof formData]?.trim() !== ""
    );
  };

  const progress = step === -1 ? 0 : ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-center p-4">
      <div className="flex items-center mb-8">
        <img
          src="/placeholder.svg?height=50&width=50"
          alt="HiKorea Logo"
          className="mr-4 h-12 w-12"
        />
        <h1 className="text-4xl font-bold text-blue-600">HiKorea Assistant</h1>
      </div>
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
          <CardTitle>{step === -1 ? "Welcome" : steps[step].title}</CardTitle>
          <CardDescription className="text-blue-100">
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
                  className="w-full justify-start bg-blue-500 hover:bg-blue-600 transition-colors"
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
            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="birthday">Date of Birth</Label>
                  <Input
                    id="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => updateField("birthday", e.target.value)}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Select
                    onValueChange={(value) => updateField("nationality", value)}
                  >
                    <SelectTrigger
                      id="nationality"
                      className="border-blue-200 focus:border-blue-500"
                    >
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
                </div>
                <div>
                  <Label>Sex</Label>
                  <RadioGroup
                    onValueChange={(value) => updateField("sex", value)}
                    className="flex space-x-4"
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
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="telephone">Telephone Number (Optional)</Label>
                  <Input
                    id="telephone"
                    value={formData.telephone}
                    onChange={(e) => updateField("telephone", e.target.value)}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number (Optional)</Label>
                  <Input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => updateField("mobile", e.target.value)}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="addressKorea">
                    Address in Korea (Optional)
                  </Label>
                  <Input
                    id="addressKorea"
                    value={formData.addressKorea}
                    onChange={(e) =>
                      updateField("addressKorea", e.target.value)
                    }
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="addressHome">Address in Home Country</Label>
                  <Input
                    id="addressHome"
                    value={formData.addressHome}
                    onChange={(e) => updateField("addressHome", e.target.value)}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600">
                  Review Your Information
                </h3>
                {Object.entries(formData).map(([key, value]) => (
                  <p
                    key={key}
                    className="flex justify-between border-b border-blue-100 py-2"
                  >
                    <strong className="text-blue-600">
                      {fieldLabels[key]}:
                    </strong>
                    <span>
                      {key === "nationality"
                        ? `${countries.find((c) => c.code === value)?.flag} ${
                            countries.find((c) => c.code === value)?.name
                          }`
                        : value || "Not provided"}
                    </span>
                  </p>
                ))}
              </div>
            )}
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-between bg-gray-50">
          {step > 0 && (
            <Button
              variant="outline"
              onClick={() => setStep((prev) => prev - 1)}
              className="border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              Back
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button
              onClick={() => setStep((prev) => prev + 1)}
              disabled={!isStepValid(step)}
              className="bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : step === steps.length - 1 ? (
            <Button
              onClick={() => generatePDF(formData)}
              className="bg-green-500 hover:bg-green-600 transition-colors"
            >
              Generate PDF <FileDown className="ml-2 h-4 w-4" />
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
}
