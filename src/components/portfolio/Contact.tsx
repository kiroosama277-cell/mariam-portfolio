"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, ArrowUp, ArrowUpRight } from "lucide-react";
import { contact, footer, site } from "./data";
import { useToast } from "@/hooks/use-toast";
import { FadeUp, Magnetic, WordsReveal } from "./fx";

/* official WhatsApp glyph */
export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const channelIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram className="h-5 w-5" />,
  whatsapp: <WhatsAppIcon className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
  mail: <Mail className="h-5 w-5" />,
};

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", message: "" });

  /* zero-dependency delivery: the form composes the message and hands it to
     WhatsApp (wa.me deep link) — it lands directly on her phone, no email
     service, no activation, nothing to break. */
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const message = form.message.trim();
    if (!name || !message) {
      toast({
        title: "Almost there ✦",
        description: "Fill in your name and message first, lovely.",
      });
      return;
    }
    const text = `Hi Mariam! ✦ I'm ${name}.\n\n${message}`;
    const win = window.open(
      `${site.whatsappUrl}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (win) {
      setForm({ name: "", message: "" });
    } else {
      toast({
        title: "One tap away ✦",
        description:
          "Your browser blocked the pop-up — use the green WhatsApp pill above instead.",
      });
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <section id="contact" className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center">
            <FadeUp>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#eadcc2] bg-[#fdf9f0] px-5 py-2 text-[11px] font-bold tracking-[0.3em] text-[#8a6d35]">
                <span className="text-[#c39c52]">✦</span> {contact.pill}
              </span>
            </FadeUp>
            <h2 className="font-serif-display mt-5 text-4xl text-[#3f2f3a] sm:text-6xl">
              <WordsReveal
                text={contact.title1}
                accent={contact.titleAccent}
                accentClassName="underline-gold italic text-[#7c3552]"
              />
            </h2>
            <FadeUp delay={0.15}>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#7a6771] sm:text-lg">
                {contact.subtitle}
              </p>
            </FadeUp>
          </div>

          {/* WhatsApp — a soft little pill, one gentle tap away */}
          <FadeUp>
            <motion.a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="group mx-auto mt-10 flex w-fit max-w-full items-center gap-3.5 rounded-full border border-[#bfe8cd] bg-white/85 py-2 pl-2.5 pr-3 shadow-[0_10px_30px_rgba(37,211,102,0.16)] backdrop-blur transition-colors hover:border-[#25d366]/60 sm:gap-4 sm:pl-3 sm:pr-4"
            >
              <span className="wa-breathe relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_20px_rgba(37,211,102,0.4)]">
                <WhatsAppIcon className="h-5.5 w-5.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-bold tracking-[0.28em] text-[#1fa855]">
                  {contact.whatsappBanner.kicker}
                </span>
                <span className="flex items-baseline gap-2">
                  <span className="font-serif-display text-lg italic text-[#3f2f3a] sm:text-xl">
                    {contact.whatsappBanner.title}
                  </span>
                  <span className="text-sm font-bold text-[#5a4750]" dir="ltr">
                    {site.whatsapp}
                  </span>
                </span>
              </span>
              <span className="ml-1 flex items-center gap-1.5 rounded-full bg-[#25d366] px-4 py-2 text-sm font-bold text-white shadow-[0_6px_16px_rgba(37,211,102,0.35)] transition-all group-hover:shadow-[0_10px_22px_rgba(37,211,102,0.5)]">
                {contact.whatsappBanner.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>
          </FadeUp>

          <div className="mt-14 grid items-start gap-8 lg:grid-cols-[5fr_7fr]">
            {/* channels */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              {contact.channels.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  style={{ animationDelay: `${i * 0.7}s` }}
                  className="glow-soft group flex items-center gap-4 rounded-2xl border border-[#efe4cf] bg-[#fdfaf3] px-5 py-4 shadow-[0_8px_26px_rgba(90,40,60,0.06)] transition-all duration-300 hover:translate-x-1.5 hover:border-[#e0cba4]"
                >
                  <motion.span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f3e9d5] text-[#5e1d35] transition-colors duration-300 group-hover:bg-[#5e1d35] group-hover:text-[#f6ead4]"
                    whileHover={{ rotate: -8, scale: 1.06 }}
                  >
                    {channelIcons[c.icon]}
                  </motion.span>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.25em] text-[#a08a92]">{c.label}</p>
                    <p className="text-[17px] font-bold text-[#4d3c46]">{c.value}</p>
                  </div>
                  <span className="ml-auto text-[#c39c52] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2">
                    ✦
                  </span>
                </motion.a>
              ))}
            </motion.div>

            {/* form */}
            <motion.form
              onSubmit={submit}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-3xl border border-[#efe4cf] bg-[#fdfaf3] p-7 shadow-[0_16px_44px_rgba(90,40,60,0.09)] sm:p-9"
            >
              <div>
                <label htmlFor="cf-name" className="mb-2 block text-sm font-bold text-[#4d3c46]">
                  {contact.form.name}
                </label>
                <input
                  id="cf-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={contact.form.namePlaceholder}
                  className="w-full rounded-xl border border-[#eadcc2] bg-white/70 px-4 py-3.5 text-[15px] text-[#4d3c46] outline-none transition-all placeholder:text-[#b3a2ac] focus:border-[#c39c52] focus:ring-2 focus:ring-[#c39c52]/25"
                />
              </div>
              <div className="mt-5">
                <label htmlFor="cf-msg" className="mb-2 block text-sm font-bold text-[#4d3c46]">
                  {contact.form.message}
                </label>
                <textarea
                  id="cf-msg"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={contact.form.messagePlaceholder}
                  className="w-full resize-none rounded-xl border border-[#eadcc2] bg-white/70 px-4 py-3.5 text-[15px] text-[#4d3c46] outline-none transition-all placeholder:text-[#b3a2ac] focus:border-[#c39c52] focus:ring-2 focus:ring-[#c39c52]/25"
                />
              </div>
              <Magnetic strength={0.2}>
                <button
                  type="submit"
                  className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-[#25d366] px-8 py-4 text-base font-bold text-white shadow-[0_10px_28px_rgba(37,211,102,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#1fa855]"
                >
                  {contact.form.submit}
                  <WhatsAppIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110" />
                </button>
              </Magnetic>
              <p className="mt-4 text-sm text-[#a08a92]">{contact.form.note}</p>
            </motion.form>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="mt-6 bg-[#4a1229] text-[#f6ead4]">
        <div className="mx-auto max-w-6xl px-6 pb-8 pt-14">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <p className="font-serif-display text-5xl italic text-[#fbf3e6]">
                {footer.name} <span className="not-italic text-[#c39c52]">✦</span>
              </p>
              <p className="mt-2 text-[15px] text-[#d9b8c6]">{footer.role}</p>
              <a
                href={`mailto:${footer.email}`}
                className="mt-1.5 inline-block text-[15px] font-semibold text-[#f0dcae] underline decoration-[#c39c52]/60 underline-offset-4 transition-colors hover:text-[#c39c52]"
                dir="ltr"
              >
                {footer.email}
              </a>
            </div>
            <p className="text-[15px] text-[#e5c9d4]">{footer.tagline}</p>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-[#8a4a63] text-[#f0dcae] transition-all hover:-translate-y-1 hover:border-[#c39c52] hover:text-[#c39c52]"
            >
              <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </button>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#6b2c47] pt-6 text-sm text-[#c993a9] sm:flex-row">
            <p>{footer.rights}</p>
            <p>{footer.built}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
