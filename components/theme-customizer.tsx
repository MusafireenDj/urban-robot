"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Palette, RotateCcw, Save } from 'lucide-react'
import { SiteSettings, applyTheme } from "@/lib/settings"

interface ThemeCustomizerProps {
  settings: SiteSettings
  onSettingsChange: (field: string, value: any) => void
  onSave: () => void
}

export default function ThemeCustomizer({ settings, onSettingsChange, onSave }: ThemeCustomizerProps) {
  const [previewMode, setPreviewMode] = useState(false)

  const handleColorChange = (colorKey: string, value: string) => {
    const newTheme = {
      ...settings.theme,
      [colorKey]: value
    }
    onSettingsChange('theme', newTheme)
    
    if (previewMode) {
      applyTheme(newTheme)
    }
  }

  const resetToDefault = () => {
    const defaultTheme = {
      primaryColor: '#f97316',
      secondaryColor: '#eab308',
      textColor: '#ffffff',
      backgroundColor: '#1f2937',
      borderColor: '#374151'
    }
    onSettingsChange('theme', defaultTheme)
    applyTheme(defaultTheme)
  }

  const togglePreview = () => {
    setPreviewMode(!previewMode)
    if (!previewMode) {
      applyTheme(settings.theme)
    }
  }

  const colorPresets = [
    {
      name: 'البرتقالي الافتراضي',
      colors: {
        primaryColor: '#f97316',
        secondaryColor: '#eab308',
        textColor: '#ffffff',
        backgroundColor: '#1f2937',
        borderColor: '#374151'
      }
    },
    {
      name: 'الأزرق الملكي',
      colors: {
        primaryColor: '#3b82f6',
        secondaryColor: '#06b6d4',
        textColor: '#ffffff',
        backgroundColor: '#1e293b',
        borderColor: '#334155'
      }
    },
    {
      name: 'الأخضر الطبيعي',
      colors: {
        primaryColor: '#10b981',
        secondaryColor: '#84cc16',
        textColor: '#ffffff',
        backgroundColor: '#1f2937',
        borderColor: '#374151'
      }
    },
    {
      name: 'البنفسجي الأنيق',
      colors: {
        primaryColor: '#8b5cf6',
        secondaryColor: '#a855f7',
        textColor: '#ffffff',
        backgroundColor: '#1e1b4b',
        borderColor: '#312e81'
      }
    }
  ]

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Palette className="h-5 w-5 ml-2" />
          تخصيص الألوان والمظهر
        </CardTitle>
        <CardDescription className="text-gray-300">
          قم بتخصيص ألوان الموقع والمظهر العام
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Color Controls */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="primaryColor" className="text-white">اللون الأساسي</Label>
            <div className="flex items-center gap-2">
              <Input
                id="primaryColor"
                type="color"
                value={settings.theme.primaryColor}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                className="w-16 h-10 p-1 bg-gray-700 border-gray-600"
              />
              <Input
                type="text"
                value={settings.theme.primaryColor}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="#f97316"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="secondaryColor" className="text-white">اللون الثانوي</Label>
            <div className="flex items-center gap-2">
              <Input
                id="secondaryColor"
                type="color"
                value={settings.theme.secondaryColor}
                onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                className="w-16 h-10 p-1 bg-gray-700 border-gray-600"
              />
              <Input
                type="text"
                value={settings.theme.secondaryColor}
                onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="#eab308"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="textColor" className="text-white">لون النص</Label>
            <div className="flex items-center gap-2">
              <Input
                id="textColor"
                type="color"
                value={settings.theme.textColor}
                onChange={(e) => handleColorChange('textColor', e.target.value)}
                className="w-16 h-10 p-1 bg-gray-700 border-gray-600"
              />
              <Input
                type="text"
                value={settings.theme.textColor}
                onChange={(e) => handleColorChange('textColor', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="backgroundColor" className="text-white">لون الخلفية</Label>
            <div className="flex items-center gap-2">
              <Input
                id="backgroundColor"
                type="color"
                value={settings.theme.backgroundColor}
                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                className="w-16 h-10 p-1 bg-gray-700 border-gray-600"
              />
              <Input
                type="text"
                value={settings.theme.backgroundColor}
                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="#1f2937"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="borderColor" className="text-white">لون الحدود</Label>
            <div className="flex items-center gap-2">
              <Input
                id="borderColor"
                type="color"
                value={settings.theme.borderColor}
                onChange={(e) => handleColorChange('borderColor', e.target.value)}
                className="w-16 h-10 p-1 bg-gray-700 border-gray-600"
              />
              <Input
                type="text"
                value={settings.theme.borderColor}
                onChange={(e) => handleColorChange('borderColor', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="#374151"
              />
            </div>
          </div>
        </div>

        {/* Color Presets */}
        <div>
          <Label className="text-white mb-3 block">الألوان المحددة مسبقاً</Label>
          <div className="grid md:grid-cols-2 gap-3">
            {colorPresets.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => onSettingsChange('theme', preset.colors)}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 justify-start"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: preset.colors.primaryColor }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: preset.colors.secondaryColor }}
                  />
                  <span>{preset.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Preview and Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-600">
          <Button
            onClick={togglePreview}
            variant={previewMode ? "default" : "outline"}
            className={previewMode ? "bg-green-600 hover:bg-green-700" : "bg-transparent"}
          >
            {previewMode ? 'إيقاف المعاينة' : 'معاينة مباشرة'}
          </Button>
          
          <Button
            onClick={resetToDefault}
            variant="outline"
            className="bg-transparent"
          >
            <RotateCcw className="h-4 w-4 ml-2" />
            إعادة تعيين
          </Button>
          
          <Button
            onClick={onSave}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
          >
            <Save className="h-4 w-4 ml-2" />
            حفظ الألوان
          </Button>
        </div>

        {/* Color Preview */}
        <div className="p-4 rounded-lg border-2 border-dashed border-gray-600">
          <h4 className="text-white mb-3">معاينة الألوان:</h4>
          <div className="space-y-2">
            <div 
              className="p-3 rounded text-center font-semibold"
              style={{ 
                backgroundColor: settings.theme.primaryColor,
                color: settings.theme.textColor 
              }}
            >
              اللون الأساسي
            </div>
            <div 
              className="p-3 rounded text-center font-semibold"
              style={{ 
                backgroundColor: settings.theme.secondaryColor,
                color: settings.theme.textColor 
              }}
            >
              اللون الثانوي
            </div>
            <div 
              className="p-3 rounded border-2"
              style={{ 
                backgroundColor: settings.theme.backgroundColor,
                color: settings.theme.textColor,
                borderColor: settings.theme.borderColor
              }}
            >
              خلفية مع نص وحدود
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
