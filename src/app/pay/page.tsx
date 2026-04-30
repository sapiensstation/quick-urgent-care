"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, FileText, CreditCard, Shield, Lock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const STEPS = ["Account", "Invoice", "Payment", "Done"] as const;

const MOCK_INVOICES = [
  { id: "INV-20432", date: "2025-03-18", service: "Office visit · Moore", amount: 85.0, status: "Due" },
  { id: "INV-20310", date: "2025-02-02", service: "Lab work · Moore", amount: 42.5, status: "Due" },
  { id: "INV-20189", date: "2024-12-11", service: "COVID test · OKC", amount: 35.0, status: "Due" },
];

const accountSchema = z.object({
  identifier: z.string().trim().min(5, "Enter phone or account number").max(40),
  dob: z.string().min(1, "Date of birth required"),
});

const paymentSchema = z.object({
  name_on_card: z.string().trim().min(2, "Name required").max(100),
  card_number: z.string().trim().regex(/^\d{12,19}$/, "Invalid card number"),
  exp: z.string().trim().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY"),
  cvc: z.string().trim().regex(/^\d{3,4}$/, "Invalid CVC"),
  zip: z.string().trim().min(3, "ZIP required").max(10),
});

const Pay = () => {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [account, setAccount] = useState({ identifier: "", dob: "" });
  const [payment, setPayment] = useState({
    name_on_card: "",
    card_number: "",
    exp: "",
    cvc: "",
    zip: "",
  });

  const total = MOCK_INVOICES.filter((i) => selected.includes(i.id)).reduce((s, i) => s + i.amount, 0);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const toggleInvoice = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

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

  const submit = async () => {
    const parsed = paymentSchema.safeParse({
      ...payment,
      card_number: payment.card_number.replace(/\s/g, ""),
    });
    if (!parsed.success) {
      toast({
        title: "Check your payment details",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setStep(STEPS.length - 1);
  };

  const canNext = () => {
    if (step === 0) return account.identifier.length > 4 && !!account.dob;
    if (step === 1) return selected.length > 0;
    return true;
  };

  const onContinue = () => {
    if (step === 0 && !validateAccount()) return;
    next();
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
              Secure one-time payment. No login required. We accept all major cards.
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
              Secured by 256-bit SSL encryption
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="surface-lowest rounded-xl p-8 lg:p-12 lift-soft min-h-[520px] flex flex-col">
              <div className="flex-1 animate-fade-in" key={step}>
                {step === 0 && (
                  <>
                    <Eyebrow>Step 1</Eyebrow>
                    <h2 className="mt-3 text-display-md font-display">Find your account</h2>
                    <p className="mt-4 text-on-surface-variant max-w-lg">
                      Enter the phone number or account ID on your bill, plus the patient's date of birth.
                    </p>
                    <div className="mt-10 grid sm:grid-cols-2 gap-5 max-w-xl">
                      <div className="sm:col-span-2">
                        <Label className="label-eyebrow">Phone or account ID *</Label>
                        <Input
                          className="mt-2"
                          placeholder="405-555-0100 or QUC-10234"
                          value={account.identifier}
                          onChange={(e) =>
                            setAccount((a) => ({ ...a, identifier: e.target.value }))
                          }
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
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <Eyebrow>Step 2</Eyebrow>
                    <h2 className="mt-3 text-display-md font-display">Select invoices to pay</h2>
                    <p className="mt-4 text-on-surface-variant">
                      Pick one or more. Amounts combine into a single payment.
                    </p>
                    <div className="mt-10 space-y-3">
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
                            <div
                              className={`size-10 rounded-lg grid place-items-center ${
                                sel ? "bg-primary-foreground/20" : "bg-surface-base"
                              }`}
                            >
                              <FileText className="size-5 opacity-80" />
                            </div>
                            <div className="flex-1">
                              <div className="font-display font-semibold">{inv.service}</div>
                              <div
                                className={`mt-1 text-xs ${
                                  sel ? "text-primary-foreground/70" : "text-on-surface-variant"
                                }`}
                              >
                                {inv.id} · {inv.date}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-display text-xl font-semibold">
                                ${inv.amount.toFixed(2)}
                              </div>
                              <div
                                className={`text-xs ${
                                  sel ? "text-primary-foreground/70" : "text-on-surface-variant"
                                }`}
                              >
                                {inv.status}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {selected.length > 0 && (
                      <div className="mt-8 flex items-center justify-between px-5 py-4 rounded-xl surface-low">
                        <span className="text-sm text-on-surface-variant">
                          {selected.length} invoice{selected.length > 1 ? "s" : ""} selected
                        </span>
                        <span className="font-display text-2xl font-semibold">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </>
                )}

                {step === 2 && (
                  <>
                    <Eyebrow>Step 3</Eyebrow>
                    <h2 className="mt-3 text-display-md font-display">Payment details</h2>
                    <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container text-secondary-on-container text-xs font-medium">
                      <CreditCard className="size-3" /> Charging ${total.toFixed(2)}
                    </div>
                    <div className="mt-8 grid sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <Label className="label-eyebrow">Name on card *</Label>
                        <Input
                          className="mt-2"
                          value={payment.name_on_card}
                          onChange={(e) =>
                            setPayment((p) => ({ ...p, name_on_card: e.target.value }))
                          }
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="label-eyebrow">Card number *</Label>
                        <Input
                          className="mt-2"
                          inputMode="numeric"
                          placeholder="1234 5678 9012 3456"
                          value={payment.card_number}
                          onChange={(e) =>
                            setPayment((p) => ({ ...p, card_number: e.target.value }))
                          }
                        />
                      </div>
                      <div>
                        <Label className="label-eyebrow">Expiration *</Label>
                        <Input
                          className="mt-2"
                          placeholder="MM/YY"
                          value={payment.exp}
                          onChange={(e) => setPayment((p) => ({ ...p, exp: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label className="label-eyebrow">CVC *</Label>
                        <Input
                          className="mt-2"
                          inputMode="numeric"
                          placeholder="123"
                          value={payment.cvc}
                          onChange={(e) => setPayment((p) => ({ ...p, cvc: e.target.value }))}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="label-eyebrow">Billing ZIP *</Label>
                        <Input
                          className="mt-2 max-w-xs"
                          value={payment.zip}
                          onChange={(e) => setPayment((p) => ({ ...p, zip: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-xs text-on-surface-variant">
                      <Shield className="size-3.5" />
                      Your card details are encrypted and never stored on our servers.
                    </div>
                  </>
                )}

                {step === 3 && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 animate-scale-in">
                    <div className="size-16 rounded-full gradient-primary grid place-items-center text-primary-foreground lift-ambient">
                      <Check className="size-7" />
                    </div>
                    <h2 className="mt-8 text-display-md font-display">Payment received.</h2>
                    <p className="mt-4 text-on-surface-variant max-w-md">
                      We charged{" "}
                      <span className="text-foreground font-semibold">${total.toFixed(2)}</span> to
                      your card ending in{" "}
                      <span className="text-foreground">
                        {payment.card_number.slice(-4) || "••••"}
                      </span>
                      . A receipt is on its way.
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

              {step < 3 && (
                <div className="mt-10 pt-8 border-t border-outline-variant/15 flex items-center justify-between">
                  <Button variant="ghost" onClick={back} disabled={step === 0}>
                    <ArrowLeft className="size-4" /> Back
                  </Button>
                  {step < 2 ? (
                    <Button onClick={onContinue} disabled={!canNext()}>
                      Continue <ArrowRight className="size-4" />
                    </Button>
                  ) : (
                    <Button onClick={submit} disabled={submitting}>
                      {submitting ? "Processing…" : `Pay $${total.toFixed(2)}`}{" "}
                      <ArrowRight className="size-4" />
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

export default Pay;
