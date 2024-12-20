'use client';
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { 
  SiSolidity, 
  SiExpress, 
  SiMongodb, 
  SiNextdotjs, 
  SiJavascript, 
  SiCplusplus, 
  SiRemix
} from "react-icons/si";
import { TbBrandFinder } from "react-icons/tb";

const technologies = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", icon: <FaReact className="text-[#61DAFB]" />, level: 90 },
      { name: "Next.js", icon: <SiNextdotjs />, level: 90 },
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" />, level: 80 },
      { name: "Express.js", icon: <SiExpress />, level: 80 },
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" />, level: 85 },
    ]
  },
  {
    category: "Languages",
    skills: [
      { name: "C++", icon: <SiCplusplus className="text-[#00599C]" />, level: 95 },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" />, level: 90 },
      { name: "Python", icon: <FaPython className="text-[#3776AB]" />, level: 60 },
      
    ]
  },
  {
    category: "Web3",
    skills: [
      { name: "Solidity", icon: <SiSolidity />, level: 80 },
      { name: "Remix", icon: <SiRemix className="text-[#B83280]" />, level: 75 },
      { name: "Foundry", icon: <TbBrandFinder className="text-[#FF4785]" />, level: 70 },
    ]
  }
];

export function TechStackContent() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-white"
        >
          Technical <span className="text-[#8B5CF6]">Stack</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg"
        >
          My expertise across various technologies and frameworks
        </motion.p>
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {technologies.map((tech, idx) => (
          <motion.div
            key={tech.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#0A0A1B] rounded-3xl overflow-hidden p-4 md:p-6"
          >
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">{tech.category}</h2>
            <div className="space-y-4">
              {tech.skills.map((skill) => (
                <div 
                  key={skill.name}
                  className="flex items-center gap-4 bg-[#1A1A2E] rounded-xl p-3 hover:bg-[#1A1A2E]/80 transition-colors"
                >
                  <div className="text-xl">
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1.5">
                      <span className="font-medium text-white text-sm">{skill.name}</span>
                      <span className="text-[#8B5CF6] text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-[#1A1A2E] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-[#8B5CF6] rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 