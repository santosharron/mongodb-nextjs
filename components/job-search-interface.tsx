import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, ListFilter, Share2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { GetStaticProps } from "next";
import Link from 'next/link';

import { Slider } from '@/components/ui/slider'; // Import Shadcn Slider

interface Job {
  _id: string;
  title: string;
  company: string;
  imageUrl: string;
  immediateStartDate: string;
  jobOpenings: string;
  url: string;
  location: string;
  skills: string[];
  salaryRange: string;
  experienceLevel: string;
  probationDuration: string;
}

const locations = [
  "New York",
  "San Francisco",
  "London",
  "Berlin",
  "Tokyo",
  "Remote",
];

const skillsList = [
  "Agile", "Communication", "Adobe XD", "Figma", "User Research", "Product Development",
  "Marketing Specialist", "Content Marketing", "Analytics", "React.js", "Next.js", "JavaScript",
  "TypeScript", "Node.js", "Express.js", "Python", "MongoDB", "Machine Learning", "GraphQL",
  "HTML", "CSS", "SQL", "Tailwind CSS", "Docker", "Kubernetes", "AWS", "Azure",
  "Software Engineer", "Product Manager", "Data Scientist", "UX Designer", "Frontend Developer",
  "Backend Developer", "Full Stack Developer", "DevOps Engineer",
];

const experienceLevels = [
  "Entry Level", "1-3 years", "3-5 years", "5-7 years", "7+ years",
];

export function JobSearchInterfaceComponent() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillSearchTerm, setSkillSearchTerm] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<string[]>(skillsList);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [salaryRange, setSalaryRange] = useState<number[]>([0, 12]); // Default range
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Job[] = await response.json();
        setJobs(data);
        setFilteredJobs(data); // Show all jobs initially
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    // Filter jobs whenever filters or job list changes
    const applyFilters = () => {
      let result = jobs;

      if (selectedSkills.length > 0) {
        result = result.filter(job =>
          selectedSkills.every(skill => job.skills.includes(skill) || job.title.includes(skill))
        );
      }

      if (selectedLocations.length > 0) {
        result = result.filter(job => selectedLocations.includes(job.location));
      }

      if (selectedExperience) {
        result = result.filter(job => job.experienceLevel === selectedExperience);
      }

      if (salaryRange) {
        result = result.filter(job => {
          const minSalary = parseInt(job.salaryRange.split(' ')[0], 10);
          return minSalary >= salaryRange[0] && minSalary <= salaryRange[1];
        });
      }

      // Include jobs where the title matches the search term
      if (selectedTitle) {
        result = result.filter(job =>
          job.title.toLowerCase().includes(selectedTitle.toLowerCase())
        );
      }

      setFilteredJobs(result);
    };

    applyFilters();
  }, [selectedSkills, selectedLocations, selectedExperience, salaryRange, selectedTitle, jobs]);

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSkillSearchTerm(value);
    if (value) {
      const filtered = skillsList.filter(skill =>
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
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const handleLocationChange = (value: string) => {
    if (selectedLocations.length < 3 && !selectedLocations.includes(value)) {
      setSelectedLocations([...selectedLocations, value]);
    }
  };

  const handleRemoveLocation = (location: string) => {
    setSelectedLocations(selectedLocations.filter(l => l !== location));
  };

  const handleExperienceChange = (value: string) => {
    setSelectedExperience(value);
  };

  const handleClearFilters = () => {
    setSelectedSkills([]);
    setSelectedLocations([]);
    setSelectedExperience("");
    setSalaryRange([0, 12]); // Reset slider range
    setFilteredJobs(jobs); // Show all jobs
  };

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-full flex flex-col md:flex-row">
  {/* Left column: Search and Job Listings */}
  <div className="flex flex-col flex-1 md:mr-6">
    {/* Fixed search and filter section */}
    <div className="static md:sticky md:top-0 bg-white z-10 border-b border-gray-200 p-4 mb-6">
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
            {/* Search by Skills with live suggestions */}
            <div className="relative flex-1">
              <Input
                type="text"
                value={skillSearchTerm}
                onChange={handleSkillInputChange}
                placeholder="Search by Role / Skills"
                className="w-full"
              />
              {skillSearchTerm && filteredSkills.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 shadow-lg rounded-md max-h-40 overflow-auto">
                  {filteredSkills.map(skill => (
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

            <div className="flex flex-col items-center lg:items-start">
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="w-full lg:w-auto">Sort by (Date)<ListFilter className='ml-2' /></Button>
                </PopoverTrigger>
                <PopoverContent className="w-50">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none text-blue-600">Post Time (Newest first)</h4>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <span className="text-sm text-gray-500 block">{filteredJobs.length} results</span>
            </div>
          </div>

          {/* Display selected skills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedSkills.map(skill => (
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
    </div>

    {/* Job Listings */}
    <div className="overflow-y-auto flex-1">
      {filteredJobs.map(job => (
        <Card key={job._id} className='mb-8'>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4 p-4">
            <div className="flex items-center space-x-4">
              <img src={job.imageUrl} alt={job.company} className="w-12 h-12 bg-blue-500 rounded-full" />
              <div>
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p className="text-gray-600">{job.company} | {job.location}</p>
              </div>
            </div>
            <Share2 className="text-gray-400" size={20} />
          </div>
  
          <div className="flex flex-wrap gap-4 mb-4">
            {job.skills.map((skill, index) => (
              <span key={index} className="bg-gray-200 px-2 py-1 rounded-md text-sm">
                {skill}
              </span>
            ))}
          </div>
  
         {/* Desktop Layout */}
<div className="hidden md:flex flex-row items-center text-sm mb-4">
  {/* Job Offer */}
  <div className="flex items-center flex-1">
    <div className="flex flex-col items-center w-full">
      <p className="text-gray-600">💼 Job Offer</p>
      <p className="font-semibold mt-1">{job.salaryRange}</p>
    </div>
  </div>

  {/* Start Date */}
  <div className="flex items-center flex-1">
    <div className="border-l h-6 border-gray-300 mx-4"></div> {/* Vertical border */}
    <div className="flex flex-col items-center w-full">
      <p className="text-gray-600">📅 Start Date</p>
      <p className="font-semibold mt-1">{job.immediateStartDate}</p>
    </div>
  </div>

  {/* Openings */}
  <div className="flex items-center flex-1">
    <div className="border-l h-6 border-gray-300 mx-4"></div> {/* Vertical border */}
    <div className="flex flex-col items-center w-full">
      <p className="text-gray-600">#Openings</p>
      <p className="font-semibold mt-1">{job.jobOpenings}</p>
    </div>
  </div>

  {/* Probation Duration */}
  <div className="flex items-center flex-1">
    <div className="border-l h-6 border-gray-300 mx-4"></div> {/* Vertical border */}
    <div className="flex flex-col items-center w-full">
      <p className="text-gray-600">Probation Duration</p>
      <p className="font-semibold mt-1">{job.probationDuration}</p>
    </div>
  </div>
</div>

{/* Mobile Layout */}
<div className="md:hidden flex flex-col space-y-4 mb-4">
  {/* Job Offer */}
  <div className="flex flex-col items-center">
    <p className="text-gray-600">💼 Job Offer</p>
    <p className="font-semibold mt-1">{job.salaryRange}</p>
  </div>

  {/* Start Date */}
  <div className="flex flex-col items-center">
    <p className="text-gray-600">📅 Start Date</p>
    <p className="font-semibold mt-1">{job.immediateStartDate}</p>
  </div>

  {/* Openings */}
  <div className="flex flex-col items-center">
    <p className="text-gray-600">#Openings</p>
    <p className="font-semibold mt-1">{job.jobOpenings}</p>
  </div>

  {/* Probation Duration */}
  <div className="flex flex-col items-center">
    <p className="text-gray-600">Probation Duration</p>
    <p className="font-semibold mt-1">{job.probationDuration}</p>
  </div>
</div>


  
          <p className="text-sm text-blue-500">100+ applicants</p>
  
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">Apply by 13 October 2024 • Posted 7h ago</p>
            <div className="space-x-2 mt-4 lg:mt-0">
              <Button variant="outline">View Details</Button>
              <Link href="https://www.linkedin.com/in/santoshvp/" target='_blank'>
                <Button>Apply Now</Button>
              </Link>
            </div>
          </div>
        </CardContent>
        <div className="border-t border-gray-200"></div>
        <div className="bg-blue-500 text-white p-3 text-center">
          Share this with your friends and Earn 💵 via LFJ Click Here
        </div>
      </Card>
      ))}
    </div>
  </div>

  {/* Right column: Job/Internship Location Preference and Filters */}
  <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
    {/* Fixed search and filter section */}
    <div className="static md:sticky md:top-0 bg-white z-10 border-b border-gray-200 p-4 mb-6">
      {/* Job/Internship Location Preference */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Job/Internship Location Preference</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Add your preferred locations for In-Office Jobs/Internship (Up to 3). Add "Remote" if you want only work from home Jobs.
          </p>
          <Select onValueChange={handleLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select locations" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(location => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedLocations.map(location => (
              <span key={location} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {location}
                <button
                  onClick={() => handleRemoveLocation(location)}
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
          <CardTitle>Apply Filters</CardTitle>
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
            <Select onValueChange={handleExperienceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map(level => (
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
            <Slider
              value={salaryRange}
              min={0}
              max={12}
              step={1}
              onValueChange={setSalaryRange}
              className="mb-2"
              completedClassName="bg-gray-300"
              nonCompletedClassName="bg-blue-500"
              thumbClassName="bg-blue-500"
              stepMarks={[0, 3, 6, 8, 10, 12]}
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>0 LPA</span>
              <span>6 LPA</span>
              <span>12 LPA</span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <Button variant="ghost" onClick={handleClearFilters}>Clear</Button>
            <Button onClick={() => setFilteredJobs(jobs)}>Apply</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</div>

    </div>
  );
}

