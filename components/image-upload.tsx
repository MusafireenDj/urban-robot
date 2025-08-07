"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, Eye, Download } from 'lucide-react'
import Image from "next/image"

interface ImageUploadProps {
  currentImage?: string
  onImageChange: (imageUrl: string) => void
  title: string
  description?: string
}

export default function ImageUpload({ currentImage, onImageChange, title, description }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(currentImage || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // التحقق من نوع الملف
    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح')
      return
    }

    // التحقق من حجم الملف (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('حجم الملف كبير جداً. يرجى اختيار صورة أصغر من 5MB')
      return
    }

    setIsUploading(true)

    try {
      // تحويل الصورة إلى base64 للمعاينة
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreviewUrl(result)
        onImageChange(result)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('خطأ في رفع الصورة:', error)
      alert('حدث خطأ في رفع الصورة')
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = () => {
    setPreviewUrl('')
    onImageChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        {description && <p className="text-gray-300 text-sm">{description}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {previewUrl ? (
            <div className="relative">
              <Image
                src={previewUrl || "/placeholder.svg"}
                alt="معاينة الصورة"
                width={400}
                height={300}
                className="max-w-full max-h-64 object-contain mx-auto rounded-lg"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(previewUrl, '_blank')
                  }}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage()
                  }}
                  className="bg-red-500 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-gray-400">
              <Upload className="mx-auto h-12 w-12 mb-4" />
              <p className="text-lg">اضغط لاختيار صورة أو اسحبها هنا</p>
              <p className="text-sm">PNG, JPG, GIF حتى 5MB</p>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Upload Button */}
        <div className="flex gap-2">
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
          >
            <Upload className="h-4 w-4 ml-2" />
            {isUploading ? 'جاري الرفع...' : 'اختيار صورة'}
          </Button>
          
          {previewUrl && (
            <Button
              onClick={removeImage}
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
            >
              <X className="h-4 w-4 ml-2" />
              إزالة
            </Button>
          )}
        </div>

        {/* Tips */}
        <div className="text-xs text-gray-400 space-y-1">
          <p>• استخدم صور عالية الجودة (1920x1080 أو أعلى)</p>
          <p>• تأكد من وضوح الصورة وجودة الإضاءة</p>
          <p>• الصيغ المدعومة: JPG, PNG, GIF</p>
        </div>
      </CardContent>
    </Card>
  )
}
