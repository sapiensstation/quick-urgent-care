import { ReactNode } from "react";

export const Eyebrow = ({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "primary" | "secondary" }) => {
  const colors = {
    default: "text-on-surface-variant",
    primary: "text-primary",
    secondary: "text-secondary",
  };
  return <div className={`label-eyebrow ${colors[tone]}`}>{children}</div>;
};

export const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "left",
  cta,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  cta?: ReactNode;
}) => (
  <div className={`flex flex-col ${align === "center" ? "items-center text-center" : ""} ${cta ? "lg:flex-row lg:items-end lg:justify-between" : ""} gap-6`}>
    <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-display-lg font-display">{title}</h2>
      {description && <p className="mt-5 text-lg text-on-surface-variant leading-relaxed">{description}</p>}
    </div>
    {cta}
  </div>
);

export const GeoChip = ({ city, distance }: { city: string; distance: string }) => (
  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container text-secondary-on-container text-xs font-medium">
    <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
    {city} · {distance}
  </span>
);
