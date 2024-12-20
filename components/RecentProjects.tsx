'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { projects } from "@/data";

export const RecentProjects = () => {
  return (
    <div className="min-h-screen w-full bg-[#010116] overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white"
          >
            Recent <span className="text-[#8B5CF6]">Projects</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg"
          >
            A collection of my recent development projects showcasing various technologies and solutions
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
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
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover rounded-t-3xl md:rounded-none"
                  />
                </div>

                {/* Content Section */}
                <div className="p-4 md:p-6 flex flex-col justify-between">
                  <div className="space-y-4 md:space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-white">
                        {project.title}
                      </h2>
                    </div>

                    <p className="text-gray-400 leading-relaxed">
                      {project.des}
                    </p>

                    <div>
                      <h3 className="text-sm text-gray-500 font-medium mb-3">
                        Tech Stack:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.iconLists.map((icon, index) => (
                          <div
                            key={index}
                            className="relative w-8 h-8 bg-[#1A1A2E] rounded-full p-1.5"
                          >
                            <Image
                              src={icon}
                              alt={`tech-${index}`}
                              fill
                              className="object-contain p-1.5"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={project.link}
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

