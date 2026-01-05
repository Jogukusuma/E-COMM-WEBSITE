import { Computer } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/80">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center space-x-2">
            <Computer className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">SriComputers</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SriComputers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
