
import Link from "next/link";

export const metadata = {
  title: "Rajasthan Polity in Hindi – राजस्थान की राजव्यवस्था | TOPPER TEST",
  description:
    "राजस्थान की राजव्यवस्था हिंदी में पढ़ें। राज्यपाल, मुख्यमंत्री, विधानसभा, पंचायती राज, स्थानीय स्वशासन और प्रशासन से संबंधित महत्वपूर्ण जानकारी प्राप्त करें।",
  alternates: {
    canonical: "https://toppertest.online/rajasthan-polity",
  },
};

export default function RajasthanPolityPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="mb-5 text-3xl font-bold">
        राजस्थान की राजव्यवस्था (Rajasthan Polity in Hindi)
      </h1>

      <p className="mb-6 leading-8">
        राजस्थान की राजव्यवस्था और प्रशासन से जुड़े विषय
        प्रतियोगी परीक्षाओं में महत्वपूर्ण हैं। यहाँ राज्य सरकार,
        विधानसभा, स्थानीय शासन और प्रशासन की जानकारी प्राप्त करें।
      </p>

      <h2 className="mb-3 text-2xl font-bold">प्रमुख विषय</h2>

      <ul className="mb-8 list-disc space-y-3 pl-6">
        <li>राजस्थान के राज्यपाल और मुख्यमंत्री</li>
        <li>राजस्थान विधानसभा और विधान प्रक्रिया</li>
        <li>राजस्थान उच्च न्यायालय</li>
        <li>राज्य मंत्रिपरिषद</li>
        <li>राजस्थान लोक सेवा आयोग</li>
        <li>पंचायती राज व्यवस्था</li>
        <li>नगरपालिका और नगरीय स्थानीय स्वशासन</li>
        <li>जिला प्रशासन और प्रशासनिक संरचना</li>
      </ul>

      <h2 className="mb-3 text-2xl font-bold">राजव्यवस्था की तैयारी कैसे करें?</h2>

      <p className="mb-6 leading-8">
        संवैधानिक प्रावधानों, संस्थाओं के कार्यों, पदाधिकारियों
        और स्थानीय शासन की संरचना को समझें। महत्वपूर्ण तथ्यों
        का नियमित पुनराभ्यास करें।
      </p>

      <h2 className="mb-3 text-2xl font-bold">राजस्थान Polity ऑनलाइन टेस्ट</h2>

      <p className="mb-6 leading-8">
        TOPPER TEST पर राजस्थान राजव्यवस्था के विषयवार प्रश्नों
        और ऑनलाइन टेस्ट से अपनी तैयारी जाँचें।
      </p>

      <Link
        className="inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white"
        href="/"
      >
        TOPPER TEST पर टेस्ट दें
      </Link>

      <p className="mt-8">
        <Link className="text-blue-700 underline" href="/rajasthan-gk">
          राजस्थान GK के सभी विषय देखें
        </Link>
      </p>
    </main>
  );
}
