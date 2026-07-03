import {
  Building2,
  Users,
  Gavel,
  Home,
  Briefcase,
  Plane,
  Calculator,
  Scale,
  HeartPulse,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Building2,
  Users,
  Gavel,
  Home,
  Briefcase,
  Plane,
  Calculator,
  Scale,
  HeartPulse,
  Lightbulb,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Scale;
}
