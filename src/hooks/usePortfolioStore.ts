import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
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

export function usePortfolioStore() {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [projects, setProjects] = useState<Project[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [inquiries, setInquiries] = useState<ClientInquiry[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize data from Supabase
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('settings')
          .select('*')
          .maybeSingle();

        if (settingsError && settingsError.code !== 'PGRST116') { // PGRST116 means no rows returned
          console.error('Error fetching settings:', settingsError);
        } else if (settingsData) {
          // Map database fields to TypeScript interface
          const mappedSettings: SiteSettings = {
            wordmark: settingsData.wordmark,
            name: settingsData.name,
            title: settingsData.title,
            heroTagline: settingsData.hero_tagline,
            copyrightYear: settingsData.copyright_year,
            accentColor: settingsData.accent_color,
            location: settingsData.location,
            email: settingsData.email,
            whatsappNumber: settingsData.whatsapp_number,
            githubUrl: settingsData.github_url,
            playIntroAnimation: settingsData.play_intro_animation,
            portraitActive: settingsData.portrait_active
          };
          setSettings(mappedSettings);
        }

        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .order('order', { ascending: true });

        if (projectsError && projectsError.code !== 'PGRST116') {
          console.error('Error fetching projects:', projectsError);
        } else if (projectsData) {
          // Map database fields to TypeScript interface
          const mappedProjects: Project[] = projectsData.map((proj: any) => ({
            id: proj.id,
            slug: proj.slug,
            title: proj.title,
            tagline: proj.tagline,
            category: proj.category as any, // Assuming it matches the union type
            categoryLabel: proj.category_label,
            status: proj.status as any, // Assuming it matches the union type
            statusLabel: proj.status_label,
            featured: proj.featured,
            published: proj.published,
            order: proj.order,
            description: proj.description,
            coverImage: proj.cover_image || '',
            technologies: proj.technologies || [],
            liveUrl: proj.live_url || undefined,
            githubUrl: proj.github_url || undefined,
            caseStudy: proj.case_study ? {
              context: proj.case_study.context,
              problem: proj.case_study.problem,
              objectives: proj.case_study.objectives || [],
              solution: proj.case_study.solution,
              architecture: proj.case_study.architecture,
              keyFeatures: proj.case_study.key_features || [],
              challenges: proj.case_study.challenges || [],
              currentState: proj.case_study.current_state,
              nextSteps: proj.case_study.next_steps || []
            } : undefined
          }));
          setProjects(mappedProjects);
        } else {
          // If no projects in DB, use initial data
          setProjects(INITIAL_PROJECTS);
        }

        // Fetch technologies
        const { data: technologiesData, error: technologiesError } = await supabase
          .from('technologies')
          .select('*')
          .order('order', { ascending: true });

        if (technologiesError && technologiesError.code !== 'PGRST116') {
          console.error('Error fetching technologies:', technologiesError);
        } else if (technologiesData) {
          // Map database fields to TypeScript interface
          const mappedTechnologies: Technology[] = technologiesData.map((tech: any) => ({
            id: tech.id,
            name: tech.name,
            category: tech.category as any, // Assuming it matches the union type
            categoryLabel: tech.category_label,
            color: tech.color,
            iconName: tech.icon_name,
            visible: tech.visible,
            order: tech.order
          }));
          setTechnologies(mappedTechnologies);
        } else {
          // If no technologies in DB, use initial data
          setTechnologies(INITIAL_TECHNOLOGIES);
        }

        // Fetch services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .order('order', { ascending: true });

        if (servicesError && servicesError.code !== 'PGRST116') {
          console.error('Error fetching services:', servicesError);
        } else if (servicesData) {
          // Map database fields to TypeScript interface
          const mappedServices: Service[] = servicesData.map((serv: any) => ({
            id: serv.id,
            title: serv.title,
            tagline: serv.tagline,
            description: serv.description,
            deliverables: serv.deliverables || [],
            targetAudience: serv.target_audience,
            icon: serv.icon,
            active: serv.active,
            order: serv.order
          }));
          setServices(mappedServices);
        } else {
          // If no services in DB, use initial data
          setServices(INITIAL_SERVICES);
        }

        // Fetch inquiries
        const { data: inquiriesData, error: inquiriesError } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (inquiriesError && inquiriesError.code !== 'PGRST116') {
          console.error('Error fetching inquiries:', inquiriesError);
        } else if (inquiriesData) {
          // Map database fields to TypeScript interface
          const mappedInquiries: ClientInquiry[] = inquiriesData.map((inq: any) => ({
            id: inq.id,
            name: inq.name,
            email: inq.email,
            company: inq.company || undefined,
            projectType: inq.project_type,
            budget: inq.budget || undefined,
            message: inq.message,
            status: inq.status as any, // Assuming it matches the union type
            createdAt: inq.created_at,
            notes: inq.notes || undefined
          }));
          setInquiries(mappedInquiries);
        } else {
          // If no inquiries in DB, use initial data
          setInquiries(INITIAL_INQUIRIES);
        }

        // Check admin auth status
        const { data: authData, error: authError } = await supabase
          .from('admin_auth')
          .select('*')
          .maybeSingle();

        if (authError && authError.code !== 'PGRST116') {
          console.error('Error fetching admin auth:', authError);
        } else if (authData) {
          setIsAdminAuthenticated(authData.is_authenticated);
        }
      } catch (err) {
        console.error('Error initializing data:', err);
        // Fallback to initial data on error
        setSettings(INITIAL_SETTINGS);
        setProjects(INITIAL_PROJECTS);
        setTechnologies(INITIAL_TECHNOLOGIES);
        setServices(INITIAL_SERVICES);
        setInquiries(INITIAL_INQUIRIES);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // Sync settings to Supabase
  useEffect(() => {
    if (!isLoading) {
      const syncSettings = async () => {
        try {
          const { data: existing } = await supabase
            .from('settings')
            .select('*')
            .maybeSingle();

          if (existing) {
            await supabase
              .from('settings')
              .update({
                wordmark: settings.wordmark,
                name: settings.name,
                title: settings.title,
                hero_tagline: settings.heroTagline,
                copyright_year: settings.copyrightYear,
                accent_color: settings.accentColor,
                location: settings.location,
                email: settings.email,
                whatsapp_number: settings.whatsappNumber,
                github_url: settings.githubUrl,
                play_intro_animation: settings.playIntroAnimation,
                portrait_active: settings.portraitActive,
                updated_at: new Date().toISOString()
              })
              .eq('id', existing.id);
          } else {
            await supabase.from('settings').insert({
              wordmark: settings.wordmark,
              name: settings.name,
              title: settings.title,
              hero_tagline: settings.heroTagline,
              copyright_year: settings.copyrightYear,
              accent_color: settings.accentColor,
              location: settings.location,
              email: settings.email,
              whatsapp_number: settings.whatsappNumber,
              github_url: settings.githubUrl,
              play_intro_animation: settings.playIntroAnimation,
              portrait_active: settings.portraitActive
            });
          }
        } catch (err) {
          console.error('Error syncing settings:', err);
        }
      };

      syncSettings();
    }
  }, [settings, isLoading]);

  // Sync projects to Supabase
  useEffect(() => {
    if (!isLoading) {
      const syncProjects = async () => {
        try {
          // Delete all existing projects
          await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');

          // Insert current projects
          if (projects.length > 0) {
            const projectsToInsert = projects.map((proj) => ({
              id: proj.id,
              slug: proj.slug,
              title: proj.title,
              tagline: proj.tagline,
              category: proj.category,
              category_label: proj.categoryLabel,
              status: proj.status,
              status_label: proj.statusLabel,
              featured: proj.featured,
              published: proj.published,
              order: proj.order,
              description: proj.description,
              cover_image: proj.coverImage,
              live_url: proj.liveUrl || null,
              github_url: proj.githubUrl || null,
              case_study: proj.caseStudy ? {
                context: proj.caseStudy.context,
                problem: proj.caseStudy.problem,
                objectives: proj.caseStudy.objectives,
                solution: proj.caseStudy.solution,
                architecture: proj.caseStudy.architecture,
                keyFeatures: proj.caseStudy.keyFeatures,
                challenges: proj.caseStudy.challenges,
                currentState: proj.caseStudy.currentState,
                nextSteps: proj.caseStudy.nextSteps
              } : null
            }));

            await supabase.from('projects').insert(projectsToInsert);
          }
        } catch (err) {
          console.error('Error syncing projects:', err);
        }
      };

      syncProjects();
    }
  }, [projects, isLoading]);

  // Sync technologies to Supabase
  useEffect(() => {
    if (!isLoading) {
      const syncTechnologies = async () => {
        try {
          // Delete all existing technologies
          await supabase.from('technologies').delete().neq('id', '00000000-0000-0000-0000-000000000000');

          // Insert current technologies
          if (technologies.length > 0) {
            const techsToInsert = technologies.map((tech) => ({
              id: tech.id,
              name: tech.name,
              category: tech.category,
              category_label: tech.categoryLabel,
              color: tech.color,
              icon_name: tech.iconName,
              visible: tech.visible,
              order: tech.order
            }));

            await supabase.from('technologies').insert(techsToInsert);
          }
        } catch (err) {
          console.error('Error syncing technologies:', err);
        }
      };

      syncTechnologies();
    }
  }, [technologies, isLoading]);

  // Sync services to Supabase
  useEffect(() => {
    if (!isLoading) {
      const syncServices = async () => {
        try {
          // Delete all existing services
          await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');

          // Insert current services
          if (services.length > 0) {
            const servicesToInsert = services.map((serv) => ({
              id: serv.id,
              title: serv.title,
              tagline: serv.tagline,
              description: serv.description,
              deliverables: serv.deliverables,
              target_audience: serv.targetAudience,
              icon: serv.icon,
              active: serv.active,
              order: serv.order
            }));

            await supabase.from('services').insert(servicesToInsert);
          }
        } catch (err) {
          console.error('Error syncing services:', err);
        }
      };

      syncServices();
    }
  }, [services, isLoading]);

  // Sync inquiries to Supabase
  useEffect(() => {
    if (!isLoading) {
      const syncInquiries = async () => {
        try {
          // Delete all existing inquiries
          await supabase.from('inquiries').delete().neq('id', '00000000-0000-0000-0000-000000000000');

          // Insert current inquiries
          if (inquiries.length > 0) {
            const inquiriesToInsert = inquiries.map((inq) => ({
              id: inq.id,
              name: inq.name,
              email: inq.email,
              company: inq.company || null,
              project_type: inq.projectType,
              budget: inq.budget || null,
              message: inq.message,
              status: inq.status,
              created_at: inq.createdAt,
              notes: inq.notes || null
            }));

            await supabase.from('inquiries').insert(inquiriesToInsert);
          }
        } catch (err) {
          console.error('Error syncing inquiries:', err);
        }
      };

      syncInquiries();
    }
  }, [inquiries, isLoading]);

  // Sync admin auth to Supabase
  useEffect(() => {
    if (!isLoading) {
      const syncAdminAuth = async () => {
        try {
          const { data: existing } = await supabase
            .from('admin_auth')
            .select('*')
            .maybeSingle();

          if (existing) {
            await supabase
              .from('admin_auth')
              .update({
                is_authenticated: isAdminAuthenticated,
                updated_at: new Date().toISOString()
              })
              .eq('id', existing.id);
          } else {
            await supabase.from('admin_auth').insert({
              is_authenticated: isAdminAuthenticated
            });
          }
        } catch (err) {
          console.error('Error syncing admin auth:', err);
        }
      };

      syncAdminAuth();
    }
  }, [isAdminAuthenticated, isLoading]);

  // Actions
  const updateSettings = useCallback((newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const addProject = useCallback((project: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    setProjects((prev) => [...prev, newProj]);
    return newProj;
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleProjectPublished = useCallback((id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
  }, []);

  const toggleProjectFeatured = useCallback((id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  }, []);

  const toggleTechVisible = useCallback((id: string) => {
    setTechnologies((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: !t.visible } : t))
    );
  }, []);

  const toggleServiceActive = useCallback((id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  }, []);

  const addInquiry = useCallback((inquiry: {
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
  }, []);

  const updateInquiryStatus = useCallback((id: string, newStatus: ClientInquiry['status']) => {
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
  }, []);

  const updateInquiryNotes = useCallback((id: string, notes: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, notes } : inq))
    );
  }, []);

  const deleteInquiry = useCallback((id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  }, []);

  const loginAdmin = useCallback((passkey: string): boolean => {
    // Configurable passkey: defaults to 'jeho2026' or 'admin2026'
    if (passkey === 'jeho2026' || passkey === 'admin2026') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    setIsAdminAuthenticated(false);
  }, []);

  const resetToDefaults = useCallback(() => {
    setSettings(INITIAL_SETTINGS);
    setProjects(INITIAL_PROJECTS);
    setTechnologies(INITIAL_TECHNOLOGIES);
    setServices(INITIAL_SERVICES);
    setInquiries(INITIAL_INQUIRIES);
    setIsAdminAuthenticated(false);
  }, []);

  return {
    settings,
    projects,
    technologies,
    services,
    inquiries,
    isAdminAuthenticated,
    isLoading,
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
    resetToDefaults
  };
}