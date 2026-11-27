
import Link from "next/link";

export const metadata = {
  title: "Rajasthan Art and Culture in Hindi – राजस्थान कला एवं संस्कृति | TOPPER TEST",
  description:
    "राजस्थान की कला एवं संस्कृति हिंदी में पढ़ें। लोक नृत्य, लोक संगीत, मेले, त्योहार, चित्रकला, हस्तशिल्प, लोक देवता और वेशभूषा की जानकारी प्राप्त करें।",
  alternates: {
    canonical: "https://toppertest.online/rajasthan-art-culture",
  },
};

export default function RajasthanArtCulturePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="mb-5 text-3xl font-bold">
        राजस्थान की कला एवं संस्कृति (Rajasthan Art and Culture)
      </h1>

      <p className="mb-6 leading-8">
        राजस्थान अपनी समृद्ध लोक संस्कृति, परंपराओं, संगीत, नृत्य,
        चित्रकला और हस्तशिल्प के लिए प्रसिद्ध है। प्रतियोगी परीक्षाओं
        की तैयारी के लिए इन सभी विषयों का अध्ययन करें।
      </p>

      <h2 className="mb-3 text-2xl font-bold">प्रमुख विषय</h2>

      <ul className="mb-8 list-disc space-y-3 pl-6">
        <li>राजस्थान के लोक नृत्य और लोक संगीत</li>
        <li>प्रमुख लोक देवता और लोक देवियाँ</li>
        <li>राजस्थान के मेले और त्योहार</li>
        <li>राजस्थानी चित्रकला की प्रमुख शैलियाँ</li>
        <li>लोक नाट्य और कठपुतली कला</li>
        <li>राजस्थान की हस्तकलाएँ और हस्तशिल्प</li>
        <li>प्रमुख आभूषण, वेशभूषा और लोक परंपराएँ</li>
        <li>राजस्थान की बोलियाँ और साहित्य</li>
      </ul>

      <h2 className="mb-3 text-2xl font-bold">तैयारी कैसे करें?</h2>

      <p className="mb-6 leading-8">
        प्रत्येक लोक नृत्य, मेले, त्योहार और चित्रकला शैली के
        उद्गम, विशेषताओं और संबंधित क्षेत्र को समझें। इसके बाद
        महत्वपूर्ण प्रश्नों से अभ्यास करें।
      </p>

      <h2 className="mb-3 text-2xl font-bold">ऑनलाइन अभ्यास</h2>

      <p className="mb-6 leading-8">
        TOPPER TEST पर राजस्थान कला एवं संस्कृति से संबंधित
        विषयवार ऑनलाइन टेस्ट देकर अपनी तैयारी जाँचें।
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
