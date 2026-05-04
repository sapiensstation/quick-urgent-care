"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, FileText, Shield, Lock, Mail, Plus } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const STEPS = ["Account", "Invoice", "Payment", "Done"] as const;

const today = new Date().toISOString().split("T")[0];

const MOCK_INVOICES = [
  { id: "INV-20432", date: today, service: "Office visit · Moore", amount: 89.0, status: "Due" },
  { id: "INV-20310", date: today, service: "Office visit · OKC", amount: 89.0, status: "Due" },
];

type Invoice = { id: string; date: string; service: string; amount: number; status: string };

const accountSchema = z.object({
  identifier: z.string().trim().min(5, "Enter phone or account number").max(40),
  dob: z.string().min(1, "Date of birth required"),
  email: z.string().trim().email("Valid email required"),
  name: z.string().trim().min(2, "Name required").max(100),
});

interface CheckoutFormProps {
  total: number;
  selectedInvoices: Invoice[];
  email: string;
  name: string;
  onSuccess: (last4: string, paymentIntentId: string) => void;
}

function CheckoutForm({ total, selectedInvoices, email, name, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
        payment_method_data: { billing_details: { email, name } },
      },
      redirect: "if_required",
    });

    if (error) {
      toast({
        title: "Payment failed",
        description: error.message ?? "Something went wrong.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      fetch("/api/send-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          total,
          invoices: selectedInvoices,
          paymentIntentId: paymentIntent.id,
        }),
      }).catch(() => {});

      onSuccess("••••", paymentIntent.id);
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="mt-6 flex items-center gap-2 text-xs text-on-surface-variant">
        <Shield className="size-3.5" />
        Card details encrypted by Stripe — never stored on our servers.
      </div>
      <div className="mt-8 pt-8 border-t border-outline-variant/15 flex items-center justify-between">
        <span />
        <Button type="submit" disabled={submitting || !stripe}>
          {submitting ? "Processing…" : `Pay $${total.toFixed(2)}`}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </form>
  );
}

const Pay = () => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [account, setAccount] = useState({ identifier: "", dob: "", email: "", name: "" });
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [last4, setLast4] = useState("••••");
  const [loadingIntent, setLoadingIntent] = useState(false);

  const [customId] = useState(
    () => `INV-C${Math.floor(10000 + Math.random() * 90000)}`
  );
  const [custom, setCustom] = useState({ service: "", amount: "" });

  const customFilled = custom.service.trim().length > 0 && parseFloat(custom.amount) > 0;
  const customInvoice: Invoice = {
    id: customId,
    date: today,
    service: custom.service.trim() || "Custom service",
    amount: parseFloat(custom.amount) || 0,
    status: "Due",
  };

  const allInvoices: Invoice[] = [
    ...MOCK_INVOICES,
    ...(customFilled ? [customInvoice] : []),
  ];

  const selectedInvoices = allInvoices.filter((i) => selected.includes(i.id));
  const total = selectedInvoices.reduce((s, i) => s + i.amount, 0);

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const toggleInvoice = (id: string) => {
    if (id === customId && !customFilled) return;
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const validateAccount = () => {
    const parsed = accountSchema.safeParse(account);
    if (!parsed.success) {
      toast({
        title: "Please check your info",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const canNext = () => {
    if (step === 0)
      return (
        account.identifier.length > 4 &&
        !!account.dob &&
        account.email.includes("@") &&
        account.name.length > 1
      );
    if (step === 1) return selected.length > 0;
    return true;
  };

  const onContinue = async () => {
    if (step === 0) {
      if (!validateAccount()) return;
      setStep(1);
      return;
    }
    if (step === 1) {
      setLoadingIntent(true);
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            invoices: selected,
            email: account.email,
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setClientSecret(data.clientSecret);
        setStep(2);
      } catch (err) {
        toast({
          title: "Could not initialize payment",
          description: err instanceof Error ? err.message : "Try again.",
          variant: "destructive",
        });
      } finally {
        setLoadingIntent(false);
      }
    }
  };

  return (
    <Layout>
      <section className="container pt-16 lg:pt-24 pb-32">
        <div className="grid lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4">
            <Eyebrow tone="primary">Pay your bill</Eyebrow>
            <h1 className="mt-5 text-display-lg font-display">
              Clear balances
              <br />
              in under a
              <br />
              minute.
            </h1>
            <p className="mt-6 text-on-surface-variant leading-relaxed">
              Secure one-time payment. No login required. Receipt sent to your email.
            </p>

            <ol className="mt-12 space-y-2">
              {STEPS.slice(0, 3).map((label, i) => {
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
                        done
                          ? "gradient-primary text-primary-foreground"
                          : active
                          ? "ghost-border-primary text-primary"
                          : "bg-surface-base text-on-surface-variant"
                      }`}
                    >
                      {done ? <Check className="size-3.5" /> : i + 1}
                    </span>
                    <span className="font-medium">{label}</span>
                  </li>
                );
              })}
            </ol>

            <div className="mt-10 flex items-center gap-2 text-xs text-on-surface-variant">
              <Lock className="size-3.5" />
              Secured by Stripe &amp; 256-bit SSL
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="surface-lowest rounded-xl p-8 lg:p-12 lift-soft min-h-[520px] flex flex-col">
              <div className="flex-1 animate-fade-in" key={step}>

                {/* STEP 1 — Account */}
                {step === 0 && (
                  <>
                    <Eyebrow>Step 1</Eyebrow>
                    <h2 className="mt-3 text-display-md font-display">Find your account</h2>
                    <p className="mt-4 text-on-surface-variant max-w-lg">
                      Enter your details to locate your account. Receipt will be sent to your email.
                    </p>
                    <div className="mt-10 grid sm:grid-cols-2 gap-5 max-w-xl">
                      <div>
                        <Label className="label-eyebrow">Full name *</Label>
                        <Input
                          className="mt-2"
                          placeholder="Jane Smith"
                          value={account.name}
                          onChange={(e) => setAccount((a) => ({ ...a, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label className="label-eyebrow">Date of birth *</Label>
                        <Input
                          type="date"
                          className="mt-2"
                          value={account.dob}
                          onChange={(e) => setAccount((a) => ({ ...a, dob: e.target.value }))}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="label-eyebrow">Phone or account ID *</Label>
                        <Input
                          className="mt-2"
                          placeholder="405-555-0100 or QUC-10234"
                          value={account.identifier}
                          onChange={(e) => setAccount((a) => ({ ...a, identifier: e.target.value }))}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="label-eyebrow">
                          Email address *{" "}
                          <span className="text-on-surface-muted normal-case font-normal">(receipt sent here)</span>
                        </Label>
                        <div className="mt-2 relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-on-surface-variant pointer-events-none" />
                          <Input
                            type="email"
                            className="pl-9"
                            placeholder="jane@example.com"
                            value={account.email}
                            onChange={(e) => setAccount((a) => ({ ...a, email: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* STEP 2 — Invoice selection */}
                {step === 1 && (
                  <>
                    <Eyebrow>Step 2</Eyebrow>
                    <h2 className="mt-3 text-display-md font-display">Select invoices to pay</h2>
                    <p className="mt-4 text-on-surface-variant">
                      Pick one or more, or add a custom charge below.
                    </p>

                    <div className="mt-10 space-y-3">
                      {/* Existing invoices */}
                      {MOCK_INVOICES.map((inv) => {
                        const sel = selected.includes(inv.id);
                        return (
                          <button
                            key={inv.id}
                            type="button"
                            onClick={() => toggleInvoice(inv.id)}
                            className={`w-full text-left p-5 rounded-xl transition-all flex items-center gap-5 ${
                              sel
                                ? "bg-primary text-primary-foreground lift-soft"
                                : "surface-low hover:bg-surface-base"
                            }`}
                          >
                            <div className={`size-10 rounded-lg grid place-items-center ${sel ? "bg-primary-foreground/20" : "bg-surface-base"}`}>
                              <FileText className="size-5 opacity-80" />
                            </div>
                            <div className="flex-1">
                              <div className="font-display font-semibold">{inv.service}</div>
                              <div className={`mt-1 text-xs ${sel ? "text-primary-foreground/70" : "text-on-surface-variant"}`}>
                                {inv.id} · {inv.date}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-display text-xl font-semibold">${inv.amount.toFixed(2)}</div>
                              <div className={`text-xs ${sel ? "text-primary-foreground/70" : "text-on-surface-variant"}`}>
                                {inv.status}
                              </div>
                            </div>
                          </button>
                        );
                      })}

                      {/* Custom invoice */}
                      <div
                        className={`rounded-xl border-2 transition-all ${
                          selected.includes(customId)
                            ? "border-primary bg-primary/5"
                            : "border-dashed border-outline-variant/40 surface-low"
                        }`}
                      >
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <Plus className="size-4 text-primary" />
                            <span className="text-sm font-medium text-on-surface-variant">Custom charge</span>
                            <span className="ml-auto text-xs text-on-surface-muted font-mono">{customId}</span>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <Label className="label-eyebrow text-[10px]">Service description</Label>
                              <Input
                                className="mt-1.5 h-9 text-sm"
                                placeholder="e.g. Lab work · Moore"
                                value={custom.service}
                                onChange={(e) => {
                                  setCustom((c) => ({ ...c, service: e.target.value }));
                                  if (!e.target.value.trim()) {
                                    setSelected((s) => s.filter((x) => x !== customId));
                                  }
                                }}
                              />
                            </div>
                            <div>
                              <Label className="label-eyebrow text-[10px]">Amount ($)</Label>
                              <Input
                                className="mt-1.5 h-9 text-sm"
                                type="number"
                                min="0.01"
                                step="0.01"
                                placeholder="0.00"
                                value={custom.amount}
                                onChange={(e) => {
                                  setCustom((c) => ({ ...c, amount: e.target.value }));
                                  if (!parseFloat(e.target.value)) {
                                    setSelected((s) => s.filter((x) => x !== customId));
                                  }
                                }}
                              />
                            </div>
                          </div>
                          {customFilled && (
                            <button
                              type="button"
                              onClick={() => toggleInvoice(customId)}
                              className={`mt-4 w-full py-2 rounded-lg text-sm font-medium transition-all ${
                                selected.includes(customId)
                                  ? "gradient-primary text-primary-foreground"
                                  : "bg-surface-base hover:bg-surface-low border border-outline-variant/20"
                              }`}
                            >
                              {selected.includes(customId)
                                ? `Selected · $${parseFloat(custom.amount).toFixed(2)}`
                                : `Add $${parseFloat(custom.amount).toFixed(2)} to payment`}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {selected.length > 0 && (
                      <div className="mt-8 flex items-center justify-between px-5 py-4 rounded-xl surface-low">
                        <span className="text-sm text-on-surface-variant">
                          {selected.length} invoice{selected.length > 1 ? "s" : ""} selected
                        </span>
                        <span className="font-display text-2xl font-semibold">${total.toFixed(2)}</span>
                      </div>
                    )}
                  </>
                )}

                {/* STEP 3 — Stripe Payment */}
                {step === 2 && clientSecret && (
                  <>
                    <Eyebrow>Step 3</Eyebrow>
                    <h2 className="mt-3 text-display-md font-display">Payment details</h2>
                    <div className="mt-4 flex flex-wrap gap-3 items-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container text-secondary-on-container text-xs font-medium">
                        Charging ${total.toFixed(2)}
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant">
                        <Mail className="size-3.5" /> Receipt → {account.email}
                      </div>
                    </div>
                    <div className="mt-8">
                      <Elements
                        stripe={stripePromise}
                        options={{
                          clientSecret,
                          appearance: { theme: "stripe" },
                        }}
                      >
                        <CheckoutForm
                          total={total}
                          selectedInvoices={selectedInvoices}
                          email={account.email}
                          name={account.name}
                          onSuccess={(l4) => {
                            setLast4(l4);
                            setStep(3);
                          }}
                        />
                      </Elements>
                    </div>
                  </>
                )}

                {/* STEP 4 — Done */}
                {step === 3 && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 animate-scale-in">
                    <div className="size-16 rounded-full gradient-primary grid place-items-center text-primary-foreground lift-ambient">
                      <Check className="size-7" />
                    </div>
                    <h2 className="mt-8 text-display-md font-display">Payment received.</h2>
                    <p className="mt-4 text-on-surface-variant max-w-md">
                      We charged{" "}
                      <span className="text-foreground font-semibold">${total.toFixed(2)}</span>.
                      A receipt is on its way to{" "}
                      <span className="text-foreground">{account.email}</span>.
                    </p>
                    <div className="mt-10 flex gap-3">
                      <Button asChild variant="ghost">
                        <Link href="/">Back to home</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/book">Book a visit</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {step < 2 && (
                <div className="mt-10 pt-8 border-t border-outline-variant/15 flex items-center justify-between">
                  <Button variant="ghost" onClick={back} disabled={step === 0}>
                    <ArrowLeft className="size-4" /> Back
                  </Button>
                  <Button onClick={onContinue} disabled={!canNext() || loadingIntent}>
                    {loadingIntent ? "Loading…" : "Continue"} <ArrowRight className="size-4" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="mt-4">
                  <Button variant="ghost" onClick={back}>
                    <ArrowLeft className="size-4" /> Back
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pay;
