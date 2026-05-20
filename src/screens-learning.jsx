/* screens-learning.jsx — Learning flow (7 screens) */

const TOPICS = [
  { id: "etfs", name: "ETFs", desc: "Learn how ETFs help beginners invest in multiple companies at once instead of relying on single stock.", points: 20, Icon: IconPie },
  { id: "risk", name: "Risk & Diversification", desc: "Understand how balancing different types of investments can help reduce risk over time.", points: 50, Icon: IconScale },
  { id: "basics", name: "Investing Basics", desc: "Learn the basics of investing, how the market works, and simple ways to start building your financial future.", points: 70, Icon: IconBag },
];

const LESSONS = [
  { id: "l1", title: "What is an ETF ?", desc: "Learn how ETFs help beginners invest in multiple companies at once instead of relying on single stock.", type: "Quick Cards", time: "2 min", Icon: IconCards },
  { id: "l2", title: "Why do people invest in ETFs ?", desc: "Learn the basics of investing, how the market works, and simple ways to start building your financial future.", type: "Interactive Lesson", time: "3 min", Icon: IconPlay },
  { id: "l3", title: "Risk & Diversification", desc: "Learn the basics of investing, how the market works, and simple ways to start building your financial future.", type: "Quick Cards", time: "2 min", Icon: IconCards },
];

/* ───── Screen 1 — Learning Home ───── */

const LearningHomeScreen = ({ go, onChangeTab, mode = "learning", setMode }) => {
  const [step] = useState(5);
  const total = 5;
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg)", overflow: "hidden" }}>
      <div style={{ padding: "60px 22px 0" }}>
        <h1 style={{ margin: 0, fontWeight: 600, fontSize: 38, letterSpacing: -0.8, color: "var(--navy-900)" }}>Your Learning</h1>
        <p style={{ margin: "8px 0 0", fontSize: 17, color: "var(--ink-soft)", fontWeight: 300 }}>
          Unlock <b style={{ color: "var(--navy-900)" }}>2× points</b> as you learn today
        </p>

        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          <StatPill icon={<IconDollar size={18} color="var(--navy-900)"/>} label="Point" value="1000"/>
          <StatPill icon={<IconFlame size={18} color="var(--navy-900)"/>} label="Streak" value={<><b>12</b><span style={{ fontWeight: 400, color: "var(--ink-soft)", marginLeft: 4 }}>Days</span></>}/>
        </div>

        <div style={{ marginTop: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Mascot size={120}/>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            {Array.from({ length: 9 }).map((_, i) => {
              const isCurr = i === 4;
              return <span key={i} style={{
                width: isCurr ? 12 : 6, height: isCurr ? 12 : 6, borderRadius: "50%",
                background: i < 5 ? `rgba(60, 80, 100, ${0.2 + i * 0.16})` : "rgba(180, 195, 210, .8)",
                display: "inline-block",
              }}/>;
            })}
          </div>
          <div style={{ fontSize: 18, color: "var(--ink-mute)", marginTop: 4 }}>{step}/{total}</div>
        </div>

        <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
          <div style={{
            display: "inline-flex", padding: 4, borderRadius: 999, background: "var(--navy-900)",
          }}>
            {["learning", "practice"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                padding: "10px 32px", borderRadius: 999, border: 0, cursor: "pointer",
                background: mode === m ? "#fff" : "transparent",
                color: mode === m ? "var(--navy-900)" : "#fff", fontWeight: 600,
                fontFamily: "inherit", fontSize: 14, textTransform: "capitalize",
              }}>{m}</button>
            ))}
          </div>
        </div>

        {mode === "learning" ? (
          <FeatureCard
            color="var(--blue-500)"
            title={<>Tiny lessons for your future money self.</>}
            cta="Tap to Start !"
            onCta={() => go("learn-topics")}
          />
        ) : (
          <FeatureCard
            color="var(--teal-300)"
            title={<>Try money decisions<br/>without the risk.</>}
            cta="Tap to Start !"
            onCta={() => go("practice-path")}
          />
        )}
      </div>
      <BottomNav active="learn" onChange={onChangeTab}/>
    </div>
  );
};

const StatPill = ({ icon, label, value }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 14,
    background: "#fff", padding: "12px 22px", borderRadius: 999,
    boxShadow: "0 2px 8px rgba(0,0,0,.05)",
    width: "fit-content", minWidth: 220,
  }}>
    {icon}
    <span style={{ fontWeight: 500, fontSize: 15, color: "#111" }}>{label}</span>
    <span style={{ fontWeight: 700, fontSize: 18, color: "var(--navy-900)" }}>{value}</span>
  </div>
);

const FeatureCard = ({ color, title, cta, onCta }) => (
  <div style={{
    marginTop: 22, background: color, borderRadius: 28, color: "#fff",
    padding: "26px 26px 22px", boxShadow: "0 12px 32px rgba(43,127,255,.25)",
    position: "relative",
  }}>
    <div style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.15, letterSpacing: -0.4 }}>{title}</div>
    <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 14 }}>
      <button onClick={onCta} style={{
        display: "inline-flex", alignItems: "center", gap: 14,
        background: "transparent", border: 0, color: "#fff", fontSize: 18,
        fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
      }}>
        {cta}
        <span style={{
          width: 40, height: 40, borderRadius: "50%", background: "#fff",
          display: "grid", placeItems: "center", color: "#111",
        }}><IconChevronRight size={20} color="#111"/></span>
      </button>
    </div>
  </div>
);

/* ───── Screen 2 / 3 — Topic Selection (and search state) ───── */

const TopicSelectionScreen = ({ go, onChangeTab, searchActive: initialSearch = false, selected, setSelected, openAI }) => {
  const [searchActive, setSearchActive] = useState(initialSearch);
  const [search, setSearch] = useState(searchActive ? "I want to start" : "");
  const toggle = id => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg)", overflow: "hidden" }}>
      <TopRow onBack={() => go("learn-home")}/>
      <div style={{ padding: "10px 18px 120px", height: "calc(100% - 96px)", overflowY: "auto" }} className="no-scrollbar">
        <h1 style={{ margin: 0, fontWeight: 600, fontSize: 30, letterSpacing: -0.5, color: "var(--navy-900)", lineHeight: 1.1 }}>
          What would you like to<br/>learn today?
        </h1>
        <p style={{ margin: "12px 0 0", fontSize: 15, color: "var(--ink-soft)", fontWeight: 400 }}>
          Choose a topic and start learning with fun, bit-sized lessons.
        </p>
        <h2 style={{ margin: "20px 0 12px", fontSize: 18, fontWeight: 700, color: "var(--navy-900)" }}>Choose Topics</h2>

        {/* Search bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "#fff", borderRadius: 999, padding: "10px 6px 10px 18px",
          boxShadow: "0 2px 8px rgba(0,0,0,.04)",
          border: searchActive ? "2px solid var(--teal-300)" : "1px solid transparent",
        }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchActive(true)}
            placeholder="Search topics…(e.g., ETFs)"
            style={{
              flex: 1, border: 0, outline: 0, fontSize: 15, color: "var(--ink-soft)",
              background: "transparent", fontFamily: "inherit",
            }}
          />
          <IconMic size={20} color="#444"/>
          <button onClick={() => setSearchActive(s => !s)} aria-label="Search" style={{
            width: 38, height: 38, borderRadius: "50%", background: "var(--teal-300)",
            border: 0, display: "grid", placeItems: "center", cursor: "pointer", color: "#fff",
          }}>
            <IconSearch size={18} color="#fff"/>
          </button>
        </div>

        {/* Autocomplete */}
        {searchActive && search && (
          <div style={{
            marginTop: 8, background: "#fff", borderRadius: 18,
            boxShadow: "0 8px 28px rgba(0,0,0,.1)", overflow: "hidden",
            animation: "float-up .2s ease both",
          }}>
            {[
              "I want to start",
              "I want to start learning ETFs",
              "I want to start investing safely",
              "I want to start with ETFs",
            ].filter(s => s.toLowerCase().includes(search.toLowerCase())).map((s, i) => (
              <button key={i} onClick={() => { setSearch(s); }} style={{
                display: "flex", alignItems: "center", gap: 10,
                width: "100%", padding: "12px 16px", border: 0, background: "transparent",
                textAlign: "left", cursor: "pointer", fontSize: 14, color: "var(--ink-soft)",
                borderBottom: i < 3 ? "1px solid var(--line)" : "none",
                fontFamily: "inherit",
              }}>
                <IconSearch size={16} color="var(--ink-mute)"/>{s}
              </button>
            ))}
          </div>
        )}

        {/* Topic cards */}
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {TOPICS.map(t => {
            const isSel = selected.includes(t.id);
            return (
              <button key={t.id} onClick={() => toggle(t.id)} style={{
                background: isSel ? "var(--teal-50)" : "#fff",
                border: isSel ? "2px solid var(--teal-100)" : "1px solid var(--line)",
                borderRadius: 18, padding: "16px 18px",
                display: "flex", gap: 14, alignItems: "flex-start",
                cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                transition: "background .2s, border .2s",
              }}>
                <div style={{ paddingTop: 2 }}><t.Icon size={26} color="var(--teal-700)"/></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 17, color: "var(--navy-900)" }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.4 }}>{t.desc}</div>
                  <div style={{ marginTop: 10, fontSize: 13, fontWeight: 700, color: "var(--navy-900)" }}>{t.points} Points</div>
                </div>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  border: isSel ? "0" : "1.5px solid var(--ink-mute)",
                  background: isSel ? "var(--teal-300)" : "#fff",
                  display: "grid", placeItems: "center", flex: "none",
                }}>{isSel && <IconCheck size={14} stroke="#fff"/>}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA + sparkle */}
      <div style={{ position: "absolute", left: 16, right: 16, bottom: 100, display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <PrimaryButton onClick={() => go("learn-journey")} disabled={selected.length === 0}>
            Add To Learning List
          </PrimaryButton>
        </div>
        <SparkleButton onClick={openAI} floating={false}/>
      </div>
      <BottomNav active="learn" onChange={onChangeTab}/>
    </div>
  );
};

/* ───── Screen 4 / 5 — Learning Journey (with drag & drop & completed state) ───── */

const LearningJourneyScreen = ({ go, onChangeTab, openAI, completed = [] }) => {
  const [items, setItems] = useState(LESSONS);
  const [overTrash, setOverTrash] = useState(false);
  const [dragId, setDragId] = useState(null);

  const onDragStart = id => () => setDragId(id);
  const onDragEnter = id => () => {
    if (!dragId || dragId === id) return;
    setItems(arr => {
      const from = arr.findIndex(x => x.id === dragId);
      const to = arr.findIndex(x => x.id === id);
      const copy = [...arr];
      const [moved] = copy.splice(from, 1);
      copy.splice(to, 0, moved);
      return copy;
    });
  };
  const onDrop = () => {
    if (overTrash) {
      setItems(arr => arr.filter(x => x.id !== dragId));
    }
    setDragId(null);
    setOverTrash(false);
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg)", overflow: "hidden" }}>
      <TopRow onBack={() => go("learn-topics")} right={<RoundIconBtn aria-label="Filters"><IconSettings size={22}/></RoundIconBtn>}/>
      <div style={{ padding: "8px 22px 130px", height: "calc(100% - 96px)", overflowY: "auto" }} className="no-scrollbar">
        <Pill>ETFs : Beginner</Pill>
        <h1 style={{ margin: "8px 0 0", fontSize: 34, fontWeight: 700, color: "var(--navy-900)", letterSpacing: -0.6, lineHeight: 1.05 }}>
          Your Learning Journey
        </h1>
        <p style={{ margin: "10px 0 0", fontSize: 15, color: "var(--ink-soft)" }}>
          Build your money confidence step by step
        </p>

        <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: "var(--navy-900)" }}>Arrange your learning path</div>
          <div onDragOver={e => { e.preventDefault(); setOverTrash(true); }}
               onDragLeave={() => setOverTrash(false)}
               onDrop={onDrop}
               style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "10px 18px", borderRadius: 999,
            background: overTrash ? "rgb(220,80,80)" : "var(--teal-300)",
            color: "#fff", fontWeight: 500, fontSize: 14,
            transition: "background .2s",
          }}>
            <IconTrash size={18} color="#fff"/> Trash area
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginTop: 16, position: "relative", paddingLeft: 24 }}>
          {/* spine */}
          <div style={{
            position: "absolute", left: 4, top: 12, bottom: 12, width: 2,
            background: "repeating-linear-gradient(to bottom, rgba(140,150,170,.4) 0 4px, transparent 4px 8px)",
          }}/>
          {items.map((l, i) => {
            const isDone = completed.includes(l.id);
            return (
              <div key={l.id} style={{ display: "flex", alignItems: "stretch", gap: 14, marginBottom: 14, position: "relative" }}>
                <div style={{
                  position: "absolute", left: -24, top: 30,
                  width: 18, height: 18, borderRadius: "50%",
                  background: isDone ? "var(--teal-300)" : "var(--ink-mute)",
                  border: "3px solid var(--bg)", boxSizing: "content-box",
                  display: "grid", placeItems: "center",
                }}>
                  {isDone && <IconCheck size={10} stroke="#fff"/>}
                </div>
                <div
                  draggable
                  onDragStart={onDragStart(l.id)}
                  onDragEnter={onDragEnter(l.id)}
                  onDragEnd={onDrop}
                  style={{
                    flex: 1, background: isDone ? "var(--teal-50)" : "#fff",
                    border: isDone ? "2px solid var(--teal-100)" : i === 0 && !isDone ? "2px solid var(--teal-100)" : "1px solid var(--line)",
                    borderRadius: 16, padding: "16px 18px",
                    boxShadow: "0 1px 3px rgba(0,0,0,.04)",
                    opacity: dragId === l.id ? 0.4 : 1,
                    cursor: "grab", display: "flex", gap: 10,
                  }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 18, color: "var(--navy-900)" }}>{l.title}</div>
                    <p style={{ margin: "6px 0 10px", fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.4 }}>{l.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--teal-500)", fontSize: 14, fontWeight: 600 }}>
                      <l.Icon size={16} color="var(--teal-500)"/>
                      {l.type}
                      <span style={{ width: 1, height: 14, background: "var(--ink-mute)", opacity: .4 }}/>
                      <span>{l.time}</span>
                    </div>
                  </div>
                  <div style={{ color: "var(--ink-mute)" }}><IconDrag size={20}/></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ position: "absolute", left: 16, right: 16, bottom: 100, display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <PrimaryButton onClick={() => go("learn-lesson")}>Start Learning</PrimaryButton>
        </div>
        <SparkleButton onClick={openAI} floating={false}/>
      </div>
      <BottomNav active="learn" onChange={onChangeTab}/>
    </div>
  );
};

/* ───── Screen 6 — Lesson (Flash cards) ───── */

const FLASH_CARDS = [
  { title: "Understanding ETFs", body: <>An <b>ETF</b> (Exchange Traded Fund) is a type of investment fund that tracks a group of assets like <b>stocks</b>, <b>bonds</b>, or <b>commodities</b>.</>, tags: ["Stocks", "Commodities", "Bonds"] },
  { title: "Diversification, baked in", body: <>One ETF can hold <b>hundreds</b> of companies — so when one drops, others can cushion the fall.</>, tags: ["Mix", "Spread", "Steady"] },
  { title: "Bought like a stock", body: <>You can buy or sell ETF shares on the <b>exchange</b> any time during market hours.</>, tags: ["Market", "Liquid"] },
  { title: "Low effort, low fees", body: <>Most ETFs follow an <b>index</b>, so management costs are tiny compared to mutual funds.</>, tags: ["Passive", "Cheap"] },
  { title: "Build your portfolio", body: <>Combine a few ETFs to cover different regions, sectors, and risk levels — your starter kit.</>, tags: ["Mix it up"] },
  { title: "Long game wins", body: <>ETFs reward <b>patience</b>. Time in the market beats timing the market.</>, tags: ["Stay"] },
];

const LessonScreen = ({ go, onChangeTab, openAI, onComplete }) => {
  const [idx, setIdx] = useState(0);
  const total = FLASH_CARDS.length;
  const next = () => {
    if (idx < total - 1) setIdx(i => i + 1);
    else { onComplete(); go("learn-congrats"); }
  };
  const prev = () => idx > 0 ? setIdx(i => i - 1) : go("learn-progress");
  const touchStart = useRef(0);
  const onTS = e => { touchStart.current = e.touches[0].clientX; };
  const onTE = e => {
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) next(); else prev();
  };
  const card = FLASH_CARDS[idx];

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg)", overflow: "hidden" }}>
      <TopRow onBack={prev}
              leftExtra={<RoundIconBtn aria-label="Settings"><IconSettings size={22}/></RoundIconBtn>}
              right={
                <div style={{
                  background: "#fff", padding: "10px 18px", borderRadius: 999,
                  display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "0 2px 6px rgba(0,0,0,.05)",
                }}>
                  <IconDollar size={18} color="var(--navy-900)"/>
                  <span style={{ fontWeight: 500, fontSize: 14 }}>Point</span>
                  <span style={{ fontWeight: 700, fontSize: 18, color: "var(--navy-900)" }}>{1000 + idx * 5}</span>
                </div>
              }/>
      <div style={{ padding: "12px 22px 130px", height: "calc(100% - 96px)", overflowY: "auto" }} className="no-scrollbar">
        <Pill>ETFs : Beginner</Pill>
        <h1 style={{ margin: "10px 0 0", fontSize: 30, fontWeight: 700, color: "var(--navy-900)" }}>What is an ETF ?</h1>
        <p style={{ margin: "10px 0 0", fontSize: 15, color: "var(--ink-soft)" }}>Build your money confidence step by step</p>

        <div key={idx} onTouchStart={onTS} onTouchEnd={onTE} style={{
          marginTop: 22, background: "#fff", borderRadius: 24,
          boxShadow: "0 2px 6px rgba(0,0,0,.08)", padding: 18,
          animation: "float-up .3s ease both",
        }}>
          {/* Illustration area */}
          <div style={{
            background: "var(--teal-50)", borderRadius: 16, height: 200,
            position: "relative", overflow: "hidden", padding: 16,
          }}>
            <FlashIllustration idx={idx} tags={card.tags}/>
          </div>
          <h2 style={{ margin: "16px 0 8px", fontSize: 20, fontWeight: 700, color: "var(--navy-900)" }}>{card.title}</h2>
          <p style={{ margin: 0, fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.5 }}>{card.body}</p>
        </div>

        {/* Progress dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 16 }}>
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} style={{
              width: i === idx ? 22 : 8, height: 8, borderRadius: 4,
              background: i === idx ? "var(--teal-500)" : "var(--teal-100)",
              transition: "width .2s",
            }}/>
          ))}
        </div>

        {/* Tap to advance hint */}
        <button onClick={next} style={{
          marginTop: 16, width: "100%", padding: "12px", background: "transparent", border: 0,
          color: "var(--teal-500)", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit",
        }}>
          {idx === total - 1 ? "Finish lesson →" : "Tap or swipe for next →"}
        </button>
      </div>

      <div style={{ position: "absolute", left: 16, right: 16, bottom: 100 }}>
        <AIBar placeholder="Describe more"/>
      </div>
      <BottomNav active="learn" onChange={onChangeTab}/>
    </div>
  );
};

const FlashIllustration = ({ idx, tags }) => (
  <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
    <img src="assets/etf-learning.svg" alt="ETF illustration"
         style={{ width: "100%", height: "100%", objectFit: "contain" }}/>
  </div>
);

/* ───── Screen 7 — Congrats ───── */

const CongratsScreen = ({ go, onChangeTab, scenarioName = "ETF Market Drop" }) => (
  <div style={{ position: "absolute", inset: 0, background: "var(--bg)", overflow: "hidden" }}>
    <div style={{ paddingTop: 56, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginTop: 18 }}>
        <EmotionMascot color="var(--teal-300)" ringColors={["var(--teal-100)", "var(--teal-300)", "var(--teal-700)"]} size={300}/>
      </div>
      <h1 style={{ margin: 0, color: "var(--teal-500)", fontSize: 38, fontWeight: 700, letterSpacing: -0.4 }}>Congratulation !</h1>
      <p style={{ margin: "10px 26px 0", textAlign: "center", fontSize: 16, color: "var(--ink-soft)" }}>
        You completed your {scenarioName} scenario.
      </p>
      <div style={{ marginTop: 22, fontSize: 36, fontWeight: 700, color: "var(--navy-900)" }}>+20 Points</div>

      <div style={{ marginTop: 28, textAlign: "center", color: "var(--navy-900)" }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>Feeling overwhelmed after learning?</div>
        <button style={{
          marginTop: 10, background: "var(--blue-50)", border: 0, padding: "10px 14px 10px 22px",
          borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 14, cursor: "pointer",
          fontFamily: "inherit",
        }}>
          <span style={{ fontWeight: 500 }}>Listen to a calming audio</span>
          <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center" }}>
            <IconChevronRight size={14}/>
          </span>
        </button>
      </div>
    </div>

    <div style={{ position: "absolute", left: 16, right: 16, bottom: 100, display: "flex", gap: 10 }}>
      <SecondaryButton onClick={() => go("learn-progress")} style={{ flex: 1 }}>Learn More</SecondaryButton>
      <PrimaryButton onClick={() => go("learn-home")} style={{ flex: 1 }}>Continue</PrimaryButton>
    </div>
    <BottomNav active="learn" onChange={onChangeTab}/>
  </div>
);

Object.assign(window, {
  TOPICS, LESSONS, LearningHomeScreen, TopicSelectionScreen, LearningJourneyScreen,
  LessonScreen, CongratsScreen, FLASH_CARDS,
});
