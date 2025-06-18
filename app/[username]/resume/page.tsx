"use client"

import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, Mail, Phone, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"

// Mock user data - in a real app, this would come from a database
const getUserData = (username: string) => {
  const users = {
    iamgopaul: {
      username: "iamgopaul",
      name: "Josh Gopaul",
      email: "jgopa003@fiu.edu",
      phone: "1(954)643-8379",
      location: "Miami, Florida",
      title: "AI/ML & Full-Stack Developer",
      bio: "Computer Science graduate student specializing in AI/ML and full-stack development at Florida International University.",
      profileImage: "/images/profile.jpg",
      github: "https://github.com/iamgopaul",
      linkedin: "https://www.linkedin.com/in/iamgopaul/",
      skills: [
        "Python",
        "Java",
        "JavaScript",
        "TypeScript",
        "TensorFlow",
        "PyTorch",
        "React.js",
        "Next.js",
        "Node.js",
        "AWS",
        "Docker",
        "PostgreSQL",
      ],
      education: [
        {
          degree: "MSc Computer Science",
          institution: "Florida International University (FIU)",
          location: "Miami, Florida",
          period: "August 2024 – May 2026",
          gpa: "3.83",
          courses: [
            "Intro to AI",
            "Intro to Algorithms",
            "Operating Systems",
            "Intro to Data Science",
            "Software Security",
            "Principles of DBMS",
          ],
        },
        {
          degree: "BSc Computer Science with Management",
          institution: "University of the West Indies St Augustine",
          location: "St Augustine, Trinidad & Tobago",
          period: "August 2020 - September 2023",
          gpa: "3.36 (Upper Second-Class Honors)",
          achievements: ["Deans Honor Roll (2020-2021)"],
          courses: [
            "Computer Programming I/II/III",
            "Software Engineering I/II",
            "Object Oriented Programming I/II",
            "Game Programming",
            "Web Programming & Technologies",
            "Enterprise Database Systems",
            "Cloud Computing",
            "Data Structures",
            "Computer Architecture",
            "Theory of Computing",
            "Operating Systems",
            "Computer Networks",
            "E-Commerce",
          ],
        },
      ],
      experience: [
        {
          title: "IT Support Assistant",
          company: "Gopaul and Company LTD",
          location: "Caroni, Trinidad & Tobago",
          period: "September 2023 - January 2024",
          achievements: [
            "Resolved over 50 software issues related to SYSPRO and Crystal Reports, improving team efficiency by 15%",
            "Conducted cybersecurity training for 20+ employees, reducing phishing attempts by 30%",
            "Performed 100+ system updates for Windows, Office365, and System Antivirus, enhancing system security",
            "Diagnosed and repaired 30+ hardware issues, decreasing device downtime by 25%",
            "Optimized inventory tracking by introducing a streamlined reporting process, increasing data accuracy by 20%",
          ],
        },
        {
          title: "Treasurer",
          company: "UWI Computer Society",
          location: "St Augustine, Trinidad & Tobago",
          period: "2022-2023",
          achievements: [
            "Managed $1,000 budget across 5 events",
            "Coordinated financial planning for student organization activities",
          ],
        },
      ],
      projects: [
        {
          title: "Differential Diagnosis for Sepsis",
          period: "August 2024 – Present",
          location: "Florida International University",
          description:
            "Collaborated with a team to create an AI model utilizing TensorFlow and Python. The model achieved 91% prediction accuracy. Implemented data preprocessing and feature engineering techniques on blood test datasets. The model analyzes blood test data to predict sepsis risk, aiding clinicians in early diagnosis and decision-making. Deployed the model as a REST API for seamless integration into clinical workflows.",
          technologies: ["Python", "TensorFlow", "Machine Learning", "REST API"],
        },
        {
          title: "Job Matching Application",
          period: "August 2020 - September 2023",
          location: "University of the West Indies St Augustine",
          description:
            "Developed a full-stack web application utilizing React.js, Node.js, and PostgreSQL to connect graduates with employers. Implemented authentication, real-time job postings, and automated job recommendations.",
          technologies: ["React.js", "Node.js", "PostgreSQL", "Authentication"],
        },
        {
          title: "Java Platformer Game",
          period: "August 2020 - September 2023",
          location: "University of the West Indies St Augustine",
          description:
            "Built two 2D platformer games in Java following Object-Oriented Programming (OOP) principles. Designed physics-based movement and interactive elements using Java Swing and JavaFX.",
          technologies: ["Java", "JavaFX", "Java Swing", "OOP"],
        },
        {
          title: "Social Media Application",
          period: "August 2020 - September 2023",
          location: "University of the West Indies St Augustine",
          description:
            "Developed frontend, backend, and deployment using React, Express.js, and MongoDB. Integrated user authentication, post interactions, and API testing via Postman.",
          technologies: ["React", "Express.js", "MongoDB", "Postman"],
        },
      ],
      certifications: [
        {
          title: "CompTIA Network+",
          institution: "School of Business and Computer Science",
          location: "Champ Fleurs, Trinidad",
          period: "July 2018",
          description:
            "One Week (16th -23rd) Accelerated Program where I learnt about Networking Fundamentals, Implementations, Operations, Security Troubleshooting, Command-Line Tools, Network Simulation/Emulation Tools, Network Monitoring & Management.",
        },
      ],
      skillCategories: [
        {
          category: "Programming Languages",
          skills: ["Python", "Java", "C/C++", "Pseudocode", "Pascal", "SQL", "JavaScript", "TypeScript", "HTML", "CSS"],
        },
        {
          category: "AI & Machine Learning",
          skills: [
            "TensorFlow",
            "PyTorch",
            "Scikit-learn",
            "Hugging Face Transformers",
            "Logistic Regression",
            "Random Forest",
            "XGBoost",
            "Hyperparameter Tuning",
            "Model Evaluation",
            "Model Deployment (REST API)",
            "MLflow",
          ],
        },
        {
          category: "Data Science & Analysis",
          skills: [
            "Data Preprocessing",
            "Feature Engineering",
            "Exploratory Data Analysis (EDA)",
            "Data Visualization",
            "pandas",
            "NumPy",
            "Jupyter Notebooks",
            "Matplotlib",
            "Seaborn",
          ],
        },
        {
          category: "Frameworks & Libraries",
          skills: ["React.js", "Next.js", "Node.js", "Express.js", "FastAPI", "JavaFX", "Java Swing"],
        },
        {
          category: "Tools & Technologies",
          skills: [
            "Git",
            "GitHub",
            "Docker",
            "Kubernetes",
            "Terraform",
            "Postman",
            "Burp Suite",
            "Wireshark",
            "Heroku",
            "Bash Scripting",
            "Shell Scripting (Bash)",
            "Linux (Ubuntu CLI experience)",
            "John the Ripper",
            "Hashcat",
          ],
        },
        {
          category: "Databases",
          skills: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Redis"],
        },
        {
          category: "Cloud Platforms",
          skills: ["AWS (EC2, S3, RDS)", "Google Cloud Platform (GCP)"],
        },
        {
          category: "Software Engineering",
          skills: [
            "Full-Stack Development",
            "Object-Oriented Programming (OOP)",
            "REST APIs",
            "Microservices",
            "Agile Methodology",
            "Scrum Methodology",
            "Waterfall Model",
            "Incremental Model",
          ],
        },
      ],
    },
    johndoe: {
      username: "johndoe",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      location: "New York, NY",
      title: "Frontend Developer",
      bio: "Passionate frontend developer with expertise in modern web technologies.",
      profileImage: "/placeholder.svg?height=400&width=400&text=JD",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      skills: ["React", "Vue.js", "TypeScript", "CSS", "JavaScript"],
      education: [],
      experience: [],
      projects: [],
      certifications: [],
      skillCategories: [],
    },
  }

  return users[username as keyof typeof users] || null
}

export default function UserResumePage({ params }: { params: { username: string } }) {
  const userData = getUserData(params.username)

  if (!userData) {
    notFound()
  }

  return (
    <div className="container px-4 md:px-6 py-12 relative">
      <AnimatedBackground variant="geometric" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <Link
            href={`/${userData.username}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={() => window.print()}>Print Resume</Button>
          </div>
        </div>

        <div className="bg-card/80 backdrop-blur-sm rounded-lg border shadow-sm p-8 space-y-8 print:shadow-none print:border-none">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">{userData.name.toUpperCase()}</h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${userData.email}`} className="hover:text-primary">
                  {userData.email}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{userData.phone}</span>
              </div>
              {userData.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="h-4 w-4" />
                  <a href={userData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    LinkedIn
                  </a>
                </div>
              )}
              {userData.github && (
                <div className="flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  <a href={userData.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    GitHub
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary border-b border-primary/20 pb-2">EDUCATION</h2>
            <div className="space-y-4">
              {userData.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{edu.degree}</h3>
                      <p className="text-muted-foreground">
                        {edu.institution}; {edu.location}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">{edu.period}</span>
                  </div>
                  <ul className="mt-2 text-sm space-y-1">
                    {edu.courses && <li>• Courses: {edu.courses.join(", ")}</li>}
                    {edu.gpa && <li>• Current GPA: {edu.gpa}</li>}
                    {edu.achievements && edu.achievements.map((achievement, i) => <li key={i}>• {achievement}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary border-b border-primary/20 pb-2">EXPERIENCE</h2>
            <div className="space-y-6">
              {userData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{exp.title}</h3>
                      <p className="text-muted-foreground">
                        {exp.company}; {exp.location}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <ul className="mt-2 text-sm space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>• {achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary border-b border-primary/20 pb-2">PROJECTS</h2>
            <div className="space-y-6">
              {userData.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-muted-foreground">{project.location}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{project.period}</span>
                  </div>
                  <p className="mt-2 text-sm">{project.description}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <strong>Technologies:</strong> {project.technologies.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary border-b border-primary/20 pb-2">TECHNICAL SKILLS</h2>
            <div className="space-y-3">
              {userData.skillCategories.map((category, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-sm">{category.category}:</h3>
                  <p className="text-sm text-muted-foreground">{category.skills.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          {userData.certifications.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary border-b border-primary/20 pb-2">CERTIFICATIONS</h2>
              <div className="space-y-4">
                {userData.certifications.map((cert, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{cert.title}</h3>
                        <p className="text-muted-foreground">
                          {cert.institution}; {cert.location}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">{cert.period}</span>
                    </div>
                    <p className="mt-2 text-sm">{cert.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
