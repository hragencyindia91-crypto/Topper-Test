"use client";

import { supabase } from "@/lib/supabase/client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const ADMIN_EMAIL = "hrpramodnagar@gmail.com";

const defaultSubjects = [
  "राजस्थान इतिहास",
  "राजस्थान भूगोल",
  "राजस्थान कला एवं संस्कृति",
  "राजस्थान राजव्यवस्था",
  "राजस्थान अर्थव्यवस्था",
  "राजस्थान सामान्य ज्ञान",
  "हिंदी",
  "गणित",
  "कंप्यूटर",
  "सामान्य विज्ञान",
  "रीजनिंग",
  "करंट अफेयर्स",
];

const subjectIcons: Record<string, string> = {
  "राजस्थान इतिहास": "🏰",
  "राजस्थान भूगोल": "🌍",
  "राजस्थान कला एवं संस्कृति": "🎨",
  "राजस्थान राजव्यवस्था": "⚖️",
  "राजस्थान अर्थव्यवस्था": "📊",
  "राजस्थान सामान्य ज्ञान": "📚",
  "हिंदी": "✍️",
  "गणित": "➗",
  "कंप्यूटर": "💻",
  "सामान्य विज्ञान": "🔬",
  "रीजनिंग": "🧠",
  "करंट अफेयर्स": "📰",
};

const defaultTopics: Record<string, string[]> = {
  "राजस्थान इतिहास": ["प्राचीन इतिहास", "मध्यकालीन इतिहास", "आधुनिक इतिहास"],
  "राजस्थान भूगोल": ["भौतिक स्वरूप", "नदियाँ", "जलवायु"],
  "राजस्थान कला एवं संस्कृति": ["लोक देवता", "लोक नृत्य", "मेले एवं त्योहार"],
  "राजस्थान राजव्यवस्था": ["राज्यपाल", "मुख्यमंत्री", "विधानसभा"],
  "राजस्थान अर्थव्यवस्था": ["कृषि", "उद्योग", "बजट"],
  "राजस्थान सामान्य ज्ञान": ["प्रमुख तथ्य", "जिले", "प्रमुख संस्थान"],
  "हिंदी": ["संधि", "समास", "व्याकरण"],
  "गणित": ["प्रतिशत", "लाभ एवं हानि", "औसत"],
  "कंप्यूटर": ["कंप्यूटर परिचय", "हार्डवेयर", "सॉफ्टवेयर"],
  "सामान्य विज्ञान": ["भौतिक विज्ञान", "रसायन विज्ञान", "जीव विज्ञान"],
  "रीजनिंग": ["श्रृंखला", "कोडिंग", "दिशा ज्ञान"],
  "करंट अफेयर्स": ["राष्ट्रीय", "अंतरराष्ट्रीय", "राजस्थान"],
};

type Question = {
  id: number;
  subject: string;
  topic: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export default function Home() {
  const [subjects, setSubjects] = useState(defaultSubjects);
  const [topics, setTopics] = useState(defaultTopics);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loaded, setLoaded] = useState(false);
const [notifications, setNotifications] = useState<any[]>([]);
const [showNotifications, setShowNotifications] = useState(false);
const [adminNotificationTitle, setAdminNotificationTitle] = useState("");
const [adminNotificationMessage, setAdminNotificationMessage] = useState("");
const [adminNotificationAudience, setAdminNotificationAudience] = useState("public");
const [adminNotificationStudentId, setAdminNotificationStudentId] = useState("");
const [adminNotificationStudents, setAdminNotificationStudents] = useState<any[]>([]);
const [adminNotificationLoading, setAdminNotificationLoading] = useState(false);
  const [page, setPage] = useState("home");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [studentMode, setStudentMode] = useState<"login" | "signup">("login");
  const [studentProfile, setStudentProfile] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
const [answers, setAnswers] = useState<Record<number, number>>({});
const [currentQuestion, setCurrentQuestion] = useState(0);
const [timeLeft, setTimeLeft] = useState(30 * 60);
const [newTopicTime, setNewTopicTime] = useState(30);
const [topicTimes, setTopicTimes] = useState<Record<string, number>>({});
// यहीं startTest, submitTest और shareChallenge के तीनों functions रखो।
const startTest = (topic: string) => {
  const matching = questions.filter(
    (q) => q.subject === selectedSubject && q.topic === topic
  );

  if (matching.length === 0) {
    alert("इस टॉपिक में अभी प्रश्न उपलब्ध नहीं हैं।");
    setLoginOpen(false);
    return;
  }

  setSelectedTopic(topic);
  setTestQuestions(matching);
  setAnswers({});
  setCurrentQuestion(0);
  setLoginOpen(false);
  setPage("test");
};

const submitTest = () => {
  if (window.confirm("क्या आप टेस्ट Submit करना चाहते हैं?")) {
    setPage("result");
  }
};

const shareChallenge = () => {
  const correct = testQuestions.filter(
    (q) => answers[q.id] === q.correct
  ).length;

  const total = testQuestions.length;
  const score = total
    ? Math.round((correct / total) * 100)
    : 0;

  const message =
    `🏆 TOPPER TEST CHALLENGE\n` +
    `मैंने ${selectedTopic} टेस्ट में ${score}% स्कोर किया है (${correct}/${total})।\n` +
    `क्या तुम मुझसे ज्यादा स्कोर कर सकते हो?\n` +
    window.location.href;

  window.open(
    `https://wa.me/?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};
useEffect(() => {
  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, username, role, student_id")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Profile Error:", error.message);
      return;
    }

    setStudentProfile(data);
  };

  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();

    if (data.session?.user) {
      loadProfile(data.session.user.id);
    }
  };

  checkSession();

  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setStudentProfile(null);
      }
    }
  );

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  useEffect(() => {
  const loadNotifications = async () => {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Notification Error:", error.message);
      return;
    }

    setNotifications(data || []);
  };

  loadNotifications();
}, []);
useEffect(() => {
  const loadNotificationStudents = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, username, student_id");

    if (error) {
      console.error("Students Error:", error.message);
      return;
    }

    setAdminNotificationStudents(data || []);
  };

  loadNotificationStudents();
}, []);
  const [newSubject, setNewSubject] = useState("");
  const [newTopic, setNewTopic] = useState("");

  const [questionText, setQuestionText] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  useEffect(() => {
  const checkAdminSession = async () => {
    const { data } = await supabase.auth.getSession();

    const isAdmin =
      data.session?.user?.email?.toLowerCase() ===
      ADMIN_EMAIL.toLowerCase();

    setAdminLoggedIn(isAdmin);

    if (isAdmin) {
      setPage("admin");
    }
  };

  checkAdminSession();

  const { data: authListener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      const isAdmin =
        session?.user?.email?.toLowerCase() ===
        ADMIN_EMAIL.toLowerCase();

      setAdminLoggedIn(isAdmin);
    }
  );

  return () => {
    authListener.subscription.unsubscribe();
  };
}, []);
  const [correct, setCorrect] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const [filterSubject, setFilterSubject] = useState("");
  const [filterTopic, setFilterTopic] = useState("");

  useEffect(() => {
    try {
      const savedSubjects = localStorage.getItem("topper_subjects");
      const savedTopics = localStorage.getItem("topper_topics");
      const savedTopicTimes = localStorage.getItem("topper_topic_times");
      const savedQuestions = localStorage.getItem("topper_questions");

      if (savedSubjects) setSubjects(JSON.parse(savedSubjects));
      if (savedTopics) setTopics(JSON.parse(savedTopics));
      if (savedTopicTimes) setTopicTimes(JSON.parse(savedTopicTimes));
      if (savedQuestions) setQuestions(JSON.parse(savedQuestions));
    } catch {
      console.log("Saved data could not be loaded");
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
  if (page !== "test") return;

  if (timeLeft <= 0) {
    setPage("result");
    return;
  }

  const timer = setTimeout(() => {
    setTimeLeft((previous) => previous - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [page, timeLeft]);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("topper_subjects", JSON.stringify(subjects));
    localStorage.setItem("topper_topics", JSON.stringify(topics));
    localStorage.setItem("topper_topic_times", JSON.stringify(topicTimes));
    localStorage.setItem("topper_questions", JSON.stringify(questions));
  }, [subjects, topics, questions, topicTimes, loaded]);
async function logoutAdmin() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert("Logout नहीं हुआ: " + error.message);
    return;
  }

  setAdminLoggedIn(false);
  setAdminPassword("");
  setPage("home");
  alert("Admin Logout Successful!");
}
  function openAdmin() {
    if (adminLoggedIn) {
      setPage("admin");
    } else {
      setPage("adminLogin");
    }
  }
useEffect(() => {
  const handleAdminShortcut = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
      e.preventDefault();
      setPage("adminLogin");
    }
  };

  window.addEventListener("keydown", handleAdminShortcut);

  return () => {
    window.removeEventListener("keydown", handleAdminShortcut);
  };
}, []);
useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  if (params.get("admin") === "login") {
    setPage("adminLogin");
  }
}, []);
  const loginAdmin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: adminEmail.trim(),
    password: adminPassword,
  });

  if (error) {
    alert("Login Failed: " + error.message);
    return;
  }

  if (data.user?.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    await supabase.auth.signOut();
    alert("यह अकाउंट Admin के लिए अधिकृत नहीं है।");
    return;
  }

  setAdminLoggedIn(true);
  setPage("admin");
  setAdminPassword("");
  alert("Admin Login Successful!");
};

  function addSubject() {
    const name = newSubject.trim();
    if (!name) return alert("विषय का नाम लिखें");
    if (subjects.includes(name)) return alert("यह विषय पहले से मौजूद है");

    setSubjects([...subjects, name]);
    setTopics({ ...topics, [name]: [] });
    setNewSubject("");
  }

  function deleteSubject(name: string) {
    if (!confirm(`क्या "${name}" विषय हटाना चाहते हैं?`)) return;

    setSubjects(subjects.filter((s) => s !== name));
    const updated = { ...topics };
    delete updated[name];
    setTopics(updated);
    setQuestions(questions.filter((q) => q.subject !== name));

    if (selectedSubject === name) setSelectedSubject("");
  }

  function editSubject(oldName: string) {
    const newName = prompt("विषय का नया नाम लिखें", oldName)?.trim();
    if (!newName || newName === oldName) return;
    if (subjects.includes(newName)) return alert("यह नाम पहले से मौजूद है");

    setSubjects(subjects.map((s) => s === oldName ? newName : s));

    const updated = { ...topics };
    updated[newName] = updated[oldName] || [];
    delete updated[oldName];
    setTopics(updated);

    setQuestions(questions.map((q) =>
      q.subject === oldName ? { ...q, subject: newName } : q
    ));

    if (selectedSubject === oldName) setSelectedSubject(newName);
  }

 function addTopic() {
  const name = newTopic.trim();

  if (!selectedSubject) return alert("पहले विषय चुनें");
  if (!name) return alert("टॉपिक का नाम लिखें");

  const current = topics[selectedSubject] || [];
  if (current.includes(name)) return alert("यह टॉपिक पहले से मौजूद है");

  setTopics({ ...topics, [selectedSubject]: [...current, name] });

  const key = `${selectedSubject}::${name}`;
  setTopicTimes({ ...topicTimes, [key]: newTopicTime });

  setNewTopic("");
  setNewTopicTime(30);
}
  function deleteTopic(name: string) {
    if (!confirm(`क्या "${name}" टॉपिक हटाना चाहते हैं?`)) return;

    setTopics({
      ...topics,
      [selectedSubject]: (topics[selectedSubject] || []).filter((t) => t !== name),
    });

    setQuestions(questions.filter(
      (q) => !(q.subject === selectedSubject && q.topic === name)
    ));
  }

  function editTopic(oldName: string) {
    const newName = prompt("टॉपिक का नया नाम लिखें", oldName)?.trim();
    if (!newName || newName === oldName) return;

    const current = topics[selectedSubject] || [];
    if (current.includes(newName)) return alert("यह टॉपिक पहले से मौजूद है");

    setTopics({
      ...topics,
      [selectedSubject]: current.map((t) => t === oldName ? newName : t),
    });

    setQuestions(questions.map((q) =>
      q.subject === selectedSubject && q.topic === oldName
        ? { ...q, topic: newName }
        : q
    ));
  }

  function clearQuestionForm() {
    setQuestionText("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrect(0);
    setExplanation("");
    setEditingId(null);
  }

  function saveQuestion() {
    if (!selectedSubject) return alert("विषय चुनें");
    if (!selectedTopic) return alert("टॉपिक चुनें");
    if (!questionText.trim()) return alert("प्रश्न लिखें");

    const options = [option1.trim(), option2.trim(), option3.trim(), option4.trim()];

    if (options.some((o) => !o)) return alert("चारों विकल्प भरें");
    if (!explanation.trim()) return alert("प्रश्न की व्याख्या लिखें");

    const newQuestion: Question = {
      id: editingId ?? Date.now(),
      subject: selectedSubject,
      topic: selectedTopic,
      question: questionText.trim(),
      options,
      correct,
      explanation: explanation.trim(),
    };

    if (editingId !== null) {
      setQuestions(questions.map((q) => q.id === editingId ? newQuestion : q));
      alert("प्रश्न अपडेट हो गया");
    } else {
      setQuestions([...questions, newQuestion]);
      alert("प्रश्न सेव हो गया");
    }

    clearQuestionForm();
  }

  function editQuestion(q: Question) {
    setSelectedSubject(q.subject);
    setSelectedTopic(q.topic);
    setQuestionText(q.question);
    setOption1(q.options[0]);
    setOption2(q.options[1]);
    setOption3(q.options[2]);
    setOption4(q.options[3]);
    setCorrect(q.correct);
    setExplanation(q.explanation);
    setEditingId(q.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteQuestion(id: number) {
    if (!confirm("क्या यह प्रश्न हटाना चाहते हैं?")) return;
    setQuestions(questions.filter((q) => q.id !== id));
  }

  
function downloadExcelTemplate() {
  const worksheet = XLSX.utils.aoa_to_sheet([
    ["प्रश्न", "विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D", "सही उत्तर", "व्याख्या"],
  ]);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "प्रश्न");
  XLSX.writeFile(workbook, "TOPPER_TEST_प्रश्न_टेम्पलेट.xlsx");
}

async function importExcel(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!selectedSubject || !selectedTopic) {
    alert("पहले Subject और Topic चुनें।");
    e.target.value = "";
    return;
  }

  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    if (!sheet) {
      alert("Excel में कोई शीट नहीं मिली।");
      return;
    }

    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
      defval: "",
    });

    const imported: Question[] = [];
    const errors: string[] = [];

    const answerMap: Record<string, number> = {
      A: 0, B: 1, C: 2, D: 3,
      "1": 0, "2": 1, "3": 2, "4": 3,
    };

    rows.forEach((row, index) => {
      const question = String(row["प्रश्न"] ?? "").trim();

      const options = [
        String(row["विकल्प A"] ?? row["विकल्प 1"] ?? "").trim(),
        String(row["विकल्प B"] ?? row["विकल्प 2"] ?? "").trim(),
        String(row["विकल्प C"] ?? row["विकल्प 3"] ?? "").trim(),
        String(row["विकल्प D"] ?? row["विकल्प 4"] ?? "").trim(),
      ];

      const answerText = String(row["सही उत्तर"] ?? "").trim().toUpperCase();
      const explanation = String(row["व्याख्या"] ?? "").trim();

      if (!question && options.every((o) => !o) && !explanation) return;

      if (!question || options.some((o) => !o) || !explanation) {
        errors.push(`पंक्ति ${index + 2}: प्रश्न, चारों विकल्प और व्याख्या भरें`);
        return;
      }

      const correctAnswer = answerMap[answerText];

      if (correctAnswer === undefined) {
        errors.push(`पंक्ति ${index + 2}: सही उत्तर A/B/C/D या 1/2/3/4 होना चाहिए`);
        return;
      }

      imported.push({
        id: Date.now() + index,
        subject: selectedSubject,
        topic: selectedTopic,
        question,
        options,
        correct: correctAnswer,
        explanation,
      });
    });

    if (imported.length > 0) {
      setQuestions((previous) => [...previous, ...imported]);
    }

    alert(
      `${imported.length} प्रश्न सफलतापूर्वक जोड़े गए।` +
      (errors.length
        ? "\n\nगलत पंक्तियाँ:\n" + errors.slice(0, 8).join("\n")
        : "")
    );
  } catch {
    alert("फाइल पढ़ने में समस्या आई। सही Excel या CSV फाइल चुनें।");
  } finally {
    e.target.value = "";
  }
}


  const filteredQuestions = questions.filter((q) =>
    (!filterSubject || q.subject === filterSubject) &&
    (!filterTopic || q.topic === filterTopic)
  );

  const filteredSubjects = subjects.filter((subject) =>
    subject.toLowerCase().includes(search.toLowerCase())
  );

  const totalTopics = Object.values(topics).reduce(
    (sum, arr) => sum + arr.length, 0
  );

  const buttonClass = "px-4 py-2 rounded-lg font-semibold transition";

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">

      <header className="bg-slate-950 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-5 py-5 flex flex-wrap justify-between items-center gap-4">
          <button onClick={() => setPage("home")} className="text-left">
            <h1 className="text-3xl font-black text-yellow-400">TOPPER TEST</h1>
            <p className="text-sm text-slate-300">
              Rajasthan Competitive Exam Practice
            </p>
          </button>

<div className="flex flex-wrap gap-2">

  <button
    onClick={() => setPage("home")}
    className={`${buttonClass} bg-blue-600`}
  >
    Home
  </button>

  <button
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative bg-slate-700 text-white px-4 py-2 rounded-lg"
  >
    🔔
    {notifications.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
        {notifications.length}
      </span>
    )}
  </button>

  {studentProfile ? (
  <div className="bg-slate-800 rounded-xl p-3 text-sm text-white">
    <p className="font-bold text-yellow-400">
      {studentProfile.name || "Student"}
    </p>
    <p>Username: {studentProfile.username || "Not set"}</p>
   <p className="text-slate-300">
  Student ID: {studentProfile.student_id}
</p>
    <button
      onClick={async () => {
        await supabase.auth.signOut();
        setStudentProfile(null);
        setLoginOpen(false);
        setPage("home");
      }}
      className="mt-2 bg-red-600 px-3 py-1 rounded-lg"
    >
      Logout
    </button>
  </div>
) : (
  <button
    onClick={() => setLoginOpen(true)}
    className={`${buttonClass} bg-slate-700 text-white`}
  >
    Login / Register
  </button>
)}

            {adminLoggedIn && (
  <button
    onClick={openAdmin}
    className={`${buttonClass} bg-yellow-400 text-black`}
  >
    Admin Panel
  </button>
)}
          </div>
        </div>
      </header>
      {showNotifications && (
        <div className="max-w-7xl mx-auto px-5 py-4">
          <div className="bg-white border rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-xl">Notifications</h2>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-red-600 font-bold"
              >
                बंद करें ✕
              </button>
            </div>

            {notifications.length === 0 ? (
              <p className="text-gray-500">अभी कोई Notification नहीं है।</p>
            ) : (
              notifications.map((item) => (
                <div key={item.id} className="border-b py-3">
                  <h3 className="font-bold text-blue-950">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(item.created_at).toLocaleString("hi-IN")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      (
        <></>
      {page === "home" && (
        <>
          <section className="bg-gradient-to-r from-blue-950 to-indigo-700 text-white py-16 px-5">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                अपनी तैयारी को दें नई उड़ान!
              </h2>
              <p className="text-lg text-blue-100 mb-7">
                राजस्थान प्रतियोगी परीक्षाओं की तैयारी अब Online Test के साथ।
              </p>
              <button
                onClick={() => document.getElementById("subjects")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-yellow-400 text-black font-bold px-7 py-3 rounded-xl hover:bg-yellow-300"
              >
                Start Practice →
              </button>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-5 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ["📚", `${subjects.length}+`, "विषय"],
                ["📝", "1000+", "प्रश्न (लक्ष्य)"],
                ["🎯", "Mock Tests", "प्रैक्टिस"],
                ["🏆", "Analysis", "रिजल्ट"],
              ].map((item) => (
                <div key={item[1]} className="bg-white rounded-2xl p-5 shadow-sm text-center">
                  <div className="text-3xl">{item[0]}</div>
                  <h3 className="text-xl font-bold mt-2">{item[1]}</h3>
                  <p className="text-slate-500">{item[2]}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="subjects" className="max-w-7xl mx-auto px-5 py-8">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold">विषय चुनें</h2>
                <p className="text-slate-500 mt-1">अपनी तैयारी शुरू करें</p>
              </div>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="विषय खोजें..."
                className="border rounded-xl px-4 py-3 w-full md:w-64 outline-blue-500"
              />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSubjects.map((subject) => (
                <div key={subject} className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-lg transition">
                  <div className="text-4xl mb-4">{subjectIcons[subject] || "📚"}</div>
                  <h3 className="text-xl font-bold">{subject}</h3>
                  <p className="text-slate-500 mt-2">
                    {(topics[subject] || []).length} Topics
                  </p>
                  <button
                    onClick={() => {
                      setSelectedSubject(subject);
                      setPage("topics");
                    }}
                    className="mt-5 w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800"
                  >
                    Explore Subject →
                  </button>
                </div>
              ))}
            </div>

            {filteredSubjects.length === 0 && (
              <p className="text-center py-10 text-slate-500">
                कोई विषय नहीं मिला।
              </p>
            )}
          </section>

          <section className="bg-white border-t py-12">
            <div className="max-w-7xl mx-auto px-5">
              <h2 className="text-3xl font-bold mb-6">हमारी सुविधाएँ</h2>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  ["📝", "Daily Quiz", "रोज नए प्रश्नों का अभ्यास"],
                  ["🎯", "Mock Test", "परीक्षा की तरह टेस्ट"],
                  ["📊", "Solutions & Analysis", "हर प्रश्न का उत्तर और रिजल्ट विश्लेषण"],
                ].map((feature) => (
                  <div key={feature[1]} className="bg-slate-50 border rounded-xl p-6">
                    <div className="text-3xl mb-3">{feature[0]}</div>
                    <h3 className="text-xl font-bold text-blue-950 mb-2">{feature[1]}</h3>
                    <p className="text-slate-600">{feature[2]}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-5 py-8">
            <div className="bg-blue-50 border rounded-2xl p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">
                Help & Support
              </h2>
              <p className="text-gray-600 mb-4">
                कोई समस्या है? हमारी Support टीम से संपर्क करें।
              </p>
              <a
                href="/support"
                className="inline-block bg-blue-950 text-white px-8 py-3 rounded-xl font-bold"
              >
                Student Support →
              </a>
            </div>
          </section>

        </>
      )}

      {page === "topics" && (
        <section className="max-w-5xl mx-auto px-4 py-8">
          <button onClick={() => setPage("home")} className="text-blue-700 font-semibold mb-5">
            ← सभी विषय
          </button>
          <h2 className="text-3xl font-bold mb-2">{subjectIcons[selectedSubject]} {selectedSubject}</h2>
          <p className="text-slate-500 mb-6">अपना टॉपिक चुनें और अभ्यास शुरू करें।</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(topics[selectedSubject] || []).map((topic) => (
              <button
                key={topic}
                onClick={() => {
  setSelectedTopic(topic);
  if (studentProfile) {
    startTest(topic);
  } else {
    setLoginOpen(true);
  }
}}
                className="bg-white border rounded-xl p-5 text-left font-semibold hover:border-blue-500 shadow-sm"
              >
                {topic} →
              </button>
            ))}
          </div>

          {(topics[selectedSubject] || []).length === 0 && (
            <p className="bg-white p-5 rounded-xl border">
              अभी इस विषय में टॉपिक नहीं जोड़े गए हैं।
            </p>
          )}
        </section>
      )}

      {page === "test" && (
  <div className="max-w-3xl mx-auto p-4">
    <h2 className="text-2xl font-bold mb-2">
      {selectedTopic}
    </h2>
<div className="bg-red-100 text-red-700 font-bold text-lg p-3 rounded-lg mb-4">
  समय शेष: {Math.floor(timeLeft / 60)}:
  {String(timeLeft % 60).padStart(2, "0")} मिनट
</div>
    <p className="mb-4">
      प्रश्न {currentQuestion + 1} / {testQuestions.length}
    </p>

    {testQuestions[currentQuestion] && (
      <div className="border rounded-xl p-4">
        <h3 className="text-lg font-bold mb-4">
          {testQuestions[currentQuestion].question}
        </h3>

        {testQuestions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() =>
              setAnswers((prev) => ({
                ...prev,
                [testQuestions[currentQuestion].id]: index,
              }))
            }
            className={`block w-full text-left border rounded-lg p-3 mb-2 ${
              answers[testQuestions[currentQuestion].id] === index
                ? "bg-blue-100 border-blue-500"
                : "bg-white"
            }`}
          >
            {String.fromCharCode(65 + index)}. {option}
          </button>
        ))}
      </div>
    )}

    <div className="flex justify-between gap-2 mt-4">
      <button
        className="border rounded-lg p-3"
        disabled={currentQuestion === 0}
        onClick={() => setCurrentQuestion((n) => n - 1)}
      >
        Previous
      </button>

      {currentQuestion < testQuestions.length - 1 ? (
        <button
          className="bg-blue-600 text-white rounded-lg p-3"
          onClick={() => setCurrentQuestion((n) => n + 1)}
        >
          Next
        </button>
      ) : (
        <button
          className="bg-green-600 text-white rounded-lg p-3"
          onClick={submitTest}
        >
          Submit Test
        </button>
      )}
    </div>
  </div>
)}

{page === "result" && (
  <div className="max-w-3xl mx-auto p-4">
    {(() => {
      const correct = testQuestions.filter(
        (q) => answers[q.id] === q.correct
      ).length;

      const wrong = testQuestions.filter(
        (q) => answers[q.id] !== undefined && answers[q.id] !== q.correct
      ).length;

      const skipped = testQuestions.length - correct - wrong;
      const score = testQuestions.length
        ? Math.round((correct / testQuestions.length) * 100)
        : 0;

      return (
        <>
          <h2 className="text-3xl font-bold text-center mb-4">
            🏆 आपका Result
          </h2>

          <div className="border rounded-xl p-5 text-center mb-5">
            <p className="text-gray-600">आपका स्कोर</p>
            <h1 className="text-5xl font-bold text-green-600">
              {score}%
            </h1>
            <p className="mt-2">
              {correct} सही / {testQuestions.length} प्रश्न
            </p>

            <div className="grid grid-cols-3 gap-2 mt-5">
              <div className="bg-green-100 p-3 rounded-lg">
                <b>{correct}</b>
                <p>सही</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <b>{wrong}</b>
                <p>गलत</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <b>{skipped}</b>
                <p>छोड़े</p>
              </div>
            </div>

            <button
              onClick={shareChallenge}
              className="w-full bg-green-600 text-white rounded-lg p-3 mt-5"
            >
              WhatsApp पर Challenge Share करें
            </button>
          </div>

          <h3 className="text-xl font-bold mb-3">प्रश्नों की जाँच</h3>

          {testQuestions.map((q, index) => (
            <div key={q.id} className="border rounded-lg p-3 mb-3">
              <b>{index + 1}. {q.question}</b>

              <p className="mt-2">
                आपका जवाब:{" "}
                {answers[q.id] === undefined
                  ? "नहीं दिया"
                  : q.options[answers[q.id]]}
              </p>

              <p className="text-green-700">
                सही जवाब: {q.options[q.correct]}
              </p>

              <p className="mt-2 text-gray-600">
                {q.explanation}
              </p>
            </div>
          ))}

          <button
            onClick={() => setPage("home")}
            className="w-full bg-blue-600 text-white rounded-lg p-3 mt-3"
          >
            Home पर जाएँ
          </button>
        </>
      );
    })()}
  </div>
)}
      {page === "adminLogin" && (
        <section className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white border rounded-2xl p-7 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
            <p className="text-slate-500 mb-5">केवल अधिकृत Admin के लिए</p>

            <label className="block font-semibold mb-2">Admin Email</label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="Admin Email"
              className="w-full border rounded-lg p-3 mb-4"
            />

            <label className="block font-semibold mb-2">Password</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Password"
              className="w-full border rounded-lg p-3 mb-5"
            />

            <button onClick={loginAdmin} className="w-full bg-blue-950 text-white p-3 rounded-lg font-bold">
              Login
            </button>
            <button onClick={() => setPage("home")} className="w-full mt-3 p-2 text-slate-600">
              ← Home
            </button>
          </div>
        </section>
      )}

{page === "adminLogin" && (
  <div className="max-w-md mx-auto mt-12 bg-white shadow-xl rounded-2xl p-6">
    <h2 className="text-2xl font-bold mb-5 text-center">
      Admin Login
    </h2>

    <input
      type="email"
      placeholder="Admin Email"
      value={adminEmail}
      onChange={(e) => setAdminEmail(e.target.value)}
      className="w-full border rounded-lg p-3 mb-3"
    />

    <input
      type="password"
      placeholder="Password"
      value={adminPassword}
      onChange={(e) => setAdminPassword(e.target.value)}
      className="w-full border rounded-lg p-3 mb-4"
    />

    <button
      onClick={loginAdmin}
      className="w-full bg-blue-950 text-white rounded-lg p-3 font-bold"
    >
      Login as Admin
    </button>

    <button
      onClick={() => setPage("home")}
      className="w-full mt-3 text-slate-600"
    >
      वापस Home पर जाएँ
    </button>
  </div>
)}

      {page === "admin" && adminLoggedIn && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
            <div>
              <h2 className="text-3xl font-bold">Admin Dashboard</h2>
              <p className="text-slate-500 mt-1">TOPPER TEST मैनेजमेंट</p>
            </div>
            <div className="flex gap-3">
  <button
    onClick={() => setPage("home")}
    className="bg-blue-950 text-white px-5 py-3 rounded-lg"
  >
    वेबसाइट देखें
  </button>
<button
  onClick={() => window.location.href = "/support-admin"}
  className="bg-purple-700 text-white px-5 py-3 rounded-lg"
>
  📩 Support Queries
</button>
  <button
    onClick={logoutAdmin}
    className="bg-red-600 text-white px-5 py-3 rounded-lg"
  >
    Logout
  </button>
</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border rounded-xl p-5">
              <p className="text-slate-500">कुल विषय</p>
              <h3 className="text-3xl font-bold">{subjects.length}</h3>
            </div>
            <div className="bg-white border rounded-xl p-5">
              <p className="text-slate-500">कुल टॉपिक</p>
              <h3 className="text-3xl font-bold">{totalTopics}</h3>
            </div>
            <div className="bg-white border rounded-xl p-5">
              <p className="text-slate-500">कुल प्रश्न</p>
              <h3 className="text-3xl font-bold">{questions.length}</h3>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <button onClick={() => setPage("admin")} className="bg-blue-950 text-white px-5 py-3 rounded-lg font-semibold">
              विषय और टॉपिक
            </button>
            <button onClick={() => setPage("question")} className="bg-green-700 text-white px-5 py-3 rounded-lg font-semibold">
              Question Bank
            </button>
            <button onClick={() => setPage("excel")} className="bg-purple-700 text-white px-5 py-3 rounded-lg font-semibold">
              Excel Bulk Upload
            </button>
          </div>

<div className="bg-white border rounded-xl p-5 mb-6">
  <h3 className="text-xl font-bold mb-4">
    🔔 Notification भेजें
  </h3>

  <input
    value={adminNotificationTitle}
    onChange={(e) => setAdminNotificationTitle(e.target.value)}
    placeholder="Notification का Title"
    className="w-full border rounded-lg p-3 mb-3"
  />

  <textarea
    value={adminNotificationMessage}
    onChange={(e) => setAdminNotificationMessage(e.target.value)}
    placeholder="Notification का Message लिखें"
    className="w-full border rounded-lg p-3 mb-3"
    rows={4}
  />

  <label className="block font-semibold mb-2">
    किसको भेजना है?
  </label>

  <select
    value={adminNotificationAudience}
    onChange={(e) => setAdminNotificationAudience(e.target.value)}
    className="w-full border rounded-lg p-3 mb-3"
  >
    <option value="public">सभी लोगों को</option>
    <option value="students">सभी Students को</option>
    <option value="student">किसी एक Student को</option>
  </select>

  {adminNotificationAudience === "student" && (
    <select
      value={adminNotificationStudentId}
      onChange={(e) => setAdminNotificationStudentId(e.target.value)}
      className="w-full border rounded-lg p-3 mb-3"
    >
      <option value="">Student चुनें</option>
      {adminNotificationStudents.map((student) => (
        <option key={student.id} value={student.id}>
          {student.name || "Student"} - {student.username || student.student_id || student.id}
        </option>
      ))}
    </select>
  )}

  <button
    disabled={adminNotificationLoading}
    onClick={async () => {
      if (!adminNotificationTitle.trim() || !adminNotificationMessage.trim()) {
        alert("Title और Message दोनों लिखें।");
        return;
      }

      if (
        adminNotificationAudience === "student" &&
        !adminNotificationStudentId
      ) {
        alert("पहले Student चुनें।");
        return;
      }

      setAdminNotificationLoading(true);

      const { error } = await supabase
        .from("notifications")
        .insert({
          title: adminNotificationTitle.trim(),
          message: adminNotificationMessage.trim(),
          audience: adminNotificationAudience,
          student_id:
            adminNotificationAudience === "student"
              ? adminNotificationStudentId
              : null,
        });

      setAdminNotificationLoading(false);

      if (error) {
        alert("Notification नहीं भेजा गया: " + error.message);
        return;
      }

      alert("Notification सफलतापूर्वक भेज दिया गया!");

      setAdminNotificationTitle("");
      setAdminNotificationMessage("");
      setAdminNotificationStudentId("");

      const { data } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false });

      setNotifications(data || []);
    }}
    className="w-full bg-blue-950 text-white p-3 rounded-lg font-bold disabled:opacity-50"
  >
    {adminNotificationLoading ? "भेजा जा रहा है..." : "Notification भेजें"}
  </button>
</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-xl p-5">
              <h3 className="text-xl font-bold mb-4">नया विषय जोड़ें</h3>
              <input
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="विषय का नाम लिखें"
                className="w-full border rounded-lg p-3 mb-3"
              />
              <button onClick={addSubject} className="w-full bg-blue-950 text-white p-3 rounded-lg font-bold">
                + विषय जोड़ें
              </button>

              <h3 className="text-xl font-bold mt-7 mb-3">सभी विषय ({subjects.length})</h3>
              <div className="space-y-2">
                {subjects.map((subject) => (
                  <div key={subject} className={`border rounded-lg p-3 ${selectedSubject === subject ? "border-blue-600 bg-blue-50" : ""}`}>
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <button onClick={() => setSelectedSubject(subject)} className="font-semibold text-left flex-1">
                        {subject}
                      </button>
                      <div className="flex gap-2">
                        <button onClick={() => editSubject(subject)} className="text-blue-700 text-sm font-semibold">बदलें</button>
                        <button onClick={() => deleteSubject(subject)} className="text-red-600 text-sm font-semibold">हटाएँ</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-xl p-5">
              <h3 className="text-xl font-bold mb-4">टॉपिक मैनेज करें</h3>
              <label className="block font-semibold mb-2">विषय चुनें</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full border rounded-lg p-3 mb-4"
              >
                <option value="">विषय चुनें</option>
                {subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
             </select>

<input
  value={newTopic}
  onChange={(e) => setNewTopic(e.target.value)}
  placeholder="नया टॉपिक लिखें"
  className="w-full border rounded-lg p-3 mb-3"
/>

<input
  type="number"
  min="1"
  value={newTopicTime}
  onChange={(e) => setNewTopicTime(Number(e.target.value))}
  placeholder="टेस्ट का समय (मिनट)"
  className="w-full border rounded-lg p-3 mb-3"
/>

<button onClick={addTopic} className="w-full bg-blue-950 text-white p-3 rounded-lg font-bold">
  + टॉपिक जोड़ें
</button>

<h3 className="font-bold mt-7 mb-3">टॉपिक की सूची</h3>

{!selectedSubject ? (
  <p className="text-slate-500">पहले विषय चुनें।</p>
) : (
  <div className="space-y-2">
    {(topics[selectedSubject] || []).map((topic) => {
      const key = `${selectedSubject}::${topic}`;

      return (
        <div key={topic} className="border rounded-lg p-3 flex flex-wrap justify-between items-center gap-2">
          <span className="font-medium">{topic}</span>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={topicTimes[key] ?? 30}
              onChange={(e) =>
                setTopicTimes({
                  ...topicTimes,
                  [key]: Number(e.target.value),
                })
              }
              className="w-20 border rounded p-2"
            />
            <span className="text-sm">मिनट</span>

            <button onClick={() => editTopic(topic)} className="text-blue-700 text-sm font-semibold">बदलें</button>
            <button onClick={() => deleteTopic(topic)} className="text-red-600 text-sm font-semibold">हटाएँ</button>
          </div>
        </div>
      );
    })}
  </div>
)}
            </div>
          </div>
        </section>
      )}

      {page === "question" && adminLoggedIn && (
        <section className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
            <div>
              <h2 className="text-3xl font-bold">Question Bank</h2>
              <p className="text-slate-500">प्रश्न जोड़ें और मैनेज करें</p>
            </div>
            <button onClick={() => setPage("admin")} className="bg-blue-950 text-white px-5 py-3 rounded-lg">
              ← Admin Panel
            </button>
          </div>

          <div className="bg-white border rounded-xl p-5 mb-7">
            <h3 className="text-xl font-bold mb-5">
              {editingId !== null ? "प्रश्न एडिट करें" : "नया प्रश्न जोड़ें"}
            </h3>

            <label className="block font-semibold mb-2">विषय चुनें</label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedTopic("");
              }}
              className="w-full border rounded-lg p-3 mb-4"
            >
              <option value="">विषय चुनें</option>
              {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <label className="block font-semibold mb-2">टॉपिक चुनें</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4"
            >
              <option value="">टॉपिक चुनें</option>
              {(topics[selectedSubject] || []).map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <label className="block font-semibold mb-2">प्रश्न लिखें</label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="यहाँ पूरा प्रश्न लिखें"
              rows={3}
              className="w-full border rounded-lg p-3 mb-4"
            />

            <h4 className="font-bold mb-3">चार विकल्प भरें</h4>
            {[option1, option2, option3, option4].map((value, index) => (
              <div key={index} className="mb-3">
                <label className="block text-sm font-semibold mb-1">विकल्प {index + 1}</label>
                <input
                  value={value}
                  onChange={(e) => {
                    const setters = [setOption1, setOption2, setOption3, setOption4];
                    setters[index](e.target.value);
                  }}
                  placeholder={`विकल्प ${index + 1}`}
                  className="w-full border rounded-lg p-3"
                />
              </div>
            ))}

            <label className="block font-semibold mb-2 mt-4">सही उत्तर चुनें</label>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[0, 1, 2, 3].map((n) => (
                <label key={n} className={`border rounded-lg p-3 cursor-pointer ${correct === n ? "border-green-600 bg-green-50" : ""}`}>
                  <input type="radio" checked={correct === n} onChange={() => setCorrect(n)} className="mr-2" />
                  विकल्प {n + 1}
                </label>
              ))}
            </div>

            <label className="block font-semibold mb-2">प्रश्न की व्याख्या / समाधान</label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="सही उत्तर का कारण विस्तार से लिखें"
              rows={4}
              className="w-full border rounded-lg p-3 mb-5"
            />

            <div className="flex flex-wrap gap-3">
              <button onClick={saveQuestion} className="bg-blue-950 text-white px-6 py-3 rounded-lg font-bold">
                {editingId !== null ? "प्रश्न अपडेट करें" : "प्रश्न सेव करें"}
              </button>
              {editingId !== null && (
                <button onClick={clearQuestionForm} className="bg-slate-200 px-6 py-3 rounded-lg">
                  एडिट रद्द करें
                </button>
              )}
            </div>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h3 className="text-xl font-bold mb-4">प्रश्नों की सूची ({filteredQuestions.length})</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
              <select
                value={filterSubject}
                onChange={(e) => {
                  setFilterSubject(e.target.value);
                  setFilterTopic("");
                }}
                className="border rounded-lg p-3"
              >
                <option value="">सभी विषय</option>
                {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
                className="border rounded-lg p-3"
              >
                <option value="">सभी टॉपिक</option>
                {(filterSubject ? topics[filterSubject] || [] : Object.values(topics).flat()).map((t, i) => (
                  <option key={`${t}-${i}`} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {filteredQuestions.length === 0 ? (
              <p className="text-slate-500 py-5">अभी कोई प्रश्न सेव नहीं है।</p>
            ) : (
              <div className="space-y-4">
                {filteredQuestions.map((q, index) => (
                  <div key={q.id} className="border rounded-xl p-4">
                    <p className="text-sm text-blue-700 font-semibold mb-2">{q.subject} / {q.topic}</p>
                    <h4 className="font-bold mb-3">{index + 1}. {q.question}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {q.options.map((o, i) => (
                        <p key={i} className={`p-2 rounded-lg text-sm ${i === q.correct ? "bg-green-100 text-green-800 font-semibold" : "bg-slate-50"}`}>
                          {i + 1}. {o} {i === q.correct ? "✓ सही उत्तर" : ""}
                        </p>
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      <b>व्याख्या:</b> {q.explanation}
                    </p>
                    <div className="flex gap-4">
                      <button onClick={() => editQuestion(q)} className="text-blue-700 font-semibold">एडिट करें</button>
                      <button onClick={() => deleteQuestion(q.id)} className="text-red-600 font-semibold">हटाएँ</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {page === "excel" && adminLoggedIn && (
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
            <div>
              <h2 className="text-3xl font-bold">Excel Bulk Upload</h2>
              <p className="text-slate-500 mt-1">एक साथ कई प्रश्न जोड़ें</p>
            </div>
            <button onClick={() => setPage("admin")} className="bg-blue-950 text-white px-5 py-3 rounded-lg">
              ← Admin Panel
            </button>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">1. Excel टेम्पलेट डाउनलोड करें</h3>
            <p className="text-slate-600 mb-4">
              पहले नीचे दिए बटन से टेम्पलेट डाउनलोड करें। उसी फाइल में अपने प्रश्न भरें।
            </p>
            <button onClick={downloadExcelTemplate} className="bg-green-700 text-white px-5 py-3 rounded-lg font-bold mb-8">
              Excel टेम्पलेट डाउनलोड करें
            </button>

            <h3 className="text-xl font-bold mb-3">2. भरी हुई Excel फाइल अपलोड करें</h3>

<label className="block font-semibold mb-2">Subject चुनें</label>
<select
  value={selectedSubject}
  onChange={(e) => {
    setSelectedSubject(e.target.value);
    setSelectedTopic("");
  }}
  className="w-full border rounded-lg p-3 mb-4"
>
  <option value="">Subject चुनें</option>
  {subjects.map((subject) => (
    <option key={subject} value={subject}>{subject}</option>
  ))}
</select>

<label className="block font-semibold mb-2">Topic चुनें</label>
<select
  value={selectedTopic}
  onChange={(e) => setSelectedTopic(e.target.value)}
  className="w-full border rounded-lg p-3 mb-4"
  disabled={!selectedSubject}
>
  <option value="">Topic चुनें</option>
  {(topics[selectedSubject] || []).map((topic) => (
    <option key={topic} value={topic}>{topic}</option>
  ))}
</select>

            <p className="text-slate-600 mb-4">
              सही उत्तर वाले कॉलम में 1, 2, 3 या 4 लिखें। विषय और टॉपिक वेबसाइट में पहले से मौजूद होने चाहिए।
            </p>
            <input type="file" accept=".xlsx,.xls,.csv" onChange={importExcel} className="w-full border rounded-lg p-3" />

            <div className="mt-6 rounded-lg bg-yellow-50 border border-yellow-200 p-4 text-sm text-slate-700">
              <b>ध्यान दें:</b> प्रश्नों का डेटा अभी इसी ब्राउज़र में सेव होता है। यह स्थायी ऑनलाइन बैकअप नहीं है।
            </div>
          </div>
        </section>
      )}

      
{loginOpen && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md text-slate-900">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Student Account</h2>
        <button onClick={() => setLoginOpen(false)} className="text-2xl">×</button>
      </div>

      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setStudentMode("login")}
          className={`flex-1 p-3 rounded-lg font-bold ${studentMode === "login" ? "bg-blue-950 text-white" : "bg-slate-200"}`}
        >
          Login
        </button>
        <button
          onClick={() => setStudentMode("signup")}
          className={`flex-1 p-3 rounded-lg font-bold ${studentMode === "signup" ? "bg-blue-950 text-white" : "bg-slate-200"}`}
        >
          Signup
        </button>
      </div>

      {studentMode === "signup" && (
        <>
          <input
            type="text"
            id="studentName"
            placeholder="अपना पूरा नाम"
            className="w-full border rounded-lg p-3 mb-3"
          />

          <input
            type="text"
            id="studentUsername"
            placeholder="Username"
            className="w-full border rounded-lg p-3 mb-3"
          />
        </>
      )}

      <input
        type="email"
        id="studentEmail"
        placeholder="Email"
        className="w-full border rounded-lg p-3 mb-3"
      />

      <input
        type="password"
        id="studentPassword"
        placeholder="Password (कम से कम 6 अक्षर)"
        className="w-full border rounded-lg p-3 mb-4"
      />

      {studentMode === "signup" ? (
        <button
          onClick={async () => {
            const name = (document.getElementById("studentName") as HTMLInputElement).value.trim();
            const username = (document.getElementById("studentUsername") as HTMLInputElement).value.trim().toLowerCase();
            const email = (document.getElementById("studentEmail") as HTMLInputElement).value.trim();
            const password = (document.getElementById("studentPassword") as HTMLInputElement).value;

            if (!name || !username || !email || !password) {
              alert("सभी जानकारी भरें");
              return;
            }

            if (!/^[a-z0-9_]{3,20}$/.test(username)) {
              alert("Username 3-20 अक्षर का रखें। केवल English अक्षर, नंबर और _ इस्तेमाल करें।");
              return;
            }

            if (password.length < 6) {
              alert("Password कम से कम 6 अक्षर का होना चाहिए।");
              return;
            }

            const { data, error } = await supabase.auth.signUp({
              email,
              password,
              options: {
                data: { name, username },
              },
            });

            if (error) {
              alert(error.message);
              return;
            }
if (data.session) {
  setLoginOpen(false);
} else {
  setStudentMode("login");
  alert("Signup सफल! Email Confirmation पूरा करके Login करें।");
}
          }}
          className="w-full bg-blue-950 text-white rounded-lg p-3 font-bold"
        >
          Create Account
        </button>
      ) : (
        <button
          onClick={async () => {
            const email = (document.getElementById("studentEmail") as HTMLInputElement).value.trim();
            const password = (document.getElementById("studentPassword") as HTMLInputElement).value;

            if (!email || !password) {
              alert("Email और Password भरें");
              return;
            }

            const { data, error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });

            if (error) {
              alert(error.message);
              return;
            }

            if (data.user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
  setAdminLoggedIn(true);
  setLoginOpen(false);
  setPage("admin");
} else {
  startTest(selectedTopic);
}
          }}
          className="w-full bg-green-700 text-white rounded-lg p-3 font-bold"
        >
          Login
        </button>
      )}

      <p className="text-xs text-slate-500 mt-4">
        Login अभी Email और Password से होगा।
      </p>
    </div>
  </div>
)}

      
<footer className="bg-slate-950 text-white text-center py-8 mt-12">
  <h2 className="font-bold text-xl text-yellow-400">TOPPER TEST</h2>

  <p className="text-slate-400 mt-2">
    Rajasthan Competitive Exam Practice Platform
  </p>

  <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-6 px-4">
    <a href="/about" className="text-slate-300 hover:text-yellow-400">About Us</a>
    <a href="/contact" className="text-slate-300 hover:text-yellow-400">Contact Us</a>
    <a href="/privacy-policy" className="text-slate-300 hover:text-yellow-400">Privacy Policy</a>
    <a href="/disclaimer" className="text-slate-300 hover:text-yellow-400">Disclaimer</a>
    <a href="/terms" className="text-slate-300 hover:text-yellow-400">Terms & Conditions</a>
    <a href="/refund-policy" className="text-slate-300 hover:text-yellow-400">Refund Policy</a>
  </div>

  <p className="text-slate-500 text-sm mt-6">
    © 2026 TOPPER TEST. All Rights Reserved.
  </p>
</footer>

    </main>
  );
}
