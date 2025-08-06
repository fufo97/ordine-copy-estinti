import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { EditProvider } from "./EditableWrapper";
import { useToast } from "@/hooks/use-toast";

interface MiniEditor {
  visible: boolean;
  position: { x: number; y: number };
  content: string;
  selectedElement: HTMLElement | null;
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
    const content = element.textContent || "";
    
    setMiniEditor({
      visible: true,
      position: {
        x: Math.min(rect.left, window.innerWidth - 400),
        y: Math.min(rect.bottom + 10, window.innerHeight - 200)
      },
      content,
      selectedElement: element
    });
  };

  const closeMiniEditor = () => {
    setMiniEditor(prev => ({ ...prev, visible: false }));
  };

  const handleSaveContent = async (newContent: string, contentKey: string) => {
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
      
      const response = await fetch(`/api/content/${contentKey}`, {
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

  // FloatingMiniEditor component (simplified version)
  const FloatingMiniEditor = () => {
    if (!miniEditor.visible || !miniEditor.selectedElement) return null;

    return (
      <div
        className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 min-w-[300px]"
        style={{
          left: miniEditor.position.x,
          top: miniEditor.position.y
        }}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Modifica Contenuto
          </h3>
          <button
            onClick={closeMiniEditor}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        
        <textarea
          className="w-full h-24 p-2 border border-gray-300 dark:border-gray-600 rounded text-sm resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={miniEditor.content}
          onChange={(e) => setMiniEditor(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Inserisci il nuovo contenuto..."
        />
        
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => {
              const contentKey = miniEditor.selectedElement?.getAttribute('data-content-key');
              if (contentKey) {
                handleSaveContent(miniEditor.content, contentKey);
              }
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Salva
          </button>
          <button
            onClick={closeMiniEditor}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
          >
            Annulla
          </button>
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