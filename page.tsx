f
"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

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

const defaultTopics: Record<string, string[]> = {
  "राजस्थान इतिहास": ["प्राचीन इतिहास", "मध्यकालीन इतिहास", "आधुनिक इतिहास"],
  "राजस्थान भूगोल": ["भौतिक स्वरूप", "नदियाँ", "जलवायु"],
  "राजस्थान कला एवं संस्कृति": ["लोक देवता", "लोक नृत्य", "मेले एवं त्योहार"],
  "राजस्थान राजव्यवस्था": ["राज्यपाल", "मुख्यमंत्री", "विधानसभा"],
  "राजस्थान अर्थव्यवस्था": ["कृषि", "उद्योग", "बजट"],
  "राजस्थान सामान्य ज्ञान": ["प्रमुख तथ्य", "जिले", "प्रमुख संस्थान"],
  हिंदी: ["संधि", "समास", "व्याकरण"],
  गणित: ["प्रतिशत", "लाभ एवं हानि", "औसत"],
  कंप्यूटर: ["कंप्यूटर परिचय", "हार्डवेयर", "सॉफ्टवेयर"],
  "सामान्य विज्ञान": ["भौतिक विज्ञान", "रसायन विज्ञान", "जीव विज्ञान"],
  रीजनिंग: ["श्रृंखला", "कोडिंग", "दिशा ज्ञान"],
  "करंट अफेयर्स": ["राष्ट्रीय", "अंतरराष्ट्रीय", "राजस्थान"],
};

const features = [
  { title: "Daily Quiz", description: "रोज नए प्रश्नों का अभ्यास" },
  { title: "Mock Test", description: "परीक्षा की तरह टेस्ट" },
  { title: "Solutions", description: "हर प्रश्न का सही उत्तर और विस्तृत व्याख्या" },
];

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

  const [page, setPage] = useState("home");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentMobile, setStudentMobile] = useState("");
  const [student, setStudent] = useState<{ name: string; mobile: string } | null>(null);
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [reviewQuestions, setReviewQuestions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [testSubmitted, setTestSubmitted] = useState(false);

  const [newSubject, setNewSubject] = useState("");
  const [newTopic, setNewTopic] = useState("");

  const [questionText, setQuestionText] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correct, setCorrect] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const [filterSubject, setFilterSubject] = useState("");
  const [filterTopic, setFilterTopic] = useState("");

  useEffect(() => {
    try {
      const savedSubjects = localStorage.getItem("topper_subjects");
      const savedTopics = localStorage.getItem("topper_topics");
      const savedQuestions = localStorage.getItem("topper_questions");
      const savedStudent = localStorage.getItem("topper_student");

      if (savedSubjects) setSubjects(JSON.parse(savedSubjects));
      if (savedTopics) setTopics(JSON.parse(savedTopics));
      if (savedQuestions) setQuestions(JSON.parse(savedQuestions));
      if (savedStudent) setStudent(JSON.parse(savedStudent));
    } catch {
      console.log("Saved data could not be loaded");
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("topper_subjects", JSON.stringify(subjects));
    localStorage.setItem("topper_topics", JSON.stringify(topics));
    localStorage.setItem("topper_questions", JSON.stringify(questions));
  }, [subjects, topics, questions, loaded]);

  useEffect(() => {
    if (page !== "test" || testSubmitted) return;
    const timer = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);
          setTestSubmitted(true);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [page, testSubmitted]);

  function beginTest() {
    const available = questions.filter((q) => q.subject === selectedSubject && q.topic === selectedTopic);
    if (available.length < 50) {
      alert(`इस टॉपिक में अभी ${available.length} प्रश्न हैं। टेस्ट शुरू करने के लिए 50 प्रश्न जोड़ें।`);
      return;
    }
    setTestQuestions(available.slice(0, 50));
    setCurrentQuestion(0);
    setAnswers({});
    setReviewQuestions([]);
    setTimeLeft(60 * 60);
    setTestSubmitted(false);
    setLoginOpen(false);
    setPage("test");
  }

  function completeStudentLogin() {
    const name = studentName.trim();
    const mobile = studentMobile.trim();
    if (!name) return alert("अपना नाम लिखें।");
    if (!/^[6-9]\d{9}$/.test(mobile)) return alert("10 अंकों का सही मोबाइल नंबर लिखें।");
    const profile = { name, mobile };
    setStudent(profile);
    localStorage.setItem("topper_student", JSON.stringify(profile));
    setStudentName("");
    setStudentMobile("");
    if (selectedTopic) beginTest();
    else setLoginOpen(false);
  }

  function submitTest() {
    if (!testSubmitted && !confirm("क्या आप टेस्ट सबमिट करना चाहते हैं?")) return;
    setTestSubmitted(true);
  }

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
  }

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

    setSubjects(subjects.map((s) => (s === oldName ? newName : s)));

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
    setNewTopic("");
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
      [selectedSubject]: current.map((t) => (t === oldName ? newName : t)),
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

    const options = [
      option1.trim(),
      option2.trim(),
      option3.trim(),
      option4.trim(),
    ];

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
      setQuestions(questions.map((q) =>
        q.id === editingId ? newQuestion : q
      ));
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
      ["विषय", "टॉपिक", "प्रश्न", "विकल्प 1", "विकल्प 2", "विकल्प 3", "विकल्प 4", "सही उत्तर", "व्याख्या"],
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "प्रश्न");
    XLSX.writeFile(workbook, "TOPPER_TEST_प्रश्न_टेम्पलेट.xlsx");
  }

  
async function importExcel(e: { target: HTMLInputElement }) {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

    if (!firstSheet) {
      alert("Excel फाइल में कोई शीट नहीं मिली।");
      return;
    }

    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(
      firstSheet,
      { defval: "" }
    );

    const imported: Question[] = [];
    const errors: string[] = [];

    rows.forEach((row, index) => {
      const excelSubject = String(row["विषय"] ?? "").trim();
      const excelTopic = String(row["टॉपिक"] ?? "").trim();

      // अगर Excel में टॉपिक अलग कॉलम में नहीं है
      // तो विषय वाले कॉलम को टॉपिक मानेंगे।
      const subject = excelTopic
        ? excelSubject
        : "राजस्थान इतिहास";

      const topic = excelTopic || excelSubject;

      const question = String(row["प्रश्न"] ?? "").trim();

      const options = [
        String(row["विकल्प A"] ?? row["विकल्प 1"] ?? "").trim(),
        String(row["विकल्प B"] ?? row["विकल्प 2"] ?? "").trim(),
        String(row["विकल्प C"] ?? row["विकल्प 3"] ?? "").trim(),
        String(row["विकल्प D"] ?? row["विकल्प 4"] ?? "").trim(),
      ];

      const answerText = String(row["सही उत्तर"] ?? "").trim().toUpperCase();
      const explanation = String(row["व्याख्या"] ?? "").trim();

      if (!question && options.every(o => !o) && !explanation) {
        return;
      }

      if (!subjects.includes(subject)) {
        errors.push(`पंक्ति ${index + 2}: विषय "${subject}" मौजूद नहीं है`);
        return;
      }

      if (!(topics[subject] || []).includes(topic)) {
        errors.push(`पंक्ति ${index + 2}: टॉपिक "${topic}" मौजूद नहीं है`);
        return;
      }

      if (!question || options.some(o => !o) || !explanation) {
        errors.push(`पंक्ति ${index + 2}: प्रश्न, चारों विकल्प और व्याख्या भरें`);
        return;
      }

      const answerMap: Record<string, number> = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        "1": 0,
        "2": 1,
        "3": 2,
        "4": 3,
      };

      const correct = answerMap[answerText];

      if (correct === undefined) {
        errors.push(`पंक्ति ${index + 2}: सही उत्तर A, B, C, D या 1, 2, 3, 4 होना चाहिए`);
        return;
      }

      imported.push({
        id: Date.now() + questions.length + index,
        subject,
        topic,
        question,
        options,
        correct,
        explanation,
      });
    });

    if (imported.length > 0) {
      setQuestions(previous => [...previous, ...imported]);
    }

    const errorMessage = errors.length
      ? `\n\nसमस्या वाली पंक्तियाँ:\n${errors.slice(0, 5).join("\n")}${errors.length > 5 ? `\nऔर ${errors.length - 5} पंक्तियाँ...` : ""}`
      : "";

    alert(
      `${imported.length} प्रश्न सफलतापूर्वक इम्पोर्ट हुए।` +
      (errors.length ? `\n${errors.length} पंक्तियाँ इम्पोर्ट नहीं हुईं।` : "") +
      errorMessage
    );

  } catch {
    alert("फाइल पढ़ने में समस्या आई। कृपया सही Excel (.xlsx) या CSV फाइल चुनें।");
  } finally {
    e.target.value = "";
  }
}


      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(firstSheet, {
        defval: "",
      });

      const imported: Question[] = [];
      const errors: string[] = [];

      rows.forEach((row, index) => {
        const subject = String(row["विषय"] ?? "").trim();
        const topic = String(row["टॉपिक"] ?? "").trim();
        const question = String(row["प्रश्न"] ?? "").trim();
        const options = [
          String(row["विकल्प 1"] ?? "").trim(),
          String(row["विकल्प 2"] ?? "").trim(),
          String(row["विकल्प 3"] ?? "").trim(),
          String(row["विकल्प 4"] ?? "").trim(),
        ];
        const answer = Number(row["सही उत्तर"]);
        const explanation = String(row["व्याख्या"] ?? "").trim();

        if (!subject && !topic && !question && options.every((o) => !o) && !explanation) {
          return;
        }

        if (!subjects.includes(subject)) {
          errors.push(`पंक्ति ${index + 2}: विषय "${subject}" मौजूद नहीं है`);
          return;
        }
        if (!(topics[subject] || []).includes(topic)) {
          errors.push(`पंक्ति ${index + 2}: "${subject}" में टॉपिक "${topic}" मौजूद नहीं है`);
          return;
        }
        if (!question || options.some((o) => !o) || !explanation) {
          errors.push(`पंक्ति ${index + 2}: प्रश्न, चारों विकल्प और व्याख्या भरें`);
          return;
        }
        if (!Number.isInteger(answer) || answer < 1 || answer > 4) {
          errors.push(`पंक्ति ${index + 2}: सही उत्तर में 1, 2, 3 या 4 लिखें`);
          return;
        }

        imported.push({
          id: Date.now() + questions.length + index,
          subject,
          topic,
          question,
          options,
          correct: answer - 1,
          explanation,
        });
      });

      if (imported.length > 0) {
        setQuestions((previous) => [...previous, ...imported]);
      }

      const errorMessage = errors.length
        ? `\n\nसमस्या वाली पंक्तियाँ:\n${errors.slice(0, 5).join("\n")}${errors.length > 5 ? `\nऔर ${errors.length - 5} पंक्तियाँ...` : ""}`
        : "";
      alert(`${imported.length} प्रश्न सफलतापूर्वक इम्पोर्ट हुए।${errors.length ? `\n${errors.length} पंक्तियाँ इम्पोर्ट नहीं हुईं।` : ""}${errorMessage}`);
    } catch {
      alert("फाइल पढ़ने में समस्या आई। कृपया सही Excel (.xlsx) या CSV फाइल चुनें।");
    } finally {
      e.target.value = "";
    }
  }

  const filteredQuestions = questions.filter((q) =>
    (!filterSubject || q.subject === filterSubject) &&
    (!filterTopic || q.topic === filterTopic)
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-blue-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-wrap justify-between items-center gap-3">
          <button onClick={() => setPage("home")} className="text-2xl font-bold">
            TOPPER TEST
          </button>

          <div className="flex gap-2 items-center">
            {student && <span className="text-sm text-white">नमस्ते, {student.name}</span>}
            <button
              onClick={() => setLoginOpen(true)}
              className="bg-white text-blue-950 px-4 py-2 rounded-lg font-semibold"
            >
              Login / Register
            </button>
            <button
              onClick={() => setPage("admin")}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold"
            >
              Admin Panel
            </button>
          </div>
        </div>
      </header>

      {page === "home" && (
        <>
          <section className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">सभी विषय</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {subjects.map((subject, index) => (
                <button
                  key={subject}
                  onClick={() => {
                    setSelectedSubject(subject);
                    setPage("topics");
                  }}
                  className="bg-white border rounded-xl p-5 text-left shadow-sm hover:shadow-md hover:border-blue-500"
                >
                  <p className="text-sm text-blue-700 font-semibold mb-2">
                    SUBJECT {index + 1}
                  </p>
                  <h3 className="font-bold text-lg">{subject}</h3>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white border-t py-10">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">हमारी सुविधाएँ</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {features.map((feature) => (
                  <div key={feature.title} className="border rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-blue-950 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {page === "topics" && (
        <section className="max-w-5xl mx-auto px-4 py-8">
          <button onClick={() => setPage("home")} className="text-blue-700 font-semibold mb-5">
            ← सभी विषय
          </button>
          <h2 className="text-2xl font-bold mb-5">{selectedSubject}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(topics[selectedSubject] || []).map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setSelectedTopic(topic);
                  if (student) {
                    const available = questions.filter((q) => q.subject === selectedSubject && q.topic === topic);
                    if (available.length < 50) {
                      alert(`इस टॉपिक में अभी ${available.length} प्रश्न हैं। टेस्ट शुरू करने के लिए 50 प्रश्न जोड़ें।`);
                      return;
                    }
                    setTestQuestions(available.slice(0, 50));
                    setCurrentQuestion(0);
                    setAnswers({});
                    setReviewQuestions([]);
                    setTimeLeft(60 * 60);
                    setTestSubmitted(false);
                    setPage("test");
                  } else {
                    setLoginOpen(true);
                  }
                }}
                className="bg-white border rounded-xl p-5 text-left font-semibold hover:border-blue-500"
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
        <section className="max-w-6xl mx-auto px-4 py-8">
          {!testSubmitted ? (
            <>
              <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
                <div>
                  <h2 className="text-2xl font-bold">{selectedSubject} — {selectedTopic}</h2>
                  <p className="text-slate-500">विद्यार्थी: {student?.name || "Student"} | प्रश्न {currentQuestion + 1} / {testQuestions.length}</p>
                </div>
                <div className={`rounded-xl px-5 py-3 font-bold text-xl ${timeLeft < 300 ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-950"}`}>
                  समय: {formatTime(timeLeft)}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center"><b className="text-2xl">{Object.keys(answers).length}</b><p className="text-sm">Attempted</p></div>
                <div className="bg-slate-100 border rounded-lg p-3 text-center"><b className="text-2xl">{testQuestions.length - Object.keys(answers).length}</b><p className="text-sm">Unattempted</p></div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center"><b className="text-2xl">{reviewQuestions.length}</b><p className="text-sm">Review</p></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 bg-white border rounded-xl p-5">
                  <p className="text-sm text-blue-700 font-semibold mb-3">प्रश्न {currentQuestion + 1}</p>
                  <h3 className="text-xl font-bold mb-5">{testQuestions[currentQuestion]?.question}</h3>
                  <div className="space-y-3">
                    {testQuestions[currentQuestion]?.options.map((option, index) => (
                      <button key={index} onClick={() => setAnswers((previous) => ({ ...previous, [testQuestions[currentQuestion].id]: index }))}
                        className={`w-full text-left border rounded-lg p-4 ${answers[testQuestions[currentQuestion].id] === index ? "border-blue-700 bg-blue-50" : "hover:border-blue-400"}`}>
                        <b className="mr-2">{["A", "B", "C", "D"][index]}.</b>{option}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 mt-6">
                    <button disabled={currentQuestion === 0} onClick={() => setCurrentQuestion((n) => n - 1)} className="px-5 py-3 rounded-lg bg-slate-200 disabled:opacity-40">← पिछला</button>
                    <button onClick={() => setReviewQuestions((old) => old.includes(testQuestions[currentQuestion].id) ? old.filter((id) => id !== testQuestions[currentQuestion].id) : [...old, testQuestions[currentQuestion].id])}
                      className="px-4 py-3 rounded-lg bg-yellow-100 text-yellow-900">{reviewQuestions.includes(testQuestions[currentQuestion]?.id) ? "Review हटाएँ" : "Mark for Review"}</button>
                    <button disabled={currentQuestion === testQuestions.length - 1} onClick={() => setCurrentQuestion((n) => n + 1)} className="px-5 py-3 rounded-lg bg-blue-950 text-white disabled:opacity-40">अगला →</button>
                  </div>
                </div>
                <div className="bg-white border rounded-xl p-5">
                  <h3 className="font-bold mb-3">प्रश्न सूची</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {testQuestions.map((q, index) => (
                      <button key={q.id} onClick={() => setCurrentQuestion(index)} className={`rounded-lg p-2 font-semibold ${currentQuestion === index ? "ring-2 ring-blue-700" : ""} ${reviewQuestions.includes(q.id) ? "bg-yellow-300" : answers[q.id] !== undefined ? "bg-green-300" : "bg-slate-200"}`}>{index + 1}</button>
                    ))}
                  </div>
                  <div className="text-xs text-slate-600 space-y-1 mt-4"><p>🟩 Attempted</p><p>🟨 Mark for Review</p><p>⬜ Unattempted</p></div>
                  <button onClick={submitTest} className="w-full mt-5 bg-red-600 text-white rounded-lg p-3 font-bold">टेस्ट सबमिट करें</button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white border rounded-xl p-6">
              <h2 className="text-3xl font-bold mb-2">टेस्ट परिणाम</h2>
              <p className="text-slate-600 mb-5">{student?.name} — {selectedSubject} / {selectedTopic}</p>
              {(() => {
                const right = testQuestions.filter((q) => answers[q.id] === q.correct).length;
                const wrong = testQuestions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== q.correct).length;
                const skipped = testQuestions.length - right - wrong;
                return <div className="grid grid-cols-3 gap-3 mb-6"><div className="bg-green-50 p-4 rounded-lg text-center"><b className="text-3xl">{right}</b><p>सही</p></div><div className="bg-red-50 p-4 rounded-lg text-center"><b className="text-3xl">{wrong}</b><p>गलत</p></div><div className="bg-slate-100 p-4 rounded-lg text-center"><b className="text-3xl">{skipped}</b><p>छोड़े</p></div></div>;
              })()}
              <div className="space-y-4">
                {testQuestions.map((q, index) => (
                  <div key={q.id} className="border rounded-lg p-4">
                    <p className="font-bold mb-2">{index + 1}. {q.question}</p>
                    <p className={answers[q.id] === q.correct ? "text-green-700" : "text-red-700"}>आपका उत्तर: {answers[q.id] === undefined ? "नहीं दिया" : q.options[answers[q.id]]}</p>
                    <p className="text-green-700 font-semibold">सही उत्तर: {q.options[q.correct]}</p>
                    <p className="text-slate-600 mt-1">व्याख्या: {q.explanation}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setPage("home")} className="mt-6 bg-blue-950 text-white px-6 py-3 rounded-lg">होम पेज पर जाएँ</button>
            </div>
          )}
        </section>
      )}

      {page === "admin" && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
            <div>
              <h2 className="text-3xl font-bold">Admin Dashboard</h2>
              <p className="text-slate-500 mt-1">TOPPER TEST मैनेजमेंट</p>
            </div>
            <button
              onClick={() => setPage("home")}
              className="bg-blue-950 text-white px-5 py-3 rounded-lg"
            >
              वेबसाइट देखें
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border rounded-xl p-5">
              <p className="text-slate-500">कुल विषय</p>
              <h3 className="text-3xl font-bold">{subjects.length}</h3>
            </div>
            <div className="bg-white border rounded-xl p-5">
              <p className="text-slate-500">कुल टॉपिक</p>
              <h3 className="text-3xl font-bold">
                {Object.values(topics).reduce((sum, arr) => sum + arr.length, 0)}
              </h3>
            </div>
            <div className="bg-white border rounded-xl p-5">
              <p className="text-slate-500">कुल प्रश्न</p>
              <h3 className="text-3xl font-bold">{questions.length}</h3>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setPage("admin")}
              className="bg-blue-950 text-white px-5 py-3 rounded-lg font-semibold"
            >
              विषय और टॉपिक
            </button>
            <button
              onClick={() => setPage("question")}
              className="bg-green-700 text-white px-5 py-3 rounded-lg font-semibold"
            >
              Question Bank
            </button>
            <button
              onClick={() => setPage("upload")}
              className="bg-purple-700 text-white px-5 py-3 rounded-lg font-semibold"
            >
              Excel Bulk Upload
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

              <h3 className="text-xl font-bold mt-7 mb-3">
                सभी विषय ({subjects.length})
              </h3>
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
              <button onClick={addTopic} className="w-full bg-blue-950 text-white p-3 rounded-lg font-bold">
                + टॉपिक जोड़ें
              </button>

              <h3 className="font-bold mt-7 mb-3">टॉपिक की सूची</h3>
              {!selectedSubject ? (
                <p className="text-slate-500">पहले विषय चुनें।</p>
              ) : (
                <div className="space-y-2">
                  {(topics[selectedSubject] || []).map((topic) => (
                    <div key={topic} className="border rounded-lg p-3 flex justify-between items-center gap-2">
                      <span className="font-medium">{topic}</span>
                      <div className="flex gap-3">
                        <button onClick={() => editTopic(topic)} className="text-blue-700 text-sm font-semibold">बदलें</button>
                        <button onClick={() => deleteTopic(topic)} className="text-red-600 text-sm font-semibold">हटाएँ</button>
                      </div>
                    </div>
                  ))}
                  {(topics[selectedSubject] || []).length === 0 && <p className="text-slate-500">अभी कोई टॉपिक नहीं है।</p>}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {page === "upload" && (
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
            <div>
              <h2 className="text-3xl font-bold">Excel Bulk Upload</h2>
              <p className="text-slate-500 mt-1">एक साथ कई प्रश्न अपलोड करें</p>
            </div>
            <button onClick={() => setPage("admin")} className="bg-blue-950 text-white px-5 py-3 rounded-lg">
              ← Admin Panel
            </button>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">1. Excel टेम्पलेट डाउनलोड करें</h3>
            <p className="text-slate-600 mb-4">
              पहले नीचे दिए बटन से टेम्पलेट डाउनलोड करें और उसी में अपने प्रश्न भरें।
            </p>
            <button
              onClick={downloadExcelTemplate}
              className="bg-blue-950 text-white px-5 py-3 rounded-lg font-semibold mb-7"
            >
              Excel Template डाउनलोड करें
            </button>

            <h3 className="text-xl font-bold mb-3">2. प्रश्नों वाली Excel फाइल चुनें</h3>
            <p className="text-slate-600 mb-3">
              सही उत्तर वाले कॉलम में केवल 1, 2, 3 या 4 लिखें।
            </p>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={importExcel}
              className="w-full border rounded-lg p-3"
            />

            <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-950">
              <p className="font-bold mb-2">ध्यान दें:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>विषय और टॉपिक वेबसाइट में पहले से मौजूद होने चाहिए।</li>
                <li>हर प्रश्न के चारों विकल्प और व्याख्या भरना जरूरी है।</li>
                <li>कॉलम के नाम और क्रम टेम्पलेट जैसे ही रखें।</li>
                <li>अपलोड किए गए प्रश्न अभी इसी ब्राउज़र में सेव होंगे।</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {page === "question" && (
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
                  <input
                    type="radio"
                    checked={correct === n}
                    onChange={() => setCorrect(n)}
                    className="mr-2"
                  />
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
                    <p className="text-sm text-blue-700 font-semibold mb-2">
                      {q.subject} / {q.topic}
                    </p>
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

      {loginOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-3">Login / Register</h2>

            {selectedSubject && (
              <p className="bg-blue-50 p-3 rounded-lg mb-2">
                चुना गया विषय: <b>{selectedSubject}</b>
              </p>
            )}
            {selectedTopic && (
              <p className="bg-blue-50 p-3 rounded-lg mb-4">
                चुना गया टॉपिक: <b>{selectedTopic}</b>
              </p>
            )}

            <input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="अपना पूरा नाम"
              className="w-full border rounded-lg p-3 mb-3"
            />
            <input
              type="tel"
              value={studentMobile}
              onChange={(e) => setStudentMobile(e.target.value)}
              placeholder="10 अंकों का मोबाइल नंबर"
              maxLength={10}
              className="w-full border rounded-lg p-3 mb-3"
            />
            <button
              onClick={completeStudentLogin}
              className="w-full bg-blue-950 text-white rounded-lg p-3 font-bold"
            >
              लॉगिन / रजिस्टर करें और टेस्ट शुरू करें
            </button>
            <p className="text-xs text-slate-500 mt-2">यह अभी डेमो लॉगिन है; OTP सत्यापन बाद में जोड़ा जाएगा।</p>
            <button
              onClick={() => {
                setLoginOpen(false);
                setSelectedTopic("");
              }}
              className="w-full mt-3 p-2 text-slate-600"
            >
              बंद करें
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
