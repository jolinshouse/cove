/* app.jsx — top-level router + entry */

const App = () => {
  // Screen routing — each "screen" is a self-contained view inside the phone frame
  const [screen, setScreen] = useState("onboarding-loading");
  const [history, setHistory] = useState([]);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiColor, setAiColor] = useState("var(--teal-300)");

  // Cross-screen state
  const [mode, setMode] = useState("learning"); // learning | practice
  const [selectedTopics, setSelectedTopics] = useState(["etfs"]);
  const [openCatId, setOpenCatId] = useState("groceries");
  const [completedLessons, setCompletedLessons] = useState([]);
  const [mindMode, setMindMode] = useState("green");
  const [savedCourses, setSavedCourses] = useState(["basics"]);

  // Onboarding
  const [onboardingAnswers, setOnboardingAnswers] = useState({ goal: null, literacy: null, tone: null });
  const [syncedAccounts, setSyncedAccounts] = useState([]);
  const setAnswer = useCallback((qid, optId) => {
    setOnboardingAnswers(a => ({ ...a, [qid]: optId }));
  }, []);
  const toggleAccountSynced = useCallback((accId) => {
    setSyncedAccounts(prev => prev.includes(accId) ? prev : [...prev, accId]);
  }, []);

  const toggleSaved = useCallback((topicId) => {
    setSavedCourses(prev => prev.includes(topicId)
      ? prev.filter(id => id !== topicId)
      : [...prev, topicId]);
  }, []);

  const go = useCallback((target) => {
    setHistory(h => [...h, screen]);
    setScreen(target);
  }, [screen]);

  const openCategory = useCallback((catId) => {
    setOpenCatId(catId);
    go("logger");
  }, [go]);

  const openHistory = useCallback((catId) => {
    setOpenCatId(catId);
    go("spending-history");
  }, [go]);

  // Bottom-tab navigation: jump to canonical home of the section
  const onChangeTab = useCallback((tab) => {
    if (tab === "dashboard") setScreen("dashboard");
    else if (tab === "learn") {
      setMode("learning");
      setScreen("learn-home");
    } else if (tab === "plan") {
      setScreen("plan");
    } else if (tab === "mindspace") setScreen("mind-home");
  }, []);

  const completeLesson = useCallback(() => {
    setCompletedLessons(prev => prev.includes("l1") ? prev : [...prev, "l1"]);
  }, []);

  const openAI = (color = "var(--teal-300)") => { setAiColor(color); setAiOpen(true); };

  // Pick which screen component
  let screenEl = null;
  const transitionKey = screen;

  switch (screen) {
    // Onboarding
    case "onboarding-loading":
      screenEl = <OnboardingLoadingScreen go={go}/>;
      break;
    case "onboarding-q1":
    case "onboarding-q2":
    case "onboarding-q3":
      screenEl = <OnboardingQuestionScreen
        go={go}
        step={Number(screen.slice(-1))}
        answers={onboardingAnswers}
        setAnswer={setAnswer}/>;
      break;
    case "onboarding-sync":
      screenEl = <OnboardingSyncScreen
        go={go}
        syncedAccounts={syncedAccounts}
        toggleSynced={toggleAccountSynced}/>;
      break;

    // Plan tab
    case "plan":
      screenEl = <PlanScreen go={go} onChangeTab={onChangeTab}/>;
      break;

    case "dashboard":
      screenEl = <DashboardScreen go={go} onChangeTab={onChangeTab}/>;
      break;
    case "spending":
      screenEl = <SpendingOverviewScreen go={go} onChangeTab={onChangeTab} openCategory={openCategory} openHistory={openHistory}/>;
      break;
    case "logger":
      screenEl = <BudgetLoggerScreen go={go} onChangeTab={onChangeTab} categoryId={openCatId}/>;
      break;
    case "category-picker":
      screenEl = <CategoryPickerScreen go={go} onChangeTab={onChangeTab} openCategory={openCategory}/>;
      break;
    case "spending-history":
      screenEl = <SpendingHistoryScreen go={go} onChangeTab={onChangeTab} openCategory={openCategory} categoryId={openCatId}/>;
      break;

    // Learning
    case "learn-home":
      screenEl = <LearningHomeScreen go={(t) => {
        if (t === "practice-path") { setMode("practice"); }
        go(t === "practice-path" ? "practice-path" : t);
      }} onChangeTab={onChangeTab} mode={mode} setMode={setMode}
        savedCount={savedCourses.length}
        completedCount={completedLessons.length}/>;
      break;
    case "learn-topics":
      screenEl = <TopicSelectionScreen
        go={go} onChangeTab={onChangeTab}
        selected={selectedTopics} setSelected={setSelectedTopics}
        savedCourses={savedCourses} toggleSaved={toggleSaved}
        openAI={() => openAI("var(--teal-300)")}
        searchActive={false}
      />;
      break;
    case "saved-courses":
      screenEl = <SavedCoursesScreen
        go={go} onChangeTab={onChangeTab}
        savedCourses={savedCourses} toggleSaved={toggleSaved}/>;
      break;
    case "learn-journey":
    case "learn-progress":
      screenEl = <LearningJourneyScreen
        go={go} onChangeTab={onChangeTab}
        openAI={() => openAI("var(--teal-300)")}
        completed={screen === "learn-progress" ? ["l1"] : completedLessons}
      />;
      break;
    case "learn-lesson":
      screenEl = <LessonScreen go={go} onChangeTab={onChangeTab}
                              openAI={() => openAI("var(--teal-300)")}
                              onComplete={completeLesson}/>;
      break;
    case "learn-congrats":
      screenEl = <CongratsScreen go={go} onChangeTab={onChangeTab} scenarioName="What is an ETF"/>;
      break;

    // Practice
    case "practice-path":
      screenEl = <ChoosePathScreen go={go} onChangeTab={onChangeTab}
                                   openAI={() => openAI("var(--teal-300)")}/>;
      break;
    case "practice-budget":
      screenEl = <BudgetPlanScreen go={go} onChangeTab={onChangeTab}/>;
      break;
    case "practice-sim":
      screenEl = <SimulationScreen go={go} onChangeTab={onChangeTab}
                                   openAI={() => openAI("var(--teal-300)")}/>;
      break;
    case "practice-congrats":
      screenEl = <CongratsScreen go={(t) => go(t === "learn-progress" ? "practice-path" : t)}
                                 onChangeTab={onChangeTab} scenarioName="ETF Market Drop"/>;
      break;

    // Mindspace
    case "mind-home":
      screenEl = <MindspaceHomeScreen go={go} onChangeTab={onChangeTab}/>;
      break;
    case "mind-checkin":
      screenEl = <CheckInScreen go={go} onChangeTab={onChangeTab} setMode={setMindMode}/>;
      break;
    case "mind-red":
      screenEl = <ModeScreen go={go} onChangeTab={onChangeTab} mode="red"
                             openAI={() => openAI("rgb(180, 30, 30)")}/>;
      break;
    case "mind-green":
      screenEl = <ModeScreen go={go} onChangeTab={onChangeTab} mode="green"
                             openAI={() => openAI("var(--teal-700)")}/>;
      break;
    case "mind-blue":
      screenEl = <ModeScreen go={go} onChangeTab={onChangeTab} mode="blue"
                             openAI={() => openAI("var(--blue-700)")}/>;
      break;
    case "mind-purple":
      screenEl = <ModeScreen go={go} onChangeTab={onChangeTab} mode="purple"
                             openAI={() => openAI("var(--purple-700)")}/>;
      break;
    case "mind-yellow":
      screenEl = <ModeScreen go={go} onChangeTab={onChangeTab} mode="yellow"
                             openAI={() => openAI("rgb(180, 130, 20)")}/>;
      break;

    default:
      screenEl = <DashboardScreen go={go} onChangeTab={onChangeTab}/>;
  }

  return (
    <PhoneFrame>
      <div key={transitionKey} className="screen-anim-enter screen-anim-enter-active" style={{ position: "absolute", inset: 0 }}>
        {screenEl}
      </div>
      <AIOverlay open={aiOpen} onClose={() => setAiOpen(false)} color={aiColor}/>
    </PhoneFrame>
  );
};

ReactDOM.createRoot(document.getElementById("app-stage")).render(<App/>);
