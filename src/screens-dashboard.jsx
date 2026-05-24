/* screens-dashboard.jsx — Dashboard, Spending Overview, Budget Logger */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WEEKLY_DATA = [22, 14, 30, 38, 6, 0, 0];
const MONTHLY_DATA = [40, 75, 60, 30]; // weeks of month
const YEARLY_DATA = [120, 90, 140, 110, 180, 160, 200, 175, 90, 130, 150, 80]; // months

const sum = arr => arr.reduce((a, b) => a + b, 0);

const SAVINGS_GOALS = [
  { name: "iPhone", emoji: "📱", bg: "rgb(235,235,235)", pctWeek: 70, pctMonth: 65, pctYear: 92, color: "var(--teal-700)", target: 1200 },
  { name: "Bali trip", emoji: "🌴", bg: "rgb(246,249,216)", pctWeek: 18, pctMonth: 32, pctYear: 55, color: "var(--teal-300)", target: 1800 },
  { name: "Boots", emoji: "👢", bg: "rgb(254,234,246)", pctWeek: 40, pctMonth: 60, pctYear: 80, color: "var(--teal-600)", target: 400 },
  { name: "Cosmetic", emoji: "💄", bg: "var(--teal-50)", pctWeek: 100, pctMonth: 100, pctYear: 100, color: "var(--teal-900)", target: 80 },
];

/* ───────────────────────────────── Dashboard ───────────────────────────────── */

const PERIODS = [
  { value: "week",  label: "Weekly Summary",  date: "May 18 – May 24, 2026", budgetAmt: 280,   budgetLabel: "weekly budget",  spent: sum(WEEKLY_DATA),  trackStatus: "on",     trackText: "On track" },
  { value: "month", label: "Monthly Summary", date: "May 2026",              budgetAmt: 1200,  budgetLabel: "monthly budget", spent: sum(MONTHLY_DATA), trackStatus: "review", trackText: "Needs review" },
  { value: "year",  label: "Yearly Summary",  date: "2026",                  budgetAmt: 15000, budgetLabel: "yearly budget",  spent: sum(YEARLY_DATA),  trackStatus: "on",     trackText: "On track" },
];

/* Voice + scan-receipt actions for the add-spending TopRow */
const AddSpendingActions = () => {
  const btn = {
    width: 40, height: 40, borderRadius: "50%",
    background: "#fff", border: 0, cursor: "pointer",
    display: "grid", placeItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,.08)",
    fontFamily: "inherit",
  };
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button aria-label="Add by voice" style={btn}>
        <IconMic size={20} color="#444"/>
      </button>
      <button aria-label="Scan receipt" style={btn}>
        <IconScan size={20} color="#444"/>
      </button>
    </div>
  );
};

const TrackBadge = ({ status, text }) => {
  const on = status === "on";
  return (
    <div style={{
      padding: "6px 14px", borderRadius: 999, border: 0,
      fontSize: 12, fontWeight: 600, display: "inline-flex", gap: 6, alignItems: "center",
      whiteSpace: "nowrap", flex: "none",
      background: on ? "var(--teal-50)" : "rgb(255,242,230)",
      color: on ? "var(--teal-700)" : "rgb(180,90,0)",
    }}>
      {on ? <IconCheck size={14} stroke="var(--teal-700)"/> : <IconInfo size={14} stroke="rgb(180,90,0)"/>}
      {text}
    </div>
  );
};

const DashboardScreen = ({ go, active, onChangeTab }) => {
  const [period, setPeriod] = useState("week");
  const [savingsOpen, setSavingsOpen] = useState(false);
  const currentPeriod = PERIODS.find(p => p.value === period);

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: "#111", letterSpacing: -.4 }}>
            Hi, Emily
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "#fff", display: "grid", placeItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,.08)",
          }}>
            <IconUser size={22} color="#444" />
          </div>
        </div>
        <div style={{ marginTop: 14, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h1 style={{
              margin: 0, fontWeight: 600, fontSize: 40, lineHeight: 0.98,
              letterSpacing: -1.2, color: "#111",
            }}>
              <span style={{ color: "#00A991" }}>{currentPeriod.label.split(" ")[0]}</span><br/>Summary
            </h1>
            <div style={{ marginTop: 8, fontSize: 14, color: "var(--ink-soft)", fontWeight: 500 }}>
              {currentPeriod.date}
            </div>
          </div>
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
        <button onClick={() => setSavingsOpen(true)} style={{
          marginTop: 12, display: "flex", alignItems: "center", gap: 8,
          background: "transparent", border: 0, padding: 0, cursor: "pointer", fontFamily: "inherit",
        }}>
          <IconConfetti size={20} color="var(--teal-500)"/>
          <span style={{ fontSize: 16, fontWeight: 500, color: "#111" }}>This week you've saved over <b>$30</b></span>
          <IconInfo size={14} color="var(--ink-mute)"/>
        </button>
      </div>

      {/* Body card area */}
      <div style={{ padding: "20px 16px 120px", height: "calc(100% - 240px)", overflowY: "auto" }} className="no-scrollbar">
        {/* Spending Card (tappable -> spending overview) */}
        <div key={"spend-" + period} onClick={() => go("spending")} className="tap-card" style={{
          background: "#fff", borderRadius: 24,
          padding: 18, boxShadow: "0 2px 6px rgba(0,0,0,.08)",
          cursor: "pointer", animation: "float-up .4s ease both",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#949494" }}>
                Spending
              </div>
              <div style={{ marginTop: 4, display: "flex", alignItems: "baseline", gap: 6, flexWrap: "nowrap" }}>
                <span style={{ fontSize: 26, fontWeight: 700, color: "#111", letterSpacing: -.6, flex: "none" }}>
                  ${currentPeriod.spent}
                </span>
                <span style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis" }}>
                  / ${currentPeriod.budgetAmt.toLocaleString()} {currentPeriod.budgetLabel}
                </span>
              </div>
            </div>
            <TrackBadge status={currentPeriod.trackStatus} text={currentPeriod.trackText}/>
          </div>

          {/* Chart */}
          <div style={{ marginTop: 28, height: 150 }}>
            {period === "year"
              ? <LineChart data={YEARLY_DATA} labels={["J","F","M","A","M","J","J","A","S","O","N","D"]} highlightIdx={4}/>
              : <BarChart data={period === "week" ? WEEKLY_DATA : MONTHLY_DATA}
                          labels={period === "week" ? DAYS : ["W1","W2","W3","W4"]}
                          highlightIdx={period === "week" ? 3 : 1}/>}
          </div>

          <div style={{
            marginTop: 12, paddingTop: 10, borderTop: "1px solid var(--line)",
            display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4,
            color: "var(--teal-500)", fontSize: 13, fontWeight: 600,
          }}>
            <span>View spending</span>
            <IconChevronRight size={14} color="var(--teal-500)"/>
          </div>
        </div>

        {/* Saving goals */}
        <div style={{
          marginTop: 14, background: "#fff", borderRadius: 24, padding: 18,
          boxShadow: "0 2px 6px rgba(0,0,0,.08)",
        }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#949494" }}>Saving goals</div>
          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {SAVINGS_GOALS.map((g, i) => {
              const pct = period === "week" ? g.pctWeek : period === "month" ? g.pctMonth : g.pctYear;
              return <SavingCard key={i} goal={g} pct={pct}/>;
            })}
          </div>
        </div>
      </div>
      <BottomNav active="dashboard" onChange={onChangeTab}/>

      <InfoSheet open={savingsOpen} onClose={() => setSavingsOpen(false)}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--navy-900)", marginBottom: 6 }}>
          How we calculated this
        </div>
        <p style={{ margin: "0 0 10px", fontSize: 14, color: "#111", lineHeight: 1.5 }}>
          Last week you spent <b>$140</b> on Outside Food + Coffee. This week you're at <b>$110</b>.
          The <b style={{ color: "var(--teal-500)" }}>$30</b> difference is moved into your savings progress.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <span style={{ color: "var(--ink-soft)" }}>Last week (food + coffee)</span>
            <span style={{ fontWeight: 600 }}>$140</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <span style={{ color: "var(--ink-soft)" }}>This week (so far)</span>
            <span style={{ fontWeight: 600 }}>$110</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, paddingTop: 8, borderTop: "1px solid var(--line)" }}>
            <span style={{ fontWeight: 600, color: "var(--teal-700)" }}>Saved</span>
            <span style={{ fontWeight: 700, color: "var(--teal-500)" }}>+$30</span>
          </div>
        </div>
      </InfoSheet>
    </div>
  );
};

const SavingCard = ({ goal, pct }) => (
  <div className="tap-card" style={{
    border: 0, borderRadius: 14, padding: "6px 6px",
    display: "flex", alignItems: "center", gap: 8, background: "transparent",
    cursor: "pointer", minWidth: 0,
  }}>
    <div style={{
      width: 38, height: 38, borderRadius: 8, overflow: "hidden",
      background: goal.bg, display: "grid", placeItems: "center", flex: "none",
    }}>
      <span style={{ fontSize: 20 }}>{goal.emoji}</span>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 6,
        marginBottom: 4,
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{goal.name}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--teal-700)" }}>{pct}%</span>
      </div>
      <div style={{
        height: 8, borderRadius: 999, background: "var(--teal-50)", overflow: "hidden",
      }}>
        <div style={{
          width: `${pct}%`, height: "100%", background: goal.color,
          borderRadius: 999, transition: "width .6s cubic-bezier(.2,.8,.2,1)",
        }}/>
      </div>
      <div style={{ marginTop: 4, fontSize: 11, color: "var(--ink-mute)" }}>
        of ${goal.target.toLocaleString()} goal
      </div>
    </div>
  </div>
);

/* ───────────────────────────────── Charts ───────────────────────────────── */

const BarChart = ({ data, labels, highlightIdx }) => {
  const max = Math.max(...data, 1);
  const niceMax = Math.ceil(max / 10) * 10 || 10;
  const mid = niceMax / 2;
  const [tipIdx, setTipIdx] = useState(highlightIdx);
  return (
    <div style={{ display: "flex", gap: 6, height: "100%" }} onClick={e => e.stopPropagation()}>
      {/* Y-axis labels */}
      <div style={{
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        paddingBottom: 22, paddingTop: 2,
        fontSize: 10, color: "var(--ink-mute)", fontWeight: 500, textAlign: "right", minWidth: 22,
      }}>
        <span>${niceMax}</span>
        <span>${mid}</span>
        <span>$0</span>
      </div>
      {/* Plot area */}
      <div style={{ flex: 1, position: "relative" }}>
        {/* Gridlines */}
        <div style={{ position: "absolute", inset: 0, paddingBottom: 22, pointerEvents: "none" }}>
          {[0, .5, 1].map(t => (
            <div key={t} style={{
              position: "absolute", left: 0, right: 0, top: `${t * 100}%`,
              borderTop: "1px dashed rgba(0,0,0,.06)",
            }}/>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: "100%" }}>
          {data.map((v, i) => {
            const h = (v / niceMax) * 100;
            const isHigh = i === tipIdx;
            return (
              <button key={i} onClick={e => { e.stopPropagation(); setTipIdx(i); }} style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%",
                background: "transparent", border: 0, padding: 0, cursor: "pointer", fontFamily: "inherit",
              }}>
                <div style={{
                  flex: 1, width: "100%", maxWidth: 30, position: "relative",
                  borderRadius: "16px 16px 6px 6px", background: "var(--teal-50)",
                  overflow: "visible", display: "flex", flexDirection: "column", justifyContent: "flex-end",
                }}>
                  {isHigh && (
                    <div style={{
                      position: "absolute", bottom: `calc(${h}% + 6px)`, left: "50%",
                      transform: "translateX(-50%)",
                      background: "#111", color: "#fff", fontSize: 10, fontWeight: 600,
                      padding: "3px 8px", borderRadius: 6, whiteSpace: "nowrap", pointerEvents: "none",
                    }}>${v}</div>
                  )}
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
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const LineChart = ({ data, labels, highlightIdx }) => {
  const W = 320, H = 110, pad = 6, leftPad = 28;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const niceMax = Math.ceil(max / 10) * 10;
  const niceMin = Math.floor(min / 10) * 10;
  const mid = Math.round((niceMax + niceMin) / 2);
  const pts = data.map((v, i) => [
    leftPad + (i * (W - leftPad - pad)) / (data.length - 1),
    H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2),
  ]);
  const path = pts.reduce((acc, [x, y], i, arr) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = arr[i - 1];
    const cx1 = px + (x - px) / 2;
    const cy1 = py;
    const cx2 = px + (x - px) / 2;
    const cy2 = y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y}`;
  }, "");
  const lastPath = pts.map(([x, y], i) => [x, y + 18 + (i % 3) * 2]);
  const lastSmooth = lastPath.reduce((acc, [x, y], i, arr) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = arr[i - 1];
    return `${acc} C ${px + (x-px)/2} ${py}, ${px + (x-px)/2} ${y}, ${x} ${y}`;
  }, "");
  const [hx, hy] = pts[highlightIdx] || pts[0];
  // Gridline Y positions for niceMax, mid, niceMin
  const yFor = v => H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2);
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H + 30}`}>
      {[niceMax, mid, niceMin].map((v, i) => (
        <g key={i}>
          <line x1={leftPad} y1={yFor(v)} x2={W - pad} y2={yFor(v)}
                stroke="rgba(0,0,0,.06)" strokeWidth="1" strokeDasharray="3 3"/>
          <text x={leftPad - 4} y={yFor(v) + 3}
                fontSize="9" fill="var(--ink-mute)" textAnchor="end" fontWeight="500">${v}</text>
        </g>
      ))}
      <path d={lastSmooth} fill="none" stroke="rgb(170,180,180)" strokeWidth="2.5"/>
      <path d={path} fill="none" stroke="var(--teal-300)" strokeWidth="3" strokeLinecap="round"
            style={{ strokeDasharray: 1000, strokeDashoffset: 0, animation: "bar-grow .8s ease both" }}/>
      <circle cx={hx} cy={hy} r="4" fill="#111"/>
      <g transform={`translate(${hx - 22}, ${hy - 26})`}>
        <rect width="44" height="20" rx="10" fill="#111"/>
        <text x="22" y="14" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">${data[highlightIdx]}</text>
      </g>
      {labels.map((l, i) => (
        <text key={i} x={leftPad + (i * (W - leftPad - pad)) / (labels.length - 1)} y={H + 20}
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

const SpendingOverviewScreen = ({ go, onChangeTab, openCategory, openHistory }) => {
  const [tab, setTab] = useState("week");
  const budgetLabel = tab === "week" ? "Weekly Budget" : tab === "month" ? "Monthly Budget" : "Yearly Budget";
  const budgetAmt = tab === "week" ? 280 : tab === "month" ? 1200 : 15000;
  const spentAmt = tab === "week" ? 203 : tab === "month" ? 820 : 8200;
  const dateRange = tab === "week" ? "May 18 – May 24, 2026" : tab === "month" ? "May 2026" : "2026";
  const progress = spentAmt / budgetAmt;
  const ringLabel = `$${spentAmt.toLocaleString()}`;
  const ringSub = `of $${budgetAmt.toLocaleString()}`;
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
      <TopRow onBack={() => go("dashboard")}/>
      <div style={{ padding: "12px 18px 120px", height: "calc(100% - 96px)", overflowY: "auto" }} className="no-scrollbar">
        <h1 style={{ margin: 0, fontWeight: 500, fontSize: 32, letterSpacing: -0.5 }}>Spending Overview</h1>
        <div style={{ marginTop: 6, fontSize: 14, color: "var(--ink-soft)", fontWeight: 500 }}>
          {dateRange}
        </div>
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
            <div style={{ fontSize: 56, fontWeight: 300, marginTop: 12, letterSpacing: -1 }}>${budgetAmt.toLocaleString()}</div>
          </div>
          <ProgressRing progress={progress} label={ringLabel} sub={ringSub}/>
        </div>

        {/* Category list */}
        <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 18 }}>
          {CATEGORIES.map(c => {
            const pct = Math.min(c.spent / c.budget, 1);
            return (
              <div key={c.id} className="tap-card" onClick={() => openHistory(c.id)} style={{
                cursor: "pointer",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <c.icon size={22} color="#111"/>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</span>
                  <span style={{ width: 1, height: 14, background: "#000" }}/>
                  <span style={{ fontSize: 13, fontWeight: 300, flex: 1 }}>
                    ${c.spent} of ${c.budget}
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating + button — opens category picker first */}
      <button onClick={() => go("category-picker")} aria-label="Add spending" style={{
        position: "absolute", right: 20, bottom: 104,
        width: 56, height: 56, borderRadius: "50%",
        background: "var(--teal-300)", border: 0, color: "#fff", cursor: "pointer",
        display: "grid", placeItems: "center",
        boxShadow: "0 8px 24px rgba(0,135,116,.35)",
        zIndex: 55,
      }}>
        <IconPlus size={28} stroke="#fff"/>
      </button>

      <BottomNav active="dashboard" onChange={onChangeTab}/>
    </div>
  );
};

const ProgressRing = ({ progress, label, sub, size = 116 }) => {
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
        <div style={{ fontSize: 17, fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 11, opacity: .85, marginTop: 2 }}>{sub || "Almost there!"}</div>
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
  const [toast, setToast] = useState(null);
  const total = Object.values(entries).reduce((a, b) => a + b, 0);

  const save = () => {
    const n = parseFloat(amount);
    if (!n) return;
    setEntries(e => ({ ...e, [day]: (e[day] || 0) + n }));
    setAmount("");
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
    setToast(`🎉 +5 points · Entry logged!`);
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
      <TopRow onBack={() => go("spending")} right={<AddSpendingActions/>}/>
      <div style={{ padding: "12px 18px 120px", height: "calc(100% - 96px)", overflowY: "auto" }} className="no-scrollbar">
        <Pill style={{ background: "var(--teal-50)", color: "var(--teal-700)" }}>
          <cat.icon size={14} color="var(--teal-700)"/> {cat.name}
        </Pill>
        <h1 style={{ margin: "10px 0 0", fontWeight: 500, fontSize: 32, letterSpacing: -0.5 }}>Add {cat.name}</h1>
        <p style={{ margin: "6px 0 0", fontSize: 15, color: "var(--ink-soft)" }}>
          Weekly budget <b style={{ color: "#111" }}>${cat.budget}</b> · You've logged{" "}
          <b style={{ color: "var(--teal-500)" }}>${total}</b>
        </p>

        <div style={{ marginTop: 16, background: "#fff", borderRadius: 20, padding: 18,
                      boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-soft)", letterSpacing: .3 }}>This week</div>
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
            background: "var(--bg)", borderRadius: 14, padding: "10px 10px 10px 14px",
          }}>
            <span style={{ fontSize: 22, color: "var(--ink-soft)" }}>$</span>
            <input type="number" inputMode="decimal" value={amount} onChange={e => setAmount(e.target.value)}
                   placeholder="0.00" style={{
              border: 0, outline: 0, background: "transparent", fontSize: 22, fontWeight: 600,
              flex: 1, minWidth: 0, color: "#111", fontFamily: "inherit",
            }}/>
            <button onClick={() => setAmount("")} disabled={!amount} style={{
              background: amount ? "#fff" : "transparent",
              border: 0, color: amount ? "var(--ink-soft)" : "var(--ink-mute)",
              cursor: amount ? "pointer" : "default",
              fontSize: 12, fontWeight: 600, fontFamily: "inherit",
              padding: "6px 12px", borderRadius: 999,
              boxShadow: amount ? "0 1px 3px rgba(0,0,0,.06)" : "none",
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

      {toast && (
        <div style={{
          position: "absolute", top: 90, left: "50%",
          background: "var(--teal-500)", color: "#fff",
          padding: "10px 18px", borderRadius: 999,
          fontSize: 14, fontWeight: 700, zIndex: 80,
          animation: "toast-in .25s ease both",
          whiteSpace: "nowrap",
          boxShadow: "0 6px 18px rgba(0,135,116,.35)",
        }}>{toast}</div>
      )}

      <BottomNav active="dashboard" onChange={onChangeTab}/>
    </div>
  );
};

/* ───────────────────────────────── Category Picker ───────────────────────────────── */

const CategoryPickerScreen = ({ go, onChangeTab, openCategory }) => (
  <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
    <TopRow onBack={() => go("spending")} right={<AddSpendingActions/>}/>
    <div style={{ padding: "12px 18px 120px", height: "calc(100% - 96px)", overflowY: "auto" }} className="no-scrollbar">
      <h1 style={{ margin: 0, fontWeight: 500, fontSize: 28, letterSpacing: -0.4 }}>Add a spend</h1>
      <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--ink-soft)" }}>
        Which category is this for?
      </p>

      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => openCategory(c.id)} className="tap-card" style={{
            background: "#fff", border: 0, padding: "14px 16px", borderRadius: 16,
            boxShadow: "0 2px 6px rgba(0,0,0,.06)", cursor: "pointer", fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 12, textAlign: "left",
          }}>
            <span style={{
              width: 40, height: 40, borderRadius: "50%", background: "var(--teal-50)",
              display: "grid", placeItems: "center",
            }}><c.icon size={20} color="var(--teal-700)"/></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>{c.name}</div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>
                ${c.spent} of ${c.budget} this week
              </div>
            </div>
            <IconChevronRight size={18} color="var(--ink-mute)"/>
          </button>
        ))}
      </div>
    </div>
    <BottomNav active="dashboard" onChange={onChangeTab}/>
  </div>
);

/* ───────────────────────────────── Spending History ───────────────────────────────── */

const MOCK_HISTORY = {
  groceries:   [{ d: "Fri", desc: "Trader Joe's",      a: 38 }, { d: "Wed", desc: "Whole Foods",   a: 22 }, { d: "Mon", desc: "Local market",  a: 32 }],
  outsideFood: [{ d: "Thu", desc: "Lunch with team",   a: 14 }, { d: "Tue", desc: "Dinner takeout", a: 5  }],
  coffee:      [{ d: "Fri", desc: "Blue Bottle",       a: 6  }, { d: "Thu", desc: "Starbucks",     a: 7  }, { d: "Wed", desc: "Local cafe",     a: 5  }, { d: "Tue", desc: "Blue Bottle",   a: 6  }],
  transport:   [{ d: "Fri", desc: "Subway",            a: 4  }, { d: "Wed", desc: "Uber",          a: 18 }],
  fun:         [{ d: "Sat", desc: "Movie tickets",     a: 28 }],
};

const SpendingHistoryScreen = ({ go, onChangeTab, openCategory, categoryId }) => {
  const cat = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  const items = MOCK_HISTORY[cat.id] || [];
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
      <TopRow onBack={() => go("spending")}/>
      <div style={{ padding: "12px 18px 120px", height: "calc(100% - 96px)", overflowY: "auto" }} className="no-scrollbar">
        <Pill style={{ background: "var(--teal-50)", color: "var(--teal-700)" }}>
          <cat.icon size={14} color="var(--teal-700)"/> {cat.name}
        </Pill>
        <h1 style={{ margin: "10px 0 0", fontWeight: 500, fontSize: 28, letterSpacing: -0.4 }}>
          {cat.name} history
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--ink-soft)" }}>
          ${cat.spent} of ${cat.budget} this week
        </p>

        <div style={{
          marginTop: 16, background: "#fff", borderRadius: 18, padding: "8px 16px",
          boxShadow: "0 2px 6px rgba(0,0,0,.06)",
        }}>
          {items.length === 0 ? (
            <div style={{ padding: "24px 0", textAlign: "center", color: "var(--ink-soft)", fontSize: 14 }}>
              No entries yet this week.
            </div>
          ) : items.map((e, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 0",
              borderBottom: i < items.length - 1 ? "1px solid var(--line)" : 0,
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{e.desc}</div>
                <div style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 2 }}>{e.d}</div>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>${e.a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating + button — opens the logger for this category */}
      <button onClick={() => openCategory(cat.id)} aria-label="Log spending" style={{
        position: "absolute", right: 20, bottom: 104,
        width: 56, height: 56, borderRadius: "50%",
        background: "var(--teal-300)", border: 0, color: "#fff", cursor: "pointer",
        display: "grid", placeItems: "center",
        boxShadow: "0 8px 24px rgba(0,135,116,.35)",
        zIndex: 55,
      }}>
        <IconPlus size={28} stroke="#fff"/>
      </button>

      <BottomNav active="dashboard" onChange={onChangeTab}/>
    </div>
  );
};

Object.assign(window, { DashboardScreen, SpendingOverviewScreen, BudgetLoggerScreen, CategoryPickerScreen, SpendingHistoryScreen, CATEGORIES });
