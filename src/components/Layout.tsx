"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MapPin, CalendarPlus, Navigation } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CLINICS } from "@/lib/clinics";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/locations", label: "Locations" },
  { to: "/providers", label: "Providers" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Geographic micro-bar */}
      <div className="hidden md:block bg-tertiary text-tertiary-foreground text-[11px] tracking-[0.12em] uppercase font-medium">
        <div className="container flex items-center justify-between h-9">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 opacity-90"><MapPin className="size-3" /> Moore · Oklahoma City</span>
            <span className="opacity-75">Open daily 7am – 8pm</span>
          </div>
          <a href="tel:4052857222" className="flex items-center gap-2 hover:opacity-100 opacity-90 transition-opacity">
            <Phone className="size-3" /> 405-285-7222
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 glass">
        <div className="container flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="size-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground font-display font-bold text-lg shadow-press">
              Q
            </div>
            <div className="leading-tight">
              <div className="font-display font-semibold text-base tracking-tight">Quick Urgent Care</div>
              <div className="text-[10px] tracking-[0.16em] uppercase text-on-surface-variant">Oklahoma · Est. 2017</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.to ? "text-primary" : "text-on-surface-variant hover:text-foreground hover:bg-surface-low"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {/* <Button variant="ghost" size="sm" asChild>
              <Link href="/pay">Pay bill</Link>
            </Button> */}
            <Button asChild size="default">
              <Link href="/pay">Pay bill</Link>
            </Button>
            {/* <Button asChild size="default">
              <Link href="/book">Book a visit</Link>
            </Button> */}
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-surface-low"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-outline-variant/10 bg-surface-bright/95 backdrop-blur">
            <div className="container py-4 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-surface-low"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-3">
                <Link href="/book" onClick={() => setOpen(false)}>Book a visit</Link>
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export const Footer = () => (
  <footer className="mt-32 border-t border-outline-variant/15 bg-surface-low">
    <div className="container py-20 grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground font-display font-bold">Q</div>
          <div className="font-display font-semibold text-lg">Quick Urgent Care</div>
        </div>
        <p className="mt-6 text-on-surface-variant max-w-md leading-relaxed">
          Walk-in urgent care clinics serving Moore and Oklahoma City. We opened in April 2017 and provide
          state-of-the-art facilities with board-certified providers.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container text-secondary-on-container text-xs font-medium">
          <span className="size-1.5 rounded-full bg-secondary" />
          Open daily · 7 am – 8 pm
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="label-eyebrow mb-5">Visit</div>
        <ul className="space-y-3 text-sm">
          <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
          <li><Link href="/locations" className="hover:text-primary transition-colors">Locations</Link></li>
          <li><Link href="/providers" className="hover:text-primary transition-colors">Providers</Link></li>
          <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
          <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
          <li><Link href="/book" className="hover:text-primary transition-colors">Book a visit</Link></li>
        </ul>
      </div>

      <div className="lg:col-span-4">
        <div className="label-eyebrow mb-5">Contact</div>
        <ul className="space-y-3 text-sm">
          <li className="text-on-surface-variant">2212 N Broadway Ave, Moore, OK 73160</li>
          <li className="text-on-surface-variant">1421 NW 122nd St, Oklahoma City, OK 73114</li>
          <li><a className="hover:text-primary" href="tel:4052857222">405-285-7222</a></li>
          <li className="text-on-surface-variant">Fax 405-285-7227</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-outline-variant/15">
      <div className="container py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-on-surface-muted">
        <div>© {new Date().getFullYear()} Quick Urgent Care. All rights reserved.</div>
        <div>
          Built with <span className="text-primary" aria-label="love">♥</span> by{" "}
          <a
            href="https://sapiensstation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-primary transition-colors"
          >
            Sapiens Station
          </a>
        </div>
      </div>
    </div>
  </footer>
);

const ClinicActionList = ({ onPick }: { onPick?: () => void }) => (
  <ul className="py-2">
    {CLINICS.map((c) => (
      <li key={c.id} className="px-4 py-3 hover:bg-surface-low transition-colors">
        <div className="flex items-start gap-3">
          <MapPin className="size-4 text-primary mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium leading-tight">{c.city}</div>
            <div className="text-xs text-on-surface-muted mt-0.5 truncate">{c.fullAddress}</div>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <a
            href={c.bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onPick}
            className="flex-1 inline-flex items-center justify-center gap-1.5 gradient-primary text-primary-foreground rounded-lg px-3 py-2 text-xs font-medium"
          >
            <CalendarPlus className="size-3.5" /> Book now
          </a>
          <a
            href={c.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onPick}
            className="flex-1 inline-flex items-center justify-center gap-1.5 surface-low rounded-lg px-3 py-2 text-xs font-medium border border-outline-variant/20"
          >
            <Navigation className="size-3.5" /> Directions
          </a>
        </div>
      </li>
    ))}
  </ul>
);

const StickyBar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (pathname === "/book") return null;

  return (
    <div ref={wrapRef}>
      {/* Mobile: sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-outline-variant/20 bg-surface-bright/95 backdrop-blur">
        {open && (
          <div className="absolute bottom-full left-0 right-0 surface-lowest border-t border-outline-variant/20 shadow-press animate-fade-in">
            <div className="px-4 py-2 text-xs uppercase tracking-[0.1em] text-on-surface-muted flex items-center justify-between">
              <span>Choose a clinic</span>
              <button onClick={() => setOpen(false)} aria-label="Close"><X className="size-4" /></button>
            </div>
            <ClinicActionList onPick={() => setOpen(false)} />
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Choose a clinic"
          className="w-full flex items-center justify-center gap-2 py-4 gradient-primary text-primary-foreground font-medium text-sm"
        >
          <CalendarPlus className="size-5" />
          <span className="text-xs uppercase tracking-[0.1em]">{open ? "Close" : "Book a visit · Get directions"}</span>
        </button>
      </div>

      {/* Desktop: floating card bottom-right */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-40 surface-lowest rounded-xl lift-ambient p-5 w-80 border border-outline-variant/15">
        <div className="label-eyebrow text-on-surface-muted">Quick Urgent Care</div>
        <p className="mt-1 font-display font-semibold text-base leading-snug">Ready to book a visit?</p>
        <a
          href="tel:4052857222"
          className="mt-4 flex items-center gap-3 w-full gradient-primary text-primary-foreground rounded-lg px-4 py-3 text-sm font-medium hover:-translate-y-0.5 transition-transform"
        >
          <span className="relative flex size-7 items-center justify-center rounded-full bg-primary-foreground/15">
            <span className="absolute inset-0 rounded-full bg-primary-foreground/25 animate-ping" />
            <Phone className="size-3.5 relative" />
          </span>
          405-285-7222
        </a>
        <div className="mt-3 pt-3 border-t border-outline-variant/15">
          <ClinicActionList />
        </div>
      </div>
    </div>
  );
};

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background gradient-editorial">
    <Nav />
    <main>{children}</main>
    <Footer />
    <StickyBar />
  </div>
);
