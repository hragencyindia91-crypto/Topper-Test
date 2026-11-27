
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rajasthan History GK Test | राजस्थान इतिहास की तैयारी – TOPPER TEST",
  description:
    "राजस्थान इतिहास GK की तैयारी करें। राजस्थान के इतिहास, राजवंशों, युद्धों, शिलालेखों और ऐतिहासिक स्थलों से जुड़े महत्वपूर्ण विषयों का अध्ययन करें। TOPPER TEST पर ऑनलाइन टेस्ट की तैयारी करें।",
  keywords: [
    "Rajasthan History",
    "Rajasthan History GK",
    "Rajasthan History Online Test",
    "राजस्थान इतिहास",
    "राजस्थान इतिहास प्रश्न",
    "Rajasthan GK Test",
  ],
  alternates: {
    canonical: "https://toppertest.online/rajasthan-history",
  },
};

export default function RajasthanHistoryPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-blue-950 to-indigo-700 text-white px-5 py-14">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black mb-5">
            राजस्थान इतिहास – Rajasthan History GK
          </h1>

          <p className="text-lg text-blue-100 leading-8">
            राजस्थान के इतिहास की तैयारी करें। यहाँ राजस्थान के
            प्रमुख राजवंशों, युद्धों, शिलालेखों, दुर्गों और
            ऐतिहासिक घटनाओं से संबंधित अध्ययन सामग्री और
            ऑनलाइन टेस्ट की जानकारी मिलेगी।
          </p>

          <Link
            href="/"
            className="inline-block mt-7 bg-yellow-400 text-blue-950 font-bold px-7 py-3 rounded-xl"
          >
            राजस्थान इतिहास के टॉपिक्स देखें →
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-10">
        <h2 className="text-2xl font-bold text-blue-950 mb-5">
          राजस्थान इतिहास के महत्वपूर्ण विषय
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "राजस्थान का प्राचीन इतिहास",
            "राजस्थान के प्रमुख राजवंश",
            "मेवाड़ का इतिहास",
            "मारवाड़ का इतिहास",
            "राजस्थान के प्रमुख युद्ध",
            "राजस्थान के शिलालेख",
            "राजस्थान के प्रमुख दुर्ग",
            "1857 की क्रांति और राजस्थान",
          ].map((topic) => (
            <div
              key={topic}
              className="bg-white border rounded-xl p-5 font-semibold"
            >
              {topic}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-blue-950 mt-10 mb-4">
          राजस्थान इतिहास की तैयारी किन परीक्षाओं के लिए करें?
        </h2>

        <p className="text-slate-700 leading-8">
          राजस्थान इतिहास राजस्थान CET, राजस्थान पुलिस,
          पटवारी, LDC, SI और अन्य प्रतियोगी परीक्षाओं की
          तैयारी का महत्वपूर्ण हिस्सा है। नियमित अभ्यास,
          महत्वपूर्ण प्रश्नों और ऑनलाइन टेस्ट से अपनी
          तैयारी बेहतर बनाएँ।
        </p>

        <div className="bg-white border rounded-xl p-6 mt-8">
          <h2 className="text-xl font-bold mb-3">
            TOPPER TEST – राजस्थान GK ऑनलाइन टेस्ट
          </h2>

          <p className="text-slate-600 mb-5">
            राजस्थान GK और प्रतियोगी परीक्षाओं की तैयारी
            के लिए TOPPER TEST से जुड़ें।
          </p>

          <Link
            href="/"
            className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
          >
            सभी विषय देखें →
          </Link>
        </div>
      </section>
    </main>
  );
}
