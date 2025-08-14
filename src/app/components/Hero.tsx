'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import Link from 'next/link'
import ResumeModal from './ResumeModal'

const Hero = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <section className='py-28 container max-w-7xl mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center'>
                <div className='flex flex-col items-center mb-4'>
                    <Image src="/profile.png" alt="Profile image" width={100} height={100} quality={100} className='rounded-full mb-4 w-43 h-43 object-cover ring-2 ring-primary'/>
                </div>

                <h1 className='text-4xl md:text-6xl font-bold mb-2'> <span className='text-primary'>Andrew Shota Tsai</span></h1>
                <p className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 transition-colors mb-3'>Full Stack Developer</p>
                <div className='flex justify-center sspace-x-4 gap-4 mb-8'>
                    <Link href="https://www.linkedin.com/in/andrew-s-tsai/" className='text-2xl hover:text-primary transition-colors'>
                        <FaLinkedinIn/>
                    </Link>
                    <Link href="https://github.com/andrewstsai" className='text-2xl hover:text-primary transition-colors'>
                        <FaGithub/>
                    </Link>
                </div>
                <div className='flex flex-col md:flex-row justify-center gap-4'>
                    <div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='bg-primary inline-block w-full md:w-auto text-white px-8 py-3 rounded-lg hover:bg-primary/70 transition-colors'
                        >
                            View / Download Resume
                        </button>
                        <ResumeModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            pdfUrl="/Andrew_Tsai_Full_Stack_Software_Engineer.pdf"
                        />
                    </div>
                    <Link href="/contact" className='bg-gray-500 inline-block w-full md:w-auto text-white px-8 py-3 rounded-lg hover:bg-gray-300 hover:text-gray-800 transition-colors'>Contact Me</Link>
                </div>
            </div>
        </section>
  )
}

export default Hero