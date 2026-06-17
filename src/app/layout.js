import "./globals.css";
import Chatbot from "../components/Chatbot";
import IntroAnimation from "../components/IntroAnimation";
import StyledJsxRegistry from "./registry";

export const metadata = {
  title: "SkillJobs NextGen | Official Campus Leadership & Student Community",
  description: "Skill Jobs NextGen is the official student community and campus leadership platform of Skill Jobs. Helping students improve skills, leadership, career readiness, networking, and employability.",
  keywords: ["SkillJobs", "NextGen", "Campus Ambassador", "Student Community", "Career Training", "Employability", "Internship Opportunities"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+Bengali:wght@300;400;500;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
        <style dangerouslySetInnerHTML={{ __html: `
          main, header, footer, .chatbot-wrapper {
            opacity: 0;
          }
          body.loaded main, body.loaded header, body.loaded footer, body.loaded .chatbot-wrapper {
            opacity: 1;
            transition: opacity 0.4s ease;
          }
        `}} />
      </head>
      <body suppressHydrationWarning>
        <StyledJsxRegistry>
          <IntroAnimation />
          {children}
          <Chatbot />
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
