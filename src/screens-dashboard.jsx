/* screens-dashboard.jsx — Dashboard, Spending Overview, Budget Logger */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WEEKLY_DATA = [22, 14, 30, 38, 6, 0, 0];
const MONTHLY_DATA = [40, 75, 60, 30]; // weeks of month
const YEARLY_DATA = [120, 90, 140, 110, 180, 160, 200, 175, 90, 130, 150, 80]; // months

const SAVINGS_GOALS = [
  { name: "New Iphone", emoji: "", img: "assets/iphone.png", bg: "rgb(235,235,235)", pctWeek: 70, pctMonth: 65, pctYear: 92, color: "var(--teal-700)" },
  { name: "Bali, Girls trip", emoji: "🌴", bg: "rgb(246,249,216)", pctWeek: 18, pctMonth: 32, pctYear: 55, color: "var(--teal-300)" },
  { name: "Boots", emoji: "👢", bg: "rgb(254,234,246)", pctWeek: 40, pctMonth: 60, pctYear: 80, color: "var(--teal-600)" },
  { name: "Perfume", emoji: "✓", bg: "var(--teal-50)", pctWeek: 100, pctMonth: 100, pctYear: 100, color: "var(--teal-900)" },
];

/* ───────────────────────────────── Dashboard ───────────────────────────────── */

const PERIODS = [
  { value: "week", label: "Weekly Summary", budget: "Daily budget: $40", trackText: "On Track" },
  { value: "month", label: "Monthly Summary", budget: "Monthly budget: $160", trackText: "Needs review" },
  { value: "year", label: "Yearly Summary", budget: "Yearly budget: $1,800", trackText: "On Track" },
];

const DashboardScreen = ({ go, active, onChangeTab }) => {
  const [period, setPeriod] = useState("week");
  const currentPeriod = PERIODS.find(p => p.value === period);

  // Cycle period when arrow tapped (swipeable in spirit)
  const cyclePeriod = () => {
    const i = PERIODS.findIndex(p => p.value === period);
    setPeriod(PERIODS[(i + 1) % PERIODS.length].value);
  };

  // Swipe handlers
  const touchStart = useRef(0);
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) < 40) return;
    const i = PERIODS.findIndex(p => p.value === period);
    if (dx < 0) setPeriod(PERIODS[(i + 1) % PERIODS.length].value);
    else setPeriod(PERIODS[(i - 1 + PERIODS.length) % PERIODS.length].value);
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}
         onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* Header */}
      <div style={{ paddingTop: 56, padding: "56px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <HeroAvatar size={86} />
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "var(--purple-50)", display: "grid", placeItems: "center",
            color: "var(--purple-700)",
          }}>
            <IconUser size={22} color="var(--purple-700)" />
          </div>
        </div>
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <h1 style={{
            margin: 0, fontWeight: 600, fontSize: 40, lineHeight: 0.98,
            letterSpacing: -1.2, color: "#111",
          }}>{currentPeriod.label.split(" ")[0]}<br/>Summary</h1>
          <div style={{
            display: "inline-flex", flexDirection: "column", padding: 4, gap: 2,
            borderRadius: 14, background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,.06)",
          }}>
            {PERIODS.map(p => {
              const active = period === p.value;
              const short = p.value === "week" ? "W" : p.value === "month" ? "M" : "Y";
              return (
                <button key={p.value} onClick={() => setPeriod(p.value)} aria-label={p.value} style={{
                  width: 30, height: 24, borderRadius: 10, border: 0, cursor: "pointer",
                  background: active ? "var(--teal-900)" : "transparent",
                  color: active ? "#fff" : "var(--ink-soft)",
                  fontWeight: 700, fontSize: 12, fontFamily: "inherit",
                  transition: "background .2s, color .2s",
                }}>{short}</button>
              );
            })}
          </div>
        </div>
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <IconConfetti size={20} color="var(--teal-500)"/>
          <span style={{ fontSize: 16, fontWeight: 500, color: "#111" }}>This week you've saved over <b>$30</b></span>
        </div>
      </div>

      {/* Body card area */}
      <div style={{ padding: "20px 16px 120px", height: "calc(100% - 240px)", overflowY: "auto" }} className="no-scrollbar">
        {/* Spending Card (tappable -> spending overview) */}
        <div key={"spend-" + period} onClick={() => go("spending")} style={{
          background: "#fff", borderRadius: 24,
          padding: 18, boxShadow: "0 2px 6px rgba(0,0,0,.08)",
          cursor: "pointer", animation: "float-up .4s ease both",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Spending</span>
              <span style={{ width: 1, height: 14, background: "rgba(0,0,0,.2)" }}/>
              <span style={{ fontSize: 14, fontWeight: 300, color: "#222" }}>{currentPeriod.budget}</span>
            </div>
            <div style={{
              padding: "5px 10px", borderRadius: 999, border: "1px solid #111",
              fontSize: 12, fontWeight: 500, display: "inline-flex", gap: 4, alignItems: "center",
              background: "#fff",
            }}>
              <IconCheck size={14} stroke="#111"/> {currentPeriod.trackText}
            </div>
          </div>

          {/* Chart */}
          <div style={{ marginTop: 18, height: 130 }}>
            {period === "year"
              ? <LineChart data={YEARLY_DATA} labels={["J","F","M","A","M","J","J","A","S","O","N","D"]} highlightIdx={4}/>
              : <BarChart data={period === "week" ? WEEKLY_DATA : MONTHLY_DATA}
                          labels={period === "week" ? DAYS : ["W1","W2","W3","W4"]}
                          highlightIdx={period === "week" ? 3 : 1}/>}
          </div>
        </div>

        {/* Savings */}
        <div style={{
          marginTop: 14, background: "#fff", borderRadius: 24, padding: 18,
          boxShadow: "0 2px 6px rgba(0,0,0,.08)",
        }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Savings</div>
          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {SAVINGS_GOALS.map((g, i) => {
              const pct = period === "week" ? g.pctWeek : period === "month" ? g.pctMonth : g.pctYear;
              return <SavingCard key={i} goal={g} pct={pct}/>;
            })}
          </div>
        </div>
      </div>
      <BottomNav active="dashboard" onChange={onChangeTab}/>
    </div>
  );
};

const SavingCard = ({ goal, pct }) => (
  <div style={{
    border: "1px solid var(--line)", borderRadius: 14, padding: 10,
    display: "flex", alignItems: "center", gap: 10, background: "#fff",
  }}>
    <div style={{
      width: 44, height: 44, borderRadius: 8, overflow: "hidden",
      background: goal.bg, display: "grid", placeItems: "center", flex: "none",
    }}>
      {pct === 100 ? (
        <div style={{
          width: 30, height: 30, borderRadius: "50%", border: "1.5px solid var(--teal-300)",
          display: "grid", placeItems: "center", background: "#fff",
        }}>
          <IconCheck size={16} stroke="var(--teal-300)"/>
        </div>
      ) : goal.img ? (
        <img src={goal.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
      ) : (
        <span style={{ fontSize: 22 }}>{goal.emoji}</span>
      )}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        height: 22, borderRadius: 5, background: "var(--teal-50)",
        position: "relative", overflow: "hidden", padding: 2,
      }}>
        <div style={{
          width: `${pct}%`, height: "100%", background: goal.color,
          borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 500, fontSize: 12,
          transition: "width .6s cubic-bezier(.2,.8,.2,1)",
        }}>{pct}%</div>
      </div>
      <div style={{ marginTop: 4, fontSize: 13, fontWeight: 500 }}>{goal.name}</div>
    </div>
  </div>
);

/* ───────────────────────────────── Charts ───────────────────────────────── */

const BarChart = ({ data, labels, highlightIdx }) => {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: "100%" }}>
      {data.map((v, i) => {
        const h = (v / max) * 75; // percent
        const isHigh = i === highlightIdx;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%" }}>
            <div style={{
              flex: 1, width: "100%", maxWidth: 30, position: "relative",
              borderRadius: "16px 16px 6px 6px", background: "var(--teal-50)",
              overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end",
            }}>
              <div style={{
                width: "100%",
                height: `${h}%`,
                background: isHigh ? "var(--teal-900)" : "var(--teal-300)",
                borderRadius: "16px 16px 6px 6px",
                transformOrigin: "bottom",
                animation: `bar-grow .6s cubic-bezier(.2,.8,.2,1) ${i * 0.04}s both`,
              }}/>
            </div>
            <div style={{ fontSize: 12, color: "#111", fontWeight: 500 }}>{labels[i]}</div>
          </div>
        );
      })}
    </div>
  );
};

const LineChart = ({ data, labels, highlightIdx }) => {
  const W = 320, H = 110, pad = 6;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => [
    pad + (i * (W - pad * 2)) / (data.length - 1),
    H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2),
  ]);
  // Smooth path
  const path = pts.reduce((acc, [x, y], i, arr) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = arr[i - 1];
    const cx1 = px + (x - px) / 2;
    const cy1 = py;
    const cx2 = px + (x - px) / 2;
    const cy2 = y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y}`;
  }, "");
  const lastPath = pts.map(([x, y], i) => [x, y + 18 + (i % 3) * 2]); // ghost line shifted
  const lastSmooth = lastPath.reduce((acc, [x, y], i, arr) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = arr[i - 1];
    return `${acc} C ${px + (x-px)/2} ${py}, ${px + (x-px)/2} ${y}, ${x} ${y}`;
  }, "");
  const [hx, hy] = pts[highlightIdx] || pts[0];
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H + 30}`}>
      <path d={lastSmooth} fill="none" stroke="rgb(170,180,180)" strokeWidth="2.5"/>
      <path d={path} fill="none" stroke="var(--teal-300)" strokeWidth="3" strokeLinecap="round"
            style={{ strokeDasharray: 1000, strokeDashoffset: 0, animation: "bar-grow .8s ease both" }}/>
      <circle cx={hx} cy={hy} r="4" fill="#111"/>
      <g transform={`translate(${hx - 22}, ${hy - 26})`}>
        <rect width="44" height="20" rx="10" fill="#111"/>
        <text x="22" y="14" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">${data[highlightIdx]}</text>
      </g>
      {labels.map((l, i) => (
        <text key={i} x={pad + (i * (W - pad * 2)) / (labels.length - 1)} y={H + 20}
              fontSize="9" fill="#888" textAnchor="middle">{l}</text>
      ))}
    </svg>
  );
};

/* ───────────────────────────────── Spending Overview ───────────────────────────────── */

const CATEGORIES = [
  { id: "groceries", name: "Groceries", budget: 100, spent: 92, icon: IconGroceries, color: "var(--teal-900)" },
  { id: "outsideFood", name: "Outside food", budget: 30, spent: 19, icon: IconPizza, color: "var(--teal-900)" },
  { id: "coffee", name: "Coffee", budget: 45, spent: 42, icon: IconCoffee, color: "var(--teal-900)" },
  { id: "transport", name: "Transport", budget: 45, spent: 22, icon: IconTransport, color: "var(--teal-900)" },
  { id: "fun", name: "Fun", budget: 60, spent: 28, icon: IconSmile, color: "var(--teal-900)" },
];

const SpendingOverviewScreen = ({ go, onChangeTab, openCategory }) => {
  const [tab, setTab] = useState("week");
  const days = tab === "week" ? "5/7 days" : tab === "month" ? "20/30 days" : "8/12 mo";
  const budgetLabel = tab === "week" ? "Weekly Budget" : tab === "month" ? "Monthly Budget" : "Yearly Budget";
  const budgetAmt = tab === "week" ? "$280" : tab === "month" ? "$1,200" : "$15,000";
  const progress = tab === "week" ? 5/7 : tab === "month" ? 20/30 : 8/12;
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
      <TopRow onBack={() => go("dashboard")}/>
      <div style={{ padding: "12px 18px 120px", height: "calc(100% - 96px)", overflowY: "auto" }} className="no-scrollbar">
        <h1 style={{ margin: 0, fontWeight: 500, fontSize: 32, letterSpacing: -0.5 }}>Spending Overview</h1>
        <p style={{ margin: "10px 0 0", fontSize: 15, lineHeight: 1.35, color: "#222", fontWeight: 300 }}>
          Don't let finances hold you back, let us personalize your finances! <b>The Finance Bug</b>{" "}
          <a href="#" onClick={e => e.preventDefault()} style={{ color: "var(--teal-500)", textDecoration: "none" }}>
            <IconArrowUpRight size={14} style={{ verticalAlign: "middle" }}/>
          </a>
        </p>

        {/* Tabs */}
        <div style={{ marginTop: 18, display: "flex", gap: 22 }}>
          {[{v:"week",l:"Week"},{v:"month",l:"Month"},{v:"year",l:"Year"}].map(t => (
            <button key={t.v} onClick={() => setTab(t.v)} style={{
              background: "transparent", border: 0, padding: 0,
              fontWeight: tab === t.v ? 700 : 400, fontSize: 18,
              color: tab === t.v ? "var(--teal-500)" : "var(--ink-mute)",
              cursor: "pointer", fontFamily: "inherit",
            }}>{t.l}</button>
          ))}
        </div>

        {/* Hero card */}
        <div key={tab} style={{
          marginTop: 16, background: "var(--teal-700)",
          border: "2px solid var(--teal-100)",
          borderRadius: 20, padding: 18,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          color: "#fff", animation: "float-up .35s ease both",
        }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 500 }}>{budgetLabel}</div>
            <div style={{ fontSize: 12, opacity: .85, marginTop: 8 }}>You are doing great! Keep it up ✨</div>
            <div style={{ fontSize: 56, fontWeight: 300, marginTop: 12, letterSpacing: -1 }}>{budgetAmt}</div>
          </div>
          <ProgressRing progress={progress} label={days}/>
        </div>

        {/* Category list */}
        <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 18 }}>
          {CATEGORIES.map(c => {
            const pct = Math.min(c.spent / c.budget, 1);
            return (
              <button key={c.id} onClick={() => openCategory(c.id)} style={{
                background: "transparent", border: 0, padding: 0, textAlign: "left", cursor: "pointer",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <c.icon size={22} color="#111"/>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</span>
                  <span style={{ width: 1, height: 14, background: "#000" }}/>
                  <span style={{ fontSize: 13, fontWeight: 300 }}>
                    {tab === "week" ? "Weekly" : tab === "month" ? "Monthly" : "Yearly"} budget: ${c.budget}
                  </span>
                </div>
                <div style={{
                  marginTop: 10, height: 22, borderRadius: 999, background: "var(--teal-50)",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: `${pct * 100}%`, height: "100%", background: "var(--teal-900)",
                    borderRadius: 999, transition: "width .6s cubic-bezier(.2,.8,.2,1)",
                  }}/>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <BottomNav active="dashboard" onChange={onChangeTab}/>
    </div>
  );
};

const ProgressRing = ({ progress, label, size = 116 }) => {
  const r = 50, c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} stroke="rgba(255,255,255,.25)" strokeWidth="10" fill="none"/>
        <circle cx="60" cy="60" r={r} stroke="var(--teal-100)" strokeWidth="10" fill="none"
                strokeDasharray={c} strokeDashoffset={c * (1 - progress)}
                strokeLinecap="round" transform="rotate(-90 60 60)"
                style={{ transition: "stroke-dashoffset .8s ease" }}/>
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", color: "#fff",
      }}>
        <div style={{ fontSize: 17, fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 11, opacity: .85, marginTop: 2 }}>Almost there!</div>
      </div>
    </div>
  );
};

/* ───────────────────────────────── Budget Logger ───────────────────────────────── */

const BudgetLoggerScreen = ({ go, onChangeTab, categoryId }) => {
  const cat = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  const [entries, setEntries] = useState(() => {
    return {
      Mon: 18, Tue: 12, Wed: 22, Thu: 16, Fri: 24, Sat: 0, Sun: 0,
    };
  });
  const [day, setDay] = useState("Fri");
  const [amount, setAmount] = useState("");
  const [pulse, setPulse] = useState(false);
  const total = Object.values(entries).reduce((a, b) => a + b, 0);

  const save = () => {
    const n = parseFloat(amount);
    if (!n) return;
    setEntries(e => ({ ...e, [day]: (e[day] || 0) + n }));
    setAmount("");
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
      <TopRow onBack={() => go("spending")}/>
      <div style={{ padding: "12px 18px 120px", height: "calc(100% - 96px)", overflowY: "auto" }} className="no-scrollbar">
        <Pill style={{ background: "var(--teal-50)", color: "var(--teal-700)" }}>
          <cat.icon size={14} color="var(--teal-700)"/> {cat.name}
        </Pill>
        <h1 style={{ margin: "10px 0 0", fontWeight: 500, fontSize: 32, letterSpacing: -0.5 }}>Log {cat.name}</h1>
        <p style={{ margin: "6px 0 0", fontSize: 15, color: "var(--ink-soft)" }}>
          Weekly budget <b style={{ color: "#111" }}>${cat.budget}</b> · You've logged{" "}
          <b style={{ color: "var(--teal-500)" }}>${total}</b>
        </p>

        <div style={{ marginTop: 16, background: "#fff", borderRadius: 20, padding: 18,
                      boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-soft)", letterSpacing: .3 }}>THIS WEEK</div>
          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
            {DAYS.map(d => {
              const v = entries[d] || 0;
              const isSel = day === d;
              return (
                <button key={d} onClick={() => setDay(d)} style={{
                  background: isSel ? "var(--teal-900)" : v > 0 ? "var(--teal-50)" : "#fff",
                  color: isSel ? "#fff" : "#111",
                  border: isSel ? "0" : "1px solid var(--line)",
                  borderRadius: 14, padding: "12px 0 10px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer",
                  fontFamily: "inherit",
                }}>
                  <span style={{ fontSize: 11, opacity: .85 }}>{d}</span>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>${v}</span>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 18, fontSize: 13, color: "var(--ink-soft)" }}>Amount for <b style={{color:"#111"}}>{day}</b></div>
          <div style={{
            marginTop: 8, display: "flex", alignItems: "center", gap: 10,
            background: "var(--bg)", borderRadius: 14, padding: "12px 14px",
          }}>
            <span style={{ fontSize: 22, color: "var(--ink-soft)" }}>$</span>
            <input type="number" inputMode="decimal" value={amount} onChange={e => setAmount(e.target.value)}
                   placeholder="0.00" style={{
              border: 0, outline: 0, background: "transparent", fontSize: 22, fontWeight: 600,
              flex: 1, color: "#111", fontFamily: "inherit",
            }}/>
            <button onClick={() => setAmount(a => a ? "" : "0")} style={{
              background: "transparent", border: 0, color: "var(--ink-mute)", cursor: "pointer", fontSize: 13,
            }}>Clear</button>
          </div>

          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[5, 10, 15, 20, 30].map(q => (
              <button key={q} onClick={() => setAmount(String(q))} style={{
                padding: "8px 14px", borderRadius: 999, background: "var(--teal-50)",
                color: "var(--teal-700)", border: 0, fontWeight: 600, fontSize: 13, cursor: "pointer",
                fontFamily: "inherit",
              }}>${q}</button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14, background: "#fff", borderRadius: 20, padding: 16,
                      boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>Remaining this week</div>
              <div style={{ fontSize: 22, fontWeight: 600 }}>${Math.max(cat.budget - total, 0)}</div>
            </div>
            <div style={{ width: 60, height: 60, position: "relative" }}>
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="24" stroke="var(--teal-50)" strokeWidth="6" fill="none"/>
                <circle cx="30" cy="30" r="24" stroke="var(--teal-300)" strokeWidth="6" fill="none"
                        strokeDasharray={2 * Math.PI * 24}
                        strokeDashoffset={2 * Math.PI * 24 * (1 - Math.min(total/cat.budget, 1))}
                        strokeLinecap="round" transform="rotate(-90 30 30)"/>
              </svg>
              <div style={{
                position: "absolute", inset: 0, display: "grid", placeItems: "center",
                fontSize: 11, fontWeight: 700, color: "var(--teal-700)",
              }}>{Math.round(total/cat.budget * 100)}%</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 16, transform: pulse ? "scale(1.02)" : "scale(1)", transition: "transform .2s" }}>
          <PrimaryButton onClick={save} disabled={!amount}>Save Entry</PrimaryButton>
        </div>
      </div>
      <BottomNav active="dashboard" onChange={onChangeTab}/>
    </div>
  );
};

Object.assign(window, { DashboardScreen, SpendingOverviewScreen, BudgetLoggerScreen, CATEGORIES });
