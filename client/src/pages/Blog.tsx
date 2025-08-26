import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Clock, User, ArrowRight } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import FloatingElements from "@/components/FloatingElements";
import GlowingText from "@/components/GlowingText";
import { EditableText } from "@/components/EditableWrapper";
import { useSEO } from "@/hooks/useSEO";
import { seoPages } from "@/utils/seoData";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  
  useSEO(seoPages.blog());

  const { data: posts, isLoading } = useQuery<{ success: boolean; data: BlogPost[] }>({
    queryKey: ['/api/blog/posts'],
  });

  const { data: searchResults } = useQuery<{ success: boolean; data: BlogPost[] }>({
    queryKey: ['/api/blog/search', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return { success: true, data: [] };
      const res = await fetch(`/api/blog/search?q=${encodeURIComponent(searchQuery)}`);
      return res.json();
    },
    enabled: searchQuery.trim().length > 0,
  });

  const displayPosts = searchQuery.trim() 
    ? searchResults?.data || [] 
    : posts?.data || [];

  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min di lettura`;
  };

  return (
    <div className="font-sans min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20 md:pt-24 pb-12"
               style={{ backgroundColor: 'hsl(0, 0%, 8%)' }}>
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        
        {/* Particle Effects */}
        <ParticleBackground />
        <FloatingElements />
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(196, 167, 109, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(196, 167, 109, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              animation: 'gridMove 20s linear infinite'
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className={`transform transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <EditableText contentKey="blog_hero_title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <GlowingText 
                className="block text-white"
                glowColor="#C4A76D"
                intensity="high"
                animated
              >
                BLOG DELL'ORDINE
              </GlowingText>
            </EditableText>
          </div>

          <div className={`transform transition-all duration-1500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <EditableText contentKey="blog_hero_subtitle" className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Strategie, insights e segreti dell'
              <span className="font-bold text-yellow-300"> Email Marketing</span> e del <span className="font-bold text-yellow-300">  Copywriting Avanzato </span> 
            </EditableText>
          </div>

          {/* Search Bar */}
          <div className={`transform transition-all duration-1500 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Cerca negli articoli..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-black/50 border-yellow-400/30 text-white focus:border-yellow-400 focus:ring-yellow-400/20 h-12 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #C4A76D 2px, transparent 2px)`,
                backgroundSize: '50px 50px',
                animation: 'float 10s ease-in-out infinite'
              }}
            />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-gray-900/50 border-yellow-400/20 animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-700 rounded mb-4"></div>
                    <div className="h-6 bg-gray-700 rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-gray-700 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : displayPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-8">
                <GlowingText 
                  className="text-2xl font-bold text-white"
                  glowColor="#C4A76D"
                  intensity="medium"
                >
                  {searchQuery.trim() 
                    ? "Nessun articolo trovato" 
                    : "Nessun articolo pubblicato"
                  }
                </GlowingText>
              </div>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                {searchQuery.trim() 
                  ? "Prova con termini di ricerca diversi o controlla l'ortografia." 
                  : "I nostri esperti stanno preparando contenuti esclusivi. Torna presto!"
                }
              </p>
              {searchQuery.trim() && (
                <Button
                  onClick={() => setSearchQuery("")}
                  variant="outline"
                  className="mt-6 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  Mostra tutti gli articoli
                </Button>
              )}
            </div>
          ) : (
            <>
              {searchQuery.trim() && (
                <div className="mb-8 text-center">
                  <p className="text-gray-300 text-lg">
                    Trovati <span className="text-yellow-400 font-bold">{displayPosts.length}</span> articoli per "{searchQuery}"
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayPosts.map((post) => (
                  <Card key={post.id} className="group bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20">
                    {post.featuredImage && (
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags?.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <CardTitle className="text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </CardTitle>
                      
                      {post.excerpt && (
                        <CardDescription className="text-gray-300 line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                      )}
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{post.readingTime || calculateReadingTime(post.content)}</span>
                        </div>
                        
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-black hover:bg-yellow-400 group">
                            Leggi tutto
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}