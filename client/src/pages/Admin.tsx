import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { adminLoginSchema, type AdminLogin } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff, LogOut, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Palette, Type, Save } from "lucide-react";
import { Route, Switch, useLocation, Link } from "wouter";
import { EditProvider } from "@/components/EditableWrapper";

// Import all the regular pages to render them with editing capabilities
import Home from "./Home";
import Servizi from "./Servizi";
import Contatti from "./Contatti";
import DiagnosiChirurgica from "./DiagnosiChirurgica";
import AdminBlog from "./AdminBlog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface AdminSession {
  token: string;
  expiresAt: Date;
}

interface EditableElement {
  key: string;
  content: string;
  element: HTMLElement;
  rect: DOMRect;
}

interface MiniEditor {
  visible: boolean;
  position: { x: number; y: number };
  content: string;
  selectedElement: EditableElement | null;
}

// Enhanced Floating Mini Editor Component
function FloatingMiniEditor({ 
  editor, 
  onSave, 
  onClose 
}: { 
  editor: MiniEditor; 
  onSave: (content: string) => void; 
  onClose: () => void; 
}) {
  const [content, setContent] = useState(editor.content);
  const [fontSize, setFontSize] = useState("16");
  const [fontFamily, setFontFamily] = useState("Arial");
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContent(editor.content);
    // Set the content in the editor when it opens
    if (editorRef.current && editor.content) {
      editorRef.current.innerHTML = editor.content;
    }
  }, [editor.content]);

  // Save cursor position before any operations
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && editorRef.current?.contains(selection.anchorNode)) {
      return selection.getRangeAt(0).cloneRange();
    }
    return null;
  };

  // Restore cursor position after operations  
  const restoreSelection = (range: Range | null) => {
    if (range && editorRef.current) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const applyFormat = (command: string, value?: string) => {
    if (editorRef.current) {
      // Save current cursor position
      const range = saveSelection();
      
      // Focus the editor first
      editorRef.current.focus();
      
      // Restore selection if we had one
      if (range) {
        restoreSelection(range);
      }
      
      // Apply the formatting command
      document.execCommand(command, false, value);
      
      // Update the content state without re-rendering the innerHTML
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      
      // Keep focus on the editor
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus();
        }
      }, 0);
    }
  };

  const applyFontSize = (size: string) => {
    setFontSize(size);
    if (editorRef.current) {
      editorRef.current.style.fontSize = `${size}px`;
    }
  };

  const applyFontFamily = (family: string) => {
    setFontFamily(family);
    applyFormat('fontName', family);
  };

  const handleSave = () => {
    onSave(content);
    onClose();
  };

  const clearFormatting = () => {
    applyFormat('removeFormat');
  };

  const insertLink = () => {
    const url = prompt('Inserisci URL:');
    if (url) {
      applyFormat('createLink', url);
    }
  };

  if (!editor.visible) return null;

  return (
    <div 
      className="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-2xl"
      style={{ 
        left: Math.min(editor.position.x, window.innerWidth - 600), 
        top: Math.min(editor.position.y, window.innerHeight - 400),
        minWidth: "580px",
        maxWidth: "600px"
      }}
    >
      {/* Enhanced Toolbar */}
      <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        {/* First Row */}
        <div className="flex items-center gap-2 mb-2">
          {/* Font family */}
          <select 
            className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
            value={fontFamily}
            onChange={(e) => applyFontFamily(e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
            <option value="Courier New">Courier New</option>
          </select>
          
          {/* Font size */}
          <select 
            className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
            value={fontSize}
            onChange={(e) => applyFontSize(e.target.value)}
          >
            <option value="10">10px</option>
            <option value="12">12px</option>
            <option value="14">14px</option>
            <option value="16">16px</option>
            <option value="18">18px</option>
            <option value="20">20px</option>
            <option value="24">24px</option>
            <option value="28">28px</option>
            <option value="32">32px</option>
            <option value="36">36px</option>
          </select>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Formatting buttons */}
          <button 
            onClick={() => applyFormat('bold')}
            className="p-2 hover:bg-gray-200 rounded border border-gray-300"
            title="Grassetto"
          >
            <Bold size={16} />
          </button>
          
          <button 
            onClick={() => applyFormat('italic')}
            className="p-2 hover:bg-gray-200 rounded border border-gray-300"
            title="Corsivo"
          >
            <Italic size={16} />
          </button>
          
          <button 
            onClick={() => applyFormat('underline')}
            className="p-2 hover:bg-gray-200 rounded border border-gray-300"
            title="Sottolineato"
          >
            <Underline size={16} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Color picker */}
          <div className="flex items-center gap-1">
            <span className="text-xs">Colore:</span>
            <input 
              type="color"
              onChange={(e) => applyFormat('foreColor', e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              title="Colore testo"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="flex items-center gap-2">
          {/* Alignment */}
          <button 
            onClick={() => applyFormat('justifyLeft')}
            className="p-2 hover:bg-gray-200 rounded border border-gray-300"
            title="Allinea a sinistra"
          >
            <AlignLeft size={16} />
          </button>
          
          <button 
            onClick={() => applyFormat('justifyCenter')}
            className="p-2 hover:bg-gray-200 rounded border border-gray-300"
            title="Allinea al centro"
          >
            <AlignCenter size={16} />
          </button>
          
          <button 
            onClick={() => applyFormat('justifyRight')}
            className="p-2 hover:bg-gray-200 rounded border border-gray-300"
            title="Allinea a destra"
          >
            <AlignRight size={16} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Lists */}
          <button 
            onClick={() => applyFormat('insertUnorderedList')}
            className="p-2 hover:bg-gray-200 rounded border border-gray-300"
            title="Elenco puntato"
          >
            <List size={16} />
          </button>
          
          <button 
            onClick={() => applyFormat('insertOrderedList')}
            className="p-2 hover:bg-gray-200 rounded border border-gray-300"
            title="Elenco numerato"
          >
            <ListOrdered size={16} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Additional tools */}
          <button 
            onClick={insertLink}
            className="p-2 hover:bg-gray-200 rounded border border-gray-300"
            title="Inserisci link"
          >
            🔗
          </button>

          <button 
            onClick={clearFormatting}
            className="px-3 py-2 hover:bg-gray-200 rounded border border-gray-300 text-xs"
            title="Rimuovi formattazione"
          >
            Pulisci
          </button>

          <div className="flex-1" />

          {/* Action buttons */}
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition-colors"
          >
            💾 Salva
          </button>
          
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 transition-colors"
          >
            ❌ Annulla
          </button>
        </div>
      </div>

      {/* Enhanced Content editor */}
      <div className="p-4">
        <div className="text-sm text-gray-600 mb-2">
          Elemento: <strong>{editor.selectedElement?.key}</strong>
        </div>
        <div 
          ref={editorRef}
          contentEditable
          className="p-4 min-h-[150px] max-h-[300px] overflow-y-auto focus:outline-none border border-gray-300 rounded bg-white"
          style={{ 
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily,
            lineHeight: '1.5'
          }}
          onInput={(e) => {
            const newContent = e.currentTarget.innerHTML;
            setContent(newContent);
          }}
          onBlur={(e) => {
            // Update content when focus is lost
            const newContent = e.currentTarget.innerHTML;
            setContent(newContent);
          }}
          onKeyDown={(e) => {
            // Handle specific key combinations
            if (e.ctrlKey || e.metaKey) {
              switch (e.key) {
                case 'b':
                  e.preventDefault();
                  applyFormat('bold');
                  break;
                case 'i':
                  e.preventDefault();
                  applyFormat('italic');
                  break;
                case 'u':
                  e.preventDefault();
                  applyFormat('underline');
                  break;
              }
            }
          }}
          suppressContentEditableWarning={true}
        />
        <div className="text-xs text-gray-500 mt-2">
          Suggerimento: Seleziona il testo per applicare la formattazione
        </div>
      </div>
    </div>
  );
}

// Enhanced content wrapper that makes elements editable
function EditableContent({ 
  children, 
  contentKey, 
  onEdit 
}: { 
  children: React.ReactNode; 
  contentKey: string; 
  onEdit: (key: string, element: HTMLElement) => void; 
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (elementRef.current) {
      onEdit(contentKey, elementRef.current);
    }
  };

  return (
    <div 
      ref={elementRef}
      onClick={handleClick}
      className="editable-section hover:outline hover:outline-2 hover:outline-blue-400 hover:bg-blue-50/10 cursor-pointer transition-all duration-200 relative group"
      data-content-key={contentKey}
    >
      {children}
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-md">
          Clicca per modificare
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [miniEditor, setMiniEditor] = useState<MiniEditor>({
    visible: false,
    position: { x: 0, y: 0 },
    content: "",
    selectedElement: null
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [location] = useLocation();

  // Check for existing session
  useEffect(() => {
    const savedSession = localStorage.getItem('adminSession');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        const expiresAt = new Date(parsed.expiresAt);
        if (expiresAt > new Date()) {
          setSession({
            token: parsed.token,
            expiresAt
          });
        } else {
          localStorage.removeItem('adminSession');
        }
      } catch (error) {
        localStorage.removeItem('adminSession');
      }
    }
  }, []);

  // Login form
  const form = useForm<AdminLogin>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      password: "",
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: AdminLogin) => {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      if (!res.ok) throw new Error('Login failed');
      return res.json();
    },
    onSuccess: (data) => {
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      const sessionData = {
        token: data.token,
        expiresAt
      };
      setSession(sessionData);
      localStorage.setItem('adminSession', JSON.stringify(sessionData));
      toast({
        title: "Accesso riuscito",
        description: "Benvenuto nel pannello amministratore",
      });
    },
    onError: () => {
      toast({
        title: "Errore di accesso",
        description: "Password non corretta",
        variant: "destructive",
      });
    },
  });

  // Update content mutation
  const updateContentMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      console.log("Updating content:", key, "with token:", session?.token?.substring(0, 10) + "...");
      const res = await fetch(`/api/admin/content/${key}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${session?.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value })
      });
      console.log("Update response status:", res.status);
      if (!res.ok) {
        const errorText = await res.text();
        console.log("Update error:", errorText);
        
        // If session is invalid, clear it and force re-login
        if (res.status === 401) {
          localStorage.removeItem('adminSession');
          setSession(null);
          toast({
            title: "Sessione scaduta",
            description: "Effettua nuovamente il login",
            variant: "destructive",
          });
          return;
        }
        
        throw new Error('Failed to update content');
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Contenuto aggiornato",
        description: "Le modifiche sono state salvate con successo",
      });
    },
    onError: () => {
      toast({
        title: "Errore",
        description: "Impossibile salvare le modifiche",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (data: AdminLogin) => {
    loginMutation.mutate(data);
  };

  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem('adminSession');
    toast({
      title: "Disconnesso",
      description: "Hai effettuato il logout con successo",
    });
  };

  const handleEditElement = (contentKey: string, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const content = element.textContent || element.innerHTML || "";
    
    setMiniEditor({
      visible: true,
      position: {
        x: Math.min(rect.right + 10, window.innerWidth - 520), // Ensure it fits on screen
        y: rect.top
      },
      content,
      selectedElement: {
        key: contentKey,
        content,
        element,
        rect
      }
    });
  };

  const handleSaveContent = (newContent: string) => {
    if (miniEditor.selectedElement) {
      // Update the element immediately for instant feedback
      miniEditor.selectedElement.element.innerHTML = newContent;
      
      // Save to backend
      updateContentMutation.mutate({
        key: miniEditor.selectedElement.key,
        value: newContent
      });
    }
  };

  const closeMiniEditor = () => {
    setMiniEditor({
      visible: false,
      position: { x: 0, y: 0 },
      content: "",
      selectedElement: null
    });
  };

  // If not logged in, show login form
  if (!session) {
    return (
      <div className="min-h-screen bg-[rgb(28,28,28)] flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-900 border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-[hsl(47,85%,55%)]">
              Pannello Amministratore
            </CardTitle>
            <CardDescription className="text-gray-400">
              Accedi per modificare il contenuto del sito
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="bg-gray-800 border-gray-600 text-white pr-10"
                            placeholder="Inserisci la password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-[hsl(47,85%,55%)] hover:bg-[hsl(47,85%,45%)] text-black font-semibold"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Accesso in corso..." : "Accedi"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin header with logout
  const AdminHeader = () => (
    <div className="fixed top-0 left-0 right-0 z-40 bg-red-600 text-white px-4 py-2 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <span className="font-semibold">MODALITÀ AMMINISTRATORE ATTIVA</span>
        <span className="text-red-200 text-sm">
          Clicca su qualsiasi testo per modificarlo
        </span>
      </div>
      <Button 
        onClick={handleLogout}
        variant="outline"
        size="sm"
        className="border-white text-white hover:bg-white hover:text-red-600"
      >
        <LogOut size={16} className="mr-2" />
        Logout
      </Button>
    </div>
  );

  // Render the exact same website but with editing capabilities
  const renderEditablePage = () => {    
    return (
      <div className="pt-12"> {/* Account for admin header */}
        <Switch>
          <Route path="/admin">
            <div className="bg-[rgb(28,28,28)] min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <div className="container mx-auto px-4 py-20">
                  <Home />
                </div>
              </main>
              <Footer />
            </div>
          </Route>
          <Route path="/admin/servizi">
            <div className="bg-[rgb(28,28,28)] min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Servizi />
              </main>
              <Footer />
            </div>
          </Route>
          <Route path="/admin/contatti">
            <div className="bg-[rgb(28,28,28)] min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Contatti />
              </main>
              <Footer />
            </div>
          </Route>
          <Route path="/admin/diagnosi">
            <div className="bg-[rgb(28,28,28)] min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <DiagnosiChirurgica />
              </main>
              <Footer />
            </div>
          </Route>
          <Route path="/admin/blog">
            <div className="bg-[rgb(28,28,28)] min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <AdminBlog />
              </main>
              <Footer />
            </div>
          </Route>
        </Switch>
      </div>
    );
  };

  return (
    <EditProvider onEdit={handleEditElement} isEditing={true}>
      <AdminHeader />
      {renderEditablePage()}
      <FloatingMiniEditor
        editor={miniEditor}
        onSave={handleSaveContent}
        onClose={closeMiniEditor}
      />
    </EditProvider>
  );
}