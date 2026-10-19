import dynamic from 'next/dynamic';
import './globals.css';

// Dynamically import the 3D background — no SSR (Three.js needs browser APIs)
const AnimatedCubeBackground = dynamic(
  () => import('@/components/AnimatedCubeBackground'),
  { ssr: false }
);

export const metadata = {
  title: 'Dinesh Sonawane | Full-Stack Software Engineer',
  description:
    'Full-stack engineer building AI-assisted products with React, TypeScript, Spring Boot and FastAPI. Creator of MATRA, a Smart India Hackathon prototype for material code harmonization.',
};

export const viewport = {
  themeColor: '#0d1117',
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {/* Static CSS fallback (shown before JS hydrates + for reduced-motion) */}
        <div className="page-bg" aria-hidden />
        {/* Real-time 3D animated background — client-side only */}
        <AnimatedCubeBackground />
        {children}
      </body>
    </html>
  );
}
