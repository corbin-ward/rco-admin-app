'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const organizationSchema = z.object({
  name: z.string().min(2, { message: "Organization name must be at least 2 characters." }),
  tags: z.string().min(2, { message: "Please provide at least one tag." }),
  type: z.enum(["undergraduate", "graduate", "sports", "department"]),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  deiStatement: z.string().min(10, { message: "DEI statement must be at least 10 characters." }),
  presidentFirstName: z.string().min(2, { message: "President's first name is required." }),
  presidentLastName: z.string().min(2, { message: "President's last name is required." }),
  presidentEmail: z.string().email({ message: "Invalid email address." }),
  advisorFirstName: z.string().min(2, { message: "Advisor's first name is required." }),
  advisorLastName: z.string().min(2, { message: "Advisor's last name is required." }),
  advisorEmail: z.string().email({ message: "Invalid email address." }),
  activeStatusAcknowledgement: z.boolean().refine(val => val === true, {
    message: "You must acknowledge the active status requirements.",
  }),
  spaceUseGuidelines: z.boolean(),
  oitProcesses: z.boolean(),
  foodSafetyPolicies: z.boolean(),
})

const steps = [
  { title: "Organization Information", fields: ["name", "tags", "type", "description", "deiStatement"] },
  { title: "Contact Information", fields: ["presidentFirstName", "presidentLastName", "presidentEmail", "advisorFirstName", "advisorLastName", "advisorEmail"] },
  { title: "Active Status Requirements", fields: ["activeStatusAcknowledgement"] },
  { title: "Acknowledging Campus Procedures", fields: ["spaceUseGuidelines", "oitProcesses", "foodSafetyPolicies"] },
]

export default function RegisterOrganizationPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const form = useForm<z.infer<typeof organizationSchema>>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      tags: "",
      type: "undergraduate",
      description: "",
      deiStatement: "",
      presidentFirstName: "",
      presidentLastName: "",
      presidentEmail: "",
      advisorFirstName: "",
      advisorLastName: "",
      advisorEmail: "",
      activeStatusAcknowledgement: false,
      spaceUseGuidelines: false,
      oitProcesses: false,
      foodSafetyPolicies: false,
    },
  })

  function onSubmit(values: z.infer<typeof organizationSchema>) {
    console.log(values)
    // Here you would typically send this data to your backend
  }

  const currentStepFields = steps[currentStep].fields

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Organization Registration</CardTitle>
            <CardDescription>
              Register your club or organization to be active with the Office of Student Involvement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {currentStep === 0 && (
                  <>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter organization name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Tags</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter tags separated by commas" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select organization type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="undergraduate">Undergraduate Student Organization</SelectItem>
                              <SelectItem value="graduate">Graduate Student Organization</SelectItem>
                              <SelectItem value="sports">Sports Club</SelectItem>
                              <SelectItem value="department">University Department</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your organization" 
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deiStatement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Diversity, Equity, and Inclusion Statement</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter your organization's DEI statement" 
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {currentStep === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="presidentFirstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>President's First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter president's first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="presidentLastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>President's Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter president's last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="presidentEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>President's Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter president's email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="advisorFirstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Advisor's First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter advisor's first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="advisorLastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Advisor's Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter advisor's last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="advisorEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Advisor's Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter advisor's email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {currentStep === 2 && (
                  <FormField
                    control={form.control}
                    name="activeStatusAcknowledgement"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Active Status Requirements</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="text-sm text-muted-foreground space-y-2">
                          <p>To achieve active status as an organization at UC Merced, the following requirements must be fulfilled each academic year:</p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>An organization must register with the Office of Student Involvement annually</li>
                            <li>An organization must have a minimum of 4 officers at all times (President, Vice President, Secretary, and Treasurer)</li>
                            <li>An organization must have an advisor; Staff, Faculty or a grad student can assume the role of advisor(s) with their permission</li>
                            <li>An organizations must read, review, and complete the Officers Terms and Conditions Agreement, as part of the annual Registration Process.</li>
                            <li>
                              Organization officers must complete all 4 trainings, with a minimum of 4 officers attending each training. These trainings are as follows:
                              <ul className="list-disc pl-5 space-y-1 mt-1">
                                <li>RCO 101 & Orientation</li>
                                <li>Event Planning</li>
                                <li>Risk Management</li>
                                <li>Finance Management & How to Spend Club Funds</li>
                              </ul>
                            </li>
                          </ul>
                          <p>*Multiple opportunities will be available in person and zoom to complete these trainings.*</p>
                          <p>Failure to meet any of the above requirements will result in your organization being placed on an "inactive" status with OSI.</p>
                          <p>Failure to meet any of the above requirements will result in your organization being placed on an "inactive" status with OSI. An "Inactive Status" means:</p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>An organization will not be able to participate in any campus-wide events, whether it is on campus, off campus, or virtually.</li>
                            <li>An organization will not be able to hold any events on campus, off campus, and virtually under your organization’s name.</li>
                            <li>An organization will not be able to use any campus space or resources for organization meetings, events, other gatherings, and for marketing uses.</li>
                            <li>An organization will not be recognized or endorsed as a student organization by the Office of Student Involvement.</li>
                            <li>An organization will not be able to receive any recognition for awards for the 2023-2024 academic year.</li>
                          </ul>
                          <p>*please note, any fraternity and sorority organization does have additional requirements that need to be met annually. Please refer to the Expectations of Recognition*</p>
                          <p>Optional Trainings that you may request with us:</p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Hazing Prevention</li>
                            <li>CatLife Training</li>
                            <li>Diversity and Cultural Humility in Student Organizations</li>
                            <li>"Oh How the Tables have Turned" - How to Table Workshop</li>
                          </ul>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {currentStep === 3 && (
                  <>
                    <FormField
                      control={form.control}
                      name="spaceUseGuidelines"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Space Use Guidelines
                            </FormLabel>
                            <FormDescription>
                              I agree to follow all space use guidelines.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="oitProcesses"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Office of Information Technology Processes
                            </FormLabel>
                            <FormDescription>
                              I agree to follow all OIT processes.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="foodSafetyPolicies"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Food Safety Policies
                            </FormLabel>
                            <FormDescription>
                              I agree to follow all food safety policies.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  {currentStep < steps.length - 1 ? (
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button type="submit">Submit Registration</Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}

