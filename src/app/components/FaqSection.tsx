import { useState } from "react";
import { ChevronDown } from "lucide-react";

const fallbackFaqs = [
  {
    question: "Was ist Tao Yin und wie wirkt es?",
    answer:
      "Tao Yin verbindet sanfte Bewegung, Atmung und innere Präsenz. Die Praxis stärkt deine Wirbelsäule, löst Verspannungen und bringt deine Lebensenergie (Chi) in Fluss. Du findest so zu mehr Ruhe, Flexibilität und innerer Balance.",
  },
  {
    question: "Für wen sind die Kurse geeignet?",
    answer:
      "Unsere Angebote richten sich an alle – egal ob Anfänger*in, Fortgeschrittene, jung oder alt. Besonders profitieren Menschen mit Stress, Rückenschmerzen oder dem Wunsch nach mehr innerer Ruhe und Selbstfürsorge.",
  },
  {
    question: "Was ist das Besondere an Chi Nei Tsang?",
    answer:
      "Chi Nei Tsang ist eine tiefgehende Bauchmassage, die emotionale und energetische Blockaden löst. Sie unterstützt die Verdauung, stärkt die Organe und hilft dir, dich mit deinem Zentrum zu verbinden.",
  },
  {
    question: "Wie kann ich einen Termin buchen?",
    answer:
      "Du kannst ganz einfach per WhatsApp, E-Mail oder Telefon einen Termin vereinbaren. Wir beraten dich gerne persönlich und finden gemeinsam das passende Angebot für dich.",
  },
];

interface FaqSectionProps {
  content?: {
    faq_title?: string;
    faq_subtitle?: string;
    faq_items?: Array<{
      _uid: string;
      question: string;
      answer: string;
    }>;
  };
}

export function FaqSection({ content }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Use Storyblok content if available, otherwise fallback
  const title = content?.faq_title || "Raum für Achtsamkeit & Balance";
  const subtitle = content?.faq_subtitle || "Antworten auf häufige Fragen zu unseren taoistischen Angeboten, Methoden und deinem Weg zu mehr Wohlbefinden.";
  const faqs = content?.faq_items || fallbackFaqs;

  return (
    <section className="w-full py-16 lg:py-24 bg-primary">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-white mb-4">
            {title}
          </h2>
          <p className="text-white/60 text-[16px]">
            {subtitle}
          </p>
        </div>
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={faq._uid || i} className="border-b border-white/10">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-[17px] text-white/90 group-hover:text-white transition-colors pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-white/50 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-[15px] text-white/50 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}