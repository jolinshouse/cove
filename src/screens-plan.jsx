/* screens-plan.jsx — Plan tab home: 3 cards (Budget / Saving / Investment) */

const BUDGET_PLANS = [
  { name: "Daily essentials", sub: "$280 / week", pct: 73, color: "var(--teal-700)" },
  { name: "Weekend fun",      sub: "$60 / week",  pct: 47, color: "var(--teal-300)" },
];

const INVESTMENT_PLANS = [
  { name: "Retirement (Roth IRA)",    sub: "+12% YTD", pct: 62, color: "var(--teal-700)" },
  { name: "ETF starter portfolio",    sub: "+8% YTD",  pct: 38, color: "var(--teal-300)" },
];

const PlanRow = ({ item }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--teal-700)", flex: "none" }}>{item.pct}%</span>
      </div>
      <div style={{
        marginTop: 5, height: 6, borderRadius: 999, background: "var(--teal-50)", overflow: "hidden",
      }}>
        <div style={{
          width: `${item.pct}%`, height: "100%", background: item.color, borderRadius: 999,
          transition: "width .6s cubic-bezier(.2,.8,.2,1)",
        }}/>
      </div>
      <div style={{ marginTop: 4, fontSize: 11, color: "var(--ink-mute)" }}>{item.sub}</div>
    </div>
  </div>
);

const PlanCard = ({ title, Icon, items, emptyText, onAdd }) => (
  <div className="tap-card" style={{
    background: "#fff", borderRadius: 24, padding: 18,
    boxShadow: "0 2px 6px rgba(0,0,0,.08)",
  }}>
    {/* Header row */}
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{
        width: 36, height: 36, borderRadius: "50%", background: "var(--teal-50)",
        display: "grid", placeItems: "center", flex: "none",
      }}>
        <Icon size={20} color="var(--teal-700)"/>
      </span>
      <div style={{ flex: 1, fontSize: 16, fontWeight: 700, color: "var(--navy-900)" }}>{title}</div>
      <button onClick={onAdd} aria-label={`Add ${title}`} style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "var(--teal-50)", color: "var(--teal-700)",
        border: 0, cursor: "pointer", display: "grid", placeItems: "center",
        fontFamily: "inherit",
      }}>
        <IconPlus size={18} stroke="var(--teal-700)"/>
      </button>
    </div>

    {/* Body */}
    {items.length === 0 ? (
      <div style={{
        marginTop: 14, padding: "16px 0", textAlign: "center",
        fontSize: 13, color: "var(--ink-soft)",
      }}>
        {emptyText}
      </div>
    ) : (
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((it, i) => <PlanRow key={i} item={it}/>)}
      </div>
    )}
  </div>
);

const PlanScreen = ({ go, onChangeTab }) => {
  const [toast, setToast] = useState(null);
  const showToast = (label) => {
    setToast(`🎉 +5 plan points · ${label}`);
    setTimeout(() => setToast(null), 2000);
  };

  // Use SAVINGS_GOALS from dashboard for the Saving goals card
  const savingItems = (typeof SAVINGS_GOALS !== "undefined" ? SAVINGS_GOALS : []).map(g => ({
    name: g.name,
    sub: `$${g.target?.toLocaleString?.() ?? g.target} goal`,
    pct: g.pctWeek,
    color: g.color,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
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
            <IconUser size={22} color="#444"/>
          </div>
        </div>
        <h1 style={{
          margin: "14px 0 0", fontWeight: 600, fontSize: 36, lineHeight: 1,
          letterSpacing: -1, color: "#111",
        }}>
          Your <span style={{ color: "#00A991" }}>plans</span>
        </h1>
        <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--ink-soft)" }}>
          Set goals. Track progress. Stay calm.
        </p>
      </div>

      <div style={{ padding: "20px 16px 120px", height: "calc(100% - 200px)", overflowY: "auto" }} className="no-scrollbar">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <PlanCard
            title="Budget plans"
            Icon={IconScale}
            items={BUDGET_PLANS}
            emptyText="No budget plans yet — tap + to add one"
            onAdd={() => showToast("Budget plan added")}
          />
          <PlanCard
            title="Saving goals"
            Icon={IconBag}
            items={savingItems}
            emptyText="No saving goals yet — tap + to add one"
            onAdd={() => showToast("Saving goal added")}
          />
          <PlanCard
            title="Investment goals"
            Icon={IconBars}
            items={INVESTMENT_PLANS}
            emptyText="No investment goals yet — tap + to add one"
            onAdd={() => showToast("Investment goal added")}
          />
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

      <BottomNav active="plan" onChange={onChangeTab}/>
    </div>
  );
};

Object.assign(window, { PlanScreen, BUDGET_PLANS, INVESTMENT_PLANS });
