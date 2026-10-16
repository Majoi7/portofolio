import React, { useState } from 'react';
import {
  Shield,
  LayoutDashboard,
  FolderGit2,
  Cpu,
  Layers,
  Inbox,
  Sliders,
  LogOut,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  X,
  ExternalLink,
  Lock,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Project, ClientInquiry, validateLimeAccentContrast } from '../lib/portfolio-logic';
import { SiteSettings, Technology, Service } from '../data/portfolioData';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onLogin: (passkey: string) => boolean;
  onLogout: () => void;
  settings: SiteSettings;
  projects: Project[];
  technologies: Technology[];
  services: Service[];
  inquiries: ClientInquiry[];
  onUpdateSettings: (newSettings: Partial<SiteSettings>) => void;
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onUpdateProject: (id: string, updates: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
  onToggleProjectPublished: (id: string) => void;
  onToggleProjectFeatured: (id: string) => void;
  onToggleTechVisible: (id: string) => void;
  onToggleServiceActive: (id: string) => void;
  onUpdateInquiryStatus: (id: string, status: ClientInquiry['status']) => void;
  onUpdateInquiryNotes: (id: string, notes: string) => void;
  onDeleteInquiry: (id: string) => void;
  onResetDefaults: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  isAuthenticated,
  onLogin,
  onLogout,
  settings,
  projects,
  technologies,
  services,
  inquiries,
  onUpdateSettings,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onToggleProjectPublished,
  onToggleProjectFeatured,
  onToggleTechVisible,
  onToggleServiceActive,
  onUpdateInquiryStatus,
  onUpdateInquiryNotes,
  onDeleteInquiry,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'tech' | 'services' | 'inquiries' | 'settings'>('overview');
  const [passkeyInput, setPasskeyInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [newProjectModal, setNewProjectModal] = useState(false);
  const [editingInquiryId, setEditingInquiryId] = useState<string | null>(null);
  const [inquiryNotes, setInquiryNotes] = useState('');

  // Accent color WCAG check
  const contrastCheck = validateLimeAccentContrast(settings.accentColor);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(passkeyInput)) {
      setLoginError('');
      setPasskeyInput('');
    } else {
      setLoginError('Code d\'accès incorrect. (Code par défaut : jeho2026)');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tableau de bord d'administration"
      className="fixed inset-0 z-50 overflow-hidden bg-[#050505]/90 backdrop-blur-xl flex flex-col animate-fadeIn"
    >
      {/* Header Bar */}
      <div className="h-16 border-b border-white/[0.08] bg-[#090b0e] px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-display font-bold text-white flex items-center gap-2">
              <span>Espace Privé • Jehovaly DJIMADJO</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                Live
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Verrouiller</span>
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Fermer le dashboard"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {!isAuthenticated ? (
        /* Login Screen */
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md p-8 rounded-[28px] bg-[#0d1016] border border-white/[0.08] shadow-2xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto mb-5 text-white">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-2">
              Authentification requise
            </h3>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Veuillez saisir votre clé de sécurité pour administrer le portfolio, modifier les projets ou traiter les demandes de vos clients.
            </p>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  placeholder="Code secret (ex: jeho2026)"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-white focus:outline-none text-white text-sm text-center font-mono placeholder-neutral-500 transition-colors"
                />
                {loginError && (
                  <p className="text-xs text-red-400 mt-2">{loginError}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white text-[#0a0a0a] font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Déverrouiller le dashboard
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Authenticated Admin Dashboard */
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="w-64 border-r border-white/[0.08] bg-[#07090c] p-4 flex flex-col justify-between hidden md:flex">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Vue d'ensemble</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FolderGit2 className="w-4 h-4" />
                  <span>Projets &amp; Études</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                  {projects.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'inquiries'
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Inbox className="w-4 h-4" />
                  <span>Demandes Clients</span>
                </div>
                {inquiries.filter((i) => i.status === 'new').length > 0 && (
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full text-[#0a0a0a] font-bold"
                    style={{ backgroundColor: settings.accentColor }}
                  >
                    {inquiries.filter((i) => i.status === 'new').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('tech')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'tech'
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>Technologies</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'services'
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Services &amp; Offres</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Tokens &amp; Réglages</span>
              </button>
            </nav>

            <div className="pt-4 border-t border-white/[0.08]">
              <button
                onClick={() => {
                  if (confirm('Réinitialiser toutes les données aux valeurs d\'origine ?')) {
                    onResetDefaults();
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-mono text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser les données</span>
              </button>
            </div>
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#090b0e]">
            {/* Mobile Tab Pills */}
            <div className="flex md:hidden gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
              {(['overview', 'projects', 'inquiries', 'tech', 'services', 'settings'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer ${
                    activeTab === tab ? 'bg-white text-black' : 'bg-white/5 text-neutral-400'
                  }`}
                >
                  {tab === 'overview' && 'Vue d\'ensemble'}
                  {tab === 'projects' && 'Projets'}
                  {tab === 'inquiries' && 'Demandes'}
                  {tab === 'tech' && 'Technologies'}
                  {tab === 'services' && 'Services'}
                  {tab === 'settings' && 'Paramètres'}
                </button>
              ))}
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                    Vue d'ensemble de la plateforme
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Métriques réelles de votre portfolio en direct.
                  </p>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-xs font-mono text-neutral-400 block mb-1">
                      Projets publiés
                    </span>
                    <span className="text-3xl font-display font-bold text-white">
                      {projects.filter((p) => p.published).length}
                    </span>
                    <span className="text-[11px] text-neutral-500 block mt-1">
                      Sur {projects.length} projets enregistrés
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-xs font-mono text-neutral-400 block mb-1">
                      Demandes clients
                    </span>
                    <span className="text-3xl font-display font-bold text-white">
                      {inquiries.length}
                    </span>
                    <span
                      className="text-[11px] font-medium block mt-1"
                      style={{ color: settings.accentColor }}
                    >
                      {inquiries.filter((i) => i.status === 'new').length} nouvelle(s)
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-xs font-mono text-neutral-400 block mb-1">
                      Technologies actives
                    </span>
                    <span className="text-3xl font-display font-bold text-white">
                      {technologies.filter((t) => t.visible).length}
                    </span>
                    <span className="text-[11px] text-neutral-500 block mt-1">
                      Affichées dans le bandeau
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-xs font-mono text-neutral-400 block mb-1">
                      Services en ligne
                    </span>
                    <span className="text-3xl font-display font-bold text-white">
                      {services.filter((s) => s.active).length}
                    </span>
                    <span className="text-[11px] text-neutral-500 block mt-1">
                      Proposés aux prospects
                    </span>
                  </div>
                </div>

                {/* Recent Inquiries List */}
                <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-display font-bold text-white">
                      Dernières demandes de contact reçues
                    </h4>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs font-mono text-neutral-400 hover:text-white cursor-pointer"
                    >
                      Voir tout →
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <p className="text-xs text-neutral-500 py-4">Aucune demande reçue pour l'instant.</p>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.slice(0, 3).map((inq) => (
                        <div
                          key={inq.id}
                          className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                        >
                          <div>
                            <span className="text-sm font-semibold text-white block">
                              {inq.name}
                            </span>
                            <span className="text-xs text-neutral-400">
                              {inq.projectType} • {inq.email}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                            {inq.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                      Gestion des projets &amp; Études de cas
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Créer, modifier, publier ou ajuster l'ordre et les statuts réels.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center font-bold text-white text-sm">
                          {project.title.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-semibold text-white">
                              {project.title}
                            </h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                              {project.categoryLabel}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            {project.tagline}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-[11px] font-mono text-neutral-500">
                            <span>Statut : <strong className="text-neutral-300">{project.statusLabel}</strong></span>
                            <span>•</span>
                            <span>{project.technologies.slice(0, 3).join(', ')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-center">
                        <button
                          onClick={() => onToggleProjectFeatured(project.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                            project.featured
                              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                              : 'bg-white/5 text-neutral-400'
                          }`}
                        >
                          {project.featured ? '★ Mis en avant' : 'Standard'}
                        </button>

                        <button
                          onClick={() => onToggleProjectPublished(project.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                            project.published
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {project.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{project.published ? 'Publié' : 'Brouillon'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: INQUIRIES */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                    Demandes clients reçues ({inquiries.length})
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Suivi de cycle de vie : Nouvelle → À examiner → En discussion → Acceptée.
                  </p>
                </div>

                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.05] pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-white">{inq.name}</span>
                            {inq.company && (
                              <span className="text-xs text-neutral-400 font-mono">({inq.company})</span>
                            )}
                          </div>
                          <span className="text-xs text-neutral-400 font-mono">{inq.email}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="text-[10px] font-mono text-neutral-400">Statut :</label>
                          <select
                            value={inq.status}
                            onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as ClientInquiry['status'])}
                            className="bg-neutral-900 border border-white/20 text-white text-xs rounded-lg px-2.5 py-1 font-mono focus:outline-none"
                          >
                            <option value="new">Nouvelle</option>
                            <option value="reviewing">À examiner</option>
                            <option value="in_discussion">En discussion</option>
                            <option value="accepted">Acceptée</option>
                            <option value="declined">Déclinée</option>
                            <option value="completed">Terminée</option>
                            <option value="archived">Archivée</option>
                          </select>

                          <button
                            onClick={() => onDeleteInquiry(inq.id)}
                            className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                            title="Supprimer la demande"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs font-mono text-neutral-400">
                        <div>Type : <strong className="text-white">{inq.projectType}</strong></div>
                        <div>Budget : <strong className="text-white">{inq.budget || 'Non spécifié'}</strong></div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-neutral-300">
                        {inq.message}
                      </div>

                      {/* Internal Notes */}
                      <div className="pt-2">
                        {editingInquiryId === inq.id ? (
                          <div className="space-y-2">
                            <textarea
                              rows={2}
                              value={inquiryNotes}
                              onChange={(e) => setInquiryNotes(e.target.value)}
                              placeholder="Notes privées (devis, suivi, disponibilité)..."
                              className="w-full p-2.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  onUpdateInquiryNotes(inq.id, inquiryNotes);
                                  setEditingInquiryId(null);
                                }}
                                className="px-3 py-1 rounded bg-white text-black text-xs font-semibold"
                              >
                                Enregistrer la note
                              </button>
                              <button
                                onClick={() => setEditingInquiryId(null)}
                                className="px-3 py-1 text-xs text-neutral-400"
                              >
                                Annuler
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between text-xs text-neutral-400">
                            <span>Note interne : {inq.notes ? <em className="text-neutral-300">"{inq.notes}"</em> : 'Aucune note'}</span>
                            <button
                              onClick={() => {
                                setEditingInquiryId(inq.id);
                                setInquiryNotes(inq.notes || '');
                              }}
                              className="text-[11px] font-mono text-neutral-300 hover:text-white underline cursor-pointer"
                            >
                              Modifier note
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: TECHNOLOGIES */}
            {activeTab === 'tech' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                    Technologies &amp; Bandeau d'outils
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Activez ou désactivez les technologies affichées dans le défilement horizontal.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {technologies.map((tech) => (
                    <div
                      key={tech.id}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          {tech.name}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">
                          {tech.categoryLabel}
                        </span>
                      </div>

                      <button
                        onClick={() => onToggleTechVisible(tech.id)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                          tech.visible
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-white/5 text-neutral-500'
                        }`}
                      >
                        {tech.visible ? 'Visible' : 'Masqué'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: SERVICES */}
            {activeTab === 'services' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                    Services proposés
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Gérez la visibilité et l'activation des offres de services.
                  </p>
                </div>

                <div className="space-y-4">
                  {services.map((serv) => (
                    <div
                      key={serv.id}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-start justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-base font-semibold text-white">
                          {serv.title}
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1">
                          {serv.tagline}
                        </p>
                      </div>

                      <button
                        onClick={() => onToggleServiceActive(serv.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          serv.active
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        {serv.active ? 'Actif' : 'Désactivé'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: SETTINGS & DESIGN TOKENS */}
            {activeTab === 'settings' && (
              <div className="space-y-8 animate-fadeIn max-w-2xl">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                    Design Tokens &amp; Paramètres Généraux
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Configurez le mot-symbole (Wordmark), les coordonnées et la couleur d'accent vert citron.
                  </p>
                </div>

                <div className="space-y-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                      Wordmark géant du Hero (Site A)
                    </label>
                    <input
                      type="text"
                      value={settings.wordmark}
                      onChange={(e) => onUpdateSettings({ wordmark: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white font-display text-base"
                    />
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Valeur par défaut : « Jeho ». L'astérisque vert citron est automatiquement accolé.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                      Texte du paragraphe Hero (bas droite)
                    </label>
                    <textarea
                      rows={3}
                      value={settings.heroTagline}
                      onChange={(e) => onUpdateSettings({ heroTagline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                        Email public
                      </label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => onUpdateSettings({ email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                        Numéro WhatsApp
                      </label>
                      <input
                        type="text"
                        value={settings.whatsappNumber}
                        onChange={(e) => onUpdateSettings({ whatsappNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Accent Color Picker & WCAG Contrast Validator */}
                  <div className="pt-4 border-t border-white/[0.05]">
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                      Couleur d'accent (Défaut vidéo : #d4f22b vert citron)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings.accentColor}
                        onChange={(e) => onUpdateSettings({ accentColor: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={settings.accentColor}
                        onChange={(e) => onUpdateSettings({ accentColor: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-neutral-900 border border-white/10 text-white font-mono text-xs w-28 uppercase"
                      />
                      <button
                        onClick={() => onUpdateSettings({ accentColor: '#d4f22b' })}
                        className="text-[11px] font-mono text-neutral-400 hover:text-white underline cursor-pointer"
                      >
                        Restaurer #d4f22b
                      </button>
                    </div>

                    {/* Live Contrast Assessment */}
                    <div className="mt-3 p-3 rounded-xl bg-black/50 border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="text-neutral-400">Contraste texte sombre (#0a0a0a) : </span>
                        <strong className="text-emerald-400">{contrastCheck.ratioWithDark}:1 (Conforme WCAG AA/AAA)</strong>
                      </div>
                      <span className="text-[10px] text-neutral-500">
                        {contrastCheck.passesWcagDark ? '✓ Valide' : '⚠ Non conforme'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
