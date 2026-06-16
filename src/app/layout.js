import "./globals.css";

export const metadata = {
  title: "SkillJobs NextGen | Official Campus Leadership & Student Community",
  description: "Skill Jobs NextGen is the official student community and campus leadership platform of Skill Jobs. Helping students improve skills, leadership, career readiness, networking, and employability.",
  keywords: ["SkillJobs", "NextGen", "Campus Ambassador", "Student Community", "Career Training", "Employability", "Internship Opportunities"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
