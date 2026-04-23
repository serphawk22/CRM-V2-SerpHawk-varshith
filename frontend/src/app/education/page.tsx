'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, BookOpen, Search, ArrowRight, ExternalLink, GraduationCap, Video, FileText } from 'lucide-react';
import PageGuide from '@/components/PageGuide';

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState<'videos' | 'blogs'>('videos');
  const [searchQuery, setSearchQuery] = useState('');

  const videos = [
    { title: 'Getting Started with CRM', duration: '5:24', category: 'Basics', thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80', url: '#' },
    { title: 'How to Read Your SEO Audit', duration: '8:45', category: 'SEO', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', url: '#' },
    { title: 'Understanding Monthly Invoices', duration: '3:12', category: 'Billing', thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80', url: '#' },
    { title: 'Using the Email Agent', duration: '12:30', category: 'Advanced', thumbnail: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&q=80', url: '#' },
  ];

  const blogs = [
    { title: 'Top 5 SEO Strategies for 2026', date: 'Oct 12, 2026', category: 'Strategy', readTime: '5 min read', url: '#' },
    { title: 'How to increase conversion rate by 20%', date: 'Sep 28, 2026', category: 'Growth', readTime: '8 min read', url: '#' },
    { title: 'Why local SEO matters more than ever', date: 'Sep 15, 2026', category: 'Local SEO', readTime: '6 min read', url: '#' },
    { title: 'Understanding backlink quality', date: 'Aug 30, 2026', category: 'Link Building', readTime: '10 min read', url: '#' },
  ];

  const filteredVideos = videos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredBlogs = blogs.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 lg:p-10">
      <PageGuide
        pageKey="education"
        variant="dark"
        title="Learning Center"
        description="Access video tutorials, best practices, and guides to maximize your CRM experience."
        steps={[
          { icon: <Video size={32} />, text: 'Watch video tutorials to learn how to use the CRM effectively.' },
          { icon: <FileText size={32} />, text: 'Read our latest blog posts for SEO and growth strategies.' },
          { icon: <Search size={32} />, text: 'Use the search bar to find specific topics or guides.' }
        ]}
      />

      <div className="max-w-7xl mx-auto space-y-8 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white flex items-center gap-3" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              <GraduationCap className="w-10 h-10 text-amber-500" />
              Education Hub
            </h1>
            <p className="text-stone-400 mt-2">Everything you need to succeed and grow your business.</p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
            <input 
              type="text" 
              placeholder="Search tutorials & articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 bg-zinc-900 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 border-b border-white/10 pb-4">
          <button 
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'videos' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white hover:bg-white/5'}`}
          >
            <PlayCircle className="w-5 h-5" /> Video Tutorials
          </button>
          <button 
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'blogs' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white hover:bg-white/5'}`}
          >
            <BookOpen className="w-5 h-5" /> Blog & Articles
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'videos' ? (
            <motion.div key="videos" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video, i) => (
                <a key={i} href={video.url} className="group bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all cursor-pointer block">
                  <div className="h-48 relative overflow-hidden">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
                        <PlayCircle className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-black text-white">{video.duration}</div>
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">{video.category}</div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{video.title}</h3>
                  </div>
                </a>
              ))}
            </motion.div>
          ) : (
            <motion.div key="blogs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog, i) => (
                <a key={i} href={blog.url} className="group bg-zinc-900 border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 transition-all cursor-pointer flex flex-col justify-between h-full block">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{blog.category}</div>
                      <ExternalLink className="w-4 h-4 text-stone-600 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-4">{blog.title}</h3>
                  </div>
                  <div className="flex items-center justify-between text-sm text-stone-500 font-medium border-t border-white/5 pt-4">
                    <span>{blog.date}</span>
                    <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {blog.readTime}</span>
                  </div>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
