export type Role = {
    id: string;
    title: string;
    highlightClass: string; // tailwind class for active accent
    skillsLine: string;     // what the typewriter should write
};

export const roles: Role[] = [
    {
        id: "mle",
        title: "Machine Learning Engineer",
        highlightClass: "ring-teal-400/60 shadow-teal-500/20",
        skillsLine: "PyTorch · Model Serving · Docker · AWS · CI/CD",
    },
    {
        id: "ds",
        title: "Data Scientist",
        highlightClass: "ring-fuchsia-400/60 shadow-fuchsia-500/20",
        skillsLine: "Pandas · Experimentation · Forecasting · SQL · Storytelling",
    },
    {
        id: "swe-ml",
        title: "Software Engineer (ML)",
        highlightClass: "ring-indigo-400/60 shadow-indigo-500/20",
        skillsLine: "TypeScript · APIs · Vector DBs · RAG · Observability",
    },
];
