'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Paintbrush, Check, X } from 'lucide-react';

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

const defaultTheme: ThemeSettings = {
  primaryColor: '#f97316', // orange-500
  secondaryColor: '#facc15', // yellow-500
  accentColor: '#60a5fa', // blue-400
  backgroundColor: '#0a0a0a', // neutral-950
  textColor: '#fafafa', // neutral-50
};

export default function ThemeCustomizer() {
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme);
  const [isDirty, setIsDirty] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load theme from local storage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('customTheme');
      if (savedTheme) {
        setTheme(JSON.parse(savedTheme));
      }
    }
  }, []);

  useEffect(() => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-secondary', theme.secondaryColor);
    root.style.setProperty('--color-accent', theme.accentColor);
    root.style.setProperty('--color-background', theme.backgroundColor);
    root.style.setProperty('--color-text', theme.textColor);
  }, [theme]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setIsDirty(true);
  }, []);

  const handleSave = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('customTheme', JSON.stringify(theme));
      toast({ title: 'Theme saved successfully!' });
      setIsDirty(false);
    }
  }, [theme, toast]);

  const handleReset = useCallback(() => {
    setTheme(defaultTheme);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('customTheme');
      toast({ title: 'Theme reset to default.' });
      setIsDirty(false);
    }
  }, [toast]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Theme Customizer</CardTitle>
        <Paintbrush className="h-6 w-6 text-primary" />
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="primaryColor">Primary Color</Label>
            <Input
              id="primaryColor"
              name="primaryColor"
              type="color"
              value={theme.primaryColor}
              onChange={handleChange}
              className="h-10 w-full"
            />
          </div>
          <div>
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <Input
              id="secondaryColor"
              name="secondaryColor"
              type="color"
              value={theme.secondaryColor}
              onChange={handleChange}
              className="h-10 w-full"
            />
          </div>
          <div>
            <Label htmlFor="accentColor">Accent Color</Label>
            <Input
              id="accentColor"
              name="accentColor"
              type="color"
              value={theme.accentColor}
              onChange={handleChange}
              className="h-10 w-full"
            />
          </div>
          <div>
            <Label htmlFor="backgroundColor">Background Color</Label>
            <Input
              id="backgroundColor"
              name="backgroundColor"
              type="color"
              value={theme.backgroundColor}
              onChange={handleChange}
              className="h-10 w-full"
            />
          </div>
          <div>
            <Label htmlFor="textColor">Text Color</Label>
            <Input
              id="textColor"
              name="textColor"
              type="color"
              value={theme.textColor}
              onChange={handleChange}
              className="h-10 w-full"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={!isDirty}>
            <Check className="mr-2 h-4 w-4" /> Save Theme
          </Button>
          <Button variant="outline" onClick={handleReset} disabled={!isDirty}>
            <X className="mr-2 h-4 w-4" /> Reset to Default
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
