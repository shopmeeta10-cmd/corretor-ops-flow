import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  isLastStep: boolean;
  canGoNext: boolean;
}

export const WizardNavigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isLastStep,
  canGoNext
}: WizardNavigationProps) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t border-border">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>
      
      <Button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        className="gap-2"
      >
        {isLastStep ? (
          <>
            Enviar
            <Send className="h-4 w-4" />
          </>
        ) : (
          <>
            Próximo
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};
