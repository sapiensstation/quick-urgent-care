"use client";
import { CheckCircle2, Users, Stethoscope, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface Provider {
  name: string;
  credentials: string;
  title: string;
  description: string;
  image?: string;
  yearsExperience?: number;
  patientsServed?: string;
  variant?: "wrapped" | "bare";
}

export const ProviderCard = ({ provider }: { provider: Provider }) => {
  const variant = provider.variant ?? "wrapped";
  const initials = provider.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  const wrapperClass =
    variant === "wrapped"
      ? "group relative rounded-[28px] bg-surface-lowest p-4 lift-soft hover:lift-ambient transition-all duration-500"
      : "group relative transition-all duration-500";

  const bodyPadding = variant === "wrapped" ? "px-2 pt-5 pb-3" : "pt-5 pb-3";

  return (
    <article className={wrapperClass}>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface-low">
        {provider.image ? (
          <img
            src={provider.image}
            alt={provider.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-editorial"
          />
        ) : (
          <div className="w-full h-full grid place-items-center gradient-primary">
            <span className="font-display text-6xl text-primary-foreground/70 font-light">
              {initials}
            </span>
          </div>
        )}
      </div>

      <div className={bodyPadding}>
        <div className="flex items-center gap-2">
          <h3 className="font-display font-semibold text-xl tracking-tight">
            {provider.name}
          </h3>
          <CheckCircle2
            className="size-5 text-secondary fill-secondary/15"
            aria-label="Verified provider"
          />
        </div>
        <p className="mt-1.5 text-sm text-on-surface-variant leading-relaxed">
          {provider.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-on-surface-variant">
            {provider.yearsExperience !== undefined && (
              <span className="flex items-center gap-1.5">
                <Stethoscope className="size-3.5" />
                {provider.yearsExperience}+ yrs
              </span>
            )}
            {provider.patientsServed && (
              <span className="flex items-center gap-1.5">
                <Users className="size-3.5" />
                {provider.patientsServed}
              </span>
            )}
          </div>

          <Button asChild variant="outline" size="sm" className="rounded-full h-9 px-4">
            <Link href="/book">
              Book <Plus className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};
