/* screens-learning.jsx — Learning flow (7 screens) */

const TOPIC_SOURCES = {
  etfs: [
    { name: "Investor.gov — Exchange-Traded Funds (ETFs)", url: "investor.gov/etfs" },
    { name: "SEC.gov — ETF Investor Bulletin", url: "sec.gov/oiea/etfs" },
    { name: "Vanguard — ETF education", url: "investor.vanguard.com/etfs" },
  ],
  risk: [
    { name: "Investor.gov — Diversification", url: "investor.gov/diversification" },
    { name: "FINRA — Risk Tolerance Basics", url: "finra.org/investors/risk-tolerance" },
  ],
  basics: [
    { name: "Investor.gov — Roadmap to Saving and Investing", url: "investor.gov/roadmap" },
    { name: "Khan Academy — Personal finance", url: "khanacademy.org/college-careers-more/personal-finance" },
  ],
};

const TOPICS = [
  { id: "etfs", name: "ETFs", desc: "Learn how ETFs help beginners invest in multiple companies at once instead of relying on single stock.", points: 20, Icon: IconPie, mix: "5 reads · 1 interactive · ~2 min each" },
  { id: "risk", name: "Risk & Diversification", desc: "Understand how balancing different types of investments can help reduce risk over time.", points: 50, Icon: IconScale, mix: "4 reads · 2 interactive · ~3 min each" },
  { id: "basics", name: "Investing Basics", desc: "Learn the basics of investing, how the market works, and simple ways to start building your financial future.", points: 70, Icon: IconBag, mix: "6 reads · 2 interactive · ~2 min each" },
];

const LESSONS = [
  { id: "l1", title: "What is an ETF ?",            desc: "Learn how ETFs help beginners invest in multiple companies at once instead of relying on single stock.", format: "read",              time: "2 min" },
  { id: "l2", title: "Why do people invest in ETFs ?", desc: "Walk through real scenarios that show why ETFs are a common starter investment.",                          format: "interactive-video", time: "3 min" },
  { id: "l3", title: "Risk & Diversification",      desc: "Learn the basics of how spreading investments reduces risk.",                                                  format: "audio",             time: "2 min" },
];

/* ───── Screen 1 — Learning Home ───── */

const LearningHomeScreen = ({ go, onChangeTab, mode = "learning", setMode, savedCount = 0, completedCount = 0 }) => {
  const dailyTotal = 5;
  const dailyDone = Math.max(1, Math.min(completedCount + 1, dailyTotal));
  const courseTotal = 6;
  const courseDone = Math.min(completedCount + 1, courseTotal);
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
      {/* Top bar: centered point+streak chips, bookmark icon top-right */}
      <div style={{
        position: "relative", paddingTop: 56, paddingBottom: 14,
      }}>
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
        <button onClick={() => go("saved-courses")} aria-label="Saved courses" style={{
          position: "absolute", top: 56, right: 18,
          width: 40, height: 40, borderRadius: "50%",
          background: "#fff", border: 0, cursor: "pointer",
          display: "grid", placeItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,.08)", fontFamily: "inherit",
        }}>
          <IconBookmark size={20} color="var(--teal-700)" filled={savedCount > 0}/>
        </button>
      </div>

      <div style={{ padding: "0 22px", height: "calc(100% - 168px)", overflowY: "auto" }} className="no-scrollbar">
        {/* Course progress strip */}
        <div style={{
          marginTop: 8, background: "#fff", borderRadius: 18,
          padding: 14, boxShadow: "0 2px 8px rgba(0,0,0,.05)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--navy-900)" }}>ETFs · Beginner</span>
            <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>Lesson {courseDone} of {courseTotal}</span>
          </div>
          <div style={{
            marginTop: 8, height: 6, borderRadius: 999, background: "var(--teal-50)", overflow: "hidden",
          }}>
            <div style={{
              width: `${(courseDone / courseTotal) * 100}%`, height: "100%",
              background: "var(--teal-300)", borderRadius: 999,
              transition: "width .6s cubic-bezier(.2,.8,.2,1)",
            }}/>
          </div>
        </div>

        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <Mascot size={110}/>
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            {Array.from({ length: dailyTotal }).map((_, i) => {
              const done = i < dailyDone;
              return <span key={i} style={{
                width: 14, height: 14, borderRadius: "50%",
                background: done ? "var(--teal-300)" : "transparent",
                border: done ? 0 : "1.5px solid var(--ink-mute)",
                display: "grid", placeItems: "center",
                transition: "all .2s",
              }}>{done && <IconCheck size={9} stroke="#fff"/>}</span>;
            })}
          </div>
          <div style={{ fontSize: 14, color: "var(--navy-900)", fontWeight: 600, marginTop: 4 }}>
            {dailyDone} of {dailyTotal} lessons today
          </div>
        </div>

        <div style={{ marginTop: 18, display: "flex", justifyContent: "center" }}>
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
            image="assets/Learning.svg"
            title={<>Tiny lessons for your future money self.</>}
            cta="Tap to Start !"
            onCta={() => go("learn-topics")}
          />
        ) : (
          <FeatureCard
            color="var(--teal-300)"
            image="assets/Practice.svg"
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

const FeatureCard = ({ color, image, title, cta, onCta }) => (
  <div style={{
    marginTop: 22, background: color, borderRadius: 28, color: "#fff",
    padding: "20px 26px 22px", boxShadow: "0 12px 32px rgba(43,127,255,.25)",
    position: "relative", overflow: "hidden",
  }}>
    {image && (
      <div style={{
        marginLeft: -8, marginRight: -8, marginBottom: 12,
        height: 140, borderRadius: 18, overflow: "hidden",
        display: "grid", placeItems: "center",
      }}>
        <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }}/>
      </div>
    )}
    <div style={{ fontSize: 26, fontWeight: 500, lineHeight: 1.15, letterSpacing: -0.4 }}>{title}</div>
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

const TopicSelectionScreen = ({ go, onChangeTab, searchActive: initialSearch = false, selected, setSelected, openAI, savedCourses = [], toggleSaved }) => {
  const [searchActive, setSearchActive] = useState(initialSearch);
  const [search, setSearch] = useState(searchActive ? "I want to start" : "");
  const toggle = id => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
      <TopRow onBack={() => go("learn-home")} right={
        <button onClick={() => go("saved-courses")} aria-label="Saved courses" style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "#fff", border: 0, cursor: "pointer",
          display: "grid", placeItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,.08)", fontFamily: "inherit",
        }}>
          <IconBookmark size={20} color="var(--teal-700)"/>
        </button>
      }/>
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
            const isSaved = savedCourses.includes(t.id);
            return (
              <div key={t.id} className="tap-card" style={{
                background: isSel ? "var(--teal-50)" : "#fff",
                border: isSel ? "2px solid var(--teal-100)" : "1px solid var(--line)",
                borderRadius: 18, padding: "16px 18px",
                transition: "background .2s, border .2s",
                position: "relative",
              }}>
                {/* Select circle in top-left */}
                <button onClick={() => toggle(t.id)} aria-label={isSel ? "Deselect" : "Select"} style={{
                  position: "absolute", top: 16, left: 16,
                  width: 26, height: 26, borderRadius: "50%",
                  border: isSel ? "0" : "1.5px solid var(--ink-mute)",
                  background: isSel ? "var(--teal-300)" : "#fff",
                  display: "grid", placeItems: "center", cursor: "pointer",
                  padding: 0, fontFamily: "inherit",
                }}>
                  {isSel && <IconCheck size={14} stroke="#fff"/>}
                </button>
                {/* Bookmark in top-right */}
                <button onClick={() => toggleSaved?.(t.id)} aria-label={isSaved ? "Remove bookmark" : "Bookmark"} style={{
                  position: "absolute", top: 12, right: 12,
                  width: 32, height: 32, borderRadius: "50%",
                  background: "transparent", border: 0, cursor: "pointer",
                  display: "grid", placeItems: "center", fontFamily: "inherit",
                }}>
                  <IconBookmark size={20} color={isSaved ? "var(--teal-700)" : "var(--ink-mute)"} filled={isSaved}/>
                </button>

                <button onClick={() => toggle(t.id)} style={{
                  background: "transparent", border: 0, padding: 0, textAlign: "left", cursor: "pointer", fontFamily: "inherit",
                  width: "100%", display: "block",
                }}>
                  <div style={{ paddingLeft: 38, paddingRight: 28 }}>
                    <div style={{ fontWeight: 700, fontSize: 17, color: "var(--navy-900)" }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.4 }}>{t.desc}</div>
                    <div style={{ marginTop: 8, fontSize: 12, color: "#111", fontWeight: 500 }}>{t.mix}</div>
                    <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 700, color: "#2B7FFF" }}>
                      <IconPlus size={14} stroke="#2B7FFF"/>
                      <span>{t.points} Points</span>
                    </div>
                  </div>
                </button>
                <div style={{
                  paddingLeft: 38, marginTop: 6,
                  fontSize: 11, color: "var(--ink-mute)", lineHeight: 1.35,
                }}>
                  <span style={{ fontWeight: 600, marginRight: 4 }}>Sources:</span>
                  {(TOPIC_SOURCES[t.id] || []).map(s => s.url.split("/")[0]).join(" · ")}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA + sparkle */}
      <div style={{ position: "absolute", left: 16, right: 16, bottom: 100, display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <PrimaryButton onClick={() => go("learn-journey")} disabled={selected.length === 0}>
            Add To Learning List
          </PrimaryButton>
        </div>
        <SparkleButton onClick={openAI} floating={false} variant="inline"/>
      </div>
      <BottomNav active="learn" onChange={onChangeTab}/>
    </div>
  );
};

/* ───── Saved Courses Screen ───── */

const SavedCoursesScreen = ({ go, onChangeTab, savedCourses = [], toggleSaved }) => {
  const saved = TOPICS.filter(t => savedCourses.includes(t.id));
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
      <TopRow onBack={() => go("learn-home")}/>
      <div style={{ padding: "10px 18px 120px", height: "calc(100% - 96px)", overflowY: "auto" }} className="no-scrollbar">
        <h1 style={{ margin: 0, fontWeight: 600, fontSize: 30, letterSpacing: -0.5, color: "var(--navy-900)" }}>Saved courses</h1>
        <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--ink-soft)" }}>
          Courses you've bookmarked to come back to.
        </p>

        {saved.length === 0 ? (
          <div style={{
            marginTop: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center",
          }}>
            <Mascot size={100}/>
            <div style={{ fontSize: 16, fontWeight: 600, color: "var(--navy-900)" }}>No saved courses yet</div>
            <div style={{ fontSize: 13, color: "var(--ink-soft)", maxWidth: 260 }}>
              Tap the bookmark icon on any topic to save it here for later.
            </div>
            <PrimaryButton onClick={() => go("learn-topics")} style={{ width: "auto", marginTop: 12, padding: "12px 22px" }}>
              Browse topics
            </PrimaryButton>
          </div>
        ) : (
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
            {saved.map(t => (
              <div key={t.id} className="tap-card" style={{
                background: "#fff", border: "1px solid var(--line)",
                borderRadius: 18, padding: "16px 18px",
                position: "relative",
              }}>
                <button onClick={() => toggleSaved?.(t.id)} aria-label="Remove bookmark" style={{
                  position: "absolute", top: 12, right: 12,
                  width: 32, height: 32, borderRadius: "50%",
                  background: "transparent", border: 0, cursor: "pointer",
                  display: "grid", placeItems: "center", fontFamily: "inherit",
                }}>
                  <IconBookmark size={20} color="var(--teal-700)" filled/>
                </button>
                <button onClick={() => go("learn-journey")} style={{
                  background: "transparent", border: 0, padding: 0, textAlign: "left", cursor: "pointer", fontFamily: "inherit",
                  display: "flex", gap: 14, alignItems: "flex-start", width: "100%",
                }}>
                  <div style={{ paddingTop: 2 }}><t.Icon size={26} color="var(--teal-700)"/></div>
                  <div style={{ flex: 1, paddingRight: 28 }}>
                    <div style={{ fontWeight: 700, fontSize: 17, color: "var(--navy-900)" }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.4 }}>{t.desc}</div>
                    <div style={{ marginTop: 8, fontSize: 12, color: "var(--ink-mute)", fontWeight: 500 }}>{t.mix}</div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
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
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
      <TopRow onBack={() => go("learn-topics")} right={<RoundIconBtn aria-label="Filters"><IconSettings size={22}/></RoundIconBtn>}/>
      <div style={{ padding: "8px 22px 130px", height: "calc(100% - 96px)", overflowY: "auto" }} className="no-scrollbar">
        <Pill>ETFs : Beginner</Pill>
        <h1 style={{ margin: "8px 0 0", fontSize: 24, fontWeight: 700, color: "var(--navy-900)", letterSpacing: -0.4, lineHeight: 1.1 }}>
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
            <IconTrash size={18} color="#fff"/> Delete
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginTop: 16, position: "relative", paddingLeft: 24 }}>
          {/* spine — circles are 18px wide + 3px border each side = 24px effective, positioned at left:-24
              of an item that starts at x=24 (parent paddingLeft). Circle center sits at x=12,
              so spine width:2 needs left:11. */}
          <div style={{
            position: "absolute", left: 11, top: 12, bottom: 12, width: 2,
            background: "repeating-linear-gradient(to bottom, rgba(140,150,170,.4) 0 4px, transparent 4px 8px)",
          }}/>
          {items.map((l, i) => {
            const isDone = completed.includes(l.id) || i === 0;
            return (
              <div key={l.id} style={{ display: "flex", alignItems: "stretch", gap: 14, marginBottom: 14, position: "relative" }}>
                <div style={{
                  position: "absolute", left: -24, top: 30,
                  width: 18, height: 18, borderRadius: "50%",
                  background: isDone ? "#00A991" : "var(--ink-mute)",
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
                    <FormatBadge format={l.format} duration={l.time}/>
                  </div>
                  <div style={{ color: "var(--ink-mute)" }}><IconDrag size={20}/></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ position: "absolute", left: 16, right: 16, bottom: 100, display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <PrimaryButton onClick={() => go("learn-lesson")}>Start Learning</PrimaryButton>
        </div>
        <SparkleButton onClick={openAI} floating={false} variant="inline"/>
      </div>
      <BottomNav active="learn" onChange={onChangeTab}/>
    </div>
  );
};

/* ───── Screen 6 — Lesson (Flash cards) ───── */

const FLASH_CARDS = [
  { title: "Understanding ETFs", body: <>An <b>ETF</b> (Exchange Traded Fund) is a type of investment fund that tracks a group of assets like <b>stocks</b>, <b>bonds</b>, or <b>commodities</b>.</>, tags: ["Stocks", "Commodities", "Bonds"], visual: "basket",
    sources: [{ name: "Investor.gov — ETFs", url: "investor.gov/etfs" }] },
  { title: "Diversification, baked in", body: <>One ETF can hold <b>hundreds</b> of companies — so when one drops, others can cushion the fall.</>, tags: ["Mix", "Spread", "Steady"], visual: "diversification",
    sources: [{ name: "Investor.gov — Diversification", url: "investor.gov/diversification" }] },
  { title: "Bought like a stock", body: <>You can buy or sell ETF shares on the <b>exchange</b> any time during market hours.</>, tags: ["Market", "Liquid"], visual: "exchange",
    sources: [{ name: "SEC.gov — ETF Investor Bulletin", url: "sec.gov/oiea/etfs" }] },
  { title: "Low effort, low fees", body: <>Most ETFs follow an <b>index</b>, so management costs are tiny compared to mutual funds.</>, tags: ["Passive", "Cheap"], visual: "fees",
    sources: [{ name: "Vanguard — Cost of investing", url: "investor.vanguard.com/investor-resources-education" }] },
  { title: "Build your portfolio", body: <>Combine a few ETFs to cover different regions, sectors, and risk levels — your starter kit.</>, tags: ["Mix it up"], visual: "portfolio",
    sources: [{ name: "Investor.gov — Asset Allocation", url: "investor.gov/asset-allocation" }] },
  { title: "Long game wins", body: <>ETFs reward <b>patience</b>. Time in the market beats timing the market.</>, tags: ["Stay"], visual: "long-game",
    sources: [{ name: "FINRA — Time-Tested Strategies", url: "finra.org/investors" }] },
];

/* Small inline SVG visuals — one per flashcard */
const VisualBasket = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 140">
    <rect x="40" y="40" width="120" height="80" rx="14" fill="#fff" stroke="var(--teal-700)" strokeWidth="2"/>
    <text x="100" y="32" textAnchor="middle" fontSize="12" fill="var(--teal-700)" fontWeight="700">1 ETF</text>
    {[0,1,2,3,4,5,6,7].map(i => (
      <circle key={i} cx={56 + (i % 4) * 24} cy={62 + Math.floor(i / 4) * 28} r="9"
              fill={["var(--teal-300)","var(--blue-500)","var(--purple-500)","var(--teal-700)"][i % 4]}/>
    ))}
  </svg>
);
const VisualDiversification = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 140">
    <text x="50" y="20" textAnchor="middle" fontSize="10" fill="var(--ink-soft)" fontWeight="600">1 stock</text>
    <text x="150" y="20" textAnchor="middle" fontSize="10" fill="var(--ink-soft)" fontWeight="600">1 ETF</text>
    <rect x="42" y="34" width="16" height="80" rx="3" fill="var(--blue-500)"/>
    {[0,1,2,3,4].map(i => (
      <rect key={i} x={120 + i * 12} y={34 + i * 4} width="8" height={80 - i * 4} rx="2"
            fill={["var(--teal-300)","var(--blue-500)","var(--purple-500)","var(--teal-700)","var(--teal-500)"][i]}/>
    ))}
    <line x1="20" y1="120" x2="180" y2="120" stroke="var(--ink-mute)" strokeWidth="1"/>
  </svg>
);
const VisualExchange = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 140">
    <path d="M10 110 Q40 80 60 90 T110 60 T160 40 T190 30"
          fill="none" stroke="var(--teal-300)" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="60" cy="90" r="4" fill="var(--teal-700)"/>
    <circle cx="110" cy="60" r="4" fill="var(--teal-700)"/>
    <circle cx="160" cy="40" r="4" fill="var(--teal-700)"/>
    <text x="100" y="130" textAnchor="middle" fontSize="11" fill="var(--ink-soft)" fontWeight="600">Trade anytime, like a stock</text>
  </svg>
);
const VisualFees = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 140">
    <text x="50" y="22" textAnchor="middle" fontSize="11" fill="var(--ink-soft)" fontWeight="600">ETF</text>
    <text x="150" y="22" textAnchor="middle" fontSize="11" fill="var(--ink-soft)" fontWeight="600">Mutual Fund</text>
    <rect x="34" y="100" width="32" height="14" rx="3" fill="var(--teal-300)"/>
    <text x="50" y="130" textAnchor="middle" fontSize="14" fill="var(--teal-700)" fontWeight="700">0.05%</text>
    <rect x="134" y="44" width="32" height="70" rx="3" fill="var(--blue-500)"/>
    <text x="150" y="130" textAnchor="middle" fontSize="14" fill="var(--blue-700)" fontWeight="700">1.20%</text>
  </svg>
);
const VisualPortfolio = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 140">
    <circle cx="100" cy="70" r="44" fill="none" stroke="var(--teal-50)" strokeWidth="18"/>
    <circle cx="100" cy="70" r="44" fill="none" stroke="var(--teal-300)" strokeWidth="18" strokeDasharray="80 200"
            strokeLinecap="round" transform="rotate(-90 100 70)"/>
    <circle cx="100" cy="70" r="44" fill="none" stroke="var(--blue-500)" strokeWidth="18" strokeDasharray="60 200"
            strokeLinecap="round" transform="rotate(20 100 70)"/>
    <circle cx="100" cy="70" r="44" fill="none" stroke="var(--purple-500)" strokeWidth="18" strokeDasharray="40 200"
            strokeLinecap="round" transform="rotate(90 100 70)"/>
    <text x="100" y="75" textAnchor="middle" fontSize="11" fill="var(--navy-900)" fontWeight="700">A starter mix</text>
  </svg>
);
const VisualLongGame = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 140">
    <path d="M10 115 L40 108 L70 95 L100 78 L130 58 L160 38 L190 22"
          fill="none" stroke="var(--teal-300)" strokeWidth="3" strokeLinecap="round"/>
    <text x="20" y="135" fontSize="10" fill="var(--ink-soft)" fontWeight="600">Year 1</text>
    <text x="180" y="135" fontSize="10" fill="var(--ink-soft)" fontWeight="600" textAnchor="end">Year 10</text>
    <circle cx="190" cy="22" r="5" fill="var(--teal-700)"/>
  </svg>
);
const VISUALS = {
  basket: VisualBasket,
  diversification: VisualDiversification,
  exchange: VisualExchange,
  fees: VisualFees,
  portfolio: VisualPortfolio,
  "long-game": VisualLongGame,
};

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
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
      <TopRow onBack={prev}
              leftExtra={<RoundIconBtn aria-label="Settings"><IconSettings size={22}/></RoundIconBtn>}
              right={
                <div style={{
                  background: "#fff", padding: "10px 14px", borderRadius: 999,
                  display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 2px 6px rgba(0,0,0,.05)",
                }}>
                  <IconDollar size={18} color="var(--navy-900)"/>
                  <span style={{ fontWeight: 700, fontSize: 16, color: "var(--navy-900)" }}>{1000 + idx * 5}</span>
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
            background: "var(--teal-50)", borderRadius: 16, height: 180,
            position: "relative", overflow: "hidden", padding: 12,
          }}>
            <FlashIllustration card={card}/>
          </div>
          <h2 style={{ margin: "16px 0 8px", fontSize: 20, fontWeight: 700, color: "var(--navy-900)" }}>{card.title}</h2>
          <p style={{ margin: 0, fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.5 }}>{card.body}</p>
          {card.sources?.length > 0 && (
            <div style={{
              marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--line)",
              fontSize: 11, color: "var(--ink-mute)", lineHeight: 1.4,
            }}>
              <span style={{ fontWeight: 600, marginRight: 4 }}>Source:</span>
              {card.sources.map(s => s.name).join(" · ")}
            </div>
          )}
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

const FlashIllustration = ({ card }) => {
  const Visual = VISUALS[card.visual];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
      {Visual
        ? <Visual/>
        : <img src="assets/etf-learning.svg" alt="ETF illustration"
               style={{ width: "100%", height: "100%", objectFit: "contain" }}/>}
    </div>
  );
};

/* ───── Screen 7 — Congrats ───── */

const CongratsScreen = ({ go, onChangeTab, scenarioName = "ETF Market Drop" }) => (
  <div style={{ position: "absolute", inset: 0, background: "var(--bg-soft)", overflow: "hidden" }}>
    <div style={{ paddingTop: 56, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginTop: 18 }}>
        <EmotionMascot color="var(--teal-300)" ringColors={["var(--teal-100)", "var(--teal-300)", "var(--teal-700)"]} size={300}/>
      </div>
      <h1 style={{ margin: "8px 0 0", color: "var(--teal-500)", fontSize: 38, fontWeight: 700, letterSpacing: -0.4 }}>Congratulation !</h1>
      <p style={{ margin: "10px 26px 0", textAlign: "center", fontSize: 16, color: "var(--ink-soft)" }}>
        You completed your {scenarioName} scenario.
      </p>
      <div style={{ marginTop: 22, fontSize: 36, fontWeight: 700, color: "var(--navy-900)" }}>+20 Points</div>

      <div style={{ marginTop: 28, textAlign: "center", color: "var(--navy-900)" }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>Ready for the next step?</div>
        <button style={{
          marginTop: 10, background: "var(--blue-50)", border: 0, padding: "10px 14px 10px 22px",
          borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 14, cursor: "pointer",
          fontFamily: "inherit",
        }}>
          <span style={{ fontWeight: 500 }}>Build your investment plans</span>
          <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center" }}>
            <IconChevronRight size={14}/>
          </span>
        </button>
      </div>
    </div>

    <div style={{ position: "absolute", left: 16, right: 16, bottom: 100, display: "flex", gap: 10 }}>
      <SecondaryButton onClick={() => go("learn-home")} style={{ flex: 1 }}>Back to Learn</SecondaryButton>
      <PrimaryButton onClick={() => go("learn-lesson")} style={{ flex: 1 }}>Next Lesson</PrimaryButton>
    </div>
    <BottomNav active="learn" onChange={onChangeTab}/>
  </div>
);

Object.assign(window, {
  TOPICS, LESSONS, LearningHomeScreen, TopicSelectionScreen, LearningJourneyScreen,
  LessonScreen, CongratsScreen, FLASH_CARDS, SavedCoursesScreen, TOPIC_SOURCES,
});
