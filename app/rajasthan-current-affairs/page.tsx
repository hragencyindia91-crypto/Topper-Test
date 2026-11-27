
import Link from "next/link";

export const metadata = {
  title: "Rajasthan Current Affairs in Hindi – राजस्थान करंट अफेयर्स | TOPPER TEST",
  description:
    "राजस्थान करंट अफेयर्स हिंदी में पढ़ें। राजस्थान की सरकारी योजनाएँ, नियुक्तियाँ, पुरस्कार, खेल, बजट, महत्वपूर्ण घटनाएँ और प्रतियोगी परीक्षाओं के प्रश्नों की तैयारी करें।",
  alternates: {
    canonical: "https://toppertest.online/rajasthan-current-affairs",
  },
};

export default function RajasthanCurrentAffairsPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="mb-5 text-3xl font-bold">
        राजस्थान करंट अफेयर्स (Rajasthan Current Affairs in Hindi)
      </h1>

      <p className="mb-6 leading-8">
        राजस्थान की प्रतियोगी परीक्षाओं के लिए करंट अफेयर्स
        महत्वपूर्ण विषय है। यहाँ राज्य की योजनाओं, नियुक्तियों,
        पुरस्कारों और महत्वपूर्ण घटनाओं से जुड़ी जानकारी पढ़ें।
      </p>

      <h2 className="mb-3 text-2xl font-bold">प्रमुख विषय</h2>

      <ul className="mb-8 list-disc space-y-3 pl-6">
        <li>राजस्थान की सरकारी योजनाएँ</li>
        <li>राज्य की महत्वपूर्ण नियुक्तियाँ</li>
        <li>पुरस्कार और सम्मान</li>
        <li>खेल और खिलाड़ी</li>
        <li>राजस्थान बजट और आर्थिक सर्वेक्षण</li>
        <li>महत्वपूर्ण सरकारी घोषणाएँ</li>
        <li>राज्य की प्रमुख घटनाएँ और उपलब्धियाँ</li>
      </ul>

      <h2 className="mb-3 text-2xl font-bold">करंट अफेयर्स की तैयारी कैसे करें?</h2>

      <p className="mb-6 leading-8">
        नियमित रूप से नवीनतम और विश्वसनीय स्रोतों से जानकारी पढ़ें।
        घटनाओं की तारीख, संबंधित व्यक्ति, स्थान और महत्वपूर्ण तथ्यों
        को समझें। पुराने तथ्यों को वर्तमान जानकारी से अलग रखें।
      </p>

      <h2 className="mb-3 text-2xl font-bold">राजस्थान करंट अफेयर्स टेस्ट</h2>

      <p className="mb-6 leading-8">
        TOPPER TEST पर करंट अफेयर्स के प्रश्नों और ऑनलाइन टेस्ट
        के माध्यम से अपनी तैयारी जाँचें।
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
