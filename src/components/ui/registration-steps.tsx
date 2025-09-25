import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { GraduationCap, Briefcase, BookOpen, User } from "lucide-react";

const profileSchema = z.object({
  userType: z.enum(["school", "college", "fresher", "professional"], { 
    required_error: "Please select user type" 
  }),
  domain: z.string().min(1, "Please select domain").optional(),
  course: z.string().min(1, "Please select course").optional(),
  startYear: z.string().optional(),
  endYear: z.string().optional(),
  collegeName: z.string().min(1, "Please enter college name").optional(),
  city: z.string().min(1, "Please enter city").optional(),
  purpose: z.enum(["job", "compete", "host", "mentor"], {
    required_error: "Please select purpose"
  }),
});

const userTypes = [
  { value: "school", label: "School Student", icon: BookOpen },
  { value: "college", label: "College Student", icon: GraduationCap },
  { value: "fresher", label: "Fresher", icon: User },
  { value: "professional", label: "Professional", icon: Briefcase },
];

const domains = [
  "Management",
  "Engineering", 
  "Arts & Science",
  "Medicine",
  "Law",
];

const purposes = [
  { value: "job", label: "To find a Job", icon: Briefcase },
  { value: "compete", label: "Compete & Upskill", icon: GraduationCap },
  { value: "host", label: "To Host an Event", icon: User },
  { value: "mentor", label: "To be a Mentor", icon: BookOpen },
];

const RegistrationSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      userType: undefined,
      domain: "",
      course: "",
      startYear: "",
      endYear: "",
      collegeName: "",
      city: "",
      purpose: undefined,
    },
  });

  const watchedUserType = form.watch("userType");
  
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    const currentValues = form.getValues();
    
    if (currentStep === 1 && !currentValues.userType) {
      toast({
        title: "Please select user type",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: any) => {
    console.log("Registration completed:", data);
    toast({
      title: "Registration Completed!",
      description: "Welcome to Campus Events. You're ready to be unstoppable!",
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Ready to Be Unstoppable!</h2>
              <p className="text-muted-foreground">Let's add some basic information</p>
              <div className="w-16 h-1 bg-accent mx-auto mt-2 rounded-full"></div>
            </div>
            
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">User type *</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {userTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <div key={type.value}>
                          <input
                            type="radio"
                            id={type.value}
                            value={type.value}
                            className="sr-only"
                            onChange={() => field.onChange(type.value)}
                            checked={field.value === type.value}
                          />
                          <Label
                            htmlFor={type.value}
                            className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              field.value === type.value
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-accent/50'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span>{type.label}</span>
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Let's add some basic information</h2>
              <div className="flex space-x-2 justify-center">
                <div className="w-8 h-1 bg-accent rounded-full"></div>
                <div className="w-8 h-1 bg-primary rounded-full"></div>
              </div>
            </div>

            {(watchedUserType === "college" || watchedUserType === "school") && (
              <>
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain *</FormLabel>
                      <div className="grid grid-cols-2 gap-3">
                        {domains.map((domain) => (
                          <div key={domain}>
                            <input
                              type="radio"
                              id={domain}
                              value={domain}
                              className="sr-only"
                              onChange={() => field.onChange(domain)}
                              checked={field.value === domain}
                            />
                            <Label
                              htmlFor={domain}
                              className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                field.value === domain
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-accent/50'
                              }`}
                            >
                              {domain}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="btech">B.Tech</SelectItem>
                          <SelectItem value="mtech">M.Tech</SelectItem>
                          <SelectItem value="bba">BBA</SelectItem>
                          <SelectItem value="mba">MBA</SelectItem>
                          <SelectItem value="bsc">B.Sc</SelectItem>
                          <SelectItem value="msc">M.Sc</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Duration *</FormLabel>
                        <FormControl>
                          <Input placeholder="Start Year" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="opacity-0">End</FormLabel>
                        <FormControl>
                          <Input placeholder="End Year" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="collegeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="College name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input placeholder="Mumbai, Maharashtra, India" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {(watchedUserType === "fresher" || watchedUserType === "professional") && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Professional details will be collected in the next step</p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Ready to Be Unstoppable!</h2>
              <p className="text-muted-foreground mb-4">Plan your Career</p>
              <div className="flex space-x-2 justify-center">
                <div className="w-6 h-1 bg-accent rounded-full"></div>
                <div className="w-6 h-1 bg-accent rounded-full"></div>
                <div className="w-6 h-1 bg-primary rounded-full"></div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Purpose</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {purposes.map((purpose) => {
                      const Icon = purpose.icon;
                      return (
                        <div key={purpose.value}>
                          <input
                            type="radio"
                            id={purpose.value}
                            value={purpose.value}
                            className="sr-only"
                            onChange={() => field.onChange(purpose.value)}
                            checked={field.value === purpose.value}
                          />
                          <Label
                            htmlFor={purpose.value}
                            className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              field.value === purpose.value
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-accent/50'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span>{purpose.label}</span>
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="card-bg border-0">
      <CardHeader>
        <Progress value={progress} className="w-full h-2" />
        <CardDescription className="text-center">
          Step {currentStep} of {totalSteps}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {renderStepContent()}
            
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              
              {currentStep === totalSteps ? (
                <Button type="submit" className="bg-accent hover:bg-accent/90">
                  Complete Registration
                </Button>
              ) : (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegistrationSteps;