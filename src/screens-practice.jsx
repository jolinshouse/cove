/* screens-practice.jsx — Practice flow (Choose Path, Simulator, Feedback, Congrats) */

const SIM_SCENARIOS = [
  {
    id: "drop",
    header: "ETF Scenario",
    title: "Handling a Market Drop",
    body: "Your ETF portfolio dropped 10% this week. What would you do?",
    a: "Keep investing and stay focused on long-term growth",
    b: "Pause and rethink your investment strategy",
    feedbackA: "Long-term investing may reduce emotional decision-making during short-term volatility.",
    feedbackB: "Reassessing risk tolerance can also be a reasonable response depending on your goals.",
  },
  {
    id: "raise",
    header: "Budget Scenario",
    title: "You Got a Raise",
    body: "You just got a $300/mo raise. Where does it go first?",
    a: "Boost your emergency fund and investments",
    b: "Treat yourself — you earned it",
    feedbackA: "Future-you will thank you. Even small increases compound over years.",
    feedbackB: "Lifestyle creep is real — try the 50/30/20 split instead.",
  },
  {
    id: "bill",
    header: "Cashflow Scenario",
    title: "Surprise Bill",
    body: "An unexpected $400 bill lands. Your move?",
    a: "Pay it from your emergency fund",
    b: "Put it on the credit card to keep cash flowing",
    feedbackA: "That's exactly what emergency funds are for. Top it back up next month.",
    feedbackB: "Works short term, but interest can quickly outpace the convenience.",
  },
];

/* ───── Screen 2/3 — Choose Your Path (Budget Planning / Simulate) ───── */

const ChoosePathScreen = ({ go, onChangeTab, openAI }) => {
  const [mode, setMode] = useState("budget");
  const [income, setIncome] = useState(4300);
  const [risk, setRisk] = useState(35);
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg)", overflow: "hidden" }}>
      <TopRow onBack={() => go("learn-home")}/>
      <div style={{ padding: "10px 22px 130px", height: "calc(100% - 96px)", overflowY: "auto" }} className="no-scrollbar">
        <h1 style={{ margin: 0, fontSize: 34, fontWeight: 700, color: "var(--navy-900)", letterSpacing: -0.5 }}>Choose Your Path</h1>
        <p style={{ margin: "10px 0 0", fontSize: 15, color: "var(--ink-soft)" }}>
          Pick a path and start your learning adventure !
        </p>

        <div style={{ marginTop: 22, display: "flex", justifyContent: "center" }}>
          <Segmented
            options={[
              { value: "budget", label: "Budget Planning" },
              { value: "simulate", label: "Simulate" },
            ]}
            value={mode} onChange={setMode}
          />
        </div>

        {mode === "budget" ? (
          <PathCard
            title="Master Money Habits"
            desc="Real tools, zero judgment. Build a budget that actually fits your life."
            sliderLabel="Monthly take-home"
            valueLabel={`$${income}`}
            value={(income - 1000) / (10000 - 1000) * 100}
            onChange={v => setIncome(Math.round(1000 + v / 100 * (10000 - 1000)))}
            rangeLabel={null}
            showInfo={false}
          />
        ) : (
          <PathCard
            title="Invest without the fear"
            desc="Practice with fake money. Build real confidence. No risk, all the learning."
            sliderLabel="Risk Tolerance"
            valueLabel={null}
            value={risk}
            onChange={setRisk}
            rangeLabel={<><span>Low</span><span style={{ opacity: .5 }}>High</span></>}
            showInfo
          />
        )}
      </div>

      <div style={{ position: "absolute", left: 16, right: 16, bottom: 100, display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <PrimaryButton onClick={() => mode === "budget" ? go("practice-budget") : go("practice-sim")}>
            {mode === "budget" ? "Continue This Path" : "Launch Simulator"}
          </PrimaryButton>
        </div>
        <SparkleButton onClick={openAI} floating={false} variant="inline"/>
      </div>
      <BottomNav active="learn" onChange={onChangeTab}/>
    </div>
  );
};

const PathCard = ({ title, desc, sliderLabel, valueLabel, value, onChange, rangeLabel, showInfo }) => (
  <div style={{
    marginTop: 24, background: "#fff", borderRadius: 24, padding: "28px 24px",
    boxShadow: "0 4px 16px rgba(0,0,0,.06)",
  }}>
    <h2 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: "var(--navy-900)", letterSpacing: -0.4, lineHeight: 1.1 }}>{title}</h2>
    <p style={{ margin: "12px 0 0", fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}>{desc}</p>

    <div style={{ marginTop: 36 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 15, color: "var(--ink-soft)" }}>
          {sliderLabel}
          {showInfo && <IconInfo size={16} color="var(--ink-mute)"/>}
        </div>
        {valueLabel && <div style={{ fontSize: 22, fontWeight: 600, color: "var(--navy-900)" }}>{valueLabel}</div>}
      </div>
      <input
        type="range" className="cove-range" min={0} max={100} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ marginTop: 14, "--val": `${value}%` }}
      />
      {rangeLabel && (
        <div style={{ marginTop: 6, display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--ink-mute)" }}>
          {rangeLabel}
        </div>
      )}
    </div>
  </div>
);

/* ───── Budget Planning result (a quick bento summary) ───── */

const BudgetPlanScreen = ({ go, onChangeTab }) => {
  const total = 4300;
  const allocations = [
    { name: "Needs (Rent, bills, groceries)", pct: 50, color: "var(--teal-700)" },
    { name: "Wants (Fun, dining, hobbies)", pct: 30, color: "var(--teal-300)" },
    { name: "Future you (Savings + invest)", pct: 20, color: "var(--navy-900)" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg)", overflow: "hidden" }}>
      <TopRow onBack={() => go("practice-path")}/>
      <div style={{ padding: "10px 22px 120px", height: "calc(100% - 96px)", overflowY: "auto" }} className="no-scrollbar">
        <Pill>Budget Planner</Pill>
        <h1 style={{ margin: "10px 0 0", fontSize: 30, fontWeight: 700, color: "var(--navy-900)" }}>
          Your monthly plan
        </h1>
        <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--ink-soft)" }}>
          Based on your <b>${total}</b> take-home. Tap any block to adjust.
        </p>

        <div style={{
          marginTop: 18, background: "#fff", borderRadius: 20, padding: 18,
          boxShadow: "0 2px 8px rgba(0,0,0,.06)",
        }}>
          <div style={{ display: "flex", height: 14, borderRadius: 999, overflow: "hidden", background: "var(--bg)" }}>
            {allocations.map((a, i) => (
              <div key={i} style={{ flex: a.pct, background: a.color, animation: `bar-grow .5s ease ${i*0.1}s both`, transformOrigin: "left" }}/>
            ))}
          </div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {allocations.map((a, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 12, height: 12, borderRadius: 4, background: a.color }}/>
                  <span style={{ fontSize: 14, color: "#222" }}>{a.name}</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>${Math.round(total * a.pct / 100)}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14, background: "var(--teal-50)", borderRadius: 18, padding: 16 }}>
          <div style={{ fontSize: 13, color: "var(--teal-700)", fontWeight: 700 }}>Cove tip</div>
          <div style={{ fontSize: 14, color: "var(--navy-900)", marginTop: 4, lineHeight: 1.4 }}>
            Even <b>$50/mo</b> set aside on payday compounds to ~$8,000 in 10 years at 6% return.
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", left: 16, right: 16, bottom: 100 }}>
        <PrimaryButton onClick={() => go("practice-sim")}>Try a simulation</PrimaryButton>
      </div>
      <BottomNav active="learn" onChange={onChangeTab}/>
    </div>
  );
};

/* ───── Screen 5 / 5B — Simulation Session ───── */

const SimulationScreen = ({ go, onChangeTab, openAI }) => {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selection, setSelection] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const sc = SIM_SCENARIOS[scenarioIdx];

  const nextScenario = () => {
    if (scenarioIdx < SIM_SCENARIOS.length - 1) {
      setScenarioIdx(i => i + 1);
      setSelection(null);
      setSubmitted(false);
    } else {
      go("practice-congrats");
    }
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg)", overflow: "hidden" }}>
      <TopRow onBack={() => go("practice-path")}
              right={<RoundIconBtn aria-label="Settings"><IconSettings size={22}/></RoundIconBtn>}/>
      <div style={{ padding: "12px 22px 140px", height: "calc(100% - 96px)", overflowY: "auto" }} className="no-scrollbar">
        <div style={{ textAlign: "center", marginTop: 18 }}>
          <div style={{ fontSize: 18, color: "var(--ink-mute)", fontWeight: 500 }}>{sc.header}</div>
          <h1 style={{ margin: "6px 0 0", fontSize: 28, fontWeight: 700, color: "var(--navy-900)" }}>{sc.title}</h1>
        </div>

        <p style={{ marginTop: 36, textAlign: "center", fontSize: 22, color: "var(--navy-900)", fontWeight: 500, lineHeight: 1.3 }}>
          {sc.body}
        </p>

        <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { key: "A", text: sc.a },
            { key: "B", text: sc.b },
          ].map(opt => {
            const isSel = selection === opt.key;
            return (
              <button key={opt.key} onClick={() => !submitted && setSelection(opt.key)} disabled={submitted && !isSel} style={{
                background: "#fff", border: isSel ? "2px solid var(--teal-300)" : "1px solid var(--line)",
                borderRadius: 999, padding: "14px 14px 14px 14px", cursor: submitted ? "default" : "pointer",
                display: "flex", alignItems: "center", gap: 14, textAlign: "left",
                fontFamily: "inherit", opacity: submitted && !isSel ? 0.4 : 1,
                transition: "all .2s",
              }}>
                <span style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: isSel ? "var(--teal-300)" : "var(--teal-50)",
                  display: "grid", placeItems: "center",
                  color: isSel ? "#fff" : "var(--teal-700)", fontWeight: 700, fontSize: 18,
                  flex: "none",
                }}>{opt.key}</span>
                <span style={{ fontSize: 15, color: "#222", lineHeight: 1.35 }}>{opt.text}</span>
              </button>
            );
          })}
        </div>

        {submitted && (
          <div style={{
            marginTop: 18, background: "var(--teal-50)", border: "1px solid var(--teal-100)",
            borderRadius: 16, padding: 16, animation: "float-up .3s ease both",
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--teal-700)" }}>WHY THIS WORKS</div>
            <div style={{ marginTop: 6, fontSize: 15, color: "var(--navy-900)", lineHeight: 1.45 }}>
              {selection === "A" ? sc.feedbackA : sc.feedbackB}
            </div>
          </div>
        )}
      </div>

      <div style={{ position: "absolute", left: 16, right: 16, bottom: 100, display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          {!submitted ? (
            <PrimaryButton onClick={() => selection && setSubmitted(true)} disabled={!selection}>Submit</PrimaryButton>
          ) : (
            <PrimaryButton onClick={nextScenario}>
              {scenarioIdx < SIM_SCENARIOS.length - 1 ? "Next Scenario" : "Finish"}
            </PrimaryButton>
          )}
        </div>
        <SparkleButton onClick={openAI} floating={false} variant="inline"/>
      </div>
      <BottomNav active="learn" onChange={onChangeTab}/>
    </div>
  );
};

Object.assign(window, {
  SIM_SCENARIOS, ChoosePathScreen, BudgetPlanScreen, SimulationScreen,
});
