import { notFound } from "next/navigation"
import { UserPortfolio } from "@/components/user-portfolio"

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
      profileImagePosition: { x: 50, y: 50 }, // Center position
      github: "https://github.com/iamgopaul",
      linkedin: "https://www.linkedin.com/in/iamgopaul/",
      twitter: "https://x.com/iamgopaul/",
      instagram: "https://www.instagram.com/i.am.gopaul/",
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
          institution: "Florida International University",
          period: "2024-2026",
          gpa: "3.83",
        },
        {
          degree: "BSc Computer Science with Management",
          institution: "University of the West Indies",
          period: "2020-2023",
          gpa: "3.36",
        },
      ],
      experience: [
        {
          title: "IT Support Assistant",
          company: "Gopaul and Company LTD",
          period: "2023-2024",
          description: "Resolved 50+ software issues, improved efficiency by 15%",
        },
      ],
      projects: [
        {
          title: "Sepsis Prediction AI",
          description:
            "AI model using TensorFlow achieving 91% accuracy in predicting sepsis risk from blood test data.",
          technologies: ["Python", "TensorFlow", "Machine Learning"],
          github: "https://github.com/iamgopaul",
          demo: "#",
        },
        {
          title: "Job Matching Platform",
          description: "React.js and Node.js application connecting graduates with employers using PostgreSQL.",
          technologies: ["React.js", "Node.js", "PostgreSQL"],
          github: "https://github.com/iamgopaul",
          demo: "#",
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
      profileImagePosition: { x: 50, y: 50 },
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      skills: ["React", "Vue.js", "TypeScript", "CSS", "JavaScript"],
      education: [],
      experience: [],
      projects: [],
    },
  }

  return users[username as keyof typeof users] || null
}

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const userData = getUserData(params.username)

  if (!userData) {
    notFound()
  }

  return <UserPortfolio userData={userData} />
}
