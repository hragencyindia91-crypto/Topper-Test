
import Link from "next/link";

export const metadata = {
  title: "Rajasthan GK in Hindi – राजस्थान सामान्य ज्ञान | TOPPER TEST",
  description:
    "राजस्थान सामान्य ज्ञान हिंदी में पढ़ें। राजस्थान का इतिहास, भूगोल, कला-संस्कृति, राजनीति और महत्वपूर्ण GK प्रश्नों की तैयारी करें।",
  alternates: {
    canonical: "https://toppertest.online/rajasthan-gk",
  },
};

export default function RajasthanGKPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="mb-5 text-3xl font-bold">
        Rajasthan GK in Hindi – राजस्थान सामान्य ज्ञान
      </h1>

      <p className="mb-6 leading-8">
        TOPPER TEST पर राजस्थान सामान्य ज्ञान की तैयारी करें।
        यहाँ राजस्थान का इतिहास, भूगोल, कला-संस्कृति, राजनीति
        और प्रतियोगी परीक्षाओं के महत्वपूर्ण विषय पढ़ें।
      </p>

      <h2 className="mb-3 text-2xl font-bold">राजस्थान GK के प्रमुख विषय</h2>

      <ul className="mb-8 list-disc space-y-3 pl-6">
        <li><Link className="text-blue-600 underline" href="/rajasthan-history">राजस्थान का इतिहास</Link></li>
        <li><Link className="text-blue-600 underline" href="/rajasthan-geography">राजस्थान का भूगोल</Link></li>
        <li><Link className="text-blue-600 underline" href="/rajasthan-art-culture">राजस्थान की कला एवं संस्कृति</Link></li>
        <li><Link className="text-blue-600 underline" href="/rajasthan-polity">राजस्थान की राजनीति</Link></li>
        <li><Link className="text-blue-600 underline" href="/rajasthan-current-affairs">राजस्थान करंट अफेयर्स</Link></li>
      </ul>

      <h2 className="mb-3 text-2xl font-bold">राजस्थान GK की तैयारी कैसे करें?</h2>

      <p className="mb-6 leading-8">
        सबसे पहले राजस्थान के इतिहास, भूगोल और संस्कृति के मूल तथ्यों को
        समझें। इसके बाद महत्वपूर्ण प्रश्नों का अभ्यास करें और नियमित रूप
        से मॉक टेस्ट देकर अपनी तैयारी जाँचें।
      </p>

      <h2 className="mb-3 text-2xl font-bold">ऑनलाइन राजस्थान GK टेस्ट</h2>

      <p className="mb-6 leading-8">
        TOPPER TEST पर विषयवार प्रश्नों और ऑनलाइन टेस्ट के माध्यम से
        अपनी तैयारी का अभ्यास करें।
      </p>

      <Link className="inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white" href="/">
        TOPPER TEST पर टेस्ट दें
      </Link>
    </main>
  );
}

