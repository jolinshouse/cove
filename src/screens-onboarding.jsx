/* screens-onboarding.jsx — Loading splash + 3 onboarding questions + sync accounts */

/* ───── Loading splash ───── */

const OnboardingLoadingScreen = ({ go }) => {
  useEffect(() => {
    const t = setTimeout(() => go("onboarding-q1"), 1800);
    return () => clearTimeout(t);
  }, [go]);
  return (
    <div onClick={() => go("onboarding-q1")} style={{
      position: "absolute", inset: 0, background: "#00A991",
      display: "grid", placeItems: "center", cursor: "pointer", overflow: "hidden",
    }}>
      <img src="assets/Logo.svg" alt="Cove" style={{
        width: 220, height: "auto", display: "block",
        animation: "pulse-soft 2.4s ease-in-out infinite",
      }}/>
    </div>
  );
};

/* ───── Questions ───── */

const QUESTIONS = [
  {
    id: "goal",
    title: "What brings you to Cove?",
    options: [
      { id: "save",   label: "Save more consistently", desc: "Build a buffer for what matters",       icon: IconBag },
      { id: "debt",   label: "Pay off debt",           desc: "Make a clear path out",                 icon: IconScale },
      { id: "invest", label: "Start investing",        desc: "Grow money for the long term",          icon: IconBars },
      { id: "learn",  label: "Learn the basics",       desc: "Get comfortable with money concepts",   icon: IconBulb },
    ],
  },
  {
    id: "literacy",
    title: "How would you rate your money knowledge?",
    options: [
      { id: "beginner",     label: "Just starting out", desc: "Money topics feel new",         icon: IconBulb },
      { id: "intermediate", label: "I know the basics", desc: "Comfortable, but room to grow", icon: IconCards },
      { id: "advanced",     label: "I'm fluent",        desc: "I want depth and specifics",    icon: IconTarget },
    ],
  },
  {
    id: "tone",
    title: "How would you like Cove to talk to you?",
    options: [
      { id: "gentle", label: "Gentle and encouraging", desc: "Soft language, supportive nudges", icon: IconSmile },
      { id: "casual", label: "Casual and friendly",    desc: "Like a money-savvy friend",        icon: IconConfetti },
      { id: "direct", label: "Direct and clear",       desc: "Skip the fluff, give me facts",    icon: IconArrowUpRight },
    ],
  },
];

const OnboardingQuestionScreen = ({ go, step, answers, setAnswer }) => {
  const idx = step - 1;
  const q = QUESTIONS[idx];
  const current = answers[q.id];
  const goPrev = () => idx === 0 ? null : go(`onboarding-q${step - 1}`);
  const goNext = () => {
    if (idx === QUESTIONS.length - 1) go("onboarding-sync");
    else go(`onboarding-q${step + 1}`);
  };
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
      {idx > 0 && <TopRow onBack={goPrev} right={<span style={{ width: 40, height: 40 }}/>}/>}

      <div style={{ padding: idx === 0 ? "70px 22px 0" : "10px 22px 0", height: "calc(100% - 200px)", overflowY: "auto" }} className="no-scrollbar">
        {/* Progress dots */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginTop: idx === 0 ? 0 : 4 }}>
          {QUESTIONS.map((_, i) => (
            <span key={i} style={{
              width: i === idx ? 14 : 10, height: i === idx ? 14 : 10, borderRadius: "50%",
              background: i < step ? "var(--teal-300)" : "transparent",
              border: i < step ? 0 : "1.5px solid var(--ink-mute)",
              transition: "all .2s",
            }}/>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 6, fontSize: 12, color: "var(--ink-soft)", fontWeight: 500 }}>
          Step {step} of {QUESTIONS.length}
        </div>

        <div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}>
          <Mascot size={86} color="var(--teal-300)"/>
        </div>

        <h1 style={{ margin: "16px 4px 0", fontSize: 26, fontWeight: 500, color: "#111", letterSpacing: -0.4, lineHeight: 1.25, textAlign: "center" }}>
          {q.title}
        </h1>

        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map(opt => {
            const isSel = current === opt.id;
            return (
              <button key={opt.id} onClick={() => setAnswer(q.id, opt.id)} className="tap-card" style={{
                display: "flex", alignItems: "center", gap: 14,
                background: isSel ? "var(--teal-50)" : "#fff",
                border: isSel ? "2px solid var(--teal-100)" : "1px solid var(--line)",
                borderRadius: 18, padding: "14px 16px",
                cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                transition: "background .2s, border .2s",
              }}>
                <span style={{
                  width: 38, height: 38, borderRadius: "50%", background: "var(--teal-50)",
                  display: "grid", placeItems: "center", flex: "none",
                }}>
                  <opt.icon size={20} color="var(--teal-700)"/>
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy-900)" }}>{opt.label}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{opt.desc}</div>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  border: isSel ? 0 : "1.5px solid var(--ink-mute)",
                  background: isSel ? "var(--teal-300)" : "#fff",
                  display: "grid", placeItems: "center", flex: "none",
                }}>{isSel && <IconCheck size={12} stroke="#fff"/>}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ position: "absolute", left: 18, right: 18, bottom: 40 }}>
        <PrimaryButton onClick={goNext} disabled={!current}>
          {idx === QUESTIONS.length - 1 ? "Continue" : "Next"}
        </PrimaryButton>
      </div>
    </div>
  );
};

/* ───── Sync accounts ───── */

const ACCOUNTS = [
  { id: "checking",  name: "Bank checking",        sub: "Chase",       icon: IconDollar },
  { id: "credit",    name: "Credit cards",         sub: "Amex • Visa", icon: IconCards },
  { id: "brokerage", name: "Brokerage / trading",  sub: "Robinhood",   icon: IconBars },
  { id: "savings",   name: "Savings",              sub: "Marcus",      icon: IconBag },
];

const Spinner = ({ size = 20, color = "var(--teal-500)" }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    border: `2px solid var(--teal-100)`,
    borderTopColor: color,
    animation: "spin .8s linear infinite",
  }}/>
);

const OnboardingSyncScreen = ({ go, syncedAccounts, toggleSynced }) => {
  // Per-account local state: "idle" | "syncing" | "synced"
  // syncedAccounts (from parent) is the source of truth for "synced"
  const [syncing, setSyncing] = useState({}); // { [id]: true } while in-flight

  const statusFor = (id) => {
    if (syncedAccounts.includes(id)) return "synced";
    if (syncing[id]) return "syncing";
    return "idle";
  };

  const startSync = (id) => {
    if (statusFor(id) !== "idle") return;
    setSyncing(s => ({ ...s, [id]: true }));
    setTimeout(() => {
      setSyncing(s => { const n = { ...s }; delete n[id]; return n; });
      toggleSynced(id);
    }, 1600);
  };

  const connectAll = () => {
    ACCOUNTS.forEach((a, i) => {
      if (statusFor(a.id) === "idle") {
        setTimeout(() => startSync(a.id), i * 350);
      }
    });
  };

  const canContinue = syncedAccounts.length > 0;

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
      <TopRow onBack={() => go("onboarding-q3")} right={<span style={{ width: 40, height: 40 }}/>}/>

      <div style={{ padding: "8px 22px 0", height: "calc(100% - 200px)", overflowY: "auto" }} className="no-scrollbar">
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 500, color: "#111", letterSpacing: -0.4, lineHeight: 1.2 }}>
          Connect your accounts
        </h1>
        <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.4 }}>
          Cove uses real balances to give honest, personal guidance. You can connect more later.
        </p>

        <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
          <button onClick={connectAll} style={{
            background: "var(--teal-50)", color: "var(--teal-700)",
            border: 0, padding: "8px 14px", borderRadius: 999,
            fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>Connect all</button>
        </div>

        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
          {ACCOUNTS.map(a => {
            const status = statusFor(a.id);
            return (
              <button key={a.id} onClick={() => startSync(a.id)} className="tap-card" disabled={status !== "idle"} style={{
                display: "flex", alignItems: "center", gap: 12,
                background: status === "synced" ? "var(--teal-50)" : "#fff",
                border: status === "synced" ? "2px solid var(--teal-100)" : "1px solid var(--line)",
                borderRadius: 16, padding: "14px 14px",
                cursor: status === "idle" ? "pointer" : "default", fontFamily: "inherit", textAlign: "left",
                transition: "background .2s, border .2s",
              }}>
                <span style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: status === "synced" ? "#fff" : "var(--teal-50)",
                  display: "grid", placeItems: "center", flex: "none",
                }}>
                  <a.icon size={20} color="var(--teal-700)"/>
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--navy-900)" }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{a.sub}</div>
                </div>
                {status === "idle" && (
                  <span style={{
                    background: "var(--teal-300)", color: "#fff",
                    padding: "6px 14px", borderRadius: 999,
                    fontSize: 12, fontWeight: 700,
                  }}>Connect</span>
                )}
                {status === "syncing" && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Spinner size={18} color="var(--teal-500)"/>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)" }}>Syncing…</span>
                  </div>
                )}
                {status === "synced" && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: "50%", background: "var(--teal-300)",
                      display: "grid", placeItems: "center",
                    }}><IconCheck size={12} stroke="#fff"/></span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--teal-700)" }}>Connected</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ position: "absolute", left: 18, right: 18, bottom: 40 }}>
        <PrimaryButton onClick={() => go("dashboard")} disabled={!canContinue}>
          Start your money journey
        </PrimaryButton>
      </div>
    </div>
  );
};

Object.assign(window, {
  OnboardingLoadingScreen, OnboardingQuestionScreen, OnboardingSyncScreen,
  QUESTIONS, ACCOUNTS,
});
