'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, XCircle, Loader2, ImageIcon, FileText, Video, Music } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string; // e.g., 'image', 'video', 'audio', 'document'
  size: number; // in bytes
  uploadedAt: string;
}

// Mock storage for demonstration purposes
const mockMediaStorage: MediaFile[] = [];

interface MediaUploadProps {
  onMediaSelect?: (url: string) => void;
  allowMultiple?: boolean;
  acceptedFileTypes?: string[]; // e.g., ['image/*', 'video/mp4', 'application/pdf']
  maxFileSizeMB?: number;
}

export default function MediaUpload({
  onMediaSelect,
  allowMultiple = false,
  acceptedFileTypes = ['image/*', 'video/*', 'audio/*', 'application/pdf'],
  maxFileSizeMB = 10,
}: MediaUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaLibrary, setMediaLibrary] = useState<MediaFile[]>([]);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load mock media from localStorage on component mount
    if (typeof window !== 'undefined') {
      const savedMedia = localStorage.getItem('mockMediaLibrary');
      if (savedMedia) {
        setMediaLibrary(JSON.parse(savedMedia));
      }
    }
  }, []);

  const saveMediaLibrary = useCallback((media: MediaFile[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mockMediaLibrary', JSON.stringify(media));
    }
    setMediaLibrary(media);
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles: File[] = [];
    const maxSizeBytes = maxFileSizeMB * 1024 * 1024;

    files.forEach(file => {
      if (file.size > maxSizeBytes) {
        toast({
          title: 'File too large',
          description: `${file.name} exceeds the ${maxFileSizeMB}MB limit.`,
          variant: 'destructive',
        });
        return;
      }

      const fileTypeMatches = acceptedFileTypes.some(type => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.slice(0, -1));
        }
        return file.type === type;
      });

      if (!fileTypeMatches) {
        toast({
          title: 'Invalid file type',
          description: `${file.name} is not an accepted file type.`,
          variant: 'destructive',
        });
        return;
      }
      validFiles.push(file);
    });

    setSelectedFiles(validFiles);
  }, [acceptedFileTypes, maxFileSizeMB, toast]);

  const handleUpload = useCallback(async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: 'No files selected',
        description: 'Please select files to upload.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of selectedFiles) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

        const mockUrl = URL.createObjectURL(file); // Use blob URL for immediate preview
        const newMedia: MediaFile = {
          id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          name: file.name,
          url: mockUrl,
          type: file.type.split('/')[0], // 'image', 'video', 'audio', 'application'
          size: file.size,
          uploadedAt: new Date().toISOString(),
        };
        mockMediaStorage.push(newMedia); // Add to mock storage
        saveMediaLibrary([...mediaLibrary, newMedia]); // Update state and localStorage
        uploadedUrls.push(mockUrl);
      }

      toast({
        title: 'Upload Successful',
        description: `${selectedFiles.length} file(s) uploaded.`,
      });

      if (onMediaSelect && uploadedUrls.length > 0) {
        onMediaSelect(uploadedUrls[0]); // For single select, pass the first URL
      }
      setSelectedFiles([]); // Clear selected files after upload
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: 'There was an error uploading your files.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedFiles, onMediaSelect, toast, mediaLibrary, saveMediaLibrary]);

  const handleSelectMedia = useCallback((media: MediaFile) => {
    if (onMediaSelect) {
      onMediaSelect(media.url);
      setIsLibraryOpen(false);
      toast({
        title: 'Media Selected',
        description: `${media.name} has been selected.`,
      });
    }
  }, [onMediaSelect, toast]);

  const handleDeleteMedia = useCallback((id: string) => {
    if (confirm('Are you sure you want to delete this media item?')) {
      const updatedLibrary = mediaLibrary.filter(item => item.id !== id);
      saveMediaLibrary(updatedLibrary);
      toast({
        title: 'Media Deleted',
        description: 'The media item has been permanently removed.',
      });
    }
  }, [mediaLibrary, saveMediaLibrary, toast]);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image')) return <ImageIcon className="h-6 w-6 text-primary" />;
    if (type.startsWith('video')) return <Video className="h-6 w-6 text-primary" />;
    if (type.startsWith('audio')) return <Music className="h-6 w-6 text-primary" />;
    return <FileText className="h-6 w-6 text-primary" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Media Management</CardTitle>
        <p className="text-sm text-muted-foreground">Upload, manage, and select media files.</p>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="media-upload">Choose File(s)</Label>
          <Input
            id="media-upload"
            type="file"
            accept={acceptedFileTypes.join(',')}
            multiple={allowMultiple}
            onChange={handleFileChange}
            disabled={isLoading}
          />
          {selectedFiles.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              Selected: {selectedFiles.map(f => f.name).join(', ')}
            </p>
          )}
        </div>
        <Button onClick={handleUpload} disabled={isLoading || selectedFiles.length === 0}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
            </>
          ) : (
            <>
              <UploadCloud className="mr-2 h-4 w-4" /> Upload
            </>
          )}
        </Button>

        <Dialog open={isLibraryOpen} onOpenChange={setIsLibraryOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Browse Media Library ({mediaLibrary.length})
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] h-[70vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Media Library</DialogTitle>
              <DialogDescription>Select an existing media file or manage uploads.</DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-grow pr-4 -mr-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {mediaLibrary.length === 0 ? (
                  <p className="col-span-full text-center text-muted-foreground">No media files uploaded yet.</p>
                ) : (
                  mediaLibrary.map((media) => (
                    <Card key={media.id} className="relative group overflow-hidden">
                      <CardContent className="p-2 flex flex-col items-center justify-center h-40">
                        {media.type === 'image' ? (
                          <img src={media.url || "/placeholder.svg"} alt={media.name} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full w-full">
                            {getFileIcon(media.type)}
                            <p className="text-xs text-center mt-2 truncate w-full px-1">{media.name}</p>
                          </div>
                        )}
                      </CardContent>
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onMediaSelect && (
                          <Button onClick={() => handleSelectMedia(media)} size="sm">
                            Select
                          </Button>
                        )}
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteMedia(media.id)}>
                          Delete
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsLibraryOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
