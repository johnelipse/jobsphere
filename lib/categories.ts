export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  jobs: any[];
}

export const categories: Category[] = [
  {
    id: "cln5x6v9e0000mg08q5q5q5q5",
    title: "Software Development",
    description:
      "Roles focused on building and maintaining software applications",
    slug: "software-development",
    createdAt: new Date(),
    updatedAt: new Date(),
    jobs: Array(5).fill(null), // 5 jobs in this category
  },
  {
    id: "cln5x6v9e0001mg08q5q5q5q6",
    title: "Data Science",
    description: "Positions involving data analysis and machine learning",
    slug: "data-science",
    createdAt: new Date(),
    updatedAt: new Date(),
    jobs: Array(8).fill(null), // 8 jobs in this category
  },
  {
    id: "cln5x6v9e0002mg08q5q5q5q7",
    title: "UX/UI Design",
    description: "Jobs focused on creating intuitive user experiences",
    slug: "ux-ui-design",
    createdAt: new Date(),
    updatedAt: new Date(),
    jobs: Array(4).fill(null), // 4 jobs in this category
  },
  {
    id: "cln5x6v9e0003mg08q5q5q5q8",
    title: "DevOps",
    description: "Roles that bridge development and operations",
    slug: "devops",
    createdAt: new Date(),
    updatedAt: new Date(),
    jobs: Array(6).fill(null), // 6 jobs in this category
  },
  {
    id: "cln5x6v9e0004mg08q5q5q5q9",
    title: "Product Management",
    description: "Positions overseeing product development and strategy",
    slug: "product-management",
    createdAt: new Date(),
    updatedAt: new Date(),
    jobs: Array(3).fill(null), // 3 jobs in this category
  },
  {
    id: "cln5x6v9e0005mg08q5q5q5qa",
    title: "Cybersecurity",
    description: "Jobs focused on protecting systems and data",
    slug: "cybersecurity",
    createdAt: new Date(),
    updatedAt: new Date(),
    jobs: Array(7).fill(null), // 7 jobs in this category
  },
];
