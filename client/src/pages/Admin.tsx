import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogOut, Save, Plus, Edit3, Palette, Type } from "lucide-react";
import type { AdminContent, AdminStyling } from "@shared/schema";

interface AdminSession {
  token: string;
  expiresAt: Date;
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [session, setSession] = useState<AdminSession | null>(null);
  const [selectedPage, setSelectedPage] = useState("home");
  const [editingContent, setEditingContent] = useState<{[key: string]: string}>({});
  const [editingStyling, setEditingStyling] = useState<{[key: string]: any}>({});

  // Check for existing session on load
  useEffect(() => {
    const storedSession = localStorage.getItem('admin_session');
    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession);
        if (new Date(parsed.expiresAt) > new Date()) {
          setSession(parsed);
        } else {
          localStorage.removeItem('admin_session');
        }
      } catch {
        localStorage.removeItem('admin_session');
      }
    }
  }, []);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (password: string) => {
      const res = await apiRequest("POST", "/api/admin/login", { password });
      return res.json();
    },
    onSuccess: (data: any) => {
      const sessionData = {
        token: data.token,
        expiresAt: data.expiresAt
      };
      setSession(sessionData);
      localStorage.setItem('admin_session', JSON.stringify(sessionData));
      toast({
        title: "Login effettuato",
        description: "Benvenuto nel pannello amministrativo",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Errore di login",
        description: error.message || "Password non corretta",
        variant: "destructive",
      });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${session?.token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error('Logout failed');
      return res.json();
    },
    onSuccess: () => {
      setSession(null);
      localStorage.removeItem('admin_session');
      toast({
        title: "Logout effettuato",
        description: "Sessione terminata con successo",
      });
    },
  });

  // Fetch admin content
  const { data: contentData, isLoading: contentLoading } = useQuery({
    queryKey: ['/api/admin/content', selectedPage],
    queryFn: async () => {
      const res = await fetch(`/api/admin/content?page=${selectedPage}`, {
        headers: {
          'Authorization': `Bearer ${session?.token}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch content');
      return res.json();
    },
    enabled: !!session?.token,
  });

  // Fetch admin styling
  const { data: stylingData, isLoading: stylingLoading } = useQuery({
    queryKey: ['/api/admin/styling', selectedPage],
    queryFn: async () => {
      const res = await fetch(`/api/admin/styling?page=${selectedPage}`, {
        headers: {
          'Authorization': `Bearer ${session?.token}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch styling');
      return res.json();
    },
    enabled: !!session?.token,
  });

  // Update content mutation
  const updateContentMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const res = await fetch(`/api/admin/content/${key}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${session?.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value })
      });
      if (!res.ok) throw new Error('Failed to update content');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/content'] });
      toast({
        title: "Contenuto aggiornato",
        description: "Le modifiche sono state salvate",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Errore",
        description: error.message || "Errore nell'aggiornamento",
        variant: "destructive",
      });
    },
  });

  // Update styling mutation
  const updateStylingMutation = useMutation({
    mutationFn: async ({ elementId, styles }: { elementId: string; styles: any }) => {
      const res = await fetch(`/api/admin/styling/${elementId}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${session?.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ styles })
      });
      if (!res.ok) throw new Error('Failed to update styling');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/styling'] });
      toast({
        title: "Stile aggiornato",
        description: "Le modifiche sono state salvate",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Errore",
        description: error.message || "Errore nell'aggiornamento dello stile",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      loginMutation.mutate(password);
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleContentUpdate = (key: string) => {
    const value = editingContent[key];
    if (value !== undefined) {
      updateContentMutation.mutate({ key, value });
      setEditingContent(prev => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
    }
  };

  const handleStylingUpdate = (elementId: string) => {
    const styles = editingStyling[elementId];
    if (styles !== undefined) {
      updateStylingMutation.mutate({ elementId, styles });
      setEditingStyling(prev => {
        const newState = { ...prev };
        delete newState[elementId];
        return newState;
      });
    }
  };

  // If not logged in, show login form
  if (!session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-yellow-400/30">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-yellow-400">
              Pannello Amministrativo
            </CardTitle>
            <CardDescription className="text-gray-400">
              Accedi per gestire i contenuti del sito
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white pr-10"
                    placeholder="Inserisci la password"
                    disabled={loginMutation.isPending}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
                disabled={loginMutation.isPending || !password.trim()}
              >
                {loginMutation.isPending ? "Accesso in corso..." : "Accedi"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-yellow-400">Pannello Amministrativo</h1>
            <p className="text-gray-400">Gestisci contenuti e stili del sito</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setLocation("/")}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Torna al sito
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid gap-6">
          {/* Page selector */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Seleziona Pagina</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {["home", "servizi", "contatti", "diagnosi"].map((page) => (
                  <Button
                    key={page}
                    variant={selectedPage === page ? "default" : "outline"}
                    onClick={() => setSelectedPage(page)}
                    className={selectedPage === page ? "bg-yellow-600 text-black" : "border-gray-600 text-gray-300"}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main content tabs */}
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="content" className="text-white data-[state=active]:bg-yellow-600 data-[state=active]:text-black">
                <Type className="h-4 w-4 mr-2" />
                Gestione Contenuti
              </TabsTrigger>
              <TabsTrigger value="styling" className="text-white data-[state=active]:bg-yellow-600 data-[state=active]:text-black">
                <Palette className="h-4 w-4 mr-2" />
                Gestione Stili
              </TabsTrigger>
            </TabsList>

            {/* Content Management Tab */}
            <TabsContent value="content" className="space-y-4">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-yellow-400">Contenuti - {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}</CardTitle>
                  <CardDescription className="text-gray-400">
                    Modifica i testi della pagina senza accedere al codice
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contentLoading ? (
                    <div className="text-center py-8 text-gray-400">Caricamento contenuti...</div>
                  ) : contentData?.data && Array.isArray(contentData.data) && contentData.data.length > 0 ? (
                    contentData.data.map((content: AdminContent) => (
                      <div key={content.key} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-white font-medium">{content.key}</Label>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingContent(prev => ({ ...prev, [content.key]: content.value }))}
                              className="border-gray-600 text-gray-300"
                            >
                              <Edit3 className="h-3 w-3 mr-1" />
                              Modifica
                            </Button>
                            {editingContent[content.key] !== undefined && (
                              <Button
                                size="sm"
                                onClick={() => handleContentUpdate(content.key)}
                                disabled={updateContentMutation.isPending}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Save className="h-3 w-3 mr-1" />
                                Salva
                              </Button>
                            )}
                          </div>
                        </div>
                        {editingContent[content.key] !== undefined ? (
                          <Textarea
                            value={editingContent[content.key]}
                            onChange={(e) => setEditingContent(prev => ({ ...prev, [content.key]: e.target.value }))}
                            className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                            placeholder="Inserisci il contenuto..."
                          />
                        ) : (
                          <div className="p-3 bg-gray-700 rounded border text-gray-300 min-h-[60px]">
                            {content.value}
                          </div>
                        )}
                        <div className="mt-2 text-xs text-gray-500">
                          Sezione: {content.section} | Ultimo aggiornamento: {new Date(content.updatedAt).toLocaleString('it-IT')}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      Nessun contenuto trovato per questa pagina
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Styling Management Tab */}
            <TabsContent value="styling" className="space-y-4">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-yellow-400">Stili - {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}</CardTitle>
                  <CardDescription className="text-gray-400">
                    Modifica margini, dimensioni e proporzioni degli elementi
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stylingLoading ? (
                    <div className="text-center py-8 text-gray-400">Caricamento stili...</div>
                  ) : stylingData?.data && Array.isArray(stylingData.data) && stylingData.data.length > 0 ? (
                    stylingData.data.map((styling: AdminStyling) => (
                      <div key={styling.elementId} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-white font-medium">{styling.elementId}</Label>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingStyling(prev => ({ ...prev, [styling.elementId]: JSON.stringify(styling.styles, null, 2) }))}
                              className="border-gray-600 text-gray-300"
                            >
                              <Edit3 className="h-3 w-3 mr-1" />
                              Modifica
                            </Button>
                            {editingStyling[styling.elementId] !== undefined && (
                              <Button
                                size="sm"
                                onClick={() => {
                                  try {
                                    const parsedStyles = JSON.parse(editingStyling[styling.elementId]);
                                    handleStylingUpdate(styling.elementId);
                                  } catch {
                                    toast({
                                      title: "Errore",
                                      description: "JSON non valido",
                                      variant: "destructive",
                                    });
                                  }
                                }}
                                disabled={updateStylingMutation.isPending}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Save className="h-3 w-3 mr-1" />
                                Salva
                              </Button>
                            )}
                          </div>
                        </div>
                        {editingStyling[styling.elementId] !== undefined ? (
                          <Textarea
                            value={editingStyling[styling.elementId]}
                            onChange={(e) => setEditingStyling(prev => ({ ...prev, [styling.elementId]: e.target.value }))}
                            className="bg-gray-700 border-gray-600 text-white min-h-[150px] font-mono text-sm"
                            placeholder='{"padding": "1rem", "margin": "0.5rem", "maxWidth": "800px"}'
                          />
                        ) : (
                          <div className="p-3 bg-gray-700 rounded border text-gray-300 min-h-[100px] font-mono text-sm">
                            {JSON.stringify(styling.styles, null, 2)}
                          </div>
                        )}
                        <div className="mt-2 text-xs text-gray-500">
                          Ultimo aggiornamento: {new Date(styling.updatedAt).toLocaleString('it-IT')}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      Nessuno stile trovato per questa pagina
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}