import { Board } from "@/types";

export const initialBoard: Board = [
  {
    id: "col-1",
    name: "Backlog",
    cards: [
      {
        id: "card-1",
        title: "Define product roadmap",
        details:
          "Outline the key milestones and features for the next two quarters. Align with stakeholders on priorities.",
      },
      {
        id: "card-2",
        title: "Research competitor apps",
        details:
          "Review top 5 competitors: features, pricing, UX patterns. Summarise findings in a shared doc.",
      },
      {
        id: "card-3",
        title: "Set up analytics",
        details:
          "Integrate Posthog or Mixpanel. Define the key events to track from day one.",
      },
    ],
  },
  {
    id: "col-2",
    name: "To Do",
    cards: [
      {
        id: "card-4",
        title: "Design system tokens",
        details:
          "Create a shared colour, typography and spacing token library to be used across all components.",
      },
      {
        id: "card-5",
        title: "API authentication flow",
        details:
          "Implement JWT-based auth with refresh tokens. Add rate limiting on the login endpoint.",
      },
      {
        id: "card-6",
        title: "Write onboarding copy",
        details:
          "Draft copy for the welcome screen, first-run tooltips and empty-state placeholders.",
      },
    ],
  },
  {
    id: "col-3",
    name: "In Progress",
    cards: [
      {
        id: "card-7",
        title: "Build dashboard layout",
        details:
          "Implement the main dashboard shell with sidebar nav, topbar and content area. Responsive down to tablet.",
      },
      {
        id: "card-8",
        title: "Database schema v1",
        details:
          "Define tables for users, projects, tasks and comments. Create migrations and seed scripts.",
      },
    ],
  },
  {
    id: "col-4",
    name: "Review",
    cards: [
      {
        id: "card-9",
        title: "PR: user profile page",
        details:
          "Review pull request #42. Check accessibility, mobile layout and edge cases for missing avatar.",
      },
      {
        id: "card-10",
        title: "QA: notification emails",
        details:
          "Test all transactional email templates across Gmail, Outlook and Apple Mail. Log any rendering issues.",
      },
    ],
  },
  {
    id: "col-5",
    name: "Done",
    cards: [
      {
        id: "card-11",
        title: "Project kickoff meeting",
        details:
          "Held kick-off with the full team. Goals, timeline and responsibilities agreed and documented.",
      },
      {
        id: "card-12",
        title: "Repo setup & CI pipeline",
        details:
          "Created GitHub repo with branch protection, linting, type-check and test steps in CI.",
      },
      {
        id: "card-13",
        title: "Figma wireframes approved",
        details:
          "All five core screens signed off by the design lead. Assets exported and linked in Notion.",
      },
    ],
  },
];
