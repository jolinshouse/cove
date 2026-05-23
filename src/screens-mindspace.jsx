/* screens-mindspace.jsx — Mindspace flow */

const TODAY = "Sunday, May 17";

const MOODS = [
  { v: 0, name: "overwhelmed", color: "rgb(220, 60, 60)",   emoji: "😣", mode: "red",
    palette: ["rgb(255,210,210)", "rgb(255,140,120)", "rgb(220,60,60)", "rgb(180,30,30)"] },
  { v: 1, name: "anxious",     color: "var(--teal-300)",    emoji: "😟", mode: "green" },
  { v: 2, name: "stressed",    color: "var(--blue-500)",    emoji: "😩", mode: "blue" },
  { v: 3, name: "calm",        color: "var(--purple-500)",  emoji: "😌", mode: "purple" },
  { v: 4, name: "hopeful",     color: "rgb(245, 200, 50)",  emoji: "🙂", mode: "yellow",
    palette: ["rgb(255,240,180)", "rgb(255,215,90)", "rgb(245,200,50)", "rgb(210,160,30)"] },
];

const WEEK_MOODS = [
  { day: "Mon", mood: "anxious" },
  { day: "Tue", mood: "calm" },
  { day: "Wed", mood: "stressed" },
  { day: "Thu", mood: "anxious" },
  { day: "Fri", mood: "calm" },
  { day: "Sat", mood: "hopeful" },
  { day: "Sun", mood: null, label: "17" },
];

const MODE_TO_MOOD = {
  red: "overwhelmed",
  green: "anxious",
  blue: "stressed",
  purple: "calm",
  yellow: "hopeful",
};

/* ───── Screen 1 — Mindspace Home ───── */

const StatChipRow = () => (
  <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: "#fff", padding: "8px 14px", borderRadius: 999,
      boxShadow: "0 2px 8px rgba(0,0,0,.05)",
    }}>
      <IconDollar size={16} color="var(--navy-900)"/>
      <span style={{ fontWeight: 700, fontSize: 15, color: "var(--navy-900)" }}>1000</span>
    </div>
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: "#fff", padding: "8px 14px", borderRadius: 999,
      boxShadow: "0 2px 8px rgba(0,0,0,.05)",
    }}>
      <IconFlame size={16} color="var(--navy-900)"/>
      <span style={{ fontWeight: 700, fontSize: 15, color: "var(--navy-900)" }}>12</span>
    </div>
  </div>
);

const MindspaceHomeScreen = ({ go, onChangeTab }) => (
  <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
    {/* Point + streak chips */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 56 }}>
      <StatChipRow/>
    </div>

    {/* This week mood tracker */}
    <div style={{
      position: "absolute", left: 18, right: 18, top: 116,
      background: "#fff", borderRadius: 24, padding: 16,
      boxShadow: "0 4px 16px rgba(0,0,0,.05)",
    }}>
      <div style={{ fontWeight: 600, fontSize: 15 }}>This week</div>
      <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
        {WEEK_MOODS.map(m => (
          <div key={m.day} style={{ textAlign: "center" }}>
            {m.mood ? (
              <img src={`assets/${m.mood}.svg`} alt={m.mood}
                   style={{ width: 34, height: 34, display: "block", margin: "0 auto" }}/>
            ) : (
              <div style={{
                width: 34, height: 34, borderRadius: "50%", border: "1.5px solid var(--ink-mute)",
                display: "grid", placeItems: "center", color: "var(--ink-mute)",
                margin: "0 auto", fontSize: 12, fontWeight: 600,
              }}>{m.label}</div>
            )}
            <div style={{ marginTop: 4, fontSize: 12, color: "#333" }}>{m.day}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Date + title (moved up) */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 252, textAlign: "center" }}>
      <div style={{ fontSize: 16, color: "var(--ink-mute)" }}>{TODAY}</div>
      <h1 style={{ margin: "6px 22px 0", fontSize: 24, fontWeight: 500, color: "#111", lineHeight: 1.2 }}>
        How are you feeling this afternoon?
      </h1>
    </div>

    {/* Check-in DotRing */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 356, display: "flex", justifyContent: "center" }}>
      <DotRing onCheckIn={() => go("mind-checkin")} size={300}/>
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

  // Map mood -> ring color palette (per-mood overrides win)
  const ringPalette = useMemo(() => {
    if (mood.palette) return mood.palette;
    const map = {
      green: ["var(--teal-100)", "var(--teal-300)", "var(--teal-700)", "rgb(220,225,230)"],
      blue: ["var(--blue-200)", "var(--blue-500)", "var(--blue-700)", "rgb(220,225,230)"],
      purple: ["var(--purple-200)", "var(--purple-500)", "var(--purple-700)", "rgb(220,225,230)"],
    };
    return map[mood.mode];
  }, [mood.mode, mood.palette]);

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
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
            <div key={mood.name} style={{
              animation: "pulse-soft 3s ease-in-out infinite", transition: "all .3s",
            }}>
              <img src={`assets/${mood.name}.svg`} alt={mood.name}
                   style={{ width: 130, height: 130, display: "block" }}/>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <div style={{ fontSize: 14, color: "#111", fontWeight: 500 }}>I'm Feeling</div>
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
  red: {
    bg: "linear-gradient(rgb(255, 235, 232) 0%, #fff 50%)",
    accent: "rgb(220, 60, 60)",
    palette: ["rgb(255,210,210)", "rgb(255,140,120)", "rgb(220,60,60)", "rgb(180,30,30)"],
    sparkle: "rgb(180, 30, 30)",
    cardBg: "rgb(255,242,240)",
    header: "Feeling overwhelmed?",
    support: "Pause. Money decisions made under pressure rarely land well. Take 60 seconds, then we'll look at one tiny thing you can do right now.",
    mascotText: "I'm right here with you",
    actions: [
      { label: "Start a 60-second reset", desc: "Slow breathing + body release", icon: IconConfetti, primary: true },
      { label: "Mute money alerts for today", desc: "Quiet the noise, just for now", icon: IconSettings, primary: false },
    ],
  },
  green: {
    bg: "linear-gradient(rgb(230, 246, 244) 0%, #fff 50%)",
    accent: "var(--teal-300)",
    palette: ["var(--teal-100)", "var(--teal-300)", "var(--teal-700)", "rgb(220,225,230)"],
    sparkle: "var(--teal-700)",
    cardBg: "var(--teal-50)",
    header: "Feeling anxious about money?",
    support: "You're not alone — even small uncertainties about the future can feel big. Let's ground you in what's already working.",
    mascotText: "Let's take it one step at a time",
    actions: [
      { label: "See your safety net", desc: "Review what's already saved", icon: IconBag, primary: true },
      { label: "Try a 1-minute grounding exercise", desc: "Calm the body, then the budget", icon: IconConfetti, primary: false },
    ],
  },
  blue: {
    bg: "linear-gradient(rgb(230, 240, 255) 0%, #fff 55%)",
    accent: "var(--blue-500)",
    palette: ["var(--blue-200)", "var(--blue-500)", "var(--blue-700)", "rgb(220,225,230)"],
    sparkle: "var(--blue-700)",
    cardBg: "var(--blue-50)",
    header: "Bills weighing on you?",
    support: "Stress around bills is a signal, not a verdict. Let's rebuild your plan so the next week feels manageable.",
    mascotText: "We can sort this out together",
    actions: [
      { label: "Rebuild your budget plan", desc: "Adjust categories for this month", icon: IconScale, primary: true },
      { label: "Start box breathing", desc: "4-minute reset before deciding", icon: IconConfetti, primary: false },
    ],
  },
  purple: {
    bg: "linear-gradient(rgb(245, 240, 255) 0%, #fff 55%)",
    accent: "var(--purple-500)",
    palette: ["var(--purple-200)", "var(--purple-500)", "var(--purple-700)", "rgb(220,225,230)"],
    sparkle: "var(--purple-700)",
    cardBg: "var(--purple-50)",
    header: "You're in a good headspace today",
    support: "Use this clarity. Lock in a small money goal, or look at the wins from this week while it's fresh.",
    mascotText: "A good time to plan ahead",
    actions: [
      { label: "Set a new savings goal", desc: "Channel today's mood forward", icon: IconTarget, primary: true },
      { label: "Review this week's wins", desc: "What went right with money", icon: IconCheck, primary: false },
    ],
  },
  yellow: {
    bg: "linear-gradient(rgb(255, 250, 225) 0%, #fff 55%)",
    accent: "rgb(245, 200, 50)",
    palette: ["rgb(255,240,180)", "rgb(255,215,90)", "rgb(245,200,50)", "rgb(210,160,30)"],
    sparkle: "rgb(180, 130, 20)",
    cardBg: "rgb(255,248,215)",
    header: "Feeling hopeful — let's use it",
    support: "Hope is a great state for setting direction. Plant one small intention today and let the energy work for you.",
    mascotText: "I love this energy",
    actions: [
      { label: "Set a 30-day money intention", desc: "Tiny goal, big momentum", icon: IconTarget, primary: true },
      { label: "Share a win with a friend", desc: "Multiply the feeling", icon: IconConfetti, primary: false },
    ],
  },
};

const ModeScreen = ({ go, onChangeTab, mode, openAI }) => {
  const m = MODE_DATA[mode];
  const [breathOpen, setBreathOpen] = useState(false);
  const [toast, setToast] = useState("+10 mind points");
  const todayMood = MODE_TO_MOOD[mode];
  useEffect(() => {
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, []);
  const handleAction = (a) => {
    if (a.label.toLowerCase().includes("breath") || a.label.toLowerCase().includes("reset")) setBreathOpen(true);
    else if (a.label.toLowerCase().includes("budget")) go("logger");
    else if (a.label.toLowerCase().includes("safety net")) go("dashboard");
    else { setToast(`Opening: ${a.label}`); setTimeout(() => setToast(null), 1800); }
  };
  return (
    <div style={{ position: "absolute", inset: 0, background: m.bg, overflow: "hidden" }}>
      {/* Point + streak chips */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 56 }}>
        <StatChipRow/>
      </div>

      {/* This week strip */}
      <div style={{
        position: "absolute", left: 18, right: 18, top: 116,
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
            const moodName = isToday ? todayMood : d.mood;
            return (
              <div key={d.day} style={{ textAlign: "center" }}>
                {moodName ? (
                  <img src={`assets/${moodName}.svg`} alt={moodName}
                       style={{ width: 28, height: 28, display: "block", margin: "0 auto" }}/>
                ) : (
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    border: "1.5px solid var(--ink-mute)",
                    margin: "0 auto",
                  }}/>
                )}
                <div style={{ marginTop: 4, fontSize: 11, color: "#333" }}>{d.day}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Header */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 240, textAlign: "center", padding: "0 24px" }}>
        <div style={{ fontSize: 14, color: "var(--ink-mute)" }}>{TODAY}</div>
        <h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 500, color: "#111", lineHeight: 1.25 }}>
          {m.header}
        </h1>
      </div>

      {/* DotRing + Mascot — pushed down so particles don't crowd the title; ratio matches Check-in */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 340, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
          <DotRing color={m.accent} ringColors={m.palette} size={200} onCheckIn={() => {}} hideCenter/>
          <div style={{
            position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none",
          }}>
            <div style={{ animation: "pulse-soft 5s ease-in-out infinite" }}>
              <Mascot size={68} color={m.accent}/>
            </div>
          </div>
        </div>
      </div>

      {/* Speech bubble from mascot — placed right below mascot; OK to overlap lower particles */}
      <div style={{
        position: "absolute", left: 36, right: 36, top: 482,
        background: "#fff", borderRadius: 16, padding: "10px 14px",
        boxShadow: "0 4px 14px rgba(0,0,0,.10)",
        border: `1px solid ${m.cardBg}`,
        zIndex: 5,
      }}>
        <div style={{ fontSize: 13, lineHeight: 1.4, color: "#111" }}>{m.support}</div>
        {/* Speech bubble tail pointing up at the mascot */}
        <div style={{
          position: "absolute", top: -8, left: "50%", marginLeft: -8,
          width: 0, height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: "8px solid #fff",
        }}/>
      </div>

      {/* Suggested actions card */}
      <div style={{
        position: "absolute", left: 18, right: 18, bottom: 100,
        background: m.cardBg, borderRadius: 18, padding: 14,
      }}>
        <div style={{
          fontSize: 14, fontWeight: 600, color: "#111",
          marginBottom: 10, paddingLeft: 4,
        }}>Suggested actions</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {m.actions.map((a, i) => (
            <button key={i} onClick={() => handleAction(a)} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: a.primary ? "12px 14px" : "10px 14px", borderRadius: 14, border: 0,
              background: a.primary ? m.accent : "#fff",
              color: a.primary ? "#fff" : "#111",
              cursor: "pointer", fontFamily: "inherit", textAlign: "left",
              boxShadow: a.primary ? "0 6px 18px rgba(0,0,0,.10)" : "0 1px 3px rgba(0,0,0,.05)",
            }}>
              <span style={{
                width: 30, height: 30, borderRadius: "50%",
                background: a.primary ? "rgba(255,255,255,.22)" : m.cardBg,
                display: "grid", placeItems: "center", flex: "none",
              }}><a.icon size={16} color={a.primary ? "#fff" : m.accent}/></span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{a.label}</div>
                <div style={{ fontSize: 11, opacity: .8, marginTop: 1 }}>{a.desc}</div>
              </div>
              <IconChevronRight size={16} color={a.primary ? "#fff" : "var(--ink-mute)"}/>
            </button>
          ))}
        </div>
      </div>

      {toast && (
        <div style={{
          position: "absolute", top: 200, left: "50%",
          background: "rgba(0,0,0,.85)", color: "#fff",
          padding: "8px 16px", borderRadius: 999,
          fontSize: 13, fontWeight: 600, zIndex: 80,
          animation: "toast-in .25s ease both",
          whiteSpace: "nowrap",
        }}>{toast}</div>
      )}

      <BreathingGuide open={breathOpen} onClose={() => setBreathOpen(false)}/>

      <BottomNav active="mindspace" onChange={onChangeTab}/>
    </div>
  );
};

Object.assign(window, {
  MOODS, WEEK_MOODS, TODAY,
  MindspaceHomeScreen, CheckInScreen, ModeScreen, MODE_DATA, DotRing,
});
