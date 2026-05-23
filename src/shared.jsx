/* shared.jsx — design tokens, icons, mascot, bottom nav, phone frame */
const { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } = React;

/* ------------------------- Icons (outline, 24px) ------------------------- */

const Icon = ({ children, size = 24, stroke = "currentColor", fill = "none", style, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
       strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={style} {...rest}>
    {children}
  </svg>
);

const IconChevronLeft = (p) => <Icon {...p}><polyline points="15 6 9 12 15 18" /></Icon>;
const IconChevronRight = (p) => <Icon {...p}><polyline points="9 6 15 12 9 18" /></Icon>;
const IconArrowUp = (p) => <Icon {...p}><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></Icon>;
const IconArrowUpRight = (p) => <Icon {...p}><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></Icon>;
const IconX = (p) => <Icon {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>;
const IconCheck = (p) => <Icon {...p} strokeWidth="2.2"><polyline points="20 6 9 17 4 12" /></Icon>;
const IconPlus = (p) => <Icon {...p}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Icon>;
const IconMic = (p) => <Icon {...p}>
  <rect x="9" y="3" width="6" height="12" rx="3" />
  <path d="M5 11a7 7 0 0 0 14 0" />
  <line x1="12" y1="18" x2="12" y2="22" />
</Icon>;
const IconSearch = (p) => <Icon {...p}><circle cx="11" cy="11" r="7" /><line x1="20" y1="20" x2="16.65" y2="16.65" /></Icon>;
const IconUser = (p) => <Icon {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>;
const IconFlame = (p) => <Icon {...p}>
  <path d="M12 2c.5 3-1.5 4.5-3 6.5-1.6 2.2-2 4-2 5.5a5 5 0 0 0 10 0c0-2-1-3.5-2-5 .5 1 .5 2 0 3a2 2 0 0 1-3-1.5C12 8 14 6 12 2Z" />
</Icon>;
const IconDollar = (p) => <Icon {...p}>
  <line x1="12" y1="2" x2="12" y2="22" />
  <path d="M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" />
</Icon>;
const IconTrash = (p) => <Icon {...p}>
  <polyline points="3 6 5 6 21 6" />
  <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
  <path d="M10 11v6M14 11v6" />
  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
</Icon>;
const IconDrag = (p) => <Icon {...p}>
  <circle cx="9" cy="6" r="1.4" /><circle cx="9" cy="12" r="1.4" /><circle cx="9" cy="18" r="1.4" />
  <circle cx="15" cy="6" r="1.4" /><circle cx="15" cy="12" r="1.4" /><circle cx="15" cy="18" r="1.4" />
</Icon>;
const IconCards = (p) => <Icon {...p}><rect x="6" y="4" width="12" height="16" rx="2" /><line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="13" x2="15" y2="13" /></Icon>;
const IconPlay = (p) => <Icon {...p}><polygon points="6 4 20 12 6 20 6 4" fill="currentColor" /></Icon>;
const IconSettings = (p) => <Icon {...p}>
  <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="17" x2="21" y2="17" />
  <circle cx="9" cy="7" r="2.4" /><circle cx="15" cy="17" r="2.4" />
</Icon>;
const IconSparkle = ({ size = 24, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2.5c.4 4.2 2.3 6.1 6.5 6.5-4.2.4-6.1 2.3-6.5 6.5-.4-4.2-2.3-6.1-6.5-6.5 4.2-.4 6.1-2.3 6.5-6.5Z"/>
    <path d="M19 14c.2 2 1.1 2.8 3 3-1.9.2-2.8 1.1-3 3-.2-1.9-1.1-2.8-3-3 1.9-.2 2.8-1.1 3-3Z"/>
  </svg>
);
const IconConfetti = (p) => <Icon {...p}>
  <path d="M4 20l4-12 6 10-10 2Z" />
  <path d="M14 4v2M18 6l1.4-1.4M20 10h2M16 11l1.4 1.4M12 5l-1-1" />
</Icon>;
const IconInfo = (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="16" /><circle cx="12" cy="8" r=".8" fill="currentColor" /></Icon>;
const IconBars = (p) => <Icon {...p}>
  <line x1="5" y1="20" x2="5" y2="14" />
  <line x1="10" y1="20" x2="10" y2="10" />
  <line x1="15" y1="20" x2="15" y2="6" />
  <line x1="20" y1="20" x2="20" y2="12" />
</Icon>;
const IconTarget = (p) => <Icon {...p}>
  <circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" />
  <line x1="18" y1="6" x2="15" y2="9" /><polyline points="15 5 18 6 19 9" />
</Icon>;
const IconBulb = (p) => <Icon {...p}>
  <path d="M9 18h6M10 21h4" />
  <path d="M12 3a6 6 0 0 0-4 10c.8.9 1 2 1 3h6c0-1 .2-2.1 1-3a6 6 0 0 0-4-10Z" />
</Icon>;
const IconMindspace = ({ size = 24, color = "currentColor", active=false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeDasharray={active ? "0" : "3 3"}>
    <circle cx="12" cy="12" r="9" />
  </svg>
);
/* Bottom-nav icons (custom asset set) */
const IconNavDashboard = ({ size = 32, color = "#949494" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M28 28H10.4C8.15979 28 7.03968 28 6.18404 27.564C5.43139 27.1805 4.81947 26.5687 4.43597 25.816C4 24.9603 4 23.8403 4 21.6V4M20 13.3333V22.6667M9.33333 17.3333V22.6667M25.3333 6.66667V22.6667M14.6667 9.33333V22.6667"
          stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconNavPlan = ({ size = 32, color = "#949494" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M20 12L16.6666 15.3333M20 12V8L24 4V8H28L24 12H20Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.44 4H16C13.6266 4 11.3066 4.70379 9.33316 6.02236C7.35977 7.34094 5.8217 9.21509 4.91345 11.4078C4.0052 13.6005 3.76756 16.0133 4.23058 18.3411C4.6936 20.6689 5.83649 22.8071 7.51472 24.4853C9.19295 26.1635 11.3312 27.3064 13.6589 27.7694C15.9867 28.2324 18.3995 27.9948 20.5922 27.0866C22.7849 26.1783 24.6591 24.6402 25.9776 22.6668C27.2962 20.6935 28 18.3734 28 16C28 15.8533 28 15.7067 28 15.56"
          stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22.5334 17.3333C22.2922 18.5132 21.7359 19.6057 20.9237 20.4948C20.1114 21.3839 19.0735 22.0364 17.9202 22.383C16.7668 22.7295 15.5412 22.7572 14.3734 22.463C13.2056 22.1689 12.1393 21.5639 11.2877 20.7123C10.4362 19.8608 9.83117 18.7945 9.53701 17.6267C9.24286 16.4589 9.27053 15.2332 9.61707 14.0799C9.96361 12.9265 10.6161 11.8886 11.5052 11.0763C12.3943 10.2641 13.4868 9.70782 14.6667 9.46666"
          stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconNavLearn = ({ size = 32, color = "#949494" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M24.9608 11.5584C24.9609 10.3687 24.7243 9.19087 24.2644 8.09366C23.8044 6.99645 23.1308 6.00185 22.2824 5.16779C21.434 4.33375 20.4281 3.67699 19.3232 3.23585C18.2184 2.7947 17.0367 2.57803 15.8472 2.59842C13.5637 2.66633 11.3894 3.59173 9.7575 5.19045C8.12556 6.78918 7.15562 8.94395 7.04079 11.2256C6.98621 12.7482 7.32075 14.2595 8.01282 15.6168C8.70489 16.974 9.73163 18.1324 10.996 18.9824C11.3523 19.2141 11.6454 19.5308 11.8487 19.9039C12.0521 20.2771 12.1593 20.695 12.1608 21.12V23.0784H19.8408V21.12C19.8408 20.6962 19.9461 20.279 20.1472 19.9059C20.3483 19.5328 20.6389 19.2155 20.9928 18.9824C22.2116 18.1646 23.211 17.0598 23.9029 15.7654C24.5949 14.4709 24.9581 13.0262 24.9608 11.5584Z"
          stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.84 26.9312C18.7322 27.762 17.3849 28.2112 16 28.2112C14.6152 28.2112 13.2678 27.762 12.16 26.9312"
          stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconNavMindspace = ({ size = 32, color = "#949494" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="13" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 6"/>
  </svg>
);
const IconGroceries = (p) => <Icon {...p}>
  <path d="M5 8h14l-1.5 11a2 2 0 0 1-2 1.8H8.5A2 2 0 0 1 6.5 19L5 8Z" />
  <path d="M8 8a4 4 0 0 1 8 0" />
  <path d="M9 13a3 3 0 0 0 6 0" />
</Icon>;
const IconPizza = (p) => <Icon {...p}>
  <path d="M3 4l18 6-8 11Z" /><circle cx="11" cy="9" r="1" /><circle cx="14" cy="14" r="1" />
</Icon>;
const IconCoffee = (p) => <Icon {...p}>
  <path d="M5 8h12v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z" />
  <path d="M17 9h2a2 2 0 0 1 0 4h-2" />
  <path d="M8 3v2M11 3v2M14 3v2" />
</Icon>;
const IconTransport = (p) => <Icon {...p}>
  <path d="M3 14h13l-1-4H6l-3 4Z" />
  <circle cx="7" cy="17" r="1.8" /><circle cx="15" cy="17" r="1.8" />
  <path d="M16 11l3 1" />
</Icon>;
const IconSmile = (p) => <Icon {...p}>
  <circle cx="12" cy="12" r="9" />
  <path d="M8 14c1 1.5 2.4 2.4 4 2.4S15 15.5 16 14" />
  <circle cx="9" cy="10" r=".9" /><circle cx="15" cy="10" r=".9" />
</Icon>;
const IconScale = (p) => <Icon {...p}>
  <line x1="12" y1="4" x2="12" y2="20" />
  <line x1="6" y1="20" x2="18" y2="20" />
  <path d="M4 10l4-6 4 6M14 10l4-6 4 6" />
  <path d="M4 10a4 4 0 0 0 8 0M14 10a4 4 0 0 0 8 0" />
</Icon>;
const IconPie = (p) => <Icon {...p}>
  <path d="M12 3v9h9a9 9 0 1 1-9-9Z" />
  <path d="M14 3a7 7 0 0 1 7 7h-7V3Z" />
</Icon>;
const IconBag = (p) => <Icon {...p}>
  <path d="M6 8h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8Z" />
  <path d="M9 8a3 3 0 0 1 6 0" />
  <path d="M11 13h2v2h-2z" />
</Icon>;
const IconSwap = (p) => <Icon {...p}>
  <polyline points="6 8 3 11 6 14" /><line x1="3" y1="11" x2="14" y2="11" />
  <polyline points="18 10 21 13 18 16" /><line x1="21" y1="13" x2="10" y2="13" />
</Icon>;
const IconBookmark = ({ filled = false, ...p }) => <Icon {...p} fill={filled ? "currentColor" : "none"}>
  <path d="M6 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-6-4-6 4V4Z" />
</Icon>;
const IconBack = IconChevronLeft;

/* ------------------------- Mascot ------------------------- */

const MASCOT_RING_D = "M44.292 4.03c.247-2.07-1.233-3.97-3.317-4.02C32.705-.19 24.541 2.18 17.632 6.84 9.676 12.2 3.914 20.25 1.398 29.52-1.117 38.78-.219 48.64 3.93 57.29c4.148 8.65 11.27 15.53 20.066 19.37 8.795 3.84 18.679 4.39 27.846 1.55 9.167-2.84 17.007-8.89 22.09-17.03 5.082-8.14 7.068-17.84 5.594-27.32-1.279-8.24-5.092-15.83-10.862-21.76-1.454-1.5-3.852-1.29-5.203.31-1.35 1.59-1.138 3.96.283 5.48 4.406 4.73 7.32 10.69 8.32 17.14 1.195 7.69-.415 15.56-4.538 22.16-4.123 6.61-10.483 11.51-17.92 13.81-7.436 2.31-15.454 1.86-22.589-1.25-7.135-3.12-12.913-8.69-16.278-15.71C7.374 47 6.645 39 8.686 31.5c2.04-7.51 6.715-14.05 13.169-18.4C27.261 9.45 33.614 7.54 40.078 7.55c2.085.01 3.967-1.45 4.214-3.52z";

const Mascot = ({ size = 110, color = "var(--teal-300)", animated = true, style }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" style={style}>
    <circle cx="40.12" cy="40.46" r="24.32" transform="rotate(30 40.12 40.46)" fill={color}/>
    <path d={MASCOT_RING_D} fill={color}/>
    <g style={animated ? { animation: "eye-look 7s ease-in-out infinite", transformOrigin: "46.7px 40.2px" } : undefined}>
      <ellipse cx="37.73" cy="40.23" rx="4.5" ry="4.5" fill="#161616"/>
      <ellipse cx="55.75" cy="40.23" rx="4.5" ry="4.5" fill="#161616"/>
    </g>
  </svg>
);

/* Dashboard user avatar — uses the uploaded user image */
const HeroAvatar = ({ size = 86 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    overflow: "hidden", background: "var(--teal-100)",
    boxShadow: "0 2px 6px rgba(0,0,0,.06)",
  }}>
    <img src="assets/user-image.png" alt="You"
         style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
  </div>
);

/* Animated emotion mascot with floating dot ring */
const EmotionMascot = ({ color = "var(--teal-300)", ringColors, size = 280 }) => {
  // Generate dot positions deterministically
  const rings = ringColors || [color];
  const dots = useMemo(() => {
    const arr = [];
    const ringCount = 3;
    const counts = [22, 28, 34];
    const radii = [70, 96, 122];
    for (let r = 0; r < ringCount; r++) {
      for (let i = 0; i < counts[r]; i++) {
        const ang = (i / counts[r]) * Math.PI * 2 + r * 0.4;
        const jitter = ((i * 13 + r * 7) % 11 - 5) * 0.6;
        const radius = radii[r] + jitter;
        arr.push({
          x: Math.cos(ang) * radius,
          y: Math.sin(ang) * radius,
          size: 4 + ((i + r) % 4),
          color: rings[(i + r) % rings.length],
          delay: ((i * 0.15 + r * 0.3) % 3),
        });
      }
    }
    return arr;
  }, [rings]);
  return (
    <div style={{ width: size, height: size, position: "relative", display: "grid", placeItems: "center" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {dots.map((d, i) => (
          <div key={i} style={{
            position: "absolute",
            left: "50%", top: "50%",
            transform: `translate(${d.x - d.size/2}px, ${d.y - d.size/2}px)`,
          }}>
            <div style={{
              width: d.size, height: d.size,
              background: d.color, borderRadius: "50%",
              animation: `dot-float 4s ease-in-out ${d.delay}s infinite`,
              opacity: 0.75,
            }}/>
          </div>
        ))}
      </div>
      <Mascot color={color} size={size * 0.36} />
    </div>
  );
};

/* ------------------------- Bottom Nav ------------------------- */

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: IconNavDashboard },
  { key: "plan",      label: "Plan",      icon: IconNavPlan },
  { key: "learn",     label: "Learn",     icon: IconNavLearn },
  { key: "mindspace", label: "Mindspace", icon: IconNavMindspace },
];

const NAV_ACTIVE = "#00A991";
const NAV_INACTIVE = "#949494";

const BottomNav = ({ active, onChange }) => (
  <div style={{
    position: "absolute", left: 16, right: 16, bottom: 16,
    height: 72,
    background: "#fff",
    borderRadius: 36,
    display: "flex",
    boxShadow: "0 6px 24px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04)",
    padding: "10px 6px",
    zIndex: 60,
  }}>
    {NAV_ITEMS.map(it => {
      const isActive = active === it.key;
      const Ic = it.icon;
      const c = isActive ? NAV_ACTIVE : NAV_INACTIVE;
      return (
        <button key={it.key} onClick={() => onChange?.(it.key)} style={{
          flex: 1, border: 0, background: "transparent", cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          color: c, padding: 0,
        }}>
          <Ic size={26} color={c}/>
          <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, letterSpacing: -0.1 }}>{it.label}</span>
        </button>
      );
    })}
  </div>
);

/* ------------------------- Phone frame (auto-scale 402x874) ------------------------- */

const PhoneFrame = ({ children, background = "var(--bg-soft)" }) => {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const W = window.innerWidth - 24;
      const H = window.innerHeight - 24;
      const s = Math.min(W / 402, H / 874, 1.05);
      setScale(s);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return (
    <div ref={wrapRef} style={{
      width: 402 * scale, height: 874 * scale, position: "relative",
    }}>
      <div style={{
        width: 402, height: 874,
        transform: `scale(${scale})`, transformOrigin: "top left",
        position: "absolute", left: 0, top: 0,
        background, borderRadius: 56,
        overflow: "hidden",
        boxShadow: "0 18px 60px rgba(0,0,0,.18), 0 2px 6px rgba(0,0,0,.06)",
        border: "1px solid rgba(0,0,0,.05)",
      }}>
        {/* Status bar */}
        <div style={{
          position: "absolute", left: 0, right: 0, top: 0, height: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 32px 0", zIndex: 70, pointerEvents: "none",
        }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>9:41</span>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <svg width="18" height="10" viewBox="0 0 18 10" fill="currentColor">
              <rect x="0" y="6" width="3" height="4" rx="0.5"/>
              <rect x="5" y="4" width="3" height="6" rx="0.5"/>
              <rect x="10" y="2" width="3" height="8" rx="0.5"/>
              <rect x="15" y="0" width="3" height="10" rx="0.5"/>
            </svg>
            <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
              <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor"/>
              <rect x="2" y="2" width="14" height="7" rx="1.2" fill="currentColor"/>
              <rect x="19" y="3.5" width="1.5" height="4" rx=".5" fill="currentColor"/>
            </svg>
          </div>
        </div>
        {/* Notch */}
        <div style={{
          position: "absolute", left: "50%", top: 12, transform: "translateX(-50%)",
          width: 110, height: 32, background: "#000", borderRadius: 20, zIndex: 80,
        }}/>

        {/* App content area */}
        <div style={{ position: "absolute", inset: 0, paddingTop: 0 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

/* ------------------------- Floating sparkle button ------------------------- */

const SparkleButton = ({ onClick, color = "var(--teal-300)", floating = true, bottom = 100, right = 18, variant = "solid" }) => {
  const inline = variant === "inline";
  return (
    <button onClick={onClick} aria-label="Open AI assistant" style={{
      position: floating ? "absolute" : "relative",
      bottom: floating ? bottom : "auto", right: floating ? right : "auto",
      width: inline ? 44 : 56, height: inline ? 44 : 56, borderRadius: "50%",
      background: inline ? "#fff" : color,
      border: inline ? "1px solid var(--teal-100)" : 0,
      color: inline ? color : "#fff", cursor: "pointer",
      display: "grid", placeItems: "center",
      boxShadow: inline ? "0 1px 3px rgba(0,0,0,.06)" : "0 8px 24px rgba(0,135,116,.35)",
      zIndex: 55,
    }}>
      <IconSparkle size={inline ? 22 : 26} color={inline ? color : "#fff"} />
    </button>
  );
};

/* ------------------------- AI Input bar (reusable, can mount inline or as overlay) ------------------------- */

const AIBar = ({ placeholder = "Describe more", onSubmit, color = "var(--teal-300)" }) => {
  const [v, setV] = useState("");
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      background: "#fff", borderRadius: 999, padding: "10px 8px 10px 16px",
      boxShadow: "0 4px 16px rgba(0,0,0,.06)",
      border: "1px solid var(--line)",
    }}>
      <button style={iconBtn()} aria-label="Add"><IconPlus size={20} color="#222"/></button>
      <input value={v} onChange={e => setV(e.target.value)} placeholder={placeholder} style={{
        flex: 1, border: 0, outline: 0, fontSize: 15, color: "var(--ink)", background: "transparent",
        fontFamily: "inherit",
      }}/>
      <button style={iconBtn()} aria-label="Voice"><IconMic size={20} color="#222"/></button>
      <button onClick={() => { onSubmit?.(v); setV(""); }} style={{
        width: 38, height: 38, borderRadius: "50%",
        border: "1px solid var(--line)", background: "#fff", display: "grid", placeItems: "center",
        cursor: "pointer",
      }} aria-label="Submit">
        <IconArrowUp size={18} color="#222"/>
      </button>
    </div>
  );
};

const iconBtn = (extra) => ({
  width: 32, height: 32, border: 0, background: "transparent",
  display: "grid", placeItems: "center", cursor: "pointer", padding: 0, ...extra,
});

/* ------------------------- Bottom sheet (generic) + AI Overlay ------------------------- */

const InfoSheet = ({ open, onClose, children }) => (
  <>
    <div onClick={onClose} style={{
      position: "absolute", inset: 0, background: "rgba(0,0,0,.16)",
      opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
      transition: "opacity .25s ease", zIndex: 90,
    }}/>
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      background: "#fff", borderTopLeftRadius: 28, borderTopRightRadius: 28,
      padding: "16px 16px 28px",
      transform: `translateY(${open ? 0 : "110%"})`,
      transition: "transform .35s cubic-bezier(.2,.8,.2,1)",
      boxShadow: "0 -10px 30px rgba(0,0,0,.12)",
      zIndex: 95,
    }}>
      <div style={{ width: 40, height: 4, borderRadius: 4, background: "rgb(220,220,220)", margin: "0 auto 14px" }}/>
      {children}
    </div>
  </>
);

const AIOverlay = ({ open, onClose, color = "var(--teal-300)", placeholder = "Focus more on ETF learning" }) => (
  <InfoSheet open={open} onClose={onClose}>
    <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 10, paddingLeft: 4 }}>Ask Cove anything</div>
    <AIBar placeholder={placeholder} color={color} onSubmit={() => onClose?.()}/>
  </InfoSheet>
);

/* ------------------------- StatPill (shared between Learn + Mindspace) ------------------------- */

const StatPill = ({ icon, label, value, compact = false }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: compact ? 8 : 14,
    background: "#fff", padding: compact ? "8px 14px" : "12px 22px", borderRadius: 999,
    boxShadow: "0 2px 8px rgba(0,0,0,.05)",
    width: "fit-content", minWidth: compact ? 0 : 220,
  }}>
    {icon}
    <span style={{ fontWeight: 500, fontSize: compact ? 13 : 15, color: "#111" }}>{label}</span>
    <span style={{ fontWeight: 700, fontSize: compact ? 15 : 18, color: "var(--navy-900)" }}>{value}</span>
  </div>
);

/* ------------------------- FormatBadge (content-type indicator) ------------------------- */

const FORMAT_META = {
  read:                { Icon: IconCards, label: "Read",               disabled: false },
  interactive:         { Icon: IconPlay,  label: "Interactive",        disabled: false },
  "interactive-video": { Icon: IconPlay,  label: "Interactive video",  disabled: false },
  audio:               { Icon: IconMic,   label: "Audio · coming soon", disabled: true },
};

const FormatBadge = ({ format = "read", duration, color = "var(--teal-500)" }) => {
  const meta = FORMAT_META[format] || FORMAT_META.read;
  const tone = meta.disabled ? "var(--ink-mute)" : color;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      fontSize: 13, fontWeight: 600, color: tone,
    }}>
      <meta.Icon size={16} color={tone}/>
      <span>{meta.label}</span>
      {duration && (
        <>
          <span style={{ width: 1, height: 12, background: "var(--ink-mute)", opacity: .4 }}/>
          <span style={{ fontWeight: 500 }}>{duration}</span>
        </>
      )}
    </div>
  );
};

/* ------------------------- SourceFooter (credibility signal) ------------------------- */

const SourceFooter = ({ sources = [] }) => {
  const [open, setOpen] = useState(false);
  if (!sources.length) return null;
  return (
    <>
      <button onClick={() => setOpen(true)} style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: "transparent", border: 0, padding: "8px 0",
        color: "var(--ink-soft)", fontSize: 12, fontWeight: 500,
        cursor: "pointer", fontFamily: "inherit",
      }}>
        <IconInfo size={14} color="var(--ink-soft)"/>
        <span>Sources ({sources.length})</span>
      </button>
      <InfoSheet open={open} onClose={() => setOpen(false)}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--navy-900)", marginBottom: 4 }}>Sources</div>
        <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--ink-soft)" }}>
          Cove pulls financial-literacy content from publicly recognized educators and regulators.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sources.map((s, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column", gap: 2,
              background: "var(--teal-50)", borderRadius: 12, padding: "10px 14px",
            }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--navy-900)" }}>{s.name}</span>
              <span style={{ fontSize: 12, color: "var(--teal-700)" }}>{s.url}</span>
            </div>
          ))}
        </div>
      </InfoSheet>
    </>
  );
};

/* ------------------------- MoodLegend (mood color/emoji key) ------------------------- */

const MOOD_KEY = [
  { name: "overwhelmed", color: "rgb(255, 120, 100)", emoji: "😣" },
  { name: "anxious",     color: "var(--teal-300)",    emoji: "😟" },
  { name: "stressed",    color: "var(--blue-500)",    emoji: "😩" },
  { name: "calm",        color: "var(--purple-500)",  emoji: "😌" },
  { name: "hopeful",     color: "var(--teal-500)",    emoji: "🙂" },
];

const MoodLegend = ({ defaultOpen = false, compact = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      background: "rgba(255,255,255,.7)", borderRadius: 14, padding: "10px 12px",
      border: "1px solid var(--line)",
    }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between",
        background: "transparent", border: 0, padding: 0, cursor: "pointer", fontFamily: "inherit",
        color: "var(--ink-soft)", fontSize: 12, fontWeight: 600, letterSpacing: .2,
      }}>
        <span>{open ? "Hide key" : "Show key"}</span>
        <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <div style={{
          marginTop: 10, display: "flex", flexWrap: "wrap", gap: compact ? 6 : 10,
        }}>
          {MOOD_KEY.map(m => (
            <div key={m.name} style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, color: "#111",
            }}>
              <span style={{
                width: 14, height: 14, borderRadius: "50%", background: m.color,
                display: "inline-block",
              }}/>
              <span>{m.emoji}</span>
              <span style={{ fontWeight: 500 }}>{m.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ------------------------- BreathingGuide (box-breathing overlay) ------------------------- */

const BreathingGuide = ({ open, onClose }) => {
  const PHASES = ["Breathe in", "Hold", "Breathe out", "Hold"];
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!open) { setPhase(0); return; }
    const id = setInterval(() => setPhase(p => (p + 1) % 4), 4000);
    return () => clearInterval(id);
  }, [open]);
  const scale = phase === 0 ? 1.5 : phase === 1 ? 1.5 : phase === 2 ? 1 : 1;
  return (
    <>
      <div onClick={onClose} style={{
        position: "absolute", inset: 0, background: "rgba(0,30,40,.55)",
        backdropFilter: "blur(6px)",
        opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
        transition: "opacity .35s ease", zIndex: 100,
      }}/>
      <div style={{
        position: "absolute", inset: 0, display: open ? "flex" : "none",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 40, zIndex: 105, pointerEvents: "none",
      }}>
        <div style={{
          width: 180, height: 180, borderRadius: "50%",
          background: "radial-gradient(circle, var(--blue-200), var(--blue-500))",
          transform: `scale(${scale})`,
          transition: "transform 4s cubic-bezier(.4,0,.4,1)",
          boxShadow: "0 0 60px rgba(43,127,255,.4)",
        }}/>
        <div key={phase} style={{
          fontSize: 28, fontWeight: 500, color: "#fff", letterSpacing: -.4,
          animation: "float-up .4s ease both",
        }}>{PHASES[phase]}</div>
        <button onClick={onClose} style={{
          pointerEvents: "auto",
          padding: "12px 22px", borderRadius: 999,
          background: "rgba(255,255,255,.18)", color: "#fff",
          border: "1px solid rgba(255,255,255,.4)",
          fontWeight: 500, fontSize: 14, cursor: "pointer", fontFamily: "inherit",
          backdropFilter: "blur(6px)",
        }}>Done</button>
      </div>
    </>
  );
};

/* ------------------------- Pill / chip / button primitives ------------------------- */

const Pill = ({ children, style, ...rest }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "6px 12px", borderRadius: 999,
    background: "var(--teal-50)", color: "var(--teal-700)",
    fontSize: 13, fontWeight: 500, ...style,
  }} {...rest}>{children}</span>
);

const PrimaryButton = ({ children, onClick, color = "var(--teal-300)", disabled, style }) => (
  <button onClick={onClick} disabled={disabled} style={{
    width: "100%", padding: "16px 20px", borderRadius: 999,
    background: disabled ? "rgb(200,210,210)" : color, color: "#fff",
    border: 0, fontSize: 16, fontWeight: 600, cursor: disabled ? "default" : "pointer",
    boxShadow: disabled ? "none" : "0 6px 18px rgba(0,135,116,.22)",
    transition: "transform .15s ease",
    fontFamily: "inherit",
    ...style,
  }}>{children}</button>
);

const SecondaryButton = ({ children, onClick, style }) => (
  <button onClick={onClick} style={{
    padding: "14px 20px", borderRadius: 999,
    background: "var(--teal-100)", color: "var(--teal-900)",
    border: 0, fontSize: 15, fontWeight: 600, cursor: "pointer",
    fontFamily: "inherit",
    ...style,
  }}>{children}</button>
);

const RoundIconBtn = ({ children, onClick, style, ...rest }) => (
  <button onClick={onClick} {...rest} style={{
    width: 44, height: 44, borderRadius: "50%",
    background: "#fff", border: 0, cursor: "pointer",
    display: "grid", placeItems: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,.06)",
    ...style,
  }}>{children}</button>
);

/* ------------------------- Header (back + profile) ------------------------- */

const TopRow = ({ onBack, right, leftExtra }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    paddingTop: 56, paddingLeft: 16, paddingRight: 16, gap: 10,
  }}>
    <div style={{ display: "flex", gap: 8 }}>
      {onBack && (
        <RoundIconBtn onClick={onBack} aria-label="Back"><IconChevronLeft size={22} /></RoundIconBtn>
      )}
      {leftExtra}
    </div>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {right || (
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "#fff", display: "grid", placeItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        }}>
          <IconUser size={22} color="#444" />
        </div>
      )}
    </div>
  </div>
);

/* Toggle (segmented) */

const Segmented = ({ options, value, onChange, color = "var(--navy-900)" }) => (
  <div style={{
    display: "inline-flex", padding: 4, borderRadius: 999,
    background: color, position: "relative",
    width: "max-content",
  }}>
    {options.map(opt => {
      const active = value === opt.value;
      return (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          padding: "10px 22px", borderRadius: 999,
          background: active ? "#fff" : "transparent",
          color: active ? "var(--navy-900)" : "#fff",
          border: 0, cursor: "pointer", fontWeight: 600, fontSize: 14,
          fontFamily: "inherit",
          transition: "background .2s",
        }}>{opt.label}</button>
      );
    })}
  </div>
);

/* Export everything to window */
Object.assign(window, {
  // hooks
  useState, useEffect, useRef, useMemo, useCallback,
  // icons
  Icon, IconChevronLeft, IconChevronRight, IconArrowUp, IconArrowUpRight, IconX, IconCheck,
  IconPlus, IconMic, IconSearch, IconUser, IconFlame, IconDollar, IconTrash, IconDrag,
  IconCards, IconPlay, IconSettings, IconSparkle, IconConfetti, IconInfo,
  IconBars, IconTarget, IconBulb, IconMindspace, IconBookmark,
  IconNavDashboard, IconNavPlan, IconNavLearn, IconNavMindspace,
  IconGroceries, IconPizza, IconCoffee, IconTransport, IconSmile, IconScale, IconPie, IconBag, IconSwap, IconBack,
  // components
  Mascot, HeroAvatar, EmotionMascot,
  BottomNav, PhoneFrame, SparkleButton, AIBar, AIOverlay, InfoSheet,
  Pill, PrimaryButton, SecondaryButton, RoundIconBtn, TopRow, Segmented,
  StatPill, FormatBadge, SourceFooter, MoodLegend, BreathingGuide, MOOD_KEY,
  NAV_ITEMS, iconBtn,
});
