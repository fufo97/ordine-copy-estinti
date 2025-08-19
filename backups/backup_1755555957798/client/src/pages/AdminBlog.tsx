import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Eye, Calendar, User, FileText, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import RichTextEditor from "@/components/RichTextEditor";
import type { BlogPost, InsertBlogPost, UpdateBlogPost } from "@shared/schema";

export default function AdminBlog() {
  const [match] = useRoute("/admin/blog");
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get admin session from localStorage (same as Admin.tsx)
  const getAdminSession = () => {
    const sessionData = localStorage.getItem('adminSession');
    if (!sessionData) return null;
    
    try {
      const session = JSON.parse(sessionData);
      if (new Date(session.expiresAt) > new Date()) {
        return session;
      } else {
        localStorage.removeItem('adminSession');
        return null;
      }
    } catch {
      localStorage.removeItem('adminSession');
      return null;
    }
  };

  const adminSession = getAdminSession();
  const token = adminSession?.token;

  // If not authenticated, show login message
  if (!token) {
    return (
      <div className="min-h-screen bg-[rgb(28,28,28)] flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-900 border-gray-700 text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-[hsl(47,85%,55%)]">
              Accesso non autorizzato
            </CardTitle>
            <CardDescription className="text-gray-400">
              Devi effettuare il login per accedere al pannello blog.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin">
              <Button className="w-full bg-[hsl(47,85%,55%)] hover:bg-[hsl(47,85%,45%)] text-black font-semibold">
                Vai al Login Admin
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { data: postsResponse, isLoading } = useQuery<{ success: boolean; data: BlogPost[] }>({
    queryKey: ['/api/admin/blog/posts', activeTab],
    queryFn: async () => {
      const url = activeTab === 'all' 
        ? '/api/admin/blog/posts' 
        : `/api/admin/blog/posts?status=${activeTab}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      return response.json();
    },
    enabled: !!token,
  });

  const posts = postsResponse?.data || [];
  const filteredPosts = searchQuery 
    ? posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    : posts;

  const createPostMutation = useMutation({
    mutationFn: async (data: InsertBlogPost) => {
      return await apiRequest('/api/admin/blog/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog/posts'] });
      setIsCreateDialogOpen(false);
      toast({
        title: "Articolo creato!",
        description: "L'articolo è stato creato con successo.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Errore",
        description: error.message || "Errore nella creazione dell'articolo",
        variant: "destructive",
      });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateBlogPost }) => {
      return await apiRequest(`/api/admin/blog/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog/posts'] });
      setIsEditDialogOpen(false);
      setEditingPost(null);
      toast({
        title: "Articolo aggiornato!",
        description: "L'articolo è stato aggiornato con successo.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Errore",
        description: error.message || "Errore nell'aggiornamento dell'articolo",
        variant: "destructive",
      });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/admin/blog/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog/posts'] });
      toast({
        title: "Articolo eliminato!",
        description: "L'articolo è stato eliminato con successo.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Errore",
        description: error.message || "Errore nell'eliminazione dell'articolo",
        variant: "destructive",
      });
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File troppo grande",
        description: "Il file deve essere inferiore a 5MB.",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Tipo file non valido",
        description: "Puoi caricare solo file immagine.",
        variant: "destructive",
      });
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      if (result.success) {
        // Update form data with the uploaded image URL
        setFormData(prev => ({ ...prev, featuredImage: result.data.url }));
        
        toast({
          title: "Immagine caricata",
          description: "L'immagine è stata caricata con successo.",
        });
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Errore caricamento",
        description: "Si è verificato un errore durante il caricamento dell'immagine.",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const BlogPostForm = ({ 
    post, 
    onSubmit, 
    isLoading 
  }: { 
    post?: BlogPost | null; 
    onSubmit: (data: InsertBlogPost | UpdateBlogPost) => void;
    isLoading: boolean;
  }) => {
    const [formData, setFormData] = useState({
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      excerpt: post?.excerpt || '',
      author: post?.author || '',
      status: post?.status || 'draft' as const,
      featuredImage: post?.featuredImage || '',
      metaTitle: post?.metaTitle || '',
      metaDescription: post?.metaDescription || '',
      tags: post?.tags?.join(', ') || '',
      readingTime: post?.readingTime || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const submitData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        excerpt: formData.excerpt || null,
        featuredImage: formData.featuredImage || null,
        metaTitle: formData.metaTitle || null,
        metaDescription: formData.metaDescription || null,
        readingTime: formData.readingTime || null,
      };
      
      onSubmit(submitData);
    };

    const handleTitleChange = (title: string) => {
      setFormData(prev => ({
        ...prev,
        title,
        slug: post ? prev.slug : generateSlug(title)
      }));
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titolo *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Inserisci il titolo dell'articolo"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="url-friendly-slug"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Estratto</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Breve descrizione dell'articolo (opzionale)"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Contenuto *</Label>
          <RichTextEditor
            content={formData.content}
            onChange={(content: string) => setFormData(prev => ({ ...prev, content }))}
            placeholder="Scrivi il contenuto dell'articolo..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="author">Autore *</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              placeholder="Nome dell'autore"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Stato</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'draft' | 'published' }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Bozza</SelectItem>
                <SelectItem value="published">Pubblicato</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Immagine in evidenza</Label>
          <div className="flex gap-2">
            <Input
              value={formData.featuredImage}
              onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
              placeholder="https://esempio.com/immagine.jpg o carica un file"
              type="url"
              className="flex-1"
            />
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                id="image-upload"
              />
              <Button 
                type="button" 
                variant="outline"
                className="whitespace-nowrap"
                disabled={uploadingImage}
                asChild
              >
                <label htmlFor="image-upload" className="cursor-pointer">
                  {uploadingImage ? "Caricando..." : "Carica File"}
                </label>
              </Button>
            </div>
          </div>
          {formData.featuredImage && (
            <div className="mt-2">
              <img 
                src={formData.featuredImage} 
                alt="Preview" 
                className="w-32 h-20 object-cover rounded border"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tags">Tag</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="email marketing, strategia, tips (separati da virgola)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="readingTime">Tempo di lettura</Label>
            <Input
              id="readingTime"
              value={formData.readingTime}
              onChange={(e) => setFormData(prev => ({ ...prev, readingTime: e.target.value }))}
              placeholder="5 min di lettura"
            />
          </div>
        </div>

        <div className="space-y-4 border-t pt-4">
          <h4 className="font-semibold text-sm text-gray-600">SEO Meta Tags</h4>
          
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              value={formData.metaTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
              placeholder="Titolo ottimizzato per SEO (opzionale)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              value={formData.metaDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
              placeholder="Descrizione per i motori di ricerca (opzionale)"
              rows={2}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              setIsCreateDialogOpen(false);
              setIsEditDialogOpen(false);
              setEditingPost(null);
            }}
          >
            Annulla
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : (post ? 'Aggiorna Articolo' : 'Crea Articolo')}
          </Button>
        </div>
      </form>
    );
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accesso non autorizzato</h1>
          <p className="text-gray-600 mb-6">Devi effettuare il login per accedere al pannello blog.</p>
          <Link href="/admin">
            <Button>Vai al Login Admin</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestione Blog</h1>
            <p className="text-gray-600 mt-1">Crea e gestisci gli articoli del blog</p>
          </div>
          
          <div className="flex gap-3">
            <Link href="/blog" target="_blank">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Visualizza Blog
              </Button>
            </Link>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nuovo Articolo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Crea Nuovo Articolo</DialogTitle>
                  <DialogDescription>
                    Compila tutti i campi per creare un nuovo articolo del blog.
                  </DialogDescription>
                </DialogHeader>
                <BlogPostForm 
                  onSubmit={(data) => createPostMutation.mutate(data as InsertBlogPost)}
                  isLoading={createPostMutation.isPending}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Cerca articoli..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">Tutti ({posts.length})</TabsTrigger>
            <TabsTrigger value="published">
              Pubblicati ({posts.filter(p => p.status === 'published').length})
            </TabsTrigger>
            <TabsTrigger value="draft">
              Bozze ({posts.filter(p => p.status === 'draft').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Posts List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchQuery ? 'Nessun articolo trovato' : 'Nessun articolo creato'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery 
                    ? 'Prova con termini di ricerca diversi.' 
                    : 'Inizia creando il tuo primo articolo del blog.'
                  }
                </p>
                {!searchQuery && (
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Crea il primo articolo
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status === 'published' ? 'Pubblicato' : 'Bozza'}
                        </Badge>
                        {post.tags?.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {post.title}
                      </h3>
                      
                      {post.excerpt && (
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.updatedAt.toString())}</span>
                        </div>
                        {post.readingTime && (
                          <span>{post.readingTime}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {post.status === 'published' && (
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                      
                      <Dialog open={isEditDialogOpen && editingPost?.id === post.id} onOpenChange={(open) => {
                        setIsEditDialogOpen(open);
                        if (!open) setEditingPost(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setEditingPost(post)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Modifica Articolo</DialogTitle>
                            <DialogDescription>
                              Modifica i dettagli dell'articolo del blog.
                            </DialogDescription>
                          </DialogHeader>
                          <BlogPostForm 
                            post={editingPost}
                            onSubmit={(data) => updatePostMutation.mutate({ 
                              id: post.id, 
                              data: data as UpdateBlogPost 
                            })}
                            isLoading={updatePostMutation.isPending}
                          />
                        </DialogContent>
                      </Dialog>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Elimina Articolo</AlertDialogTitle>
                            <AlertDialogDescription>
                              Sei sicuro di voler eliminare questo articolo? Questa azione non può essere annullata.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annulla</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deletePostMutation.mutate(post.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Elimina
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}