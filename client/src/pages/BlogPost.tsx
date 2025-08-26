import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DOMPurify from "isomorphic-dompurify";
import type { BlogPost } from "@shared/schema";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const { toast } = useToast();

  const { data: response, isLoading, error } = useQuery<{ success: boolean; data: BlogPost }>({
    queryKey: ['/api/blog/posts', params?.slug],
    queryFn: async () => {
      const res = await fetch(`/api/blog/posts/${params?.slug}`);
      if (!res.ok) {
        throw new Error('Articolo non trovato');
      }
      return res.json();
    },
    enabled: !!params?.slug,
  });

  const post = response?.data;

  // Sanitize blog content while allowing rich HTML for blog posts
  const sanitizeContent = (content: string) => {
    if (!content) return '';
    
    return DOMPurify.sanitize(content, {
      // Allow rich HTML tags for blog content
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'div', 'span', 
        'strong', 'b', 'em', 'i', 'u', 'mark',
        'ul', 'ol', 'li', 
        'blockquote', 'pre', 'code',
        'a', 'img',
        'table', 'thead', 'tbody', 'tr', 'th', 'td'
      ],
      // Allow safe attributes
      ALLOWED_ATTR: [
        'href', 'src', 'alt', 'title', 'class', 'id',
        'width', 'height', 'style'
      ],
      // Forbid dangerous tags
      FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'style', 'link'],
      // Forbid dangerous attributes
      FORBID_ATTR: [
        'onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur',
        'onsubmit', 'onchange', 'onkeypress', 'onkeydown', 'onkeyup'
      ],
      // Only allow safe protocols
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
      // Return clean HTML
      KEEP_CONTENT: true,
      RETURN_DOM: false,
      RETURN_DOM_FRAGMENT: false
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('it-IT', {
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

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt || post.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiato!",
        description: "Il link dell'articolo è stato copiato negli appunti.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded-lg mb-6"></div>
            <div className="h-64 bg-gray-700 rounded-lg mb-8"></div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Articolo non trovato</h1>
          <p className="text-gray-300 mb-8">L'articolo che stai cercando non esiste o è stato rimosso.</p>
          <Link href="/blog">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna al Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-20">
      {/* Hero Section */}
      <div className="relative">
        {post.featuredImage && (
          <div className="relative h-96 overflow-hidden">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
        )}
        
        <div className="relative max-w-4xl mx-auto px-4 py-12">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="text-gray-300 hover:text-yellow-400 mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna al Blog
            </Button>
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium text-white">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readingTime || calculateReadingTime(post.content)}</span>
            </div>
            <Button
              onClick={handleShare}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-yellow-400"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Condividi
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-gray-900/30 rounded-3xl p-8 md:p-12 border border-yellow-400/20">
          <div 
            className="prose prose-lg prose-invert max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h1:text-3xl prose-h1:mb-6 prose-h1:text-yellow-400
              prose-h2:text-2xl prose-h2:mb-4 prose-h2:text-yellow-400
              prose-h3:text-xl prose-h3:mb-3
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-white prose-strong:font-semibold
              prose-em:text-yellow-300
              prose-a:text-yellow-400 prose-a:no-underline hover:prose-a:underline
              prose-ul:text-gray-300 prose-ol:text-gray-300
              prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-yellow-400 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-300
              prose-code:text-yellow-400 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-img:rounded-lg prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: sanitizeContent(post.content) }}
          />
        </div>

        {/* SEO Meta Information */}
        {(post.metaTitle || post.metaDescription) && (
          <div className="mt-12 p-6 bg-gray-800/30 rounded-lg border border-gray-600/30">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Meta Informazioni SEO</h3>
            {post.metaTitle && (
              <div className="mb-2">
                <span className="text-sm text-gray-500">Titolo SEO: </span>
                <span className="text-gray-300">{post.metaTitle}</span>
              </div>
            )}
            {post.metaDescription && (
              <div>
                <span className="text-sm text-gray-500">Descrizione SEO: </span>
                <span className="text-gray-300">{post.metaDescription}</span>
              </div>
            )}
          </div>
        )}

        {/* Back to Blog */}
        <div className="text-center mt-16">
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform duration-300">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Esplora altri articoli
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}