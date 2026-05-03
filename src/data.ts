export const resumeLink = "https://drive.google.com/file/d/1wByIUdYU6DgPNrht4Z18nf--Jc7yb26S/view?usp=drive_link";

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  tags: string[];
  date: string;
  github?: string;
  link?: string;
  isFeatured?: boolean;
  image?: string;
  stats?: { label: string; value: string }[];
  orderIndex?: number;
}

export interface Award {
  id?: string;
  name: string;
  rank: string;
  year: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  type: string;
  image: string;
}

export const projects: Project[] = [
  { 
    id: "defi-pulse",
    title: "DeFi Pulse", 
    description: "Liquidity aggregation protocol on Ethereum. Handling millions in simulated volume with zero-fault infrastructure.",
    fullDescription: "DeFi Pulse is a sophisticated liquidity aggregation protocol designed for the Ethereum ecosystem. It solves the fragmentation of liquidity by routing trades through optimal paths across multiple DEXs. The system features a custom-built execution engine that minimizes slippage and provides real-time analytics for liquidity providers.",
    tags: ['Solidity', 'Web3.js', 'React'],
    date: "2025",
    isFeatured: true,
    github: "#",
    image: "https://picsum.photos/seed/defi/1200/800",
    stats: [
      { label: 'Volume Processed', value: '$10M+' },
      { label: 'Latency', value: '< 200ms' },
      { label: 'Security Score', value: '98/100' }
    ]
  },
  { 
    id: "saas-engine",
    title: "SaaS Engine", 
    description: "Multi-tenant architecture for enterprise scale. Real-time collaboration and granular IAM systems.",
    fullDescription: "A robust multi-tenant SaaS framework built for scale. It incorporates a flexible Identity and Access Management (IAM) system, real-time data synchronization using WebSockets, and a highly modular architecture that allows for rapid feature deployment. The engine is optimized for high-concurrency environments.",
    tags: ['Next.js', 'PostgreSQL', 'Redis'],
    date: "2024",
    link: "#",
    image: "https://picsum.photos/seed/saas/1200/800",
    stats: [
      { label: 'Uptime', value: '99.99%' },
      { label: 'Tenants Supported', value: '500+' },
      { label: 'Sync Delay', value: '15ms' }
    ]
  },
  { 
    id: "supply-mesh",
    title: "Supply Mesh", 
    description: "Blockchain-based tracking for high-value logistics. Transparency and structural provenance.",
    fullDescription: "Supply Mesh leverages Hyperledger Fabric to provide an immutable ledger for luxury good supply chains. It tracks items from raw material procurement to end-consumer delivery, ensuring authenticity and ethical sourcing. The platform includes a complex smart contract layer for automated compliance checks.",
    tags: ['Hyperledger', 'Go', 'Docker'],
    date: "2024",
    github: "#",
    image: "https://picsum.photos/seed/supply/1200/800",
    stats: [
      { label: 'Nodes', value: '12' },
      { label: 'TPS', value: '1500' },
      { label: 'Audit Time', value: '-80%' }
    ]
  },
  {
    id: "neuro-sync",
    title: "Neuro Sync",
    description: "Neural network visualization tool for real-time model debugging. Peek inside the blackbox.",
    tags: ['Python', 'React', 'D3.js'],
    date: "2023",
    github: "#",
    image: "https://picsum.photos/seed/neuro/1200/800"
  }
];

export const awards: Award[] = [
  { name: 'ETH Global', rank: 'Top 10 Finalist', year: '2025', category: 'Hackathon' },
  { name: 'Polygon Hack', rank: '1st Runner Up', year: '2024', category: 'Blockchain' },
  { name: 'Solana Grizzly', rank: 'Special Mention', year: '2024', category: 'Design' },
  { name: 'Nexus Hub', rank: 'Elite Developer', year: '2023', category: 'General' },
  { name: 'CodeWarriors', rank: 'Winner', year: '2023', category: 'Competitive' },
  { name: 'SynthData', rank: 'Top 1%', year: '2022', category: 'Data' },
  { name: 'EtherNodes', rank: 'Regional Champ', year: '2022', category: 'Systems' },
  { name: 'LogicGate', rank: 'Innovation Award', year: '2021', category: 'Logic' }
];

export const blogPosts: BlogPost[] = [
  { 
    id: "brutalist-web-design",
    title: "Brutalist Web Design", 
    excerpt: "Exploration into why raw textures and structural honesty are redefining the modern web's aesthetic identity.",
    content: "Full content of the blog post about brutalist web design...",
    date: "MAY 02, 2026",
    type: "Architecture",
    image: "https://picsum.photos/seed/brutal/800/600"
  },
  { 
    id: "zk-proof-future",
    title: "The ZK-Proof Future", 
    excerpt: "Analysis of zero-knowledge proofs and their role in creating truly sovereign digital identity systems.",
    content: "Full content of the blog post about ZK-proofs...",
    date: "APR 15, 2026",
    type: "Cryptography",
    image: "https://picsum.photos/seed/zk/800/600"
  },
  { 
    id: "state-of-scalability",
    title: "State of Scalability", 
    excerpt: "Deep dive into modular blockchain stacks and the emergence of specialized rollup execution environments.",
    content: "Full content of the blog post about scalability...",
    date: "MAR 20, 2026",
    type: "Engineering",
    image: "https://picsum.photos/seed/stack/800/600"
  }
];
