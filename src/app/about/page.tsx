'use client'

import { FaCode, FaLaptopCode, FaGraduationCap } from 'react-icons/fa'
import { motion } from 'motion/react'
import { 
  fadeInUp, 
  fadeInDown, 
  fadeIn, 
  staggerContainer, 
  cardHover, 
  cardHoverSmall 
} from '@/utils/animations'

export default function About() {
  return (
    <div className="container max-w-7xl mx-auto py-12">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        {...fadeInDown}
      >
        About Me
      </motion.h1>
      
      <motion.section 
        className="mb-16"
        {...fadeInUp}
      >
        <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors max-w-3xl mx-auto text-center">
          I&apos;m a passionate and versatile Full Stack Developer specialized in building modern web applications.
          My experience spans both frontend and backend development, enabling me to build seamless, end-to-end applications.
        </p>
      </motion.section>

      <motion.section 
        className="mb-16"
        {...fadeIn}
        transition={{ delay: 0.2 }}
      >
        <motion.h2 
          className="section-title"
          {...fadeInUp}
        >
          Skills
        </motion.h2>
        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md"
            variants={fadeInUp}
            {...cardHover}
          >
            <FaCode className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Frontend</h3>
            <ul className="text-gray-600 dark:text-gray-300 transition-colors space-y-2">
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind</li>
              <li>HTML</li>
              <li>CSS</li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md"
            variants={fadeInUp}
            {...cardHover}
          >
            <FaLaptopCode className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Backend</h3>
            <ul className="text-gray-600 dark:text-gray-300 transition-colors space-y-2">
              <li>Node.js</li>
              <li>Express</li>
              <li>Python</li>
              <li>Java</li>
              <li>SQL / NoSQL</li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md"
            variants={fadeInUp}
            {...cardHover}
          >
            <FaGraduationCap className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tools & Others</h3>
            <ul className="text-gray-600 dark:text-gray-300 transition-colors space-y-2">
              <li>Git / GitHub</li>
              <li>Docker</li>
              <li>RESTful APIs</li>
              <li>Agile Methodologies</li>
              <li>VMware</li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section 
        className="mb-16"
        {...fadeIn}
        transition={{ delay: 0.4 }}
      >
        <motion.h2 
          className="section-title"
          {...fadeInUp}
        >
          Experience
        </motion.h2>
        <motion.div 
          className="max-w-3xl mx-auto space-y-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md"
            variants={fadeInUp}
            {...cardHoverSmall}
          >
            <h3 className="text-xl font-semibold mb-2">Full Stack Developer Intern</h3>
            <p className="text-primary mb-2">Sirinti • June 2025 - Present</p>
            <ul className="text-gray-600 dark:text-gray-300 transition-colors list-disc list-inside space-y-2">
              <li>Currently building features for the startup&apos;s homepage and dashboard</li>
            </ul>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md"
            variants={fadeInUp}
            {...cardHoverSmall}
          >
            <h3 className="text-xl font-semibold mb-2">Software Engineer Intern</h3>
            <p className="text-primary mb-2">Cirrus Data Solutions • June - December 2023</p>
            <ul className="text-gray-600 dark:text-gray-300 transition-colors list-disc list-inside space-y-2">
              <li>Enhanced a web application which employed virtual machines for data migration and testing demonstrations of
              an enterprise cloud product utilized by 500+ worldwide organizations</li>
              <li>Improved efficiency for administrative tasks via resolving software bugs and introducing new user-friendly
              features</li>
              <li>Consolidated virtual machine management from Azure and AWS platforms onto a unified interface</li>
              <li>Added tracking of KPIs and metrics that were previously not natively shown by cloud providers, significantly
              reducing spending</li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md"
            variants={fadeInUp}
            {...cardHoverSmall}
          >
            <h3 className="text-xl font-semibold mb-2">Frontend Software Engineer Intern</h3>
            <p className="text-primary mb-2">Chirp • February - May 2023</p>
            <ul className="text-gray-600 dark:text-gray-300 transition-colors list-disc list-inside space-y-2">
              <li>Self-learned HTML, CSS, and PHP to successfully deploy a website for UPenn Wharton Venture Initiation
              Program startup</li>
              <li>Coordinated with UX/UI designer to apply code in alignment with Figma designs for website serving B2B/B2C
              interests</li>
              <li>Established functional PHP forms to consolidate interested user data to a waitlist based on business strategy
              requirements</li>
            </ul>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md"
            variants={fadeInUp}
            {...cardHoverSmall}
          >
            <h3 className="text-xl font-semibold mb-2">Software Team Member</h3>
            <p className="text-primary mb-2">Northeastern Electric Racing • September 2022 - May 2023</p>
            <ul className="text-gray-600 dark:text-gray-300 transition-colors list-disc list-inside space-y-2">
              <li>Contributed to the development of a project management website used by over 250 members</li>
              <li>Developed skills in Git, React, TypeScript, Express, and Prisma through Jira tickets</li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        {...fadeIn}
        transition={{ delay: 0.6 }}
      >
        <motion.h2 
          className="section-title"
          {...fadeInUp}
        >
          Education
        </motion.h2>
        <motion.div 
          className="max-w-3xl mx-auto mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md"
            variants={fadeInUp}
            {...cardHoverSmall}
          >
            <h3 className="text-xl font-semibold mb-2">Bachelor of Science in Computer Science</h3>
            <p className="text-primary mb-2">Northeastern University • 2021 - 2025</p>
            <p className="text-gray-600 dark:text-gray-300 transition-colors">
              Graduated Cum Laude. Focused on software engineering and web development.
            </p>
          </motion.div>
        </motion.div>
        <motion.div 
          className="max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md"
            variants={fadeInUp}
            {...cardHoverSmall}
          >
            <h3 className="text-xl font-semibold mb-2">USTEP Exchange Program</h3>
            <p className="text-primary mb-2">University of Tokyo • 2024</p>
            <p className="text-gray-600 dark:text-gray-300 transition-colors">
              Traveled while improving Japanese skills and interacting with locals / other exchange students.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  )
} 