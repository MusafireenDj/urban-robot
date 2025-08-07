"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Save, X } from 'lucide-react'

interface InlineEditorProps {
  value: string
  onSave: (value: string) => void
  multiline?: boolean
  placeholder?: string
  className?: string
  isAdmin?: boolean
}

export default function InlineEditor({ 
  value, 
  onSave, 
  multiline = false, 
  placeholder = "", 
  className = "",
  isAdmin = false 
}: InlineEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)

  if (!isAdmin) {
    return <span className={className}>{value}</span>
  }

  const handleSave = () => {
    onSave(editValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={placeholder}
            className="bg-gray-800 border-orange-500 text-white min-h-[100px]"
            autoFocus
          />
        ) : (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={placeholder}
            className="bg-gray-800 border-orange-500 text-white"
            autoFocus
          />
        )}
        <div className="flex gap-2 mt-2">
          <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="h-3 w-3 mr-1" />
            حفظ
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel} className="bg-transparent">
            <X className="h-3 w-3 mr-1" />
            إلغاء
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative group cursor-pointer" onClick={() => setIsEditing(true)}>
      <span className={`${className} hover:bg-orange-500/10 hover:border hover:border-orange-500 rounded px-2 py-1 transition-all`}>
        {value || placeholder}
      </span>
      <Button
        size="sm"
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-orange-500 hover:bg-orange-600 h-6 w-6 p-0"
        onClick={(e) => {
          e.stopPropagation()
          setIsEditing(true)
        }}
      >
        <Edit className="h-3 w-3" />
      </Button>
    </div>
  )
}
