import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Trash2, Play, AlertTriangle, CheckCircle, Clock, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { SiteUpdate } from "@shared/schema";

export default function SiteUpdates() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [version, setVersion] = useState("");
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(false);

  // Fetch site updates
  const { data: siteUpdatesResponse, isLoading } = useQuery({
    queryKey: ["/api/admin/site-updates"],
  });

  const siteUpdates = (siteUpdatesResponse?.data || []) as SiteUpdate[];

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      setUploadProgress(true);
      try {
        const response = await fetch("/api/admin/site-updates/upload", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Errore durante il caricamento");
        }

        return await response.json();
      } finally {
        setUploadProgress(false);
      }
    },
    onSuccess: (data) => {
      toast({
        title: "Successo",
        description: data.message,
      });
      setSelectedFile(null);
      setVersion("");
      setDescription("");
      queryClient.invalidateQueries({ queryKey: ["/api/admin/site-updates"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Apply update mutation
  const applyMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/site-updates/${id}/apply`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Errore durante l'applicazione");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Successo",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/site-updates"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/site-updates/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Errore durante l'eliminazione");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Successo",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/site-updates"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.zip')) {
        toast({
          title: "Errore",
          description: "Solo file ZIP sono consentiti",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "Errore",
        description: "Seleziona un file ZIP prima di procedere",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("zipFile", selectedFile);
    formData.append("version", version || `v${Date.now()}`);
    formData.append("description", description);

    uploadMutation.mutate(formData);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />In Attesa</Badge>;
      case "processing":
        return <Badge variant="default"><Clock className="w-3 h-3 mr-1" />In Elaborazione</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Completato</Badge>;
      case "failed":
        return <Badge variant="destructive"><X className="w-3 h-3 mr-1" />Fallito</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString('it-IT');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ab8e6] mx-auto mb-4"></div>
            <p>Caricamento aggiornamenti...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1ab8e6] mb-4">
            Sistema di Aggiornamento Sito
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Carica file ZIP per aggiornare il sito mantenendo intatti i contenuti del blog. 
            Il sistema crea automaticamente backup e preserva tutti gli articoli pubblicati.
          </p>
        </div>

        {/* Upload Section */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Carica Nuovo Aggiornamento
            </CardTitle>
            <CardDescription className="text-gray-400">
              Seleziona un file ZIP contenente i file aggiornati del sito
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="version" className="text-white">Versione (opzionale)</Label>
                  <Input
                    id="version"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="es. v1.2.3"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-white">Descrizione (opzionale)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrivi le modifiche incluse in questo aggiornamento..."
                    className="bg-gray-800 border-gray-600 text-white"
                    rows={3}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="zipFile" className="text-white">File ZIP</Label>
                  <Input
                    id="zipFile"
                    type="file"
                    accept=".zip"
                    onChange={handleFileSelect}
                    className="bg-gray-800 border-gray-600 text-white file:bg-[#1ab8e6] file:text-white"
                  />
                  {selectedFile && (
                    <p className="text-sm text-green-400 mt-2">
                      File selezionato: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || uploadProgress || uploadMutation.isPending}
                  className="w-full bg-[#1ab8e6] hover:bg-[#1496c4] text-white"
                >
                  {uploadProgress || uploadMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Caricamento...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Carica Aggiornamento
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Download Section */}
        <Card className="bg-blue-900/20 border-blue-600">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Download className="w-6 h-6 text-blue-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-blue-400 font-semibold mb-2">Esempio di Aggiornamento</h3>
                <p className="text-blue-200 mb-4 text-sm">
                  Scarica un file ZIP di esempio per testare il sistema. Questo aggiornamento cambia 
                  il nome del sito da "Ordine dei Copywriter Estinti" a "Ordine dei Copywriters".
                </p>
                <a 
                  href="/download/sample-update"
                  download="ordine_copywriters_v2.0.0.zip"
                  className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Scarica ZIP di Esempio
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warning */}
        <Card className="bg-amber-900/20 border-amber-600">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-500 mt-0.5" />
              <div>
                <h3 className="text-amber-500 font-semibold mb-2">Importante</h3>
                <ul className="text-amber-200 space-y-1 text-sm">
                  <li>• Gli aggiornamenti preservano automaticamente il blog e i suoi contenuti</li>
                  <li>• Viene creato un backup automatico prima di ogni aggiornamento</li>
                  <li>• I file caricati (immagini, documenti) vengono mantenuti</li>
                  <li>• Solo i file di codice e le configurazioni vengono aggiornati</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Site Updates List */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Cronologia Aggiornamenti</CardTitle>
            <CardDescription className="text-gray-400">
              Lista di tutti gli aggiornamenti caricati e il loro stato
            </CardDescription>
          </CardHeader>
          <CardContent>
            {siteUpdates.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <Download className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nessun aggiornamento caricato ancora</p>
              </div>
            ) : (
              <div className="space-y-4">
                {siteUpdates.map((update: SiteUpdate) => (
                  <div
                    key={update.id}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">
                          {update.version}
                        </h3>
                        {getStatusBadge(update.status)}
                      </div>
                      <div className="flex items-center gap-2">
                        {update.status === 'pending' && (
                          <Button
                            onClick={() => applyMutation.mutate(update.id)}
                            disabled={applyMutation.isPending}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Applica
                          </Button>
                        )}
                        <Button
                          onClick={() => deleteMutation.mutate(update.id)}
                          disabled={deleteMutation.isPending}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Elimina
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400 mb-2">Dettagli File:</p>
                        <ul className="text-gray-300 space-y-1">
                          <li>Nome: {update.fileName}</li>
                          <li>Dimensione: {formatFileSize(parseInt(update.fileSize))}</li>
                          <li>Caricato: {formatDate(update.createdAt)}</li>
                          {update.completedAt && (
                            <li>Completato: {formatDate(update.completedAt)}</li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        {update.description && (
                          <>
                            <p className="text-gray-400 mb-2">Descrizione:</p>
                            <p className="text-gray-300">{update.description}</p>
                          </>
                        )}
                        {update.errorMessage && (
                          <>
                            <p className="text-red-400 mb-2">Errore:</p>
                            <p className="text-red-300 bg-red-900/30 p-2 rounded text-xs">
                              {update.errorMessage}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}