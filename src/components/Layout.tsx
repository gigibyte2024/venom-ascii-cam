import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Camera, Layers, BookOpen, Zap, ArrowLeft, Heart } from "lucide-react";

const navItems = [
  { to: "/", label: "STUDIO", icon: Camera, end: true },
  { to: "/presets", label: "PRESETS", icon: Layers },
  { to: "/about", label: "MANIFESTO", icon: BookOpen },
];

const Layout = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const showBack = loc.pathname !== "/";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 border-b border-primary/30 bg-background/85 backdrop-blur-md">
        <div className="container flex items-center justify-between py-3 gap-4">
          <Link to="/" className="flex items-center gap-3 group" aria-label="VENOM CAM home">
            <div className="relative animate-glitch">
              <Heart className="h-7 w-7 neon-text-pink animate-flicker fill-current" strokeWidth={1.5} />
              <Zap className="h-3 w-3 absolute -bottom-1 -right-1 neon-text-purple" />
            </div>
            <div className="leading-none">
              <div className="font-display text-lg md:text-xl font-bold tracking-[0.18em]">
                <span className="neon-text-bone">VENOM </span>
                <span className="baddie-gradient-text">CAM</span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    "px-3 py-2 text-xs tracking-[0.25em] flex items-center gap-2 border transition-all",
                    isActive
                      ? "border-primary text-primary bg-primary/10 shadow-[0_0_14px_hsl(var(--primary)/0.5)]"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-primary/40",
                  ].join(" ")
                }
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2 text-[10px] tracking-[0.25em] neon-text-pink">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            ONLINE
          </div>
        </div>

        <nav className="md:hidden border-t border-primary/20 flex">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  "flex-1 py-2 flex flex-col items-center gap-1 text-[9px] tracking-[0.2em] border-r last:border-r-0 border-primary/20",
                  isActive ? "text-primary bg-primary/10" : "text-muted-foreground",
                ].join(" ")
              }
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      {showBack && (
        <div className="container pt-4">
          <button
            onClick={() => navigate(-1)}
            className="text-xs tracking-[0.25em] text-muted-foreground hover:text-primary hover:bg-primary/10 px-2 py-1 flex items-center"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-2" /> BACK
          </button>
        </div>
      )}

      <main className="flex-1" key={loc.pathname}>
        <Outlet />
      </main>

      <footer className="border-t border-primary/20 mt-12">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] tracking-[0.25em] text-muted-foreground">
          <div>© VENOM CAM · {new Date().getFullYear()} · STAY TOXIC</div>
          <div className="flex items-center gap-3">
            <span className="neon-text-pink">♥</span>
            <span>HTML · CSS · JS · CANVAS · getUserMedia</span>
            <span className="neon-text-purple">♥</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
