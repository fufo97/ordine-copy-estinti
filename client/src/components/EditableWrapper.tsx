import { useRef, createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface EditContext {
  onEdit: (key: string, element: HTMLElement) => void;
  isEditing: boolean;
}

const EditContext = createContext<EditContext | null>(null);

export function EditProvider({ 
  children, 
  onEdit, 
  isEditing = false 
}: { 
  children: React.ReactNode; 
  onEdit: (key: string, element: HTMLElement) => void; 
  isEditing?: boolean; 
}) {
  return (
    <EditContext.Provider value={{ onEdit, isEditing }}>
      {children}
    </EditContext.Provider>
  );
}

export function EditableText({ 
  children, 
  contentKey, 
  className = "",
  style = {}
}: { 
  children: React.ReactNode; 
  contentKey: string; 
  className?: string;
  style?: React.CSSProperties;
}) {
  const context = useContext(EditContext);
  const elementRef = useRef<HTMLDivElement>(null);
  const [displayContent, setDisplayContent] = useState<React.ReactNode>(children);

  // Fetch content from database
  const { data: contentData } = useQuery({
    queryKey: ['/api/content', contentKey],
    queryFn: async () => {
      const response = await fetch(`/api/content/${contentKey}`);
      if (!response.ok) {
        return null; // Fallback to default content
      }
      return response.json();
    },
    staleTime: 30000, // Cache for 30 seconds
  });

  // Update display content when data changes
  useEffect(() => {
    if (contentData?.success && contentData?.data?.value) {
      // Parse HTML content safely
      setDisplayContent(<span dangerouslySetInnerHTML={{ __html: contentData.data.value }} />);
    } else {
      // Fallback to default children
      setDisplayContent(children);
    }
  }, [contentData, children]);

  if (!context || !context.isEditing) {
    return <div className={className} style={style}>{displayContent}</div>;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (elementRef.current) {
      context.onEdit(contentKey, elementRef.current);
    }
  };

  return (
    <div 
      ref={elementRef}
      onClick={handleClick}
      className={`${className} editable-section hover:outline hover:outline-2 hover:outline-blue-400 hover:bg-blue-50/10 cursor-pointer transition-all duration-200 relative group`}
      style={style}
      data-content-key={contentKey}
    >
      {children}
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-md whitespace-nowrap">
          Clicca per modificare
        </div>
      </div>
    </div>
  );
}