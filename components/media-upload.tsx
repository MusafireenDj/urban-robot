"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, X, Play, ImageIcon, Video, Download, Eye } from "lucide-react"

interface MediaFile {
  id: string
  name: string
  type: "image" | "video"
  url: string
  size: string
  uploadProgress?: number
}

export default function MediaUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<MediaFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (files: FileList | null, type: "image" | "video") => {
    if (!files) return

    setIsUploading(true)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const newFile: MediaFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type,
        url: URL.createObjectURL(file),
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        uploadProgress: 0,
      }

      setUploadedFiles((prev) => [...prev, newFile])

      // محاكاة رفع الملف مع شريط التقدم
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        setUploadedFiles((prev) => prev.map((f) => (f.id === newFile.id ? { ...f, uploadProgress: progress } : f)))
      }

      // إزالة شريط التقدم بعد اكتمال الرفع
      setUploadedFiles((prev) => prev.map((f) => (f.id === newFile.id ? { ...f, uploadProgress: undefined } : f)))
    }

    setIsUploading(false)
  }

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const downloadFile = (file: MediaFile) => {
    const link = document.createElement("a")
    link.href = file.url
    link.download = file.name
    link.click()
  }

  const previewFile = (file: MediaFile) => {
    window.open(file.url, "_blank")
  }

  return (
    <div className="space-y-6">
      {/* Upload Buttons */}
      <div className="grid md:grid-cols-2 gap-4">
        <Button
          onClick={() => imageInputRef.current?.click()}
          disabled={isUploading}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white h-12"
        >
          <ImageIcon className="h-5 w-5 ml-2" />
          اختيار صور
        </Button>

        <Button
          onClick={() => videoInputRef.current?.click()}
          disabled={isUploading}
          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white h-12"
        >
          <Video className="h-5 w-5 ml-2" />
          اختيار فيديوهات
        </Button>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={imageInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFileUpload(e.target.files, "image")}
        className="hidden"
      />
      <input
        ref={videoInputRef}
        type="file"
        multiple
        accept="video/*"
        onChange={(e) => handleFileUpload(e.target.files, "video")}
        className="hidden"
      />

      {/* Drag and Drop Areas */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Image Upload Area */}
        <div
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer"
          onClick={() => imageInputRef.current?.click()}
        >
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg text-gray-300">اسحب الصور هنا أو انقر للاختيار</p>
          <p className="text-sm text-gray-500">PNG, JPG, GIF حتى 10MB</p>
        </div>

        {/* Video Upload Area */}
        <div
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer"
          onClick={() => videoInputRef.current?.click()}
        >
          <Play className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg text-gray-300">اسحب الفيديوهات هنا أو انقر للاختيار</p>
          <p className="text-sm text-gray-500">MP4, MOV, AVI حتى 100MB</p>
        </div>
      </div>

      {/* Upload Status */}
      {isUploading && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="text-center text-white">
              <Upload className="h-8 w-8 mx-auto mb-2 animate-bounce" />
              <p>جاري رفع الملفات...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>الملفات المرفوعة ({uploadedFiles.length})</span>
              <span className="text-sm text-gray-400">
                {uploadedFiles.filter((f) => f.type === "image").length} صور،{" "}
                {uploadedFiles.filter((f) => f.type === "video").length} فيديو
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="relative bg-gray-700 rounded-lg overflow-hidden group">
                  {/* File Preview */}
                  <div className="relative">
                    {file.type === "image" ? (
                      <img src={file.url || "/placeholder.svg"} alt={file.name} className="w-full h-32 object-cover" />
                    ) : (
                      <div className="w-full h-32 bg-gray-600 flex items-center justify-center">
                        <Play className="h-8 w-8 text-gray-400" />
                      </div>
                    )}

                    {/* Upload Progress */}
                    {file.uploadProgress !== undefined && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-3/4">
                          <Progress value={file.uploadProgress} className="mb-2" />
                          <p className="text-white text-sm text-center">{file.uploadProgress}%</p>
                        </div>
                      </div>
                    )}

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 rtl:space-x-reverse">
                      <Button size="sm" onClick={() => previewFile(file)} className="bg-blue-500 hover:bg-blue-600">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => downloadFile(file)} className="bg-green-500 hover:bg-green-600">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => removeFile(file.id)} className="bg-red-500 hover:bg-red-600">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* File Info */}
                  <div className="p-3">
                    <p className="text-white text-sm font-medium truncate" title={file.name}>
                      {file.name}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-gray-400 text-xs">{file.size}</p>
                      <div
                        className={`px-2 py-1 rounded text-xs ${
                          file.type === "image" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {file.type === "image" ? "صورة" : "فيديو"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bulk Actions */}
            {uploadedFiles.length > 1 && (
              <div className="mt-6 pt-4 border-t border-gray-600">
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-sm">
                    إجمالي الحجم:{" "}
                    {uploadedFiles
                      .reduce((total, file) => total + Number.parseFloat(file.size.replace(" MB", "")), 0)
                      .toFixed(2)}{" "}
                    MB
                  </p>
                  <Button
                    onClick={() => setUploadedFiles([])}
                    variant="outline"
                    className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    <X className="h-4 w-4 ml-2" />
                    حذف الكل
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Upload Tips */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="pt-4">
          <h4 className="text-white font-semibold mb-2">نصائح للرفع:</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• استخدم صور عالية الجودة (1920x1080 أو أعلى)</li>
            <li>• تأكد من وضوح الصور وجودة الإضاءة</li>
            <li>• الفيديوهات يجب أن تكون بصيغة MP4 للحصول على أفضل توافق</li>
            <li>• يمكنك رفع عدة ملفات في نفس الوقت</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
