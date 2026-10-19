export const profile = {
  name: "Dinesh Sonawane",
  handle: "dineshsonawane615",
  role: "Full-Stack Software Engineer",
  tagline: [
    "Full Stack Developer",
    "Code, debug, refine, repeat",
    "Building fast, lightweight web experiences without unnecessary bloat.",
  ],
  // subline:
  //   "React and TypeScript on the front, Spring Boot and FastAPI behind it, and semantic matching where the data gets messy.",
  location: "Pune, India",
  // status: "Open to internships: AI agents & workflow automation, full-stack",
  email: "dineshsonawane615@gmail.com",
  github: "https://github.com/dineshsonawane615",
  linkedin: "https://www.linkedin.com/in/dinesh-sonawanee/",
  leetcode: "https://leetcode.com/dineshsonawane615",
};

export const terminal = [
  { type: "cmd", text: "who am i" },
  { type: "out", text: "dinesh-sonawane, full-stack engineer" },
  { type: "cmd", text: "cat focus.txt" },
  { type: "out", text: "java, spring boot, react, fastapi" },
  { type: "out", text: "semantic matching, human-in-the-loop AI" },
  { type: "cmd", text: "git log -1 --oneline" },
  { type: "out", text: "a8c1f3e shipped MATRA prototype at Smart India Hackathon" },
  { type: "cmd", text: "./status.sh" },
  { type: "ok", text: "open to internships" },
];

export const about = {
  paragraphs: ["Hey there! I'm Dinesh Sonawane, a passionate Full Stack Developer based in India." 
  ],
  stats: [
    { value: "2", label: "Years Of Coding" },
    { value: "3", label: "Public Repos" },
    { value: "2", label: "Github Stars" },
    { value: "**", label: "Contributions always on" },
  ],
  currently: [
    "Building the Food Ordering System full stack",
    "Learning LangGraph, tool calling and n8n automation",
    "Exploring vector search with FAISS and Chroma",
    "Studying how to evaluate LLM output",
  ],
  principles: [
    "Explain every automated decision",
    "Keep a person in charge of the final call",
    "Secure the API before polishing the UI",
    "Ship a working slice, then iterate",
  ],
};

export const projects = [
  {
    id: "matra",
    featured: true,
    title: "MATRA",
    repoName: "matra",
    subtitle: "Material code harmonization platform",
    badge: "Smart India Hackathon, SIH26099",
    updatedAgo: "SIH 2026",
    liveUrl: "",
    githubUrl: "https://github.com/dineshsonawane615",
    summary:
      "Different public-sector units describe the same material in different ways. MATRA finds the matches, explains why they match, and leaves the final decision to a reviewer.",
    description:
      "An AI-assisted material harmonization platform built for Smart India Hackathon. It reconciles inconsistent material records from multiple public-sector units using semantic similarity, then routes every suggestion through a human reviewer before anything is finalized.",
    highlights: [
      "Designed an eight-stage workflow from raw records to a single canonical material record.",
      "Used semantic similarity to separate identical items from near-duplicates, with a plain-language reason attached to every suggestion.",
      "Added a review step where people approve or reject AI suggestions before anything is finalized.",
      "Built the React and TypeScript interface and the FastAPI backend, and presented the architecture to the team.",
    ],
    stack: ["React", "TypeScript", "Python", "FastAPI", "NLP", "Semantic Similarity", "SQLite"],
    pipeline: [
      { name: "Ingest", detail: "Material codes and free-text descriptions arrive from each unit's records." },
      { name: "Normalize", detail: "Casing, abbreviations and punctuation are standardized so comparisons start from clean text." },
      { name: "Extract", detail: "Structured attributes are pulled out of the free-text descriptions." },
      { name: "Match", detail: "Semantic similarity scores flag identical and near-duplicate materials." },
      { name: "Conflicts", detail: "Matches with clashing attributes are surfaced instead of being merged silently." },
      { name: "Recommend", detail: "Each suggestion ships with the reasons it was matched, so reviewers can trust or challenge it." },
      { name: "Review", detail: "A person approves or rejects every suggestion. The AI never finalizes on its own." },
      { name: "Canonical", detail: "Approved matches collapse into one canonical record per material." },
    ],
  },
  {
    id: "food",
    featured: true,
    title: "Food Ordering System",
    repoName: "food-ordering-system",
    subtitle: "Role-based full-stack platform",
    badge: "In progress since Apr 2026",
    updatedAgo: "In progress",
    liveUrl: "",
    githubUrl: "https://github.com/dineshsonawane615",
    summary:
      "An ordering platform where customers, restaurant admins and delivery staff each see only what their role allows, enforced at the API rather than just hidden in the UI.",
    description:
      "A full-stack food delivery platform with three distinct user roles — customer, restaurant admin, and delivery staff. JWT-based authentication enforces role-based access at the API layer, not just the frontend, ensuring data integrity and security.",
    highlights: [
      "Implementing JWT authentication with role-based access control across three user roles.",
      "Building reusable React components for user, restaurant, menu and order modules.",
      "Connecting the frontend to Spring Boot REST APIs, following REST conventions for menu handling and order processing.",
      "Persisting data with Hibernate/JPA on MySQL while keeping user data protected.",
    ],
    stack: ["React", "Spring Boot", "MySQL", "Hibernate/JPA", "JWT", "REST"],
    architecture: ["React UI", "REST API", "JWT + RBAC", "Hibernate/JPA", "MySQL"],
  },
];

export const experience = [
  {
    hash: "c4e9a71",
    branch: "feat/food-ordering",
    period: "Apr 2026 to Present",
    title: "Full-stack developer",
    org: "Food Ordering System (personal project)",
    points: [
      "Owning the build across React UI, Spring Boot APIs and the MySQL schema.",
      "Designing role-based access for customers, restaurant admins and delivery staff.",
    ],
    tags: ["React", "Spring Boot", "JWT", "MySQL"],
  },
  {
    hash: "1f7d3ae",
    branch: "learn/java-full-stack",
    period: "Training",
    title: "Java Full Stack Development",
    org: "Seed Infotech",
    points: ["Structured training across Java, Spring, databases and frontend integration."],
    tags: ["Java", "Spring", "SQL"],
  },
];

export const releases = [
  {
    tag: "v2027",
    title: "B.E. Computer Engineering",
    org: "Suman Ramesh Tulsiani Technical Campus, Pune (SPPU)",
    period: "Aug 2023 to May 2027",
    note: "CGPA 7.34",
  },
  {
    tag: "oci-genai",
    title: "OCI 2025 Certified Generative AI Professional",
    org: "Oracle",
    period: "2025",
  },
  {
    tag: "oci-devops",
    title: "OCI 2025 Certified DevOps Professional",
    org: "Oracle",
    period: "2025",
  },
  {
    tag: "claude-101",
    title: "Claude 101",
    org: "Anthropic",
    period: "Certificate of completion",
  },
];

export const skills = [
  {
    branch: "backend",
    items: ["Java", "Spring Boot", "Spring Security", "Hibernate/JPA"],
    core: ["Java", "Spring Boot"],
  },
  {
    branch: "frontend",
    items: ["React", "TypeScript", "JavaScript"],
    core: ["React", "TypeScript"],
  },
  // {
  //   branch: "ai",
  //   items: ["Prompt engineering", "LLM API integration", "NLP", "Embeddings", "Semantic search", "RAG basics", "Human-in-the-loop design"],
  //   core: ["NLP", "Semantic search", "Human-in-the-loop design"],
  // },
  {
    branch: "data",
    items: ["SQL", "postgreSQL"], //"Oracle SQL", "MongoDB", "SQLite", "Python"
    core: ["SQL", "Python"],
  },
  {
    branch: "tooling",
    items: ["Git", "GitHub", "Docker"],
    core: ["Git", "Postman"],
  },
  {
    branch: "more",
    items: ["Compiler Design", "Data Structure & Algorithm", "Software Architecture", "System Design", "Operating System"], // Open Source
    core: ["Git", "Postman"],
  },
];

export const learning = [];
