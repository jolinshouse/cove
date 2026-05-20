/* screens-mindspace.jsx — Mindspace flow */

const TODAY = "Sunday, May 17";

const MOODS = [
  { v: 0, name: "overwhelmed", color: "rgb(255, 120, 100)", mode: "green" },
  { v: 1, name: "anxious", color: "var(--teal-300)", mode: "green" },
  { v: 2, name: "stressed", color: "var(--blue-500)", mode: "blue" },
  { v: 3, name: "calm", color: "var(--purple-500)", mode: "purple" },
  { v: 4, name: "balanced", color: "var(--purple-500)", mode: "purple" },
  { v: 5, name: "hopeful", color: "var(--teal-300)", mode: "purple" },
];

const WEEK_MOODS = [
  { day: "Mon", color: "var(--teal-300)" },
  { day: "Tue", color: "var(--purple-500)" },
  { day: "Wed", color: "var(--blue-500)" },
  { day: "Thu", color: "var(--teal-300)" },
  { day: "Fri", color: "var(--purple-500)" },
  { day: "Sat", color: "var(--teal-300)" },
  { day: "Sun", color: null, label: "17" },
];

/* ───── Screen 1 — Mindspace Home ───── */

const MindspaceHomeScreen = ({ go, onChangeTab }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff", overflow: "hidden" }}>
    <div style={{ paddingTop: 70, textAlign: "center" }}>
      <div style={{ fontSize: 17, color: "var(--ink-mute)" }}>{TODAY}</div>
      <h1 style={{ margin: "10px 22px 0", fontSize: 27, fontWeight: 500, color: "#111", lineHeight: 1.2 }}>
        How are you feeling this afternoon?
      </h1>
    </div>

    <div style={{ marginTop: 6, display: "flex", justifyContent: "center" }}>
      <DotRing onCheckIn={() => go("mind-checkin")} size={320}/>
    </div>

    {/* This week mood tracker */}
    <div style={{ position: "absolute", left: 18, right: 18, bottom: 100,
                  background: "#fff", borderRadius: 24, padding: 18,
                  boxShadow: "0 4px 16px rgba(0,0,0,.05)" }}>
      <div style={{ fontWeight: 600, fontSize: 16 }}>This week</div>
      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
        {WEEK_MOODS.map(m => (
          <div key={m.day} style={{ textAlign: "center" }}>
            {m.color ? (
              <div style={{
                width: 40, height: 40, borderRadius: "50%", background: m.color,
                margin: "0 auto",
              }}/>
            ) : (
              <div style={{
                width: 40, height: 40, borderRadius: "50%", border: "1.5px solid var(--ink-mute)",
                display: "grid", placeItems: "center", color: "var(--ink-mute)",
                margin: "0 auto", fontSize: 13, fontWeight: 600,
              }}>{m.label}</div>
            )}
            <div style={{ marginTop: 6, fontSize: 13, color: "#333" }}>{m.day}</div>
          </div>
        ))}
      </div>
    </div>

    <BottomNav active="mindspace" onChange={onChangeTab}/>
  </div>
);

const DotRing = ({ onCheckIn, color, size = 280, ringColors, hideCenter = false }) => {
  const dots = useMemo(() => {
    const arr = [];
    const ringCount = 3;
    const counts = [22, 28, 36];
    const radii = [85, 113, 138];
    const palette = ringColors || ["rgb(220,225,230)", "var(--purple-200)", "var(--teal-100)", "var(--blue-200)"];
    for (let r = 0; r < ringCount; r++) {
      for (let i = 0; i < counts[r]; i++) {
        const ang = (i / counts[r]) * Math.PI * 2 + r * 0.3;
        const jitter = ((i * 7 + r * 5) % 9 - 4) * 0.5;
        const radius = radii[r] + jitter;
        arr.push({
          x: Math.cos(ang) * radius,
          y: Math.sin(ang) * radius,
          size: 5 + ((i + r * 2) % 4),
          color: palette[(i + r) % palette.length],
          delay: ((i * 0.12 + r * 0.25) % 3),
        });
      }
    }
    return arr;
  }, [ringColors]);
  return (
    <div style={{ width: size, height: size, position: "relative", display: "grid", placeItems: "center" }}>
      <div style={{ position: "absolute", inset: 0, animation: "orbit-spin 240s linear infinite", pointerEvents: "none" }}>
        {dots.map((d, i) => (
          <div key={i} style={{
            position: "absolute", left: "50%", top: "50%",
            transform: `translate(${d.x - d.size/2}px, ${d.y - d.size/2}px)`,
          }}>
            <div style={{
              width: d.size, height: d.size, background: d.color, borderRadius: "50%",
              animation: `dot-float ${4 + (i % 4)}s ease-in-out ${d.delay}s infinite`,
              opacity: 0.85,
            }}/>
          </div>
        ))}
      </div>
      <button onClick={onCheckIn} style={{
        width: 130, height: 130, borderRadius: "50%", background: "#fff", border: 0,
        cursor: "pointer", display: hideCenter ? "none" : "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 4, color: "#111", fontWeight: 500,
        boxShadow: "0 8px 28px rgba(0,0,0,.08)", fontFamily: "inherit",
      }}>
        <IconPlus size={32} stroke="#111"/>
        <span style={{ fontSize: 15 }}>Check in</span>
      </button>
    </div>
  );
};

/* ───── Screen 2 — Emotional Check-in ───── */

const CheckInScreen = ({ go, onChangeTab, setMode }) => {
  const [val, setVal] = useState(35);
  const idx = Math.min(MOODS.length - 1, Math.floor(val / 100 * MOODS.length));
  const mood = MOODS[idx];

  const complete = () => {
    setMode(mood.mode);
    go(`mind-${mood.mode}`);
  };

  // Map mood -> ring color palette
  const ringPalette = useMemo(() => {
    const map = {
      green: ["var(--teal-100)", "var(--teal-300)", "var(--teal-700)", "rgb(220,225,230)"],
      blue: ["var(--blue-200)", "var(--blue-500)", "var(--blue-700)", "rgb(220,225,230)"],
      purple: ["var(--purple-200)", "var(--purple-500)", "var(--purple-700)", "rgb(220,225,230)"],
    };
    return map[mood.mode];
  }, [mood.mode]);

  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 56, left: 16, zIndex: 5 }}>
        <RoundIconBtn onClick={() => go("mind-home")} aria-label="Close"><IconX size={20}/></RoundIconBtn>
      </div>
      <div style={{ paddingTop: 96, textAlign: "center" }}>
        <div style={{ fontSize: 17, color: "var(--ink-mute)" }}>{TODAY}</div>
        <h1 style={{ margin: "8px 22px 0", fontSize: 25, fontWeight: 500, color: "#111", lineHeight: 1.25 }}>
          Choose how you're feeling<br/>right now.
        </h1>
      </div>

      <div style={{ marginTop: 6, display: "flex", justifyContent: "center" }}>
        <div style={{ width: 320, height: 320, position: "relative", display: "grid", placeItems: "center" }}>
          <DotRing color={mood.color} ringColors={ringPalette} size={320} onCheckIn={() => {}} hideCenter/>
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 6, pointerEvents: "none",
          }}>
            <div style={{
              animation: "pulse-soft 3s ease-in-out infinite", transition: "all .3s",
            }}>
              <Mascot size={110} color={mood.color}/>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <div style={{ fontSize: 14, color: "var(--ink-mute)" }}>I'm Feeling</div>
        <div key={mood.name} style={{
          fontSize: 30, fontWeight: 600, color: "#111", marginTop: 4,
          animation: "float-up .25s ease both",
        }}>{mood.name}</div>
      </div>

      <div style={{ position: "absolute", left: 26, right: 26, bottom: 170 }}>
        <input type="range" className="cove-range" min={0} max={100} value={val}
               onChange={e => setVal(Number(e.target.value))} style={{ "--val": `${val}%` }}/>
        <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", fontSize: 14, color: "#333" }}>
          <span>Unpleasant</span><span>Pleasant</span>
        </div>
      </div>

      <div style={{ position: "absolute", left: 16, right: 16, bottom: 100 }}>
        <PrimaryButton onClick={complete}>Complete check-in</PrimaryButton>
      </div>
    </div>
  );
};

/* ───── Screens 3-5 — Mode views ───── */

const MODE_DATA = {
  green: {
    bg: "linear-gradient(rgb(230, 246, 244) 0%, #fff 50%)",
    accent: "var(--teal-300)",
    palette: ["var(--teal-100)", "var(--teal-300)", "var(--teal-700)", "rgb(220,225,230)"],
    sparkle: "var(--teal-700)",
    cardBg: "var(--teal-50)",
    header: "It's natural to feel anxious about money and the future.",
    support: "You don't need to have everything figured out today. Small, steady actions create long-term stability.",
    cta: "Listen to calm audio",
    ctaIcon: <IconPlay size={18} color="#fff"/>,
    mascotText: "Let's calm down together",
    features: [
      { name: "Breathing exercises", icon: IconConfetti },
      { name: "Grounding practice", icon: IconScale },
      { name: "Financial reassurance", icon: IconBulb },
      { name: "Progress reminders", icon: IconCheck },
    ],
  },
  blue: {
    bg: "linear-gradient(rgb(230, 240, 255) 0%, #fff 55%)",
    accent: "var(--blue-500)",
    palette: ["var(--blue-200)", "var(--blue-500)", "var(--blue-700)", "rgb(220,225,230)"],
    sparkle: "var(--blue-700)",
    cardBg: "var(--blue-50)",
    header: "It's okay to feel stressed when numbers shift.",
    support: "A stressful week doesn't erase your progress. Markets move. Bills happen. You don't have to solve everything today.",
    cta: "Start box breathing",
    ctaIcon: <IconPlay size={18} color="#fff"/>,
    mascotText: "Take 2 minutes to relax",
    features: [
      { name: "Box breathing animation", icon: IconConfetti },
      { name: "Calm timers", icon: IconSettings },
      { name: "Daily reset", icon: IconCheck },
    ],
  },
  purple: {
    bg: "linear-gradient(rgb(245, 240, 255) 0%, #fff 55%)",
    accent: "var(--purple-500)",
    palette: ["var(--purple-200)", "var(--purple-500)", "var(--purple-700)", "rgb(220,225,230)"],
    sparkle: "var(--purple-700)",
    cardBg: "var(--purple-50)",
    header: "You're doing better than you think.",
    support: "Your financial journey doesn't need to be perfect to be meaningful. Let's slow down and focus on what matters most today.",
    cta: "Review this week",
    ctaIcon: <IconBars size={18} color="#fff"/>,
    mascotText: "Continue mindfully",
    features: [
      { name: "Reflection prompts", icon: IconBulb },
      { name: "Weekly wins", icon: IconCheck },
      { name: "Gratitude journal", icon: IconCards },
      { name: "Milestone moments", icon: IconConfetti },
    ],
  },
};

const ModeScreen = ({ go, onChangeTab, mode, openAI }) => {
  const m = MODE_DATA[mode];
  const [boxBreath, setBoxBreath] = useState(false);
  const todayColor = m.accent;
  return (
    <div style={{ position: "absolute", inset: 0, background: m.bg, overflow: "hidden" }}>
      <div style={{ paddingTop: 60, textAlign: "center", padding: "60px 24px 0" }}>
        <div style={{ fontSize: 17, color: "var(--ink-mute)" }}>{TODAY}</div>
        <h1 style={{ margin: "12px 0 0", fontSize: 24, fontWeight: 500, color: "#111", lineHeight: 1.3 }}>
          {m.header}
        </h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
          <DotRing color={m.accent} ringColors={m.palette} size={290} onCheckIn={() => {}} hideCenter/>
          <div style={{
            position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none",
          }}>
            <div style={{
              animation: boxBreath ? "pulse-soft 4s ease-in-out infinite" : "pulse-soft 5s ease-in-out infinite",
            }}>
              <Mascot size={110} color={m.accent}/>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        textAlign: "center", fontSize: 17, fontWeight: 500, color: "#111", marginTop: 8,
      }}>{m.mascotText}</div>

      {/* Support card with CTA */}
      <div style={{
        position: "absolute", left: 18, right: 18, bottom: 218,
        background: m.cardBg, borderRadius: 18, padding: 16,
      }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45, color: "#111" }}>{m.support}</p>
        <div style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => setBoxBreath(b => !b)} style={{
            flex: 1, padding: "14px", borderRadius: 999, border: 0,
            background: m.accent, color: "#fff", fontWeight: 600, fontSize: 15,
            cursor: "pointer", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: 8,
            fontFamily: "inherit",
          }}>
            {m.ctaIcon} {m.cta}
          </button>
          <SparkleButton onClick={openAI} floating={false} color={m.sparkle}/>
        </div>
      </div>

      {/* This week streak — today highlighted in mode color */}
      <div style={{
        position: "absolute", left: 18, right: 18, bottom: 100,
        background: "rgba(255,255,255,.85)", borderRadius: 18, padding: 14,
        boxShadow: "0 4px 16px rgba(0,0,0,.04)", backdropFilter: "blur(8px)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>This week</div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Checked in today ✓</div>
        </div>
        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
          {WEEK_MOODS.map((d, i) => {
            const isToday = d.day === "Sun";
            const color = isToday ? todayColor : d.color;
            return (
              <div key={d.day} style={{ textAlign: "center" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: color || "transparent",
                  border: color ? 0 : "1.5px solid var(--ink-mute)",
                  margin: "0 auto",
                  display: "grid", placeItems: "center",
                  color: "#fff", fontSize: 11, fontWeight: 600,
                }}>{isToday && "✓"}</div>
                <div style={{ marginTop: 4, fontSize: 11, color: "#333" }}>{d.day}</div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav active="mindspace" onChange={onChangeTab}/>
    </div>
  );
};

Object.assign(window, {
  MOODS, WEEK_MOODS, TODAY,
  MindspaceHomeScreen, CheckInScreen, ModeScreen, MODE_DATA, DotRing,
});
