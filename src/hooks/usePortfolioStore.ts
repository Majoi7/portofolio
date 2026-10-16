import { useState, useEffect } from 'react';
import {
  Project,
  ClientInquiry,
  canTransitionInquiryStatus,
} from '../lib/portfolio-logic';
import {
  SiteSettings,
  Technology,
  Service,
  INITIAL_SETTINGS,
  INITIAL_PROJECTS,
  INITIAL_TECHNOLOGIES,
  INITIAL_SERVICES,
  INITIAL_INQUIRIES,
} from '../data/portfolioData';

const STORAGE_KEYS = {
  SETTINGS: 'jeho_portfolio_settings_v1',
  PROJECTS: 'jeho_portfolio_projects_v1',
  TECHNOLOGIES: 'jeho_portfolio_tech_v1',
  SERVICES: 'jeho_portfolio_services_v1',
  INQUIRIES: 'jeho_portfolio_inquiries_v1',
  ADMIN_AUTH: 'jeho_portfolio_admin_auth_v1',
};

export function usePortfolioStore() {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [technologies, setTechnologies] = useState<Technology[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TECHNOLOGIES);
      return saved ? JSON.parse(saved) : INITIAL_TECHNOLOGIES;
    } catch {
      return INITIAL_TECHNOLOGIES;
    }
  });

  const [services, setServices] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [inquiries, setInquiries] = useState<ClientInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TECHNOLOGIES, JSON.stringify(technologies));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [technologies]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [inquiries]);

  // Actions
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    setProjects((prev) => [...prev, newProj]);
    return newProj;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleProjectPublished = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
  };

  const toggleProjectFeatured = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const toggleTechVisible = (id: string) => {
    setTechnologies((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: !t.visible } : t))
    );
  };

  const toggleServiceActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const addInquiry = (inquiry: {
    name: string;
    email: string;
    company?: string;
    projectType: string;
    budget?: string;
    message: string;
  }) => {
    const newInquiry: ClientInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateInquiryStatus = (id: string, newStatus: ClientInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === id) {
          if (canTransitionInquiryStatus(inq.status, newStatus)) {
            return { ...inq, status: newStatus };
          }
        }
        return inq;
      })
    );
  };

  const updateInquiryNotes = (id: string, notes: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, notes } : inq))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  const loginAdmin = (passkey: string): boolean => {
    // Configurable passkey: defaults to 'jeho2026' or 'admin2026'
    if (passkey === 'jeho2026' || passkey === 'admin2026') {
      setIsAdminAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  const resetToDefaults = () => {
    setSettings(INITIAL_SETTINGS);
    setProjects(INITIAL_PROJECTS);
    setTechnologies(INITIAL_TECHNOLOGIES);
    setServices(INITIAL_SERVICES);
    setInquiries(INITIAL_INQUIRIES);
  };

  return {
    settings,
    projects,
    technologies,
    services,
    inquiries,
    isAdminAuthenticated,
    updateSettings,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectPublished,
    toggleProjectFeatured,
    toggleTechVisible,
    toggleServiceActive,
    addInquiry,
    updateInquiryStatus,
    updateInquiryNotes,
    deleteInquiry,
    loginAdmin,
    logoutAdmin,
    resetToDefaults,
  };
}
