'use client'

import { useState, useEffect, forwardRef, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Shield, AlertTriangle, Check, Upload, MessageSquare, Share2 } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { cn } from "@/lib/utils"
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";


const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div ref={ref} className={cn("z-10 flex size-12 items-center justify-center rounded-full border-2 border-[#D5FE52] bg-black p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]", className)}>
        {children}
      </div>
    )
  }
)
Circle.displayName = "Circle"

const Icons = {
  user: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D5FE52" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  model: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D5FE52" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 7h10M7 12h10M7 17h10" />
    </svg>
  ),
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }, 
    },
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Enhanced Header */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
          scrolled ? ' backdrop-blur-md' : 'bg-transparent'
  } border-b border-[#D5FE52]/20`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">

          <span className="text-2xl font-bold font-sans tracking-tight">🔍 TruthLens </span>
        </Link>

        {/* Launch App Button */}
        <Link 
          href="detect" 
          className="px-4 sm:px-7 py-1.5 sm:py-2 bg-[#D5FE52] text-black text-sm sm:text-base font-semibold rounded-lg hover:bg-[#D5FE52]/90 transition-colors duration-300"
        >
          Launch App
        </Link>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-black">
        <motion.div 
          className="text-center max-w-5xl mx-auto pt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#D5FE52] to-[#9EF635]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Unmasking the World of  <span className='text-white'>Deepfakes</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Guard yourself from digital deception with Deepfake detection website.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              href="/detect" 
              className="px-8 py-3 bg-[#D5FE52] text-black text-lg font-semibold rounded-lg hover:bg-[#D5FE52]/90 transition-all duration-300 "
            >
              Try It Now
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronRight size={24} className="text-[#D5FE52] rotate-90" />
        </motion.div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-32 px-4 bg-black/95">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl  font-bold mt-10 text-center mb-12 text-[#D5FE52]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Growing Threat of Deepfakes
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <AlertTriangle className="text-[#D5FE52] mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-semibold mb-2">A Rising Crisis in Digital Manipulation</h3>
                  <p className="text-gray-300">73% increase in deepfake incidents impacting individuals and organizations globally.</p>
                </div>
              </div>
              {/* Add more problem statements */}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#D5FE52]/10 p-6 rounded-xl border border-[#D5FE52]/30"
            >
              <h3 className="text-2xl font-bold text-[#D5FE52] mb-4">Our Solution</h3>
              <p className="text-gray-300">A  website which  identifies manipulated content, helping you protect the truth.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-black/95">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 text-[#D5FE52]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative p-6 bg-black rounded-xl border border-[#D5FE52]/30 hover:border-[#D5FE52]/60 group"
              >
                <div className="absolute -top-4 left-4 bg-[#D5FE52] text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="mt-4">
                  {step.icon}
                  <h3 className="text-xl font-bold mb-3 text-[#D5FE52]">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 text-[#D5FE52] "
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Real-World Applications
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 bg-gradient-to-br from-black to-[#D5FE52]/5 rounded-xl border border-[#D5FE52]/30 hover:border-[#D5FE52]/60 group"
              >
                <h3 className="text-xl font-bold mb-4 text-[#D5FE52]">{useCase.title}</h3>
                <p className="text-gray-300 mb-4">{useCase.description}</p>
                <div className="flex items-center gap-2 text-[#D5FE52]">
                  <Check size={20} />
                  <span className="text-sm">{useCase.outcome}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-6xl font-bold text-center mb-1 text-[#D5FE52]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          > 
            Observe the Implementation
          </motion.h2>
          <motion.h4 
            className="text-2xl font-bold text-center mb-8 text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Interaction Between Users and the Model API
          </motion.h4>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div
              className="relative flex w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg border border-[#D5FE52]/30 bg-black p-10 md:shadow-xl"
              ref={containerRef}
            >
              <div className="flex size-full flex-col items-stretch justify-between gap-10">
                <div className="flex flex-row justify-between">
                  <Circle ref={div1Ref}>
                    <Icons.user />
                  </Circle>
                  <Circle ref={div2Ref}>
                    <Icons.model />
                  </Circle>
                </div>
              </div>

              <AnimatedBeam
                
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div2Ref}
                startYOffset={10}
                endYOffset={10}
                pathColor="#D5FE52"
                gradientStartColor="white"
                gradientStopColor="white"
                curvature={-30}
              />
              <AnimatedBeam
              containerRef={containerRef}
              fromRef={div1Ref}
              toRef={div2Ref}
              startYOffset={-9}
              endYOffset={-9}
              pathColor="#D5FE52"
              gradientStartColor="white"
              gradientStopColor="white"
              curvature={30}
              reverse
              />


            </div>
          </motion.div>
        </div>
      </section>
      

      {/* Simplified Footer */}
      <footer className="bg-black py-8 px-4 border-t border-[#D5FE52]/20 mt-10">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xl font-bold text-white">🔍 TruthLens</span>
          </div>
          <p>© 2024  TruthLens.</p>
        </div>
      </footer>
    </div>
  )
}

const steps = [
  {
    icon: <Upload className="text-[#D5FE52] mb-4" size={24} />,
    title: "Upload Content",
    description: "Simply upload any suspicious image, video, or audio file to our secure platform."
  },
  {
    icon: <Shield className="text-[#D5FE52] mb-4" size={24} />,
    title: "AI Analysis",
    description: "Our advanced AI performs multi-layer analysis using state-of-the-art detection algorithms."
  },
  {
    icon: <MessageSquare className="text-[#D5FE52] mb-4" size={24} />,
    title: "Detailed Report",
    description: "Receive comprehensive results with confidence scores and manipulation indicators."
  }
]

const useCases = [
  {
    title: "Media Authentication",
    description: "News organizations will use our website to check if submitted content is real before publishing it.",
    outcome: "We'll stop over  fake media posts from spreading over the internet."
  },
  {
    title: "Identity Protection",
    description: "People will use our website to verify social media content and protect themselves from identity theft and fake accounts.",
    outcome: "We'll correctly identify  fake profiles as well ."
  },
  {
    title: "Corporate Security",
    description: "Companies will use our website to check if emails  images are real or deepfaked.",
    outcome: "We'll reduce fraudulent attempts"
  },
  {
    title: "Legal Evidence",
    description: "Lawyers will use our website to verify digital evidence before using it in court cases.",
    outcome: "We'll help countless cases by verifying digital evidence."
  }
]

