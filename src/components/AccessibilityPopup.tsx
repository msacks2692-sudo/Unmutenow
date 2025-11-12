import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Accessibility } from "lucide-react";

export const AccessibilityPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("accessibility-popup-seen");
    if (!hasSeenPopup) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("accessibility-popup-seen", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Accessibility className="h-6 w-6 text-primary" />
            <DialogTitle>Accessibility Features</DialogTitle>
          </div>
          <DialogDescription className="text-left space-y-3 pt-2">
            <p>
              Welcome! Our website is designed with accessibility in mind to ensure everyone can use it effectively.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Screen reader compatible navigation and content</li>
              <li>Keyboard navigation support throughout the site</li>
              <li>High contrast text for better readability</li>
              <li>ASL translation tool available</li>
              <li>Responsive design for all devices</li>
            </ul>
            <p className="text-sm">
              If you need assistance or have accessibility concerns, please contact us through our contact form.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={handleClose}>
            Got it, thanks!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
