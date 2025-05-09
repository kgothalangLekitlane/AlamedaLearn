import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // Percentage 0-100
  className?: string;
  barClassName?: string;
}

export default function ProgressBar({ value, className, barClassName }: ProgressBarProps) {
  const normalizedValue = Math.max(0, Math.min(100, value));
  return (
    <Progress 
      value={normalizedValue} 
      className={cn("h-2 bg-muted", className)} 
      indicatorClassName={cn("bg-success", barClassName)} // Use success color for progress
    />
  );
}
