
import Link from "next/link";

export const metadata = {
  title: "Rajasthan History in Hindi – राजस्थान का इतिहास | TOPPER TEST",
  description:
    "राजस्थान का इतिहास हिंदी में पढ़ें। प्राचीन सभ्यताओं, प्रमुख राजवंशों, दुर्गों, युद्धों, स्वतंत्रता आंदोलन और महत्वपूर्ण ऐतिहासिक तथ्यों की जानकारी प्राप्त करें।",
  alternates: {
    canonical: "https://toppertest.online/rajasthan-history",
  },
};

export default function RajasthanHistoryPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="mb-5 text-3xl font-bold">
        राजस्थान का इतिहास (Rajasthan History in Hindi)
      </h1>

      <p className="mb-6 leading-8">
        राजस्थान का इतिहास वीरता, शौर्य, बलिदान और गौरवशाली परंपराओं
        से जुड़ा हुआ है। राजस्थान GK की तैयारी के लिए यहाँ प्रमुख
        ऐतिहासिक विषयों का अध्ययन करें।
      </p>

      <h2 className="mb-3 text-2xl font-bold">राजस्थान इतिहास के प्रमुख विषय</h2>

      <ul className="mb-8 list-disc space-y-3 pl-6">
        <li>राजस्थान की प्राचीन सभ्यताएँ और पुरातात्विक स्थल</li>
        <li>गुहिल, चौहान, राठौड़ और कछवाहा राजवंश</li>
        <li>मेवाड़, मारवाड़, आमेर और बीकानेर का इतिहास</li>
        <li>राजस्थान के प्रमुख दुर्ग और ऐतिहासिक स्मारक</li>
        <li>प्रमुख युद्ध और ऐतिहासिक घटनाएँ</li>
        <li>1857 की क्रांति और राजस्थान का स्वतंत्रता आंदोलन</li>
        <li>राजस्थान का एकीकरण</li>
      </ul>

      <h2 className="mb-3 text-2xl font-bold">इतिहास की तैयारी कैसे करें?</h2>

      <p className="mb-6 leading-8">
        इतिहास पढ़ते समय राजवंशों, शासकों, युद्धों, घटनाओं और उनके
        समयक्रम को समझें। प्रत्येक विषय के बाद महत्वपूर्ण प्रश्नों
        का अभ्यास करें और नियमित मॉक टेस्ट दें।
      </p>

      <h2 className="mb-3 text-2xl font-bold">राजस्थान इतिहास ऑनलाइन टेस्ट</h2>

      <p className="mb-6 leading-8">
        अपनी तैयारी जाँचने के लिए TOPPER TEST पर राजस्थान GK के
        विषयवार ऑनलाइन टेस्ट का अभ्यास करें।
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

