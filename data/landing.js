import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";

// ----------------------------------------------------------------------
// Stats (kept for backward compatibility)
// ----------------------------------------------------------------------
export const statsData = [
  { value: "50K+", label: "Active Users" },
  { value: "$2B+", label: "Transactions Tracked" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9/5", label: "User Rating" },
];

// Numeric version used by the animated counters on the landing page.
export const trustStats = [
  { value: 50, suffix: "K+", label: "Active users" },
  { value: 2, prefix: "$", suffix: "B+", label: "Transactions tracked" },
  { value: 120, suffix: "+", label: "Countries supported" },
  { value: 99.9, suffix: "%", decimals: 1, label: "Uptime" },
  { value: 4.9, suffix: "/5", decimals: 1, label: "Average rating" },
];

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
export const testimonialsData = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote:
      "Fintrak has transformed how I manage my business finances. The AI insights helped me find cost-saving opportunities I never knew existed.",
  },
  {
    name: "Michael Chen",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "The receipt scanning feature saves me hours each month. Now I focus on my work instead of manual data entry and expense tracking.",
  },
  {
    name: "Emily Rodriguez",
    role: "Financial Advisor",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
      "I recommend Fintrak to all my clients. The multi-currency support and detailed analytics make it perfect for international investors.",
  },
];

// ----------------------------------------------------------------------
// Footer
// ----------------------------------------------------------------------
export const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Product tour", href: "#showcase" },
      { label: "Customers", href: "#testimonials" },
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