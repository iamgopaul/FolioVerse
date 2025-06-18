import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, ArrowLeft, MessageSquare, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CommentSection } from "@/components/comment-section"
import { AnimatedBackground } from "@/components/animated-background"

// This would typically come from a database or CMS
const getBlogPosts = () => {
  return [
    {
      id: 1,
      slug: "getting-started-with-nextjs",
      title: "Getting Started with Next.js",
      date: "2025-05-28",
      readTime: "5 min read",
      category: "Web Development",
      image: "/placeholder.svg?height=600&width=1200&text=Next.js",
      tags: ["Next.js", "React", "JavaScript"],
      content: `
        <p>Next.js is a powerful React framework that makes building web applications simple and efficient. In this article, we'll explore how to get started with Next.js and build your first application.</p>
        
        <h2>Why Next.js?</h2>
        <p>Next.js provides a number of benefits out of the box:</p>
        <ul>
          <li>Server-side rendering and static site generation</li>
          <li>Automatic code splitting for faster page loads</li>
          <li>Simple client-side routing</li>
          <li>API routes to build your API alongside your app</li>
          <li>Development environment with Fast Refresh</li>
        </ul>
        
        <h2>Setting Up Your First Project</h2>
        <p>To create a new Next.js app, run the following command:</p>
        <pre><code>npx create-next-app@latest my-next-app</code></pre>
        
        <p>This will set up a new Next.js project with all the defaults. Once the installation is complete, navigate to your project directory and start the development server:</p>
        <pre><code>cd my-next-app
npm run dev</code></pre>
        
        <p>Your application will be running at <code>http://localhost:3000</code>.</p>
        
        <h2>Understanding the File Structure</h2>
        <p>Next.js has a file-based routing system. Each file in the <code>pages</code> directory becomes a route in your application. For example:</p>
        <ul>
          <li><code>pages/index.js</code> → <code>/</code></li>
          <li><code>pages/about.js</code> → <code>/about</code></li>
          <li><code>pages/blog/[slug].js</code> → <code>/blog/:slug</code></li>
        </ul>
        
        <h2>Creating Your First Page</h2>
        <p>Let's create a simple page component:</p>
        <pre><code>// pages/index.js
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Next.js App</title>
        <meta name="description" content="My first Next.js application" />
      </Head>
      
      <main>
        <h1>Welcome to Next.js!</h1>
        <p>Get started by editing pages/index.js</p>
      </main>
    </div>
  )
}</code></pre>
        
        <h2>Conclusion</h2>
        <p>Next.js makes it easy to build React applications with powerful features like server-side rendering and static site generation. This is just the beginning of what you can do with Next.js. In future articles, we'll explore more advanced topics like data fetching, API routes, and deployment.</p>
      `,
      author: {
        name: "Your Name",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Full-stack developer passionate about web technologies and teaching others.",
      },
    },
    {
      id: 2,
      slug: "mastering-tailwind-css",
      title: "Mastering Tailwind CSS",
      date: "2025-05-20",
      readTime: "7 min read",
      category: "CSS",
      image: "/placeholder.svg?height=600&width=1200&text=Tailwind+CSS",
      tags: ["CSS", "Tailwind", "Design"],
      content: `
        <p>Tailwind CSS has revolutionized the way developers approach styling in web applications. In this comprehensive guide, we'll explore how to master Tailwind CSS and leverage its utility-first approach to create beautiful, responsive designs.</p>
        
        <h2>What is Tailwind CSS?</h2>
        <p>Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without ever leaving your HTML. Unlike component-based frameworks like Bootstrap, Tailwind provides low-level utility classes that let you build completely custom designs.</p>
        
        <h2>Getting Started with Tailwind</h2>
        <p>To add Tailwind CSS to your project, you can install it via npm:</p>
        <pre><code>npm install -D tailwindcss
npx tailwindcss init</code></pre>
        
        <p>Then, create a CSS file with the Tailwind directives:</p>
        <pre><code>/* styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;</code></pre>
        
        <h2>The Utility-First Approach</h2>
        <p>Instead of writing custom CSS, you apply pre-existing classes directly in your HTML:</p>
        <pre><code>&lt;div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4"&gt;
  &lt;div&gt;
    &lt;div class="text-xl font-medium text-black"&gt;Tailwind CSS&lt;/div&gt;
    &lt;p class="text-gray-500"&gt;The utility-first CSS framework&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
        
        <h2>Responsive Design with Tailwind</h2>
        <p>Tailwind makes responsive design simple with responsive variants:</p>
        <pre><code>&lt;div class="text-center sm:text-left"&gt;
  This text is centered on mobile, but left-aligned on screens larger than the small breakpoint.
&lt;/div&gt;</code></pre>
        
        <h2>Customizing Your Design System</h2>
        <p>You can customize Tailwind's default theme in your <code>tailwind.config.js</code> file:</p>
        <pre><code>module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1992d4',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      }
    }
  }
}</code></pre>
        
        <h2>Conclusion</h2>
        <p>Tailwind CSS provides a different approach to styling that can significantly speed up your development workflow. By learning to leverage its utility classes effectively, you can create custom, responsive designs without writing a single line of custom CSS.</p>
      `,
      author: {
        name: "Your Name",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Full-stack developer passionate about web technologies and teaching others.",
      },
    },
    {
      id: 3,
      slug: "building-ai-powered-applications",
      title: "Building AI-Powered Applications",
      date: "2025-05-15",
      readTime: "10 min read",
      category: "Artificial Intelligence",
      image: "/placeholder.svg?height=600&width=1200&text=AI+Applications",
      tags: ["AI", "Machine Learning", "Web Development"],
      content: `
        <p>Artificial Intelligence is transforming the way we build applications. In this article, we'll explore how to integrate AI capabilities into your web applications using modern tools and frameworks.</p>
        
        <h2>The Rise of AI in Web Development</h2>
        <p>AI technologies are becoming increasingly accessible to developers, enabling the creation of intelligent applications that can understand natural language, recognize images, generate content, and more.</p>
        
        <h2>Getting Started with AI SDKs</h2>
        <p>One of the easiest ways to add AI capabilities to your application is by using AI SDKs like the Vercel AI SDK:</p>
        <pre><code>npm install ai @ai-sdk/openai</code></pre>
        
        <h2>Building a Simple AI Chatbot</h2>
        <p>Let's create a basic AI chatbot using the AI SDK and OpenAI:</p>
        <pre><code>import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req) {
  const { messages } = await req.json();
  
  const result = streamText({
    model: openai('gpt-4o'),
    messages,
  });
  
  return result.toDataStreamResponse();
}</code></pre>
        
        <h2>Implementing AI-Powered Features</h2>
        <p>Here are some common AI features you can add to your applications:</p>
        <ul>
          <li>Natural language processing for chatbots and virtual assistants</li>
          <li>Image recognition and classification</li>
          <li>Content generation for articles, product descriptions, etc.</li>
          <li>Recommendation systems based on user behavior</li>
          <li>Sentiment analysis for customer feedback</li>
        </ul>
        
        <h2>Ethical Considerations</h2>
        <p>When implementing AI in your applications, it's important to consider ethical implications:</p>
        <ul>
          <li>Ensure transparency about AI usage</li>
          <li>Implement proper content filtering</li>
          <li>Consider bias in AI models</li>
          <li>Protect user privacy</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>AI technologies offer exciting possibilities for enhancing web applications. By leveraging modern AI SDKs and APIs, developers can create intelligent, responsive applications that provide unique value to users.</p>
      `,
      author: {
        name: "Your Name",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Full-stack developer passionate about web technologies and teaching others.",
      },
    },
    {
      id: 4,
      slug: "responsive-design-principles",
      title: "Responsive Design Principles",
      date: "2025-05-10",
      readTime: "6 min read",
      category: "Design",
      image: "/placeholder.svg?height=600&width=1200&text=Responsive+Design",
      tags: ["Design", "CSS", "Mobile"],
      content: `<p>Sample content for Responsive Design Principles</p>`,
      author: {
        name: "Your Name",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Full-stack developer passionate about web technologies and teaching others.",
      },
    },
    {
      id: 5,
      slug: "state-management-in-react",
      title: "State Management in React",
      date: "2025-05-05",
      readTime: "8 min read",
      category: "React",
      image: "/placeholder.svg?height=600&width=1200&text=React+State",
      tags: ["React", "JavaScript", "State Management"],
      content: `<p>Sample content for State Management in React</p>`,
      author: {
        name: "Your Name",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Full-stack developer passionate about web technologies and teaching others.",
      },
    },
    {
      id: 6,
      slug: "deploying-nextjs-on-vercel",
      title: "Deploying Next.js on Vercel",
      date: "2025-04-28",
      readTime: "4 min read",
      category: "DevOps",
      image: "/placeholder.svg?height=600&width=1200&text=Vercel+Deployment",
      tags: ["Next.js", "Vercel", "Deployment"],
      content: `<p>Sample content for Deploying Next.js on Vercel</p>`,
      author: {
        name: "Your Name",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Full-stack developer passionate about web technologies and teaching others.",
      },
    },
  ]
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const posts = getBlogPosts()
  const post = posts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same category or tags)
  const relatedPosts = posts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag))))
    .slice(0, 3)

  return (
    <div className="container px-4 md:px-6 py-12 relative">
      <AnimatedBackground variant="minimal" />
      <div className="mx-auto max-w-4xl relative z-10">
        <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all articles
        </Link>

        <article className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {post.category}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>

            <div className="flex items-center gap-4">
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-muted-foreground">{post.author.bio}</div>
              </div>
            </div>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          </div>

          <div
            className="prose prose-gray dark:prose-invert max-w-none bg-card/50 backdrop-blur-sm rounded-lg p-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <span className="text-sm font-medium">Tags:</span>
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm bg-muted px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center pt-6 border-t">
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Share your thoughts
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share article
            </Button>
          </div>
        </article>

        <CommentSection postSlug={post.slug} />

        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group rounded-lg border bg-card/80 backdrop-blur-sm shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-muted-foreground mb-2">
                      {new Date(relatedPost.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
