import {
  SubsidiaryTenant,
  UserProfile,
  ClientData,
  FinancialData,
  OperationalMetric,
  ProjectData,
  OperationalUpdate,
  TenantId,
} from '../types';

export const SUBSIDIARY_TENANTS: Record<TenantId, SubsidiaryTenant> = {
  'tenant-energy': {
    id: 'tenant-energy',
    name: 'Kalahari Green Energy & Solar',
    code: 'KLH-NRG',
    sector: 'Northern Cape Solar & Eskom Grid Storage',
    tagline: 'Concentrated Solar Power (CSP) & Industrial Lithium-Iron Microgrids',
    description: 'Premier clean utility provider operating 14.8 GW of tracking solar arrays in Upington and Kathu, directly buffering the national Eskom power corridor.',
    headquarters: 'Upington & Cape Town, South Africa',
    founded: 2017,
    employeeCount: 1240,
    currency: 'ZAR',
    brandColor: '#d97706', // Amber-600
    theme: {
      primaryBg: 'bg-amber-600',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      badgeText: 'text-amber-600',
      accentBorder: 'border-amber-500',
      gradient: 'from-amber-600 to-orange-700',
    },
    iconName: 'Zap',
  },
  'tenant-fin': {
    id: 'tenant-fin',
    name: 'Sandton Capital & FinTech',
    code: 'SND-FIN',
    sector: 'JSE Clearing, SARB RTGS & Payment Rails',
    tagline: 'Sub-Millisecond Settlement & Interbank Payment Infrastructure',
    description: 'Tier-1 financial clearinghouse processing high-volume trade matching on the Johannesburg Stock Exchange and interbank settlements under SARB oversight.',
    headquarters: 'Sandton (Johannesburg), South Africa',
    founded: 2013,
    employeeCount: 780,
    currency: 'ZAR',
    brandColor: '#2563eb', // Blue-600
    theme: {
      primaryBg: 'bg-blue-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      badgeText: 'text-blue-600',
      accentBorder: 'border-blue-500',
      gradient: 'from-blue-600 to-indigo-700',
    },
    iconName: 'Landmark',
  },
  'tenant-logistics': {
    id: 'tenant-logistics',
    name: 'Trans-Vaal & Durban Port Logistics',
    code: 'TVL-LOG',
    sector: 'Maritime Container Freight & Sub-Saharan Rail',
    tagline: 'Durban Deep-Water Harbor Hubs & Trans-Kalahari Corridor',
    description: 'South Africa’s premier intermodal freight network managing 240,000 TEU reefers annually across Durban Harbor, Richards Bay, and City Deep dry docks.',
    headquarters: 'Durban Harbor & City Deep (Joburg), South Africa',
    founded: 2009,
    employeeCount: 3450,
    currency: 'ZAR',
    brandColor: '#0d9488', // Teal-600
    theme: {
      primaryBg: 'bg-teal-600',
      badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
      badgeText: 'text-teal-600',
      accentBorder: 'border-teal-500',
      gradient: 'from-teal-600 to-emerald-800',
    },
    iconName: 'Ship',
  },
  'tenant-bio': {
    id: 'tenant-bio',
    name: 'Cape BioTherapeutics & Genomics',
    code: 'CPT-BIO',
    sector: 'Molecular Virology & Sub-Saharan Clinical Trials',
    tagline: 'Targeted mRNA Immunotherapies & Infectious Disease Genomics',
    description: 'Leading biopharmaceutical laboratory running Phase II/III clinical cohorts in HIV, TB, and personalized oncology therapeutics across sub-Saharan Africa.',
    headquarters: 'Stellenbosch Tech Park & Cape Town, South Africa',
    founded: 2016,
    employeeCount: 920,
    currency: 'ZAR',
    brandColor: '#059669', // Emerald-600
    theme: {
      primaryBg: 'bg-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badgeText: 'text-emerald-600',
      accentBorder: 'border-emerald-500',
      gradient: 'from-emerald-600 to-teal-700',
    },
    iconName: 'Dna',
  },
  'tenant-aero': {
    id: 'tenant-aero',
    name: 'Kruger Aerospace & Avionics',
    code: 'KRG-AERO',
    sector: 'Defense Avionics & Autonomous Surveillance',
    tagline: 'High-Altitude Anti-Poaching UAVs & Composite Airframes',
    description: 'Aerospace systems manufacturer developing long-endurance solar drones, radar sensor suites, and military-grade telemetry for Southern African wildlife and border defense.',
    headquarters: 'Centurion (Pretoria), South Africa',
    founded: 2012,
    employeeCount: 1100,
    currency: 'ZAR',
    brandColor: '#0284c7', // Sky-600
    theme: {
      primaryBg: 'bg-sky-600',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
      badgeText: 'text-sky-600',
      accentBorder: 'border-sky-500',
      gradient: 'from-sky-600 to-cyan-700',
    },
    iconName: 'Plane',
  },
  'tenant-retail': {
    id: 'tenant-retail',
    name: 'Mzansi Luxury & Artisan Brands',
    code: 'MZN-LUX',
    sector: 'High-End African Fashion & Botanicals',
    tagline: 'V&A Waterfront Flagships, Karoo Mohair & Indigenous Perfumery',
    description: 'Curator of heritage African luxury houses, ethical gold & diamond artisan collections, and high-margin direct-to-consumer digital flagships.',
    headquarters: 'V&A Waterfront (Cape Town) & Rosebank (Joburg), South Africa',
    founded: 2014,
    employeeCount: 1650,
    currency: 'ZAR',
    brandColor: '#e11d48', // Rose-600
    theme: {
      primaryBg: 'bg-rose-600',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      badgeText: 'text-rose-600',
      accentBorder: 'border-rose-500',
      gradient: 'from-rose-600 to-pink-700',
    },
    iconName: 'ShoppingBag',
  },
  'tenant-cyber': {
    id: 'tenant-cyber',
    name: 'Protea CyberShield & Intelligence',
    code: 'PRT-SEC',
    sector: 'Autonomous SecOps & POPIA Data Defense',
    tagline: 'Sovereign Threat Hunting & Critical Infrastructure Defense',
    description: 'Elite national cyber operations protecting critical South African banking grids, POPIA compliance repositories, and telecommunications telemetry.',
    headquarters: 'Pretoria & Sandton, South Africa',
    founded: 2018,
    employeeCount: 690,
    currency: 'ZAR',
    brandColor: '#7c3aed', // Violet-600
    theme: {
      primaryBg: 'bg-violet-600',
      badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
      badgeText: 'text-violet-600',
      accentBorder: 'border-violet-500',
      gradient: 'from-violet-600 to-purple-800',
    },
    iconName: 'ShieldAlert',
  },
};

export const MOCK_USERS: UserProfile[] = [
  // 1. Kalahari Green Energy
  {
    id: 'usr-energy-emp',
    name: 'Tariq Hendricks',
    email: 't.hendricks@kalahari-energy.ubuntu.co.za',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    role: 'standard',
    roleLabel: 'Standard Employee',
    tenantId: 'tenant-energy',
    department: 'Upington Substation Operations',
    title: 'Senior Photovoltaic Systems Technician',
    clearanceLevel: 'Level 2 (Grid Operations Only)',
  },
  {
    id: 'usr-energy-mgr',
    name: 'Naledi Ndlovu',
    email: 'n.ndlovu@kalahari-energy.ubuntu.co.za',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    role: 'manager',
    roleLabel: 'Manager / Admin',
    tenantId: 'tenant-energy',
    department: 'Northern Cape Generation Executive',
    title: 'VP of Eskom Interconnects & Tariffs',
    clearanceLevel: 'Level 5 (Full Financial & PPA Contracts)',
  },

  // 2. Sandton Capital FinTech
  {
    id: 'usr-fin-emp',
    name: 'Sipho Dlamini',
    email: 's.dlamini@sandton-capital.ubuntu.co.za',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    role: 'standard',
    roleLabel: 'Standard Employee',
    tenantId: 'tenant-fin',
    department: 'JSE High-Frequency Telemetry',
    title: 'Clearing Engine Core Developer',
    clearanceLevel: 'Level 2 (Telemetry & Code Ops)',
  },
  {
    id: 'usr-fin-mgr',
    name: 'Pieter van der Merwe',
    email: 'p.vandermerwe@sandton-capital.ubuntu.co.za',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    role: 'manager',
    roleLabel: 'Manager / Admin',
    tenantId: 'tenant-fin',
    department: 'Sandton Treasury & Custody',
    title: 'Managing Director & Chief Risk Officer',
    clearanceLevel: 'Level 5 (Full JSE P&L & SARB Liquidity)',
  },

  // 3. Trans-Vaal Logistics
  {
    id: 'usr-logistics-emp',
    name: 'Johan Botha',
    email: 'j.botha@transvaal-logistics.ubuntu.co.za',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
    role: 'standard',
    roleLabel: 'Standard Employee',
    tenantId: 'tenant-logistics',
    department: 'Durban Harbor Port Operations',
    title: 'Container Berth Logistics Coordinator',
    clearanceLevel: 'Level 2 (Manifests & Tracking Only)',
  },
  {
    id: 'usr-logistics-mgr',
    name: 'Nomvula Zulu',
    email: 'n.zulu@transvaal-logistics.ubuntu.co.za',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80',
    role: 'manager',
    roleLabel: 'Manager / Admin',
    tenantId: 'tenant-logistics',
    department: 'Maritime Fleet Directorate',
    title: 'Global Supply Chain & Tariffs Director',
    clearanceLevel: 'Level 5 (Full Transnet P&L & Port Contracts)',
  },

  // 4. Cape BioTherapeutics
  {
    id: 'usr-bio-emp',
    name: 'Liam van Zyl',
    email: 'l.vanzyl@cape-bio.ubuntu.co.za',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    role: 'standard',
    roleLabel: 'Standard Employee',
    tenantId: 'tenant-bio',
    department: 'Stellenbosch Cleanroom Assays',
    title: 'Cellular Bioprocess Specialist',
    clearanceLevel: 'Level 2 (Lab Workflows Only)',
  },
  {
    id: 'usr-bio-mgr',
    name: 'Dr. Zanele Mthembu',
    email: 'z.mthembu@cape-bio.ubuntu.co.za',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    role: 'manager',
    roleLabel: 'Manager / Admin',
    tenantId: 'tenant-bio',
    department: 'Sub-Saharan Clinical R&D',
    title: 'Chief Medical Officer & VP Clinical Research',
    clearanceLevel: 'Level 5 (Full Clinical & SAMRC Grant Access)',
  },

  // 5. Kruger Aerospace
  {
    id: 'usr-aero-emp',
    name: 'Kagiso Motsepe',
    email: 'k.motsepe@kruger-aero.ubuntu.co.za',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    role: 'standard',
    roleLabel: 'Standard Employee',
    tenantId: 'tenant-aero',
    department: 'Centurion UAV Telemetry Rig',
    title: 'Autonomous Avionics Engineer',
    clearanceLevel: 'Level 2 (Flight Operations Only)',
  },
  {
    id: 'usr-aero-mgr',
    name: 'Dr. Evelyn Sterling-Kruger',
    email: 'e.kruger@kruger-aero.ubuntu.co.za',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    role: 'manager',
    roleLabel: 'Manager / Admin',
    tenantId: 'tenant-aero',
    department: 'Defense Programs & Armaments',
    title: 'VP of Aerospace Engineering & SANDF Contracts',
    clearanceLevel: 'Level 5 (Full Military Contracts & P&L)',
  },

  // 6. Mzansi Luxury
  {
    id: 'usr-retail-emp',
    name: 'Lerato Khumalo',
    email: 'l.khumalo@mzansi-luxury.ubuntu.co.za',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    role: 'standard',
    roleLabel: 'Standard Employee',
    tenantId: 'tenant-retail',
    department: 'V&A Waterfront Flagship',
    title: 'Visual Merchandising Director',
    clearanceLevel: 'Level 2 (Catalog & Creative Assets)',
  },
  {
    id: 'usr-retail-mgr',
    name: 'Bongani Sithole',
    email: 'b.sithole@mzansi-luxury.ubuntu.co.za',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    role: 'manager',
    roleLabel: 'Manager / Admin',
    tenantId: 'tenant-retail',
    department: 'African Haute Horlogerie & Couture',
    title: 'Commercial Brand President & Retail VP',
    clearanceLevel: 'Level 5 (VIP Client Accounts & Margin Books)',
  },

  // 7. Protea CyberShield
  {
    id: 'usr-cyber-emp',
    name: 'Fatima Patel',
    email: 'f.patel@protea-sec.ubuntu.co.za',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80',
    role: 'standard',
    roleLabel: 'Standard Employee',
    tenantId: 'tenant-cyber',
    department: 'Pretoria SOC Level 2 Telemetry',
    title: 'Incident Detection & POPIA Compliance Analyst',
    clearanceLevel: 'Level 2 (Telemetry Queues)',
  },
  {
    id: 'usr-cyber-mgr',
    name: 'Thabo Mokoena',
    email: 't.mokoena@protea-sec.ubuntu.co.za',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
    role: 'manager',
    roleLabel: 'Manager / Admin',
    tenantId: 'tenant-cyber',
    department: 'National Zero-Trust Directorate',
    title: 'Chief Information Security Officer (CISO)',
    clearanceLevel: 'Level 5 (National Security & SARB Authority)',
  },
];

// SENSITIVE CLIENT DATA (Only accessible by Managers of specific South African tenant)
export const MOCK_CLIENTS: Record<TenantId, ClientData[]> = {
  'tenant-energy': [
    {
      id: 'cli-nrg-01',
      name: 'Eskom National Transmission SOC',
      code: 'ESKOM-TX-01',
      industry: 'State Power Utility',
      contractValue: 450000000, // R450 Million
      tier: 'Strategic',
      status: 'Active',
      primaryContact: 'Mthunzi Mabaso',
      contactEmail: 'm.mabaso@eskom.co.za',
      ndaStatus: 'Strict Military NDA',
      renewalDate: '2028-12-31',
      sensitiveNotes: 'National Key Point status. 4.2 GWh peak tariff support during stage 4 load shedding mitigations. Strict POPIA compliance.',
    },
    {
      id: 'cli-nrg-02',
      name: 'City of Cape Town Energy Grid',
      code: 'CPT-METRO-09',
      industry: 'Municipal Infrastructure',
      contractValue: 180000000, // R180 Million
      tier: 'Enterprise',
      status: 'Active',
      primaryContact: 'Candice Petersen',
      contactEmail: 'candice.petersen@capetown.gov.za',
      ndaStatus: 'Active NDA (Signed)',
      renewalDate: '2027-06-30',
      sensitiveNotes: 'Steenbras pumped storage battery pairing agreement. Municipal penalty clause: R250k per 30-minute unscheduled disconnect.',
    },
    {
      id: 'cli-nrg-03',
      name: 'Sasol Secunda Clean Energy Operations',
      code: 'SASOL-SEC-44',
      industry: 'Energy & Chemicals',
      contractValue: 125000000, // R125 Million
      tier: 'Tier-1 Partner',
      status: 'Renewing',
      primaryContact: 'Dirk van Vuuren',
      contactEmail: 'dirk.vanvuuren@sasol.com',
      ndaStatus: 'Bilateral Compliance',
      renewalDate: '2026-11-15',
      sensitiveNotes: 'High-density solar wheeling over Eskom grid lines to Mpumalanga plant. Decarbonization carbon credit yield 18%.',
    },
  ],
  'tenant-fin': [
    {
      id: 'cli-fin-01',
      name: 'Standard Bank Institutional Treasury',
      code: 'SB-CORP-99',
      industry: 'Tier-1 Commercial Banking',
      contractValue: 520000000, // R520 Million
      tier: 'Strategic',
      status: 'Active',
      primaryContact: 'Sifiso Buthelezi',
      contactEmail: 's.buthelezi@standardbank.co.za',
      ndaStatus: 'Strict Military NDA',
      renewalDate: '2028-09-30',
      sensitiveNotes: 'Algorithmic FX liquidity cross-connect in Sandton. High availability SLA penalty: R180,000 per 5ms downtime.',
    },
    {
      id: 'cli-fin-02',
      name: 'Johannesburg Stock Exchange (JSE)',
      code: 'JSE-MKT-01',
      industry: 'Equities & Derivatives Exchange',
      contractValue: 340000000, // R340 Million
      tier: 'Strategic',
      status: 'Active',
      primaryContact: 'Leila Naidoo',
      contactEmail: 'l.naidoo@jse.co.za',
      ndaStatus: 'Active NDA (Signed)',
      renewalDate: '2027-11-20',
      sensitiveNotes: 'Ultra-low latency settlement node for Top 40 equities. SARB quarterly regulatory compliance signed off.',
    },
    {
      id: 'cli-fin-03',
      name: 'Discovery Bank & Vitality Treasury',
      code: 'DISC-BK-22',
      industry: 'Digital Banking',
      contractValue: 195000000, // R195 Million
      tier: 'Enterprise',
      status: 'Active',
      primaryContact: 'Gerhard Louw',
      contactEmail: 'glouw@discovery.co.za',
      ndaStatus: 'Bilateral Compliance',
      renewalDate: '2027-04-15',
      sensitiveNotes: 'Real-time PayShap rapid payment rail routing and high-yield interbank digital cash sweeps.',
    },
  ],
  'tenant-logistics': [
    {
      id: 'cli-log-01',
      name: 'Transnet Port Terminals (Durban Container Terminal)',
      code: 'TPT-DCT-01',
      industry: 'State Freight & Harbor Logistics',
      contractValue: 610000000, // R610 Million
      tier: 'Strategic',
      status: 'Active',
      primaryContact: 'Captain Khanyisile Gumede',
      contactEmail: 'k.gumede@transnet.net',
      ndaStatus: 'Strict Military NDA',
      renewalDate: '2029-02-28',
      sensitiveNotes: 'Pier 2 automated straddle carrier telemetry and berthing slot prioritization. B-BBEE Level 1 status prerequisite.',
    },
    {
      id: 'cli-log-02',
      name: 'Citrus Growers Association (CGA) Export Fleet',
      code: 'CGA-EXP-88',
      industry: 'Agri-Export Cold Chain',
      contractValue: 275000000, // R275 Million
      tier: 'Enterprise',
      status: 'Active',
      primaryContact: 'Justin Chadwick',
      contactEmail: 'j.chadwick@cga.co.za',
      ndaStatus: 'Active NDA (Signed)',
      renewalDate: '2027-08-15',
      sensitiveNotes: 'Continuous cryogenic temperature monitoring for 48,000 refrigerated containers to Rotterdam and Shanghai.',
    },
    {
      id: 'cli-log-03',
      name: 'Anglo American Sub-Saharan Mineral Freight',
      code: 'AAL-FREIGHT-10',
      industry: 'Mining & Heavy Intermodal',
      contractValue: 380000000, // R380 Million
      tier: 'Strategic',
      status: 'Renewing',
      primaryContact: 'Christo Venter',
      contactEmail: 'christo.venter@angloamerican.com',
      ndaStatus: 'Bilateral Compliance',
      renewalDate: '2026-12-01',
      sensitiveNotes: 'Bulk rail freight from Sishen iron ore mine to Saldanha Bay deep-water export terminal.',
    },
  ],
  'tenant-bio': [
    {
      id: 'cli-bio-01',
      name: 'South African Medical Research Council (SAMRC)',
      code: 'SAMRC-GOV-01',
      industry: 'National Health Research',
      contractValue: 420000000, // R420 Million
      tier: 'Strategic',
      status: 'Active',
      primaryContact: 'Prof. Glenda Gray',
      contactEmail: 'glenda.gray@mrc.ac.za',
      ndaStatus: 'Strict Military NDA',
      renewalDate: '2028-10-31',
      sensitiveNotes: 'mRNA genomic adjuvant clinical trials for multi-drug resistant tuberculosis (MDR-TB). SAHPRA compliance Level 4.',
    },
    {
      id: 'cli-bio-02',
      name: 'Aspen Pharmacare Biologics Gqeberha',
      code: 'ASPEN-BIO-77',
      industry: 'Commercial Pharma Manufacturing',
      contractValue: 290000000, // R290 Million
      tier: 'Enterprise',
      status: 'Active',
      primaryContact: 'Stephen Saad',
      contactEmail: 'ssaad@aspenpharma.com',
      ndaStatus: 'Active NDA (Signed)',
      renewalDate: '2027-05-20',
      sensitiveNotes: 'Sterile vial formulation and cold fill-finish royalty sharing agreement for sub-Saharan distribution.',
    },
    {
      id: 'cli-bio-03',
      name: 'Africa Centres for Disease Control (Africa CDC)',
      code: 'ACDC-VIRO-30',
      industry: 'Continental Health Agency',
      contractValue: 165000000, // R165 Million
      tier: 'Tier-1 Partner',
      status: 'Renewing',
      primaryContact: 'Dr. Jean Kaseya',
      contactEmail: 'jkaseya@africacdc.org',
      ndaStatus: 'Bilateral Compliance',
      renewalDate: '2026-11-30',
      sensitiveNotes: 'Pathogen surveillance genome sequencing hub across SADC member states.',
    },
  ],
  'tenant-aero': [
    {
      id: 'cli-aero-01',
      name: 'South African National Defence Force (SANDF)',
      code: 'SANDF-AIR-09',
      industry: 'State Defense & Air Force',
      contractValue: 480000000, // R480 Million
      tier: 'Strategic',
      status: 'Active',
      primaryContact: 'Brig. Gen. Mpho Modise',
      contactEmail: 'm.modise@dod.mil.za',
      ndaStatus: 'Strict Military NDA',
      renewalDate: '2029-03-31',
      sensitiveNotes: 'Classified Rooivalk avionics modernization & border patrol long-endurance solar UAV telemetry. NCACC export cleared.',
    },
    {
      id: 'cli-aero-02',
      name: 'SANParks National Anti-Poaching Aviation',
      code: 'SANPARKS-KNP-14',
      industry: 'Wildlife Conservation & Parks',
      contractValue: 145000000, // R145 Million
      tier: 'Enterprise',
      status: 'Active',
      primaryContact: 'Major Gen. Johan Jooste',
      contactEmail: 'j.jooste@sanparks.org',
      ndaStatus: 'Active NDA (Signed)',
      renewalDate: '2027-07-15',
      sensitiveNotes: 'Kruger National Park night-vision FLIR thermal drones with automated acoustic gunshot triangulation.',
    },
    {
      id: 'cli-aero-03',
      name: 'Paramount Aerospace Systems',
      code: 'PARAMOUNT-AERO',
      industry: 'Private Defense Contracting',
      contractValue: 210000000, // R210 Million
      tier: 'Tier-1 Partner',
      status: 'Renewing',
      primaryContact: 'Ivor Ichikowitz',
      contactEmail: 'i.ichikowitz@paramountgroup.com',
      ndaStatus: 'Bilateral Compliance',
      renewalDate: '2026-10-31',
      sensitiveNotes: 'AHRLAC / Mwari composite winglet structure subcontract for international peacekeeping air forces.',
    },
  ],
  'tenant-retail': [
    {
      id: 'cli-ret-01',
      name: 'Woolworths VIP Reserve & Black Label',
      code: 'WHL-RES-01',
      industry: 'Premium Retail Conglomerate',
      contractValue: 390000000, // R390 Million
      tier: 'Strategic',
      status: 'Active',
      primaryContact: 'Roy Bagattini',
      contactEmail: 'rbagattini@woolworths.co.za',
      ndaStatus: 'Strict Military NDA',
      renewalDate: '2028-11-15',
      sensitiveNotes: 'Exclusive Cape floral protea botanical fragrance and organic Karoo certified merino wool apparel lines.',
    },
    {
      id: 'cli-ret-02',
      name: 'The Diamond Works Luxury Portfolio',
      code: 'TDW-CPT-55',
      industry: 'Jewelry & Precious Gems',
      contractValue: 215000000, // R215 Million
      tier: 'Enterprise',
      status: 'Active',
      primaryContact: 'Annetjie Rossouw',
      contactEmail: 'annetjie@thediamondworks.co.za',
      ndaStatus: 'Active NDA (Signed)',
      renewalDate: '2027-09-01',
      sensitiveNotes: 'Ethically certified Kimberley and Cullinan heritage diamond bespoke private client showroom leases.',
    },
    {
      id: 'cli-ret-03',
      name: 'Delaire Graff Estate Boutiques',
      code: 'DELAIRE-STELL-08',
      industry: 'Luxury Hospitality & Salons',
      contractValue: 145000000, // R145 Million
      tier: 'Tier-1 Partner',
      status: 'Under Review',
      primaryContact: 'Francois Pienaar',
      contactEmail: 'fpienaar@delaire.co.za',
      ndaStatus: 'Bilateral Compliance',
      renewalDate: '2026-11-25',
      sensitiveNotes: 'Stellenbosch high-fashion salon revenue turnover commission fixed at 19.2%.',
    },
  ],
  'tenant-cyber': [
    {
      id: 'cli-cyb-01',
      name: 'South African Reserve Bank (SARB) Cyber Command',
      code: 'SARB-CYBER-01',
      industry: 'Central Bank & National Regulator',
      contractValue: 580000000, // R580 Million
      tier: 'Strategic',
      status: 'Active',
      primaryContact: 'Lesetja Kganyago',
      contactEmail: 'cyberops@resbank.co.za',
      ndaStatus: 'Strict Military NDA',
      renewalDate: '2029-06-30',
      sensitiveNotes: 'National RTGS core payment network threat detection and quantum cryptosystem monitoring. POPIA Section 19 audited.',
    },
    {
      id: 'cli-cyb-02',
      name: 'Vodacom South Africa Enterprise Security',
      code: 'VOD-SEC-88',
      industry: 'Telecommunications & 5G Core',
      contractValue: 310000000, // R310 Million
      tier: 'Strategic',
      status: 'Active',
      primaryContact: 'Shameel Joosub',
      contactEmail: 's.joosub@vodacom.co.za',
      ndaStatus: 'Active NDA (Signed)',
      renewalDate: '2027-12-15',
      sensitiveNotes: '5G core packet inspection and subscriber identity encryption protecting 45 million South African subscribers.',
    },
    {
      id: 'cli-cyb-03',
      name: 'State Information Technology Agency (SITA)',
      code: 'SITA-FED-04',
      industry: 'Government Digital Infrastructure',
      contractValue: 240000000, // R240 Million
      tier: 'Enterprise',
      status: 'Active',
      primaryContact: 'Dr. Bongani Mabaso',
      contactEmail: 'b.mabaso@sita.co.za',
      ndaStatus: 'Strict Military NDA',
      renewalDate: '2028-04-10',
      sensitiveNotes: 'National Department of Home Affairs and SARS tax data zero-trust perimeter defense.',
    },
  ],
};

// SENSITIVE FINANCIAL DATA (Only accessible by Managers of specific South African tenant)
export const MOCK_FINANCIALS: Record<TenantId, FinancialData> = {
  'tenant-energy': {
    totalRevenue: 1850000000, // R1.85 Billion
    revenueGrowth: 31.4,
    grossMargin: 42.8,
    ebitda: 520000000,
    ebitdaMargin: 28.1,
    runwayMonths: 32,
    cashReserves: 740000000,
    monthlyBurn: 24500000,
    quarterlyMetrics: [
      { quarter: 'Q1 (Summer Peak)', revenue: 490000000, expenses: 345000000, ebitda: 145000000 },
      { quarter: 'Q2', revenue: 440000000, expenses: 318000000, ebitda: 122000000 },
      { quarter: 'Q3', revenue: 430000000, expenses: 312000000, ebitda: 118000000 },
      { quarter: 'Q4 (Summer Proj)', revenue: 490000000, expenses: 355000000, ebitda: 135000000 },
    ],
    costBreakdown: [
      { category: 'Solar Tracking Rigs & Upington Inverter Arrays', amount: 590000000, percentage: 44 },
      { category: 'Substation Interconnect Civil Engineering', amount: 360000000, percentage: 27 },
      { category: 'NERSA National Energy Regulator Licensing', amount: 200000000, percentage: 15 },
      { category: 'Field Technical Crews & Karoo Dust Cleaning', amount: 160000000, percentage: 12 },
    ],
    recentInvoices: [
      { id: 'INV-KLH-801', client: 'Eskom National Transmission SOC', amount: 112500000, dueDate: '2026-11-15', status: 'Paid' },
      { id: 'INV-KLH-802', client: 'City of Cape Town Energy Grid', amount: 45000000, dueDate: '2026-11-30', status: 'Pending' },
      { id: 'INV-KLH-803', client: 'Sasol Secunda Clean Energy Operations', amount: 31250000, dueDate: '2026-10-25', status: 'Paid' },
    ],
  },
  'tenant-fin': {
    totalRevenue: 2450000000, // R2.45 Billion
    revenueGrowth: 26.8,
    grossMargin: 79.4,
    ebitda: 980000000,
    ebitdaMargin: 40.0,
    runwayMonths: 46,
    cashReserves: 1320000000,
    monthlyBurn: 32000000,
    quarterlyMetrics: [
      { quarter: 'Q1', revenue: 580000000, expenses: 340000000, ebitda: 240000000 },
      { quarter: 'Q2', revenue: 610000000, expenses: 365000000, ebitda: 245000000 },
      { quarter: 'Q3', revenue: 625000000, expenses: 375000000, ebitda: 250000000 },
      { quarter: 'Q4 (Year-End Proj)', revenue: 635000000, expenses: 390000000, ebitda: 245000000 },
    ],
    costBreakdown: [
      { category: 'Dark Fiber & Teraco Isando Co-Location Latency', amount: 560000000, percentage: 41 },
      { category: 'Quantitative Financial Engineers & JSE Devs', amount: 420000000, percentage: 31 },
      { category: 'SARB & FSCA Regulatory Compliance & Auditing', amount: 230000000, percentage: 17 },
      { category: 'Capital Hedging & Rand Volatility Insurance', amount: 150000000, percentage: 11 },
    ],
    recentInvoices: [
      { id: 'INV-SND-901', client: 'Standard Bank Institutional Treasury', amount: 130000000, dueDate: '2026-11-05', status: 'Paid' },
      { id: 'INV-SND-902', client: 'Johannesburg Stock Exchange (JSE)', amount: 85000000, dueDate: '2026-11-20', status: 'Pending' },
      { id: 'INV-SND-903', client: 'Discovery Bank & Vitality Treasury', amount: 48750000, dueDate: '2026-10-31', status: 'Paid' },
    ],
  },
  'tenant-logistics': {
    totalRevenue: 3820000000, // R3.82 Billion
    revenueGrowth: 15.6,
    grossMargin: 31.2,
    ebitda: 640000000,
    ebitdaMargin: 16.8,
    runwayMonths: 28,
    cashReserves: 890000000,
    monthlyBurn: 48000000,
    quarterlyMetrics: [
      { quarter: 'Q1 (Citrus Export)', revenue: 990000000, expenses: 825000000, ebitda: 165000000 },
      { quarter: 'Q2', revenue: 940000000, expenses: 785000000, ebitda: 155000000 },
      { quarter: 'Q3', revenue: 930000000, expenses: 780000000, ebitda: 150000000 },
      { quarter: 'Q4 (Proj)', revenue: 960000000, expenses: 790000000, ebitda: 170000000 },
    ],
    costBreakdown: [
      { category: 'Marine Bunker Heavy Fuel & Transnet Harbor Fees', amount: 1450000000, percentage: 46 },
      { category: 'Intermodal Fleet Maintenance & Rail Bogies', amount: 850000000, percentage: 27 },
      { category: 'Cold-Chain Cryogenic Sensor Maintenance', amount: 470000000, percentage: 15 },
      { category: 'SARS Customs Tariffs & SADC Cross-Border Admin', amount: 380000000, percentage: 12 },
    ],
    recentInvoices: [
      { id: 'INV-TVL-301', client: 'Transnet Port Terminals (Durban Container Terminal)', amount: 152500000, dueDate: '2026-11-08', status: 'Paid' },
      { id: 'INV-TVL-302', client: 'Anglo American Sub-Saharan Mineral Freight', amount: 95000000, dueDate: '2026-11-22', status: 'Pending' },
      { id: 'INV-TVL-303', client: 'Citrus Growers Association (CGA) Export Fleet', amount: 68750000, dueDate: '2026-10-29', status: 'Paid' },
    ],
  },
  'tenant-bio': {
    totalRevenue: 1580000000, // R1.58 Billion
    revenueGrowth: 34.2,
    grossMargin: 67.5,
    ebitda: 430000000,
    ebitdaMargin: 27.2,
    runwayMonths: 30,
    cashReserves: 620000000,
    monthlyBurn: 28000000,
    quarterlyMetrics: [
      { quarter: 'Q1', revenue: 370000000, expenses: 268000000, ebitda: 102000000 },
      { quarter: 'Q2', revenue: 395000000, expenses: 288000000, ebitda: 107000000 },
      { quarter: 'Q3', revenue: 405000000, expenses: 295000000, ebitda: 110000000 },
      { quarter: 'Q4 (Proj)', revenue: 410000000, expenses: 299000000, ebitda: 111000000 },
    ],
    costBreakdown: [
      { category: 'Sub-Saharan Clinical Trial Cohorts & Nurses', amount: 580000000, percentage: 51 },
      { category: 'Stellenbosch Bioreactor Cleanroom Equipment', amount: 260000000, percentage: 23 },
      { category: 'SAHPRA & WHO Regulatory Approvals', amount: 170000000, percentage: 15 },
      { category: 'Pathogen Genomics High-Performance Compute', amount: 130000000, percentage: 11 },
    ],
    recentInvoices: [
      { id: 'INV-CPT-441', client: 'South African Medical Research Council (SAMRC)', amount: 105000000, dueDate: '2026-11-10', status: 'Paid' },
      { id: 'INV-CPT-442', client: 'Aspen Pharmacare Biologics Gqeberha', amount: 72500000, dueDate: '2026-11-28', status: 'Pending' },
      { id: 'INV-CPT-443', client: 'Africa Centres for Disease Control (Africa CDC)', amount: 41250000, dueDate: '2026-10-20', status: 'Paid' },
    ],
  },
  'tenant-aero': {
    totalRevenue: 2150000000, // R2.15 Billion
    revenueGrowth: 21.5,
    grossMargin: 41.2,
    ebitda: 490000000,
    ebitdaMargin: 22.8,
    runwayMonths: 35,
    cashReserves: 780000000,
    monthlyBurn: 29000000,
    quarterlyMetrics: [
      { quarter: 'Q1', revenue: 510000000, expenses: 395000000, ebitda: 115000000 },
      { quarter: 'Q2', revenue: 535000000, expenses: 415000000, ebitda: 120000000 },
      { quarter: 'Q3', revenue: 545000000, expenses: 420000000, ebitda: 125000000 },
      { quarter: 'Q4 (Proj)', revenue: 560000000, expenses: 430000000, ebitda: 130000000 },
    ],
    costBreakdown: [
      { category: 'Centurion Carbon Fiber & Avionics Labs', amount: 680000000, percentage: 41 },
      { category: 'Military Radar & Flir Thermal Sensor Suites', amount: 500000000, percentage: 30 },
      { category: 'SANDF & NCACC Defense Compliance Audits', amount: 260000000, percentage: 16 },
      { category: 'Flight Test Pilots & Autonomous Telemetry Staff', amount: 215000000, percentage: 13 },
    ],
    recentInvoices: [
      { id: 'INV-KRG-101', client: 'South African National Defence Force (SANDF)', amount: 120000000, dueDate: '2026-11-15', status: 'Paid' },
      { id: 'INV-KRG-102', client: 'Paramount Aerospace Systems', amount: 52500000, dueDate: '2026-11-30', status: 'Pending' },
      { id: 'INV-KRG-103', client: 'SANParks National Anti-Poaching Aviation', amount: 36250000, dueDate: '2026-10-25', status: 'Paid' },
    ],
  },
  'tenant-retail': {
    totalRevenue: 2890000000, // R2.89 Billion
    revenueGrowth: 23.4,
    grossMargin: 69.8,
    ebitda: 780000000,
    ebitdaMargin: 27.0,
    runwayMonths: 38,
    cashReserves: 960000000,
    monthlyBurn: 34000000,
    quarterlyMetrics: [
      { quarter: 'Q1', revenue: 680000000, expenses: 495000000, ebitda: 185000000 },
      { quarter: 'Q2', revenue: 710000000, expenses: 518000000, ebitda: 192000000 },
      { quarter: 'Q3', revenue: 730000000, expenses: 532000000, ebitda: 198000000 },
      { quarter: 'Q4 (Festive Proj)', revenue: 770000000, expenses: 565000000, ebitda: 205000000 },
    ],
    costBreakdown: [
      { category: 'Artisanal Karoo Mohair & Cape Botanicals Sourcing', amount: 820000000, percentage: 39 },
      { category: 'Prime Waterfront & Sandton City Real Estate', amount: 650000000, percentage: 31 },
      { category: 'Pan-African Fashion Week Brand Marketing', amount: 400000000, percentage: 19 },
      { category: 'Concierge E-Commerce Logistics & White-Glove Tech', amount: 230000000, percentage: 11 },
    ],
    recentInvoices: [
      { id: 'INV-MZN-551', client: 'Woolworths VIP Reserve & Black Label', amount: 97500000, dueDate: '2026-11-04', status: 'Paid' },
      { id: 'INV-MZN-552', client: 'The Diamond Works Luxury Portfolio', amount: 53750000, dueDate: '2026-11-19', status: 'Pending' },
      { id: 'INV-MZN-553', client: 'Delaire Graff Estate Boutiques', amount: 36250000, dueDate: '2026-10-15', status: 'Paid' },
    ],
  },
  'tenant-cyber': {
    totalRevenue: 2680000000, // R2.68 Billion
    revenueGrowth: 39.5,
    grossMargin: 83.4,
    ebitda: 980000000,
    ebitdaMargin: 36.6,
    runwayMonths: 44,
    cashReserves: 1450000000,
    monthlyBurn: 35000000,
    quarterlyMetrics: [
      { quarter: 'Q1', revenue: 610000000, expenses: 388000000, ebitda: 222000000 },
      { quarter: 'Q2', revenue: 660000000, expenses: 420000000, ebitda: 240000000 },
      { quarter: 'Q3', revenue: 690000000, expenses: 438000000, ebitda: 252000000 },
      { quarter: 'Q4 (Proj)', revenue: 720000000, expenses: 454000000, ebitda: 266000000 },
    ],
    costBreakdown: [
      { category: 'National Threat Telemetry & Honeytoken Arrays', amount: 650000000, percentage: 38 },
      { category: 'POPIA Information Regulator Security Compliance', amount: 510000000, percentage: 30 },
      { category: 'Top-Secret Cleared SOC Analysts & Sandton Whitehats', amount: 360000000, percentage: 21 },
      { category: 'Quantum Cryptographic Hardware Security Modules (HSM)', amount: 190000000, percentage: 11 },
    ],
    recentInvoices: [
      { id: 'INV-PRT-880', client: 'South African Reserve Bank (SARB) Cyber Command', amount: 145000000, dueDate: '2026-11-14', status: 'Paid' },
      { id: 'INV-PRT-881', client: 'Vodacom South Africa Enterprise Security', amount: 77500000, dueDate: '2026-11-29', status: 'Pending' },
      { id: 'INV-PRT-882', client: 'State Information Technology Agency (SITA)', amount: 60000000, dueDate: '2026-10-27', status: 'Paid' },
    ],
  },
};

// OPERATIONAL METRICS (Accessible by ALL users in that South African tenant)
export const MOCK_OPERATIONAL_METRICS: Record<TenantId, OperationalMetric[]> = {
  'tenant-energy': [
    { id: 'op-nrg-1', label: 'Eskom Injected Power', value: '4.8 GW peak', change: '+18.2%', trend: 'up', subtext: 'Northern Cape CSP tracking output' },
    { id: 'op-nrg-2', label: 'Battery Round-Trip Eff.', value: '95.1%', change: '+1.4%', trend: 'up', subtext: 'Kathu industrial battery banks' },
    { id: 'op-nrg-3', label: 'Avoided Load Shedding', value: '380 hrs', change: '+22%', trend: 'up', subtext: 'Direct Cape corridor emergency buffer' },
    { id: 'op-nrg-4', label: 'NERSA Grid Compliance', value: '99.98%', change: '+0.1%', trend: 'up', subtext: 'Audited by National Energy Regulator' },
  ],
  'tenant-fin': [
    { id: 'op-fin-1', label: 'JSE Trade Matching', value: '38 microseconds', change: '-6 µs', trend: 'up', subtext: 'Teraco Isando dark fiber cross-connect' },
    { id: 'op-fin-2', label: 'Daily SARB RTGS Volume', value: 'R48.5 Billion', change: '+19.4%', trend: 'up', subtext: 'Interbank clearing & PayShap settlement' },
    { id: 'op-fin-3', label: 'Core Engine Uptime', value: '99.999%', change: '0.0%', trend: 'neutral', subtext: 'Zero unplanned failovers in 365 days' },
    { id: 'op-fin-4', label: 'FSCA Capital Solvency', value: '2.4x minimum', change: '+14%', trend: 'up', subtext: 'Conservative liquid capital reserve' },
  ],
  'tenant-logistics': [
    { id: 'op-log-1', label: 'Durban Harbor Berth Turns', value: '18.2 hrs/ship', change: '-4.1 hrs', trend: 'up', subtext: 'Pier 2 automated gantry operations' },
    { id: 'op-log-2', label: 'Cold-Chain Cryo Temp', value: '99.99% compliance', change: '+0.04%', trend: 'up', subtext: 'Citrus reefer satellite sensors' },
    { id: 'op-log-3', label: 'Container Rail Volume', value: '14,200 TEU/wk', change: '+11.5%', trend: 'up', subtext: 'City Deep dry port corridor' },
    { id: 'op-log-4', label: 'B-BBEE Supplier Rating', value: 'Level 1 (135%)', change: '0%', trend: 'neutral', subtext: 'Verified by Empowerdex audit' },
  ],
  'tenant-bio': [
    { id: 'op-bio-1', label: 'Active Clinical Cohorts', value: '2,840 pts', change: '+24.1%', trend: 'up', subtext: 'Phase IIb TB and oncology cohorts' },
    { id: 'op-bio-2', label: 'Assay Precision Score', value: '99.96%', change: '+0.2%', trend: 'up', subtext: 'Stellenbosch automated sequencer' },
    { id: 'op-bio-3', label: 'mRNA Vaccine Batches', value: '12 days release', change: '-4 days', trend: 'up', subtext: 'Cape cleanroom enzymatic testing' },
    { id: 'op-bio-4', label: 'SAHPRA Good Clinical', value: '100% compliant', change: '0%', trend: 'neutral', subtext: 'South African Health Products Reg.' },
  ],
  'tenant-aero': [
    { id: 'op-aero-1', label: 'Anti-Poaching UAV Hours', value: '3,420 flight hrs', change: '+32.0%', trend: 'up', subtext: 'Greater Kruger thermal surveillance' },
    { id: 'op-aero-2', label: 'Telemetry Packet Loss', value: '0.0012%', change: '-40%', trend: 'up', subtext: 'Sub-orbital Centurion datalink' },
    { id: 'op-aero-3', label: 'Rhino Protection Index', value: '98.8% safe zone', change: '+4.2%', trend: 'up', subtext: 'Acoustic gunshot sensor coverage' },
    { id: 'op-aero-4', label: 'SANDF Armaments Permit', value: '100% active', change: '0%', trend: 'neutral', subtext: 'Verified by National Defense Council' },
  ],
  'tenant-retail': [
    { id: 'op-ret-1', label: 'Waterfront Salon Traffic', value: '342,000 visits', change: '+14.2%', trend: 'up', subtext: 'Cape Town & Sandton boutiques' },
    { id: 'op-ret-2', label: 'Bespoke Couture Return', value: '2.8%', change: '-1.4%', trend: 'up', subtext: 'Ultra-low due to bespoke artisan tailoring' },
    { id: 'op-ret-3', label: 'Karoo Mohair Traceability', value: '100% ethical', change: '0%', trend: 'neutral', subtext: 'Responsible Mohair Standard certified' },
    { id: 'op-ret-4', label: 'Private VIP Retention', value: '96.2%', change: '+2.8%', trend: 'up', subtext: 'Sub-Saharan top clientele salons' },
  ],
  'tenant-cyber': [
    { id: 'op-cyb-1', label: 'Mean Time to Neutralize', value: '1.4 minutes', change: '-52 secs', trend: 'up', subtext: 'Autonomous cyber intrusion hunting' },
    { id: 'op-cyb-2', label: 'POPIA Violations Stopped', value: '4,890 attempts', change: '+18%', trend: 'up', subtext: 'Banking & identity exfiltration blocked' },
    { id: 'op-cyb-3', label: 'National Telemetry Tap', value: '22.8 TB/day', change: '+28%', trend: 'up', subtext: 'Encrypted SADC intelligence pipeline' },
    { id: 'op-cyb-4', label: 'Zero-Trust Verification', value: '100.0%', change: '0%', trend: 'neutral', subtext: 'Enforced across all SARB endpoints' },
  ],
};

// PROJECTS (Accessible by ALL users in that South African tenant)
export const MOCK_PROJECTS: Record<TenantId, ProjectData[]> = {
  'tenant-energy': [
    { id: 'prj-nrg-1', title: 'Upington 500MW Solar Thermal Expansion', code: 'PRJ-KLH-101', lead: 'Tariq Hendricks', priority: 'Critical', status: 'In Progress', progress: 82, deadline: '2026-12-15', budgetUtilized: 79, teamSize: 48 },
    { id: 'prj-nrg-2', title: 'Karoo Solid-State Storage Islanding Unit', code: 'PRJ-KLH-204', lead: 'Naledi Ndlovu', priority: 'High', status: 'Testing', progress: 92, deadline: '2026-11-10', budgetUtilized: 88, teamSize: 22 },
    { id: 'prj-nrg-3', title: 'Automated Drone Thermal Panel Washing', code: 'PRJ-KLH-310', lead: 'Braam Esterhuizen', priority: 'Normal', status: 'Operational', progress: 100, deadline: '2026-09-01', budgetUtilized: 95, teamSize: 14 },
  ],
  'tenant-fin': [
    { id: 'prj-fin-1', title: 'JSE Top 40 Real-Time FPGA Clearing Core', code: 'PRJ-SND-801', lead: 'Sipho Dlamini', priority: 'Critical', status: 'In Progress', progress: 89, deadline: '2026-11-30', budgetUtilized: 84, teamSize: 24 },
    { id: 'prj-fin-2', title: 'SARB PayShap Instant Cross-Border Clearing', code: 'PRJ-SND-505', lead: 'Pieter van der Merwe', priority: 'High', status: 'Testing', progress: 74, deadline: '2027-01-20', budgetUtilized: 68, teamSize: 19 },
    { id: 'prj-fin-3', title: 'Rand/Dollar FX Spread Volatility Guard', code: 'PRJ-SND-212', lead: 'Anika de Klerk', priority: 'Normal', status: 'Operational', progress: 100, deadline: '2026-08-15', budgetUtilized: 98, teamSize: 11 },
  ],
  'tenant-logistics': [
    { id: 'prj-log-1', title: 'Durban Pier 2 Autonomous Container Stacker', code: 'PRJ-TVL-901', lead: 'Johan Botha', priority: 'Critical', status: 'In Progress', progress: 71, deadline: '2027-02-28', budgetUtilized: 65, teamSize: 36 },
    { id: 'prj-log-2', title: 'Kruger to Durban Agri-Cold Chain Tracking', code: 'PRJ-TVL-414', lead: 'Nomvula Zulu', priority: 'High', status: 'Operational', progress: 100, deadline: '2026-10-15', budgetUtilized: 97, teamSize: 21 },
    { id: 'prj-log-3', title: 'City Deep Rail Intermodal Electrification', code: 'PRJ-TVL-208', lead: 'Kagiso Khanyile', priority: 'Medium', status: 'Testing', progress: 54, deadline: '2027-05-30', budgetUtilized: 46, teamSize: 18 },
  ],
  'tenant-bio': [
    { id: 'prj-bio-1', title: 'Pan-African MDR-TB mRNA Vaccine Cohort', code: 'PRJ-CPT-909', lead: 'Liam van Zyl', priority: 'Critical', status: 'In Progress', progress: 78, deadline: '2027-01-15', budgetUtilized: 84, teamSize: 42 },
    { id: 'prj-bio-2', title: 'Stellenbosch Microfluidic Gene Foundry', code: 'PRJ-CPT-420', lead: 'Dr. Zanele Mthembu', priority: 'High', status: 'Operational', progress: 96, deadline: '2026-11-05', budgetUtilized: 92, teamSize: 16 },
    { id: 'prj-bio-3', title: 'Viral Capsid Heat Stabilization for Rural SADC', code: 'PRJ-CPT-112', lead: 'Fatima Seedat', priority: 'Medium', status: 'Testing', progress: 61, deadline: '2027-04-10', budgetUtilized: 52, teamSize: 25 },
  ],
  'tenant-aero': [
    { id: 'prj-aero-1', title: 'Bateleur Anti-Poaching Solar UAV V5', code: 'PRJ-KRG-401', lead: 'Kagiso Motsepe', priority: 'Critical', status: 'In Progress', progress: 86, deadline: '2026-12-10', budgetUtilized: 80, teamSize: 28 },
    { id: 'prj-aero-2', title: 'Composite Winglet High-Altitude Thermal Tests', code: 'PRJ-KRG-208', lead: 'Dr. Evelyn Sterling-Kruger', priority: 'High', status: 'Operational', progress: 100, deadline: '2026-09-20', budgetUtilized: 94, teamSize: 15 },
    { id: 'prj-aero-3', title: 'Border Telemetry Radio Encryption Pod', code: 'PRJ-KRG-330', lead: 'Willem Pretorius', priority: 'Medium', status: 'Testing', progress: 68, deadline: '2027-02-15', budgetUtilized: 59, teamSize: 18 },
  ],
  'tenant-retail': [
    { id: 'prj-ret-1', title: 'V&A Waterfront Luxury Salon Flagship Refurb', code: 'PRJ-MZN-501', lead: 'Lerato Khumalo', priority: 'High', status: 'In Progress', progress: 84, deadline: '2026-11-20', budgetUtilized: 88, teamSize: 16 },
    { id: 'prj-ret-2', title: 'Rosebank Private High-Jewelry Diamond Salon', code: 'PRJ-MZN-309', lead: 'Bongani Sithole', priority: 'Critical', status: 'Testing', progress: 75, deadline: '2027-01-25', budgetUtilized: 71, teamSize: 22 },
    { id: 'prj-ret-3', title: 'Karoo Ethical Mohair Traceability Blockchain', code: 'PRJ-MZN-114', lead: 'Sunette Coetzee', priority: 'Normal', status: 'Operational', progress: 100, deadline: '2026-08-30', budgetUtilized: 99, teamSize: 12 },
  ],
  'tenant-cyber': [
    { id: 'prj-cyb-1', title: 'National POPIA Leak Prevention Engine', code: 'PRJ-PRT-992', lead: 'Fatima Patel', priority: 'Critical', status: 'In Progress', progress: 88, deadline: '2026-12-05', budgetUtilized: 81, teamSize: 30 },
    { id: 'prj-cyb-2', title: 'SARB Quantum Interbank Vault Encryption', code: 'PRJ-PRT-704', lead: 'Thabo Mokoena', priority: 'High', status: 'Testing', progress: 95, deadline: '2026-11-12', budgetUtilized: 93, teamSize: 24 },
    { id: 'prj-cyb-3', title: 'State Infrastructure Distributed Honeynet', code: 'PRJ-PRT-311', lead: 'Kobus Marais', priority: 'Medium', status: 'Operational', progress: 100, deadline: '2026-10-01', budgetUtilized: 96, teamSize: 15 },
  ],
};

// OPERATIONAL ANNOUNCEMENTS / UPDATES
export const MOCK_UPDATES: Record<TenantId, OperationalUpdate[]> = {
  'tenant-energy': [
    { id: 'upd-nrg-1', title: 'Upington Phase 4 Synchronized to Eskom Grid', timestamp: '2 hours ago', author: 'Tariq Hendricks', type: 'milestone', summary: '1.2 GW injected directly during evening peak demand. Zero frequency flutter across Northern Cape corridor.' },
    { id: 'upd-nrg-2', title: 'NERSA Independent Power Compliance Inspection', timestamp: 'Yesterday', author: 'Naledi Ndlovu', type: 'audit', summary: '100% compliant with clean energy wheeling framework and carbon credit allocations.' },
  ],
  'tenant-fin': [
    { id: 'upd-fin-1', title: 'JSE Top 40 Microsecond Settlement Live', timestamp: '1 hour ago', author: 'Sipho Dlamini', type: 'deployment', summary: 'Teraco Isando cross-connect upgraded to FPGA build 9.1 with latency reduced to 38 microseconds.' },
    { id: 'upd-fin-2', title: 'SARB Prudential Authority Stress Test Passed', timestamp: 'Yesterday', author: 'Pieter van der Merwe', type: 'audit', summary: 'Simulated R45B extreme liquidity shock absorbed with 240% capital adequacy headroom.' },
  ],
  'tenant-logistics': [
    { id: 'upd-log-1', title: 'Durban Harbor Pier 2 Gantry Cranes Operational', timestamp: '3 hours ago', author: 'Johan Botha', type: 'deployment', summary: 'Dwell time reduced by 22% on vessel berthing line. Citrus container export prioritized.' },
    { id: 'upd-log-2', title: 'B-BBEE Empowerdex Annual Verification Succeeded', timestamp: 'Yesterday', author: 'Nomvula Zulu', type: 'audit', summary: 'Level 1 contributor status re-certified with 135% procurement recognition.' },
  ],
  'tenant-bio': [
    { id: 'upd-bio-1', title: 'SAHPRA Fast-Track Clinical Clearance Awarded', timestamp: '4 hours ago', author: 'Dr. Zanele Mthembu', type: 'milestone', summary: 'Accelerated review approved for Stellenbosch mRNA tuberculosis cohort.' },
    { id: 'upd-bio-2', title: 'Cape Town Cleanroom ISO Class 5 Calibration', timestamp: 'Yesterday', author: 'Liam van Zyl', type: 'audit', summary: 'Continuous particulate count verified under sterile European and WHO guidelines.' },
  ],
  'tenant-aero': [
    { id: 'upd-aero-1', title: 'Kruger Night Thermal Anti-Poaching Flight Logged', timestamp: '2 hours ago', author: 'Kagiso Motsepe', type: 'milestone', summary: 'Zero rhino incursions recorded across 140km boundary sector in Sabi Sands buffer.' },
    { id: 'upd-aero-2', title: 'SANDF National Armaments Control Audit Passed', timestamp: 'Yesterday', author: 'Dr. Evelyn Sterling-Kruger', type: 'audit', summary: 'All military export telemetry protocols certified without non-conformances.' },
  ],
  'tenant-retail': [
    { id: 'upd-ret-1', title: 'V&A Waterfront Private Salon Capsule Revealed', timestamp: '1 hour ago', author: 'Lerato Khumalo', type: 'milestone', summary: 'Indigenous fynbos botanical fragrance and Karoo certified mohair collection previewed to VIP collectors.' },
    { id: 'upd-ret-2', title: 'Responsible Mohair Standard (RMS) Audit Passed', timestamp: 'Yesterday', author: 'Bongani Sithole', type: 'audit', summary: '100% cruelty-free ethical certification maintained across all Eastern Cape farms.' },
  ],
  'tenant-cyber': [
    { id: 'upd-cyb-1', title: 'Zero-Day Banking Botnet Neutralized in Sandton', timestamp: '30 mins ago', author: 'Thabo Mokoena', type: 'milestone', summary: 'Automated AI hunt neutralized nation-state credentials credential-stuffing within 1.4 minutes.' },
    { id: 'upd-cyb-2', title: 'POPIA Information Regulator Bi-Annual Audit', timestamp: 'Yesterday', author: 'Fatima Patel', type: 'audit', summary: 'All customer data isolation partitions verified with zero unauthorized telemetry leaks.' },
  ],
};

export const FIRESTORE_RULES_SOURCE = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ==========================================
    // SOUTH AFRICAN ENTERPRISE MULTI-TENANT & RBAC SECURITY
    // UBUNTU APEX HOLDINGS (SANDTON / CAPE TOWN / DURBAN)
    // Enforcing POPIA (Protection of Personal Information Act)
    // ==========================================

    // Verifies authenticated JWT session
    function isAuthenticated() {
      return request.auth != null;
    }

    // STRICT MULTI-TENANT ISOLATION:
    // User can ONLY read or write resources where the path tenantId matches their auth claim
    // Prevents cross-subsidiary data leakage across all 7 South African businesses
    function isTenantMember(tenantId) {
      return isAuthenticated() && request.auth.token.tenantId == tenantId;
    }

    // ROLE-BASED ACCESS CONTROL (RBAC):
    // Requires verified 'manager' role claim
    // Enforces POPIA Section 19 security safeguarding on sensitive client and financial data
    function isManager() {
      return isAuthenticated() && request.auth.token.role == 'manager';
    }

    // ==========================================
    // SUBSIDIARY TENANT DATA BOUNDARIES
    // ==========================================
    match /tenants/{tenantId} {
      
      // 1. Operational Overview & Real-Time Telemetry
      // Accessible to ANY employee assigned to this tenant
      match /overview/{docId} {
        allow read: if isTenantMember(tenantId);
        allow write: if isTenantMember(tenantId) && isManager();
      }

      // 2. Team Projects & Operational Tasks
      // Accessible to ANY employee assigned to this tenant
      match /projects/{projectId} {
        allow read: if isTenantMember(tenantId);
        allow write: if isTenantMember(tenantId);
      }

      // 3. Operational Updates & Announcements
      match /updates/{updateId} {
        allow read: if isTenantMember(tenantId);
        allow write: if isTenantMember(tenantId) && isManager();
      }

      // 4. RESTRICTED: CLIENT INFORMATION (POPIA SENSITIVE CRM & ENTERPRISE CONTRACTS)
      // STRICTLY BLOCKED for Standard Employees. Only Managers/Admins can read/write!
      match /clients/{clientId} {
        allow read, write: if isTenantMember(tenantId) && isManager();
      }

      // 5. RESTRICTED: FINANCIAL ANALYTICS & P&L STATEMENTS (ZAR / RAND)
      // STRICTLY BLOCKED for Standard Employees. Only Managers/Admins can read/write!
      match /financials/{docId} {
        allow read, write: if isTenantMember(tenantId) && isManager();
      }
    }
  }
}`;
