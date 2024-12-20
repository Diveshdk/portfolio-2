'use client';
import { motion } from "framer-motion";
import { BackgroundGradientAnimation } from "./ui/GradientBg";
import Image from "next/image";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";

const hackathons = [
  {
    id: 1,
    projectName: "DeFi Lending Platform",
    hackathonName: "ETHGlobal New York 2023",
    description: "Built a decentralized lending platform with smart contract-based collateral management and automated interest rates.",
    image: "/defi-project.png",
    techStack: ["Solidity", "React", "Ethereum", "Web3.js"],
    achievement: "Winner - DeFi Track",
    projectLink: "https://github.com/yourusername/defi-project"
  },
  {
    id: 2,
    projectName: "AI-Powered Code Review Assistant",
    hackathonName: "Microsoft Azure Hackathon 2023",
    description: "Developed an AI assistant that analyzes code, suggests improvements, and detects potential security vulnerabilities.",
    image: "/ai-code-review.png",
    techStack: ["Python", "Azure ML", "OpenAI", "FastAPI"],
    achievement: "Runner Up - AI/ML Category",
    projectLink: "https://github.com/yourusername/ai-code-review"
  },
  {
    id: 3,
    projectName: "Sustainable Supply Chain Tracker",
    hackathonName: "Google Cloud Hackathon 2023",
    description: "Created a blockchain-based supply chain tracking system for sustainable products with real-time monitoring.",
    image: "/supply-chain.png",
    techStack: ["Next.js", "Google Cloud", "Hyperledger", "Node.js"],
    achievement: "Best Sustainability Solution",
    projectLink: "https://github.com/yourusername/supply-chain"
  },
  {
    id: 4,
    projectName: "AR Educational Platform",
    hackathonName: "Meta XR Hackathon 2023",
    description: "Built an augmented reality platform for interactive STEM education using Meta's XR development tools.",
    image: "/ar-education.png",
    techStack: ["Unity", "C#", "AR Kit", "Three.js"],
    achievement: "Most Innovative Use of XR",
    projectLink: "https://github.com/yourusername/ar-education"
  }
];

const HackathonsContent = () => {
  return (
    <div className="py-20">
      <BackgroundGradientAnimation>
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Hackathon <span className="text-purple">Projects</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A showcase of innovative projects built during various hackathons,
              demonstrating problem-solving skills and technical expertise.
            </p>
          </div>

          <div className="grid gap-8">
            {hackathons.map((hackathon, idx) => (
              <motion.div
                key={hackathon.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-black/30 rounded-2xl border border-white/10 overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  {/* Image Section */}
                  <div className="relative h-[300px] rounded-xl overflow-hidden">
                    <Image
                      src={hackathon.image}
                      alt={hackathon.projectName}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-purple/90 rounded-full text-sm font-medium">
                        {hackathon.achievement}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        {hackathon.projectName}
                      </h2>
                      <p className="text-purple font-medium">
                        {hackathon.hackathonName}
                      </p>
                    </div>

                    <p className="text-gray-400">
                      {hackathon.description}
                    </p>

                    <div className="space-y-3">
                      <p className="font-medium">Tech Stack:</p>
                      <div className="flex flex-wrap gap-2">
                        {hackathon.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white/5 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={hackathon.projectLink}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-purple hover:text-purple/80 transition-colors"
                    >
                      View Project <HiArrowUpRight />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
};

export default HackathonsContent;