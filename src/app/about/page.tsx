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
          I&apos;m passionate about innovation and delivering meaningful software. Adaptable and eager to learn, 
          I thrive in full stack development and embrace new challenges as opportunities to grow and expand my skillset.
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
              <li>React</li>
              <li>TypeScript</li>
              <li>Angular</li>
              <li>HTML</li>
              <li>CSS / Tailwind</li>
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
              <li>Python</li>
              <li>Java</li>
              <li>SQL</li>
              <li>NoSQL</li>
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
              <li>Git</li>
              <li>Docker</li>
              <li>AWS</li>
              <li>GCP</li>
              <li>Agile</li>
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
            <p className="text-primary mb-2">Sirinti • June - September 2025</p>
            <ul className="text-gray-600 dark:text-gray-300 transition-colors list-disc list-inside space-y-2">
              <li>Developed features and components that improved site usability, boosting engagement and increasing time-on-page by 20%</li>
              <li>Architected scalable RESTful APIs with JWT-based authentication to handle CRUD operations, enabling seamless and
              secure integration between PostgreSQL, Nest.js backend, and Vite/Next.js frontends</li>
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
              <li>Enhanced a cloud migration demo platform used by 100+ global organizations by delivering new UI features across 40+
              scenarios, improving user experience and simplifying admin tasks</li>
              <li>Consolidated observability data from Azure Functions and AWS EC2, enabling cross-cloud visibility</li>
              <li>Implemented KPI and cost-tracking metrics, driving 15% cost savings on infrastructure spend</li>
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
              <li>Launched a responsive B2B/B2C website that supported the Wharton VIP startup&apos;s early-stage growth and visibility</li>
              <li>Partnered with UI/UX designer to translate Figma layouts to code, preserving accessibility and design intent</li>
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
              <li>Developed new features and resolved user feedback for a project management platform serving 250+ active members,
              enhancing usability and engagement</li>
              <li>Resolved bugs and conducted unit testing in React/Express/Prisma stack, ensuring production stability</li>
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