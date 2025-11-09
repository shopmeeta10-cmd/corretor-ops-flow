import { HelpCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const HelpButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="default"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <HelpCircle className="h-6 w-6" />
        )}
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-lg border border-border bg-card p-6 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Chat de Ajuda
              </h3>
              <div className="inline-block px-4 py-2 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground font-medium">
                  Em desenvolvimento
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
