'use client';
import { motion } from "framer-motion";
import { BackgroundGradientAnimation } from "./ui/GradientBg";
import Image from "next/image";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { hackathons } from "@/data";

export const HackathonProjects = () => {
  return (
    <div className="w-full bg-[#010116]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white"
          >
            Hackathon <span className="text-[#8B5CF6]">Projects</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg"
          >
            A showcase of innovative projects built during various hackathons, demonstrating 
            problem-solving skills and technical expertise.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {hackathons.map((hackathon, idx) => (
            <motion.div
              key={hackathon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-[#0A0A1B] rounded-3xl overflow-hidden"
            >
              <div className="grid md:grid-cols-[400px,1fr] gap-4 md:gap-8">
                {/* Image Section */}
                <div className="relative h-[250px] md:h-[300px]">
                  <Image
                    src={hackathon.image}
                    alt={hackathon.projectName}
                    fill
                    className="object-cover rounded-t-3xl md:rounded-none"
                  />
                </div>

                {/* Content Section */}
                <div className="p-4 md:p-6 flex flex-col justify-between">
                  <div className="space-y-4 md:space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-xl md:text-2xl font-bold text-white">
                        {hackathon.projectName}
                      </h2>
                      <p className="text-[#8B5CF6] font-medium">
                        {hackathon.hackathonName}
                      </p>
                    </div>

                    <p className="text-gray-400 leading-relaxed">
                      {hackathon.description}
                    </p>

                    <div>
                      <h3 className="text-sm text-gray-500 font-medium mb-3">
                        Tech Stack:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {hackathon.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-[#1A1A2E] rounded-full text-sm text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={hackathon.projectLink}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-[#8B5CF6] hover:text-[#9D70FF] transition-colors group/link"
                    >
                      <span>View Project</span>
                      <HiArrowUpRight className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}; 