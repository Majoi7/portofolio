import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { validateContactForm } from '../lib/portfolio-logic';

interface ContactSectionProps {
  accentColor?: string;
  whatsappNumber?: string;
  email?: string;
  prefilledProjectType?: string;
  onInquirySubmitted: (inquiry: {
    name: string;
    email: string;
    company?: string;
    projectType: string;
    budget?: string;
    message: string;
  }) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  accentColor = '#d4f22b',
  whatsappNumber = '+229 97 00 00 00',
  email = 'contact@jehovaly.dev',
  prefilledProjectType = 'SaaS & MVP',
  onInquirySubmitted,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: prefilledProjectType || 'SaaS & MVP',
    budget: '1 000 € - 3 000 €',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      onInquirySubmitted(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: 'SaaS & MVP',
        budget: '1 000 € - 3 000 €',
        message: '',
      });
    }, 600);
  };

  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Bonjour Jehovaly, je viens de découvrir votre portfolio et souhaite échanger sur un projet.'
  )}`;

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.06]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Info Column */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
            <span style={{ color: accentColor }}>04</span>
            <span>Contact &amp; Collaboration</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight mb-4">
            Parlons de votre prochaine idée.
          </h3>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-8">
            Vous avez un projet de SaaS, une application web à développer ou une infrastructure à structurer ? Décrivez votre besoin ou contactez-moi directement.
          </p>

          <div className="space-y-4">
            {/* Direct Email Card */}
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-all text-neutral-300 hover:text-white"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center">
                <Mail className="w-5 h-5 text-neutral-200" />
              </div>
              <div>
                <span className="text-xs font-mono text-neutral-400 block">Email direct</span>
                <span className="text-sm font-medium">{email}</span>
              </div>
            </a>

            {/* Direct WhatsApp Card */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-all text-neutral-300 hover:text-white group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-neutral-400 block">WhatsApp direct</span>
                  <span className="text-sm font-medium">{whatsappNumber}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </a>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <div className="rounded-[28px] bg-white/[0.02] border border-white/[0.08] p-6 sm:p-10 shadow-2xl">
            {isSuccess ? (
              <div className="py-12 text-center animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-display font-semibold text-white mb-2">
                  Demande transmise avec succès !
                </h4>
                <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6">
                  Merci pour votre message. Votre demande a bien été enregistrée dans mon espace de gestion, et je vous répondrai dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-[#0a0a0a] cursor-pointer"
                  style={{ backgroundColor: accentColor }}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Alexandre Laurent"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white focus:outline-none text-white text-sm placeholder-neutral-500 transition-colors"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Adresse email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vous@entreprise.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white focus:outline-none text-white text-sm placeholder-neutral-500 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Entreprise / Projet (optionnel)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Votre startup ou organisation"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white focus:outline-none text-white text-sm placeholder-neutral-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Type de projet
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#090b0e] border border-white/10 focus:border-white focus:outline-none text-white text-sm transition-colors"
                    >
                      <option value="SaaS & MVP">SaaS &amp; MVP</option>
                      <option value="Application Web Full-Stack">Application Web Full-Stack</option>
                      <option value="Intégration IA / Audio">Intégration IA &amp; Temps Réel</option>
                      <option value="Refonte & Optimisation">Refonte &amp; Optimisation UI/UX</option>
                      <option value="Autre demande">Autre demande</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Budget indicatif
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#090b0e] border border-white/10 focus:border-white focus:outline-none text-white text-sm transition-colors"
                  >
                    <option value="< 1 000 €">Moins de 1 000 €</option>
                    <option value="1 000 € - 3 000 €">1 000 € - 3 000 €</option>
                    <option value="3 000 € - 6 000 €">3 000 € - 6 000 €</option>
                    <option value="> 6 000 €">Plus de 6 000 €</option>
                    <option value="À définir">À définir ensemble</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Description de votre besoin *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Expliquez en quelques lignes votre idée, le public visé et vos délais..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white focus:outline-none text-white text-sm placeholder-neutral-500 transition-colors"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full font-semibold text-xs tracking-wider uppercase text-[#0a0a0a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                  style={{ backgroundColor: accentColor }}
                >
                  {isSubmitting ? (
                    <span>Envoi en cours...</span>
                  ) : (
                    <>
                      <span>Transmettre ma demande</span>
                      <Send className="w-3.5 h-3.5 text-[#0a0a0a]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
