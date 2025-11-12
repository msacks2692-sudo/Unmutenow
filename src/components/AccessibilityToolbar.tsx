import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accessibility, X, Type, Contrast, Minus, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AccessibilitySettings {
  textSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  lineHeight: number;
}

const defaultSettings: AccessibilitySettings = {
  textSize: 100,
  highContrast: false,
  reducedMotion: false,
  lineHeight: 1.5,
};

export const AccessibilityToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem("accessibility-settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSettings(parsed);
      applySettings(parsed);
    }
  }, []);

  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Apply text size
    root.style.fontSize = `${newSettings.textSize}%`;
    
    // Apply high contrast
    if (newSettings.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
    
    // Apply reduced motion
    if (newSettings.reducedMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }
    
    // Apply line height
    root.style.setProperty("--line-height-base", newSettings.lineHeight.toString());
  };

  const updateSettings = (updates: Partial<AccessibilitySettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    applySettings(newSettings);
    localStorage.setItem("accessibility-settings", JSON.stringify(newSettings));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    applySettings(defaultSettings);
    localStorage.setItem("accessibility-settings", JSON.stringify(defaultSettings));
  };

  const adjustTextSize = (delta: number) => {
    const newSize = Math.max(75, Math.min(150, settings.textSize + delta));
    updateSettings({ textSize: newSize });
  };

  const adjustLineHeight = (delta: number) => {
    const newHeight = Math.max(1.2, Math.min(2.5, settings.lineHeight + delta));
    updateSettings({ lineHeight: parseFloat(newHeight.toFixed(1)) });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg underglow"
        size="icon"
        aria-label="Toggle accessibility toolbar"
      >
        <Accessibility className="h-6 w-6" />
      </Button>

      {/* Toolbar Panel */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 z-50 w-80 p-6 shadow-2xl glass-card border-primary/20 animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Accessibility className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Accessibility</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close toolbar"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Text Size Control */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                Text Size
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => adjustTextSize(-10)}
                  disabled={settings.textSize <= 75}
                  aria-label="Decrease text size"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="flex-1 text-center text-sm font-medium">
                  {settings.textSize}%
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => adjustTextSize(10)}
                  disabled={settings.textSize >= 150}
                  aria-label="Increase text size"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Line Height Control */}
            <div className="space-y-2">
              <Label>Line Spacing</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => adjustLineHeight(-0.1)}
                  disabled={settings.lineHeight <= 1.2}
                  aria-label="Decrease line spacing"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="flex-1 text-center text-sm font-medium">
                  {settings.lineHeight.toFixed(1)}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => adjustLineHeight(0.1)}
                  disabled={settings.lineHeight >= 2.5}
                  aria-label="Increase line spacing"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="flex items-center gap-2 cursor-pointer">
                <Contrast className="h-4 w-4" />
                High Contrast
              </Label>
              <Switch
                id="high-contrast"
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSettings({ highContrast: checked })}
              />
            </div>

            {/* Reduced Motion Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="cursor-pointer">
                Reduce Animations
              </Label>
              <Switch
                id="reduced-motion"
                checked={settings.reducedMotion}
                onCheckedChange={(checked) => updateSettings({ reducedMotion: checked })}
              />
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              className="w-full"
              onClick={resetSettings}
            >
              Reset to Defaults
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};
