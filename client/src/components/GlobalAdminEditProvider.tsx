import { useState, useRef } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { EditProvider } from "@/components/EditableWrapper";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

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

export function GlobalAdminEditProvider({ children }: { children: React.ReactNode }) {
  const { isAdmin, session } = useAdmin();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [miniEditor, setMiniEditor] = useState<MiniEditor>({
    visible: false,
    position: { x: 0, y: 0 },
    content: '',
    selectedElement: null
  });

  // Update content mutation
  const updateContentMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      if (!session?.token) {
        throw new Error("No admin session");
      }
      
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.token}`
        },
        body: JSON.stringify({ key, value })
      });
      
      if (!response.ok) {
        const error: any = new Error('Failed to update content');
        error.status = response.status;
        throw error;
      }
      
      return response.json();
    },
    onSuccess: (data, variables) => {
      // Update the cache immediately
      queryClient.setQueryData(['/api/content', variables.key], {
        success: true,
        data: { key: variables.key, value: variables.value }
      });
      
      toast({
        title: "Contenuto aggiornato",
        description: "Le modifiche sono state salvate con successo.",
      });
    },
    onError: (error: any) => {
      if (error?.status === 401) {
        toast({
          title: "Sessione scaduta",
          description: "Effettua nuovamente il login",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Errore di salvataggio",
        description: "Non è stato possibile salvare le modifiche. Riprova.",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (key: string, element: HTMLElement) => {
    if (!isAdmin) return;
    
    const rect = element.getBoundingClientRect();
    const currentContent = element.textContent || '';
    
    const editableElement: EditableElement = {
      key,
      content: currentContent,
      element,
      rect
    };

    setMiniEditor({
      visible: true,
      position: {
        x: Math.min(rect.left, window.innerWidth - 320),
        y: rect.bottom + window.scrollY + 10
      },
      content: currentContent,
      selectedElement: editableElement
    });
  };

  const handleSave = () => {
    if (!miniEditor.selectedElement) return;
    
    const trimmedContent = miniEditor.content.trim();
    if (trimmedContent === miniEditor.selectedElement.content.trim()) {
      setMiniEditor(prev => ({ ...prev, visible: false }));
      return;
    }

    updateContentMutation.mutate({
      key: miniEditor.selectedElement.key,
      value: trimmedContent
    });

    setMiniEditor(prev => ({ ...prev, visible: false }));
  };

  const handleClose = () => {
    setMiniEditor(prev => ({ ...prev, visible: false }));
  };

  return (
    <EditProvider onEdit={handleEdit} isEditing={isAdmin}>
      {children}
      
      {/* Mini Editor - only show if admin and editor is visible */}
      {isAdmin && miniEditor.visible && miniEditor.selectedElement && (
        <div 
          className="fixed z-[9999] bg-white border border-gray-300 rounded-lg shadow-2xl p-4 min-w-[300px] max-w-[400px]"
          style={{
            top: miniEditor.position.y,
            left: miniEditor.position.x,
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800 text-sm">
              Modifica Contenuto
            </h4>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-xl leading-none"
            >
              ×
            </button>
          </div>
          
          <div className="mb-3">
            <label className="block text-xs text-gray-600 mb-2">
              Chiave: {miniEditor.selectedElement.key}
            </label>
            <textarea
              value={miniEditor.content}
              onChange={(e) => setMiniEditor(prev => ({ ...prev, content: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Inserisci il nuovo contenuto..."
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={updateContentMutation.isPending}
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {updateContentMutation.isPending ? 'Salvando...' : 'Salva'}
            </button>
            <button
              onClick={handleClose}
              className="px-3 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annulla
            </button>
          </div>
        </div>
      )}
    </EditProvider>
  );
}