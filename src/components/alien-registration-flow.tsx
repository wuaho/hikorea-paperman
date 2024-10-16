'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, FileDown } from 'lucide-react'

// Mock function for PDF generation
const generatePDF = (data: unknown) => {
  console.log("Generating PDF with data:", data)
  // In a real application, this would generate and return a PDF
  alert("PDF generated! (This is a mock function)")
}

export function AlienRegistrationFlow() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    nationality: '',
    passportNumber: '',
    dateOfBirth: '',
    address: '',
  })

  const steps = [
    { title: "Personal Information", fields: ['name', 'surname', 'nationality'] },
    { title: "Passport Details", fields: ['passportNumber', 'dateOfBirth'] },
    { title: "Address Information", fields: ['address'] },
    { title: "Review and Submit", fields: [] },
  ]

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isStepValid = (stepIndex: number) => {
    return steps[stepIndex].fields.every(field => formData[field as keyof typeof formData]?.trim() !== '')
  }

  const progress = ((step + 1) / steps.length) * 100

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>HiKorea Assistant</CardTitle>
        <CardDescription>Apply for Alien Registration Card</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-4" />
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => updateField('name', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="surname">Surname</Label>
              <Input id="surname" value={formData.surname} onChange={(e) => updateField('surname', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="nationality">Nationality</Label>
              <Select onValueChange={(value) => updateField('nationality', value)}>
                <SelectTrigger id="nationality">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kr">Korea</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="cn">China</SelectItem>
                  {/* Add more nationalities as needed */}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="passportNumber">Passport Number</Label>
              <Input id="passportNumber" value={formData.passportNumber} onChange={(e) => updateField('passportNumber', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={(e) => updateField('dateOfBirth', e.target.value)} />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Address in Korea</Label>
              <Input id="address" value={formData.address} onChange={(e) => updateField('address', e.target.value)} />
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Information</h3>
            {Object.entries(formData).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value}</p>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 0 && (
          <Button variant="outline" onClick={() => setStep(prev => prev - 1)}>
            Back
          </Button>
        )}
        {step < steps.length - 1 ? (
          <Button 
            onClick={() => setStep(prev => prev + 1)} 
            disabled={!isStepValid(step)}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={() => generatePDF(formData)}>
            Generate PDF <FileDown className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}