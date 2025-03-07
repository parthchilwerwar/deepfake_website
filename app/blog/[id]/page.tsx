'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
        {
            "id": 1,
            "title": "Understanding Deepfake Detection Technology",
            "excerpt": "Learn about the latest advances in deepfake detection and how AI is helping combat digital manipulation.",
            "content": "Deepfake detection technology represents a critical frontier in digital authenticity.\n\nAs artificial intelligence continues to advance, sophisticated algorithms now analyze video and image characteristics to identify manipulated media.\n\nKey Detection Strategies\n\nAnalyzing Inconsistent Facial Movements\nDeepfake algorithms often struggle with realistic replications of natural:\n- Eye blinks\n- Microexpressions\n- Lip synchronization\n\nThese areas become prime targets for detecting synthetic media.\n\nDetecting Unnatural Pixel Patterns\nAdvanced AI models identify pixel anomalies through:\n- Edge detection around manipulated regions\n- Identifying artificial artifacts\n- Analyzing background inconsistencies\n\nMachine Learning Manipulation Traces\nDeep learning models, such as Convolutional Neural Networks (CNNs), are trained to:\n- Detect subtle synthetic media residues\n- Compare against extensive authentic media datasets\n- Recognize pattern inconsistencies\n\nEmerging Challenges in Deepfake Detection\n\nThe field faces multiple complex challenges:\n- Growing accessibility of deepfake creation tools\n- Ensuring cross-demographic detection accuracy\n- Navigating ethical concerns around content usage\n\nInnovative Solutions\n\nResearchers are exploring groundbreaking approaches:\n- Blockchain Verification: Implementing cryptographic content authentication\n- Real-time Detection Systems: Developing live video screening technologies\n- Public Awareness Campaigns: Educating users about digital manipulation risks\n\nFuture Outlook\n\nThe future of deepfake detection demands:\n- Continuous technological innovation\n- Collaborative interdisciplinary research\n- Ethical framework development\n\nBy leveraging cutting-edge AI, enhancing awareness, and fostering global collaboration, we can protect digital spaces and maintain trust in an increasingly complex media landscape.",
            "author": "John Doe",
            "date": "January 15, 2025",
            "imageUrl": "/images/blog/rise_2.jpg",
            "readTime": "7 min read"
        }
        
        ,
        {
            "id": 2,
            "title": "How to Spot a Deepfake Image",
            "excerpt": "Learn simple techniques to identify deepfake media and protect yourself from digital manipulation.",
            "content": "With the growing prevalence of deepfake media, being able to spot them has become an essential skill for navigating today’s digital landscape.\n\nKey Indicators to Identify Deepfakes\n\nUnnatural Facial Movements and Expressions\nDeepfake algorithms often struggle to perfectly mimic natural human behavior. Watch for:\n- Limited or unnatural blinking\n- Stiff or exaggerated facial expressions\n- Lip movements that don’t align with speech\n\nInconsistent Lighting and Shadows\nLighting inconsistencies can give away a manipulated video or image. Look for:\n- Shadows that don’t align with light sources\n- Uneven brightness across the face\n\nIrregular Audio-Visual Sync\nDeepfakes frequently fail to synchronize audio with video accurately. Be alert for:\n- Delays in speech or mismatched audio cues\n- Background noise that seems artificially removed or inconsistent\n\nArtifacts and Blurring\nPixel-level anomalies and editing artifacts are common signs of manipulation. Spot:\n- Blurred or smudged areas, especially around the edges of the face\n- Abnormal transitions between the face and the background\n\nTips for Verifying Content\n\nReverse Image Search\nPerform a reverse image search to check the authenticity of a suspicious image. Tools like Google Images or TinEye can help identify original sources.\n\nMetadata Analysis\nAnalyze file metadata to uncover signs of manipulation. Tools like FotoForensics can provide insights into editing history.\n\nRely on Trusted Sources\nCross-check information with reputable sources or platforms known for credible content. Avoid relying solely on unverified social media posts.\n\nEducate Yourself and Others\nStay informed about deepfake trends and technologies. Awareness is your best defense against manipulation.\n\nThe ability to identify deepfakes is an important skill in an age of digital misinformation. By combining observation with verification tools, you can protect yourself and others from falling victim to manipulated media.",
            "author": "John Doe",
            "date": "January 16, 2025",
            "imageUrl": "/images/blog/rise_3.jpg",
            "readTime": "5 min read"
        }, 
        {
            "id": 3,
            "title": "How to Protect Your Digital Identity",
            "excerpt": "Essential strategies and best practices for safeguarding your online presence from deepfake threats.",
            "content": "In the age of deepfake technology, protecting your digital identity is more important than ever. By following a few key strategies, you can safeguard yourself from potential threats.\n\nUnderstand the Risks\nDeepfakes can be used maliciously to:\n- Spread false information\n- Damage reputations\n- Commit identity theft or fraud\n\nBeing aware of these risks is the first step to staying secure online.\n\nKey Strategies to Protect Yourself\n\nStrengthen Your Privacy Settings\nReview and adjust your privacy settings on social media and other platforms to limit who can access your personal content. Avoid posting unnecessary personal photos or videos.\n\nUse Two-Factor Authentication (2FA)\nEnable 2FA on all your accounts to add an extra layer of security. This ensures that even if your credentials are compromised, unauthorized access can still be prevented.\n\nMonitor Your Digital Presence\nRegularly search for your name and images online to ensure they aren’t being misused. Tools like reverse image search can help track down unauthorized uses of your photos.\n\nBe Wary of Unsolicited Requests\nAvoid sharing personal information or media with unknown contacts or sources. Deepfake creators often rely on publicly available data to generate convincing fakes.\n\nVerify Content Before Sharing\nThink critically before sharing content online, especially if it seems suspicious or sensational. Fact-check and verify the source to avoid spreading manipulated media.\n\nAdvanced Measures\n\nWatermark Sensitive Content\nIf you must share personal videos or photos online, consider adding watermarks or timestamps. This makes it harder for malicious actors to repurpose your content.\n\nEducate Yourself and Stay Updated\nStay informed about the latest deepfake trends and detection tools. Knowledge is one of the most effective defenses against digital manipulation.\n\nCollaborate with Trusted Platforms\nSupport and rely on platforms that actively combat deepfake threats by implementing detection tools and verifying content.\n\nBy adopting these strategies, you can take control of your digital identity and protect yourself from the risks posed by deepfake technology. Staying vigilant and proactive is key to navigating today’s digital landscape safely.",
            "author": "Alex Johnson",
            "date": "January 13, 2025",
            "imageUrl": "/images/blog/rise_11.jpg",
            "readTime": "6 min read"
        }
        
        
    ];

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function BlogPostPage({ params }: PageProps) {
        const [scrolled, setScrolled] = useState(false);
        const [post, setPost] = useState<BlogPost | null>(null);
      
        useEffect(() => {
          const handleScroll = () => {
            setScrolled(window.scrollY > 50);
          };
      
          const foundPost = blogPosts.find(p => p.id === parseInt(params.id));
      
          if (foundPost) {
            setPost(foundPost);
          }
      
          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
        }, [params.id]);
      
        if (!post) {
          return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl text-[#D5FE52] mb-4">Post Not Found</h1>
                <Link 
                  href="/blog" 
                  className="inline-flex items-center gap-2 text-[#D5FE52] hover:text-[#D5FE52]/80"
                >
                  <ChevronLeft size={20} /> Back to Blog
                </Link>
              </div>
            </div>
          );
        }
      
        return (
          <div className="min-h-screen bg-black text-white">
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
                  href="/detect"
                  className="px-4 sm:px-7 py-1.5 sm:py-2 bg-[#D5FE52] text-black text-sm sm:text-base font-semibold rounded-lg hover:bg-[#D5FE52]/90 transition-colors duration-300"
                >
                  Launch App
                </Link>
              </div>
            </motion.header>
      
            <div className="pt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-[#D5FE52] hover:text-[#D5FE52]/80 mb-8"
              >
                <ChevronLeft size={20} /> Back to Blog
              </Link>
      
              <motion.h1 
                className="text-4xl font-bold text-[#D5FE52] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {post.title}
              </motion.h1>
      
              
                <p className="text-lg text-white font-semibold mb-4">
                  {post.excerpt}
                </p>
              
      
              <div className="flex items-center justify-between text-sm text-gray-400 mb-8">
                <div>
                  <span>By {post.author}</span> | <span>{post.date}</span>
                </div>
                <span>{post.readTime}</span>
              </div>
      
              <div className="relative aspect-[16/9] w-full mb-8">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
      
              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <div key={index} className="mb-4">
                    {paragraph.startsWith('Key ') || paragraph.startsWith('Emerging ') ? (
                      <h3 className="text-2xl text-[#D5FE52] mt-8 mb-4">{paragraph}</h3>
                    ) : paragraph.startsWith('- ') ? (
                      <ul className="list-disc pl-5 mb-4">
                        {paragraph.split('\n').map((item, i) => (
                          <li key={i}>{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{paragraph}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
      
            <footer className="bg-black py-8 px-4 border-t border-[#D5FE52]/20">
              <div className="max-w-7xl mx-auto text-center text-gray-400">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-xl font-bold text-white">🔍 TruthLens</span>
                </div>
                <p>© 2024 TruthLens.</p>
              </div>
            </footer>
          </div>
        );
      }