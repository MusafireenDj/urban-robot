"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UploadCloud, XCircle } from 'lucide-react'

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
  title?: string;
  description?: string;
}

export default function ImageUpload({
  currentImage,
  onImageChange,
  title = "رفع صورة",
  description = "اختر صورة أو أدخل رابط URL",
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(currentImage);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError("حجم الملف كبير جداً (الحد الأقصى 5 ميجابايت).");
        setFile(null);
        return;
      }
      if (!selectedFile.type.startsWith('image/')) {
        setError("الرجاء اختيار ملف صورة صالح.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setFile(null); // Clear file selection if URL is entered
    setError(null);
  };

  const handleUpload = async () => {
    setError(null);
    if (file) {
      // Simulate upload to a server
      console.log("Uploading file:", file.name);
      // In a real application, you would send this file to a backend API
      // and get a public URL back.
      // For now, we'll just use the object URL.
      onImageChange(imageUrl);
      alert("تم رفع الصورة بنجاح (محاكاة)!");
    } else if (imageUrl && imageUrl.startsWith('http')) {
      // If it's a URL, just use it directly
      onImageChange(imageUrl);
      alert("تم تحديث الصورة من الرابط!");
    } else {
      setError("الرجاء اختيار ملف أو إدخال رابط URL صالح.");
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    setFile(null);
    onImageChange("");
    setError(null);
  };

  return (
    <Card className="bg-gray-700 border-gray-600 text-white">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-gray-300">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {imageUrl && (
          <div className="relative w-full h-48 rounded-md overflow-hidden border border-gray-600">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt="Uploaded image preview"
              layout="fill"
              objectFit="cover"
              className="object-center"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 rounded-full"
              onClick={handleRemoveImage}
            >
              <XCircle className="h-4 w-4" />
              <span className="sr-only">إزالة الصورة</span>
            </Button>
          </div>
        )}

        <div className="grid gap-2">
          <Label htmlFor="image-upload" className="text-white">رفع من الجهاز</Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="bg-gray-800 border-gray-600 text-white file:text-white file:bg-gray-600 file:border-0"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="image-url" className="text-white">أو أدخل رابط URL</Label>
          <Input
            id="image-url"
            type="url"
            value={imageUrl.startsWith('blob:') ? '' : imageUrl} // Don't show blob URLs in input
            onChange={handleUrlChange}
            placeholder="https://example.com/your-image.jpg"
            className="bg-gray-800 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          onClick={handleUpload}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
          disabled={!file && (!imageUrl || !imageUrl.startsWith('http'))}
        >
          <UploadCloud className="h-4 w-4 ml-2" />
          تأكيد الصورة
        </Button>
      </CardContent>
    </Card>
  );
}
