'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ListFilter, Share2Icon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { GetStaticProps } from "next";
import Link from 'next/link'

interface Jobs {
  _id: ObjectId;
  title: string;
  metacritic: number;
  plot: string;
}


interface TopProps {
  jobs: Jobs[];
}

// Define a Job type to avoid the 'never' type error
type Job = {
  _id: string
  title: string
  company: string
  imageUrl: string
  immediateStartDate: string
  jobOpenings: string
  url: string
  location: string
  skills: string[]
  salaryRange: string
  experienceLevel: string
}


const locations = [
  "New York",
  "San Francisco",
  "London",
  "Berlin",
  "Tokyo",
  "Remote",
]

const skillsList = [
  "React.js",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "GraphQL",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
]

const experienceLevels = [
  "Entry Level",
  "1-3 years",
  "3-5 years",
  "5-7 years",
  "7+ years",
]

export function JobSearchInterfaceComponent() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillSearchTerm, setSkillSearchTerm] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<string[]>(skillsList);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSkillSearchTerm(value);
    if (value) {
      const filtered = skillsList.filter((skill) =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills(skillsList);
    }
  };

  const handleSelectSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setSkillSearchTerm("");
    setFilteredSkills(skillsList);
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Job[] = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
  
    fetchJobs();
  }, []);
  

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Search and Job Listings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center space-x-4">
                {/* Search by Skills with live suggestions */}
                <div className="relative w-full">
                  <Input
                    type="text"
                    value={skillSearchTerm}
                    onChange={handleSkillInputChange}
                    placeholder="Search by Role / Skills"
                    className="flex-grow"
                  />
                  {skillSearchTerm && filteredSkills.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-200 shadow-lg rounded-md max-h-40 overflow-auto">
                      {filteredSkills.map((skill) => (
                        <div
                          key={skill}
                          onClick={() => handleSelectSkill(skill)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center">
                <Popover><PopoverTrigger asChild>
                  <Button>Sort by (Date)<ListFilter className='ml-2'/></Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-50">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-blue-600">Post Time (Newest first)</h4>
            
          </div>
        </div>
      </PopoverContent>
    </Popover>
                  <span className="text-sm text-gray-500 block">20 results</span>
                </div>
              </div>

              {/* Display selected skills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 text-blue-800 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Job Listings */}
          {jobs.map((job) => (
            <Card key={job._id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img src={job.imageUrl} alt={job.company} className="w-12 h-12 bg-blue-500 rounded-full" />
                    <div>
                      <h2 className="text-xl font-bold">{job.title}</h2>
                      <p className="text-gray-600">{job.company} | {job.location}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-200 px-2 py-1 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-600">Job Offer</p>
                    <p className="font-semibold">{job.salaryRange}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Experience</p>
                    <p className="font-semibold">{job.experienceLevel}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Immediate Start</p>
                    <p className="font-semibold">{job.immediateStartDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Job Openings</p>
                    <p className="font-semibold">{job.jobOpenings}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-blue-500">Apply by 13 October 2024 • Posted 2h ago</p>
                  <div className="space-x-2">
                    <Button variant="outline">View Details</Button>
                    <Link href="https://www.linkedin.com/in/santoshvp/" target='_blank'><Button>Apply Now</Button></Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right column: Job/Internship Location Preference and Filters */}
        <div className="space-y-6">
          {/* Job/Internship Location Preference */}
          <Card>
            <CardHeader>
              <CardTitle>Job/Internship Location Preference</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Add your preferred locations for In-Office Jobs/Internship (Upto 3). Add "Remote" if you want only work from home Jobs.
              </p>
              <Select
                onValueChange={(value) => {
                  if (selectedLocations.length < 3 && !selectedLocations.includes(value)) {
                    setSelectedLocations([...selectedLocations, value])
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select locations" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedLocations.map((location) => (
                  <span key={location} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {location}
                    <button
                      onClick={() => setSelectedLocations(selectedLocations.filter(l => l !== location))}
                      className="ml-1 text-blue-800 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Apply Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Apply filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Office Type</h4>
                <RadioGroup defaultValue="remote">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="remote" id="remote" />
                    <Label htmlFor="remote">Remote</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in-office" id="in-office" />
                    <Label htmlFor="in-office">In-Office</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Work Experience</h4>
                <Select onValueChange={setSelectedExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedExperience && (
                  <div className="mt-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {selectedExperience}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-semibold mb-2">Min Salary</h4>
                <Slider defaultValue={[3]} max={12} step={1} className="mb-2" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>3 LPA</span>
                  <span>6 LPA</span>
                  <span>8 LPA</span>
                  <span>10 LPA</span>
                  <span>12 LPA</span>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="ghost">Clear</Button>
                <Button>Apply</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}