import { useState, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { EditProvider } from "./EditableWrapper";
import { useToast } from "@/hooks/use-toast";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered } from "lucide-react";

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

interface GlobalAdminEditProviderProps {
  children: React.ReactNode;
}

export default function GlobalAdminEditProvider({ children }: GlobalAdminEditProviderProps) {
  const [miniEditor, setMiniEditor] = useState<MiniEditor>({
    visible: false,
    position: { x: 0, y: 0 },
    content: "",
    selectedElement: null
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if user has admin session
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
  const isAdminMode = !!adminSession;

  const handleEditElement = (contentKey: string, element: HTMLElement) => {
    if (!isAdminMode) return;

    const rect = element.getBoundingClientRect();
    const content = element.textContent || element.innerHTML || "";
    
    setMiniEditor({
      visible: true,
      position: {
        x: Math.min(rect.right + 10, window.innerWidth - 520),
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

  const closeMiniEditor = () => {
    setMiniEditor({
      visible: false,
      position: { x: 0, y: 0 },
      content: "",
      selectedElement: null
    });
  };

  const handleSaveContent = async (newContent: string) => {
    if (!miniEditor.selectedElement) return;
    
    const contentKey = miniEditor.selectedElement.key;
    
    // Update the element immediately for instant feedback
    miniEditor.selectedElement.element.innerHTML = newContent;
    if (!adminSession) {
      toast({
        title: "Errore",
        description: "Sessione admin non valida",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Updating content:", contentKey, "with token:", adminSession.token.substring(0, 10) + "...");
      
      const response = await fetch(`/api/admin/content/${contentKey}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminSession.token}`
        },
        body: JSON.stringify({ value: newContent })
      });

      console.log("Update response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Update error:", JSON.stringify(errorData));
        throw new Error(errorData.message || 'Errore durante il salvataggio');
      }

      // Invalidate cache for this content
      queryClient.invalidateQueries({ queryKey: ['/api/content', contentKey] });
      
      toast({
        title: "Contenuto aggiornato",
        description: `Il contenuto "${contentKey}" è stato salvato con successo.`,
      });

      closeMiniEditor();
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Errore di salvataggio",
        description: error instanceof Error ? error.message : "Errore sconosciuto durante il salvataggio",
        variant: "destructive",
      });
    }
  };

  // Enhanced Floating Mini Editor Component
  const FloatingMiniEditor = () => {
    const [content, setContent] = useState(miniEditor.content);
    const [fontSize, setFontSize] = useState("16");
    const [fontFamily, setFontFamily] = useState("Arial");
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setContent(miniEditor.content);
      if (editorRef.current && miniEditor.content) {
        editorRef.current.innerHTML = miniEditor.content;
      }
    }, [miniEditor.content]);

    const saveSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0 && editorRef.current?.contains(selection.anchorNode)) {
        return selection.getRangeAt(0).cloneRange();
      }
      return null;
    };

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
        const range = saveSelection();
        editorRef.current.focus();
        if (range) {
          restoreSelection(range);
        }
        document.execCommand(command, false, value);
        const newContent = editorRef.current.innerHTML;
        setContent(newContent);
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
      handleSaveContent(content);
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

    if (!miniEditor.visible) return null;

    return (
      <div 
        className="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-2xl"
        style={{ 
          left: Math.min(miniEditor.position.x, window.innerWidth - 600), 
          top: Math.min(miniEditor.position.y, window.innerHeight - 400),
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
              onClick={closeMiniEditor}
              className="px-4 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 transition-colors"
            >
              ❌ Annulla
            </button>
          </div>
        </div>

        {/* Enhanced Content editor */}
        <div className="p-4">
          <div className="text-sm text-gray-600 mb-2">
            Elemento: <strong>{miniEditor.selectedElement?.key}</strong>
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
              const newContent = e.currentTarget.innerHTML;
              setContent(newContent);
            }}
            onKeyDown={(e) => {
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
  };

  if (!isAdminMode) {
    return <>{children}</>;
  }

  return (
    <EditProvider onEdit={handleEditElement} isEditing={true}>
      {children}
      <FloatingMiniEditor />
    </EditProvider>
  );
}