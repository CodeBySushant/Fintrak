import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";

// ----------------------------------------------------------------------
// Features
// ----------------------------------------------------------------------
export const featuresData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "Advanced Analytics",
    description:
      "Get detailed insights into your spending patterns with AI-powered analytics",
  },
  {
    icon: <Receipt className="h-8 w-8 text-blue-600" />,
    title: "Smart Receipt Scanner",
    description:
      "Extract data automatically from receipts using advanced AI technology",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "Budget Planning",
    description: "Create and manage budgets with intelligent recommendations",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "Multi-Account Support",
    description: "Manage multiple accounts and credit cards in one place",
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-600" />,
    title: "Multi-Currency",
    description: "Support for multiple currencies with real-time conversion",
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Automated Insights",
    description: "Get automated financial insights and recommendations",
  },
];

// ----------------------------------------------------------------------
// How it works
// ----------------------------------------------------------------------
export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "Create your account",
    description:
      "Get started in minutes with a simple, secure sign-up process.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "Track your spending",
    description:
      "Automatically categorize and track your transactions in real time.",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "Get insights",
    description:
      "Receive AI-powered recommendations to optimize your finances.",
  },
];

// ----------------------------------------------------------------------
// Benefits (Without vs With Fintrak)
// ----------------------------------------------------------------------
export const benefitsData = {
  without: [
    "Spreadsheets that break and go stale",
    "Manual receipt entry every week",
    "Budgets you forget until it's too late",
    "No idea where the money actually went",
    "Financial stress at the end of the month",
  ],
  with: [
    "One live view of every account",
    "Receipts scanned and logged in seconds",
    "Smart budget alerts before you overspend",
    "Clear category breakdowns and trends",
    "Calm, confident control of your money",
  ],
};

// ----------------------------------------------------------------------
// Testimonials
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
// Footer
// ----------------------------------------------------------------------
export const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Product tour", href: "#showcase" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];