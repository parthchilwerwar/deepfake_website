'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function BlogPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const blogPosts = [
    {
      id: 1,
      title: "Understanding Deepfake Detection Technology",
      excerpt: "Learn about the latest advances in deepfake detection and how AI is helping combat digital manipulation.",
      content: "Full article content here...",
      author: "Arya",
      date: "January 15, 2025",
      imageUrl: "/images/blog/rise_2.jpg",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "How to spot a Deepfake Image",
      excerpt: "Learn simple techniques to identify deepfake media and protect yourself from digital manipulation.",
      author: "Atharva ",
      date: "January 14, 2025",
      imageUrl: "/images/blog/rise_3.jpg",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "How to Protect Your Digital Identity",
      excerpt: "Essential strategies and best practices for safeguarding your online presence from deepfake threats.",
      author: "Kaushal",
      date: "January 13, 2025",
      imageUrl: "/images/blog/rise_11.jpg",
      readTime: "6 min read"
    }
  ];
    



  

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Header */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-md' : 'bg-transparent'
        } border-b border-[#D5FE52]/20`}
      >
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl font-bold font-sans tracking-tight">🔍 TruthLens</span>
        </Link>

        <div className="flex items-center gap-4">
        <Link 
            href="/" 
            className="px-4 sm:px-7 py-1.5 sm:py-2 border border-[#D5FE52] text-[#D5FE52] text-sm sm:text-base font-semibold rounded-lg hover:bg-[#D5FE52]/10 transition-colors duration-300"
          >
            Home
          </Link>
          <Link 
            href="/detect"
            className="px-4 sm:px-7 py-1.5 sm:py-2 bg-[#D5FE52] text-black text-sm sm:text-base font-semibold rounded-lg hover:bg-[#D5FE52]/90 transition-colors duration-300"
          >
            Launch App
          </Link>
        </div>
      </motion.header>

      {/* Add padding-top to account for fixed header */}
      <div className="pt-20">
        {/* Blog Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.h1 
            className="text-5xl font-bold text-[#D5FE52] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
          TruthLens Blog's 
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Stay informed about deepfake detection and digital authenticity
          </motion.p>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/50 rounded-xl border border-[#D5FE52]/30 overflow-hidden hover:border-[#D5FE52]/60 transition-all group"
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={index < 3}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#D5FE52] mb-2 group-hover:text-[#D5FE52]/80 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">By {post.author}</span>
                    <Link 
                      href={`/blog/${post.id}`} 
                      className="text-[#D5FE52] inline-flex items-center gap-1 group-hover:text-[#D5FE52]/80 transition-colors"
                    >
                      Read more <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black py-8 px-4 border-t border-[#D5FE52]/20">
          <div className="max-w-7xl mx-auto text-center text-gray-400">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-xl font-bold text-white">🔍 TruthLens</span>
            </div>
            <p>© 2024 TruthLens.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}