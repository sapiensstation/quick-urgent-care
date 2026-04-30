"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, MapPin, Clock, Stethoscope } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const LOCATIONS = [
  { id: "moore", name: "Moore", addr: "2212 N Broadway St", wait: 12 },
  { id: "okc", name: "Oklahoma City", addr: "Off I-35", wait: 18 },
];

const SERVICES = [
  "Illness or infection",
  "Injury or sprain",
  "COVID / flu test",
  "Physical (sports / DOT)",
  "Vaccination",
  "Lab work",
  "Other",
];

const TIMES = ["7:30 am", "9:00 am", "10:30 am", "12:00 pm", "1:30 pm", "3:00 pm", "4:30 pm", "6:00 pm", "7:30 pm"];

const PROVIDER_OPTIONS = [
  "Whoever is available",
  "Rebecca Williams, PA-C",
  "Iftikhar Sandhu, PA-C",
  "Mudassir Nawaz, MD",
  "James Le, DO",
  "Jessi Siler, PA-C",
];

const STEPS = ["Location", "Service", "Time", "Details", "Done"] as const;

const detailsSchema = z.object({
  full_name: z.string().trim().min(1, "Name required").max(100),
  phone: z.string().trim().min(7, "Phone required").max(30),
  email: z.string().trim().email("Invalid email").max(255),
  reason: z.string().trim().max(500).optional(),
  insurance: z.string().trim().max(100).optional(),
  date_of_birth: z.string().optional(),
});

const Book = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    location: "",
    service: "",
    preferred_date: new Date().toISOString().slice(0, 10),
    preferred_time: "",
    provider: "Whoever is available",
    full_name: "",
    phone: "",
    email: "",
    reason: "",
    insurance: "",
    date_of_birth: "",
  });

  const update = (k: keyof typeof data, v: string) => setData((d) => ({ ...d, [k]: v }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    const parsed = detailsSchema.safeParse(data);
    if (!parsed.success) {
      toast({ title: "Please check your details", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const reasonWithProvider = data.reason
      ? `[Provider: ${data.provider}] ${data.reason}`
      : `[Provider: ${data.provider}]`;
    const { error } = await supabase.from("bookings").insert({
      location: data.location,
      service: data.service,
      preferred_date: data.preferred_date,
      preferred_time: data.preferred_time,
      full_name: data.full_name,
      phone: data.phone,
      email: data.email,
      reason: reasonWithProvider,
      insurance: data.insurance || null,
      date_of_birth: data.date_of_birth || null,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Couldn't submit", description: error.message, variant: "destructive" });
      return;
    }
    setStep(STEPS.length - 1);
  };

  const canNext = () => {
    if (step === 0) return !!data.location;
    if (step === 1) return !!data.service;
    if (step === 2) return !!data.preferred_time && !!data.preferred_date;
    return true;
  };

  return (
    <Layout>
      <section className="container pt-16 lg:pt-24 pb-32">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Stepper sidebar */}
          <aside className="lg:col-span-4">
            <Eyebrow tone="primary">Book a visit</Eyebrow>
            <h1 className="mt-5 text-display-lg font-display">Reserve your<br />time. Skip the<br />waiting room.</h1>
            <p className="mt-6 text-on-surface-variant leading-relaxed">
              Tell us where, what, and when. We'll confirm by text within minutes.
            </p>

            <ol className="mt-12 space-y-2">
              {STEPS.slice(0, 4).map((label, i) => {
                const active = step === i;
                const done = step > i;
                return (
                  <li
                    key={label}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                      active ? "surface-lowest lift-soft" : "opacity-60"
                    }`}
                  >
                    <span
                      className={`size-8 rounded-full grid place-items-center text-xs font-medium transition-all ${
                        done ? "gradient-primary text-primary-foreground" : active ? "ghost-border-primary text-primary" : "bg-surface-base text-on-surface-variant"
                      }`}
                    >
                      {done ? <Check className="size-3.5" /> : i + 1}
                    </span>
                    <span className="font-medium">{label}</span>
                  </li>
                );
              })}
            </ol>
          </aside>

          {/* Step content */}
          <div className="lg:col-span-8">
            <div className="surface-lowest rounded-xl p-8 lg:p-12 lift-soft min-h-[520px] flex flex-col">
              <div className="flex-1 animate-fade-in" key={step}>
                {step === 0 && (
                  <>
                    <Eyebrow>Step 1</Eyebrow>
                    <h2 className="mt-3 text-display-md font-display">Choose a location</h2>
                    <div className="mt-10 grid sm:grid-cols-2 gap-4">
                      {LOCATIONS.map((loc) => {
                        const sel = data.location === loc.id;
                        return (
                          <button
                            key={loc.id}
                            type="button"
                            onClick={() => update("location", loc.id)}
                            className={`text-left p-6 rounded-xl transition-all ${
                              sel ? "gradient-primary text-primary-foreground lift-soft" : "surface-low hover:bg-surface-base"
                            }`}
                          >
                            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] opacity-80">
                              <MapPin className="size-3" /> Quick Urgent Care
                            </div>
                            <div className={`mt-3 font-display text-2xl font-semibold ${sel ? "" : ""}`}>{loc.name}</div>
                            <div className={`mt-1 text-sm ${sel ? "text-primary-foreground/80" : "text-on-surface-variant"}`}>{loc.addr}</div>
                            <div className={`mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${sel ? "bg-primary-foreground/20" : "bg-secondary-container text-secondary-on-container"}`}>
                              <span className={`size-1.5 rounded-full ${sel ? "bg-primary-foreground" : "bg-secondary"}`} /> {loc.wait} min wait
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <Eyebrow>Step 2</Eyebrow>
                    <h2 className="mt-3 text-display-md font-display">What brings you in?</h2>
                    <div className="mt-10 grid sm:grid-cols-2 gap-3">
                      {SERVICES.map((s) => {
                        const sel = data.service === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => update("service", s)}
                            className={`text-left p-5 rounded-xl transition-all flex items-center gap-3 ${
                              sel ? "bg-primary text-primary-foreground" : "surface-low hover:bg-surface-base"
                            }`}
                          >
                            <Stethoscope className="size-4 opacity-70" />
                            <span className="font-medium">{s}</span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <Eyebrow>Step 3</Eyebrow>
                    <h2 className="mt-3 text-display-md font-display">Pick a time</h2>
                    <div className="mt-8 max-w-xs">
                      <Label className="label-eyebrow">Date</Label>
                      <Input
                        type="date"
                        value={data.preferred_date}
                        min={new Date().toISOString().slice(0, 10)}
                        onChange={(e) => update("preferred_date", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div className="mt-8">
                      <Label className="label-eyebrow">Available times</Label>
                      <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {TIMES.map((t) => {
                          const sel = data.preferred_time === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => update("preferred_time", t)}
                              className={`px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                                sel ? "bg-primary text-primary-foreground" : "surface-low hover:bg-surface-base"
                              }`}
                            >
                              <Clock className="size-3 inline mr-1.5 opacity-60" />
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <Eyebrow>Step 4</Eyebrow>
                    <h2 className="mt-3 text-display-md font-display">A few details</h2>
                    <div className="mt-8 grid sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <Label className="label-eyebrow">Preferred provider</Label>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {PROVIDER_OPTIONS.map((p) => {
                            const sel = data.provider === p;
                            const isDefault = p === "Whoever is available";
                            return (
                              <button
                                key={p}
                                type="button"
                                onClick={() => update("provider", p)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                  sel
                                    ? "bg-primary text-primary-foreground"
                                    : "surface-low hover:bg-surface-base text-on-surface-variant"
                                } ${isDefault ? "font-semibold" : ""}`}
                              >
                                {p}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <Label className="label-eyebrow">Full name *</Label>
                        <Input className="mt-2" value={data.full_name} onChange={(e) => update("full_name", e.target.value)} />
                      </div>
                      <div>
                        <Label className="label-eyebrow">Date of birth</Label>
                        <Input type="date" className="mt-2" value={data.date_of_birth} onChange={(e) => update("date_of_birth", e.target.value)} />
                      </div>
                      <div>
                        <Label className="label-eyebrow">Phone *</Label>
                        <Input type="tel" className="mt-2" value={data.phone} onChange={(e) => update("phone", e.target.value)} />
                      </div>
                      <div>
                        <Label className="label-eyebrow">Email *</Label>
                        <Input type="email" className="mt-2" value={data.email} onChange={(e) => update("email", e.target.value)} />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="label-eyebrow">Insurance (optional)</Label>
                        <Input className="mt-2" placeholder="e.g. BCBS of Oklahoma" value={data.insurance} onChange={(e) => update("insurance", e.target.value)} />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="label-eyebrow">Briefly, what's going on?</Label>
                        <Textarea className="mt-2 min-h-24" value={data.reason} onChange={(e) => update("reason", e.target.value)} />
                      </div>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 animate-scale-in">
                    <div className="size-16 rounded-full gradient-primary grid place-items-center text-primary-foreground lift-ambient">
                      <Check className="size-7" />
                    </div>
                    <h2 className="mt-8 text-display-md font-display">You're all set, {data.full_name.split(" ")[0]}.</h2>
                    <p className="mt-4 text-on-surface-variant max-w-md">
                      We'll text you a confirmation shortly at <span className="text-foreground">{data.phone}</span>. See you {data.preferred_date} at {data.preferred_time} in {LOCATIONS.find((l) => l.id === data.location)?.name}.
                    </p>
                    <div className="mt-10 flex gap-3">
                      <Button asChild variant="ghost"><Link href="/">Back to home</Link></Button>
                      <Button asChild><Link href="/locations">View directions</Link></Button>
                    </div>
                  </div>
                )}
              </div>

              {step < 4 && (
                <div className="mt-10 pt-8 border-t border-outline-variant/15 flex items-center justify-between">
                  <Button variant="ghost" onClick={back} disabled={step === 0}>
                    <ArrowLeft className="size-4" /> Back
                  </Button>
                  {step < 3 ? (
                    <Button onClick={next} disabled={!canNext()}>
                      Continue <ArrowRight className="size-4" />
                    </Button>
                  ) : (
                    <Button onClick={submit} disabled={submitting}>
                      {submitting ? "Booking…" : "Confirm booking"} <ArrowRight className="size-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Book;
