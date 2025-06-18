import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Mail, Phone, Github, Linkedin } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"

export default function ResumePage() {
  return (
    <div className="container px-4 md:px-6 py-12 relative">
      <AnimatedBackground variant="geometric" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter">Resume</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button>
              <ExternalLink className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <div className="bg-card/80 backdrop-blur-sm rounded-lg border shadow-sm p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">JOSH GOPAUL</h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <a href="mailto:jgopa003@fiu.edu" className="hover:text-primary">
                  jgopa003@fiu.edu
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>1(954)643-8379</span>
              </div>
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" />
                <a
                  href="https://www.linkedin.com/in/iamgopaul/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  LinkedIn
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                <a
                  href="https://github.com/iamgopaul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Education */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary border-b border-primary/20 pb-2">EDUCATION</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">MSc Computer Science</h3>
                    <p className="text-muted-foreground">Florida International University (FIU); Miami, Florida</p>
                  </div>
                  <span className="text-sm text-muted-foreground">August 2024 – May 2026</span>
                </div>
                <ul className="mt-2 text-sm space-y-1">
                  <li>
                    • Courses: Intro to AI, Intro to Algorithms, Operating Systems, Intro to Data Science, Software
                    Security, Principles of DBMS
                  </li>
                  <li>• Current GPA: 3.83</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">BSc Computer Science with Management</h3>
                    <p className="text-muted-foreground">
                      University of the West Indies St Augustine; St Augustine, Trinidad & Tobago
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">August 2020 - September 2023</span>
                </div>
                <ul className="mt-2 text-sm space-y-1">
                  <li>• Deans Honor Roll (2020-2021)</li>
                  <li>
                    • Main Courses: Computer Programming I/II/III, Software Engineering I/II, Object Oriented
                    Programming I/II, Game Programming, Web Programming & Technologies, Enterprise Database Systems,
                    Cloud Computing, Data Structures, Computer Architecture, Theory of Computing, Operating Systems,
                    Computer Networks, E-Commerce
                  </li>
                  <li>• GPA: 3.36 (Graduated with Upper Second-Class Honors)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Professional Experience */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary border-b border-primary/20 pb-2">
              PROFESSIONAL EXPERIENCES
            </h2>
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">IT Support Assistant</h3>
                  <p className="text-muted-foreground">Gopaul and Company LTD | Caroni, Trinidad & Tobago</p>
                </div>
                <span className="text-sm text-muted-foreground">September 2023 - January 2024</span>
              </div>
              <ul className="mt-2 text-sm space-y-1">
                <li>
                  • Resolved over 50 software issues related to SYSPRO and Crystal Reports, improving team efficiency by
                  15%.
                </li>
                <li>• Conducted cybersecurity training for 20+ employees, reducing phishing attempts by 30%.</li>
                <li>
                  • Performed 100+ system updates for Windows, Office365, and System Antivirus, enhancing system
                  security.
                </li>
                <li>• Diagnosed and repaired 30+ hardware issues, decreasing device downtime by 25%.</li>
                <li>
                  • Optimized inventory tracking by introducing a streamlined reporting process, increasing data
                  accuracy by 20%.
                </li>
              </ul>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary border-b border-primary/20 pb-2">SKILLS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Programming Languages:</h3>
                <p>Python, Java, C/C++, Pseudocode, Pascal, SQL, JavaScript, TypeScript, HTML, CSS</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">AI & Machine Learning:</h3>
                <p>
                  TensorFlow, PyTorch, Scikit-learn, Hugging Face Transformers, Logistic Regression, Random Forest,
                  XGBoost, Hyperparameter Tuning, Model Evaluation, Model Deployment (REST API), MLflow
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Data Science & Analysis:</h3>
                <p>
                  Data Preprocessing, Feature Engineering, Exploratory Data Analysis (EDA), Data Visualization, pandas,
                  NumPy, Jupyter Notebooks, Matplotlib, Seaborn
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Frameworks & Libraries:</h3>
                <p>React.js, Next.js, Node.js, Express.js, FastAPI, JavaFX, Java Swing</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tools & Technologies:</h3>
                <p>
                  Git, GitHub, Docker, Kubernetes, Terraform, Postman, Burp Suite, Wireshark, Heroku, Bash Scripting,
                  Shell Scripting (Bash), Linux (Ubuntu CLI experience), John the Ripper, Hashcat
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Databases:</h3>
                <p>MySQL, PostgreSQL, MongoDB, Firebase, Redis</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cloud Platforms:</h3>
                <p>AWS (EC2, S3, RDS), Google Cloud Platform (GCP)</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Software Engineering:</h3>
                <p>
                  Full-Stack Development, Object-Oriented Programming (OOP), REST APIs, Microservices, Agile
                  Methodology, Scrum Methodology, Waterfall Model, Incremental Model
                </p>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary border-b border-primary/20 pb-2">PROJECTS</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Projects at Florida International University | Miami, Florida</h3>
                <span className="text-sm text-muted-foreground">August 2024 – May 2026</span>
                <ul className="mt-2 text-sm space-y-1">
                  <li>
                    • <strong>Differential Diagnosis for Sepsis:</strong> Collaborated with a team to create an AI model
                    utilizing TensorFlow and Python. The model achieved 91% prediction accuracy. Implemented data
                    preprocessing and feature engineering techniques on blood test datasets. The model analyzes blood
                    test data to predict sepsis risk, aiding clinicians in early diagnosis and decision-making. Deployed
                    the model as a REST API for seamless integration into clinical workflows.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Projects at the University of the West Indies St Augustine | St Augustine, Trinidad
                </h3>
                <span className="text-sm text-muted-foreground">August 2020 - September 2023</span>
                <ul className="mt-2 text-sm space-y-1">
                  <li>
                    • <strong>Job Matching Application:</strong> Developed a full-stack web application utilizing
                    React.js, Node.js, and PostgreSQL to connect graduates with employers. Implemented authentication,
                    real-time job postings, and automated job recommendations.
                  </li>
                  <li>
                    • <strong>Java Platformer Game:</strong> Built two 2D platformer games in Java following
                    Object-Oriented Programming (OOP) principles. Designed physics-based movement and interactive
                    elements using Java Swing and JavaFX.
                  </li>
                  <li>
                    • <strong>Social Media Application:</strong> Developed frontend, backend, and deployment using
                    React, Express.js, and MongoDB. Integrated user authentication, post interactions, and API testing
                    via Postman.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary border-b border-primary/20 pb-2">CERTIFICATIONS</h2>
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">CompTIA Network+</h3>
                  <p className="text-muted-foreground">
                    School of Business and Computer Science | Champ Fleurs, Trinidad
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">July 2018</span>
              </div>
              <p className="mt-2 text-sm">
                One Week (16th -23rd) Accelerated Program where I learnt about Networking Fundamentals, Implementations,
                Operations, Security Troubleshooting, Command-Line Tools, Network Simulation/Emulation Tools, Network
                Monitoring & Management.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
