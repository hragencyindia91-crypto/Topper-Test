
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold text-blue-950 mb-6">
          About Us - TOPPER TEST
        </h1>

        <p className="text-gray-700 leading-8">
          TOPPER TEST एक ऑनलाइन शैक्षणिक प्लेटफॉर्म है,
          जिसका उद्देश्य राजस्थान की प्रतियोगी परीक्षाओं
          की तैयारी करने वाले विद्यार्थियों को अभ्यास की सुविधा देना है।
        </p>

        <p className="text-gray-700 leading-8 mt-4">
          यहाँ विद्यार्थी राजस्थान इतिहास, भूगोल, कला एवं संस्कृति,
          राजव्यवस्था और अन्य विषयों के ऑनलाइन टेस्ट दे सकते हैं।
        </p>

        <a href="/" className="inline-block mt-8 bg-blue-950 text-white px-6 py-3 rounded-lg">
          Home पर जाएँ
        </a>
      </div>
      <footer className="bg-slate-950 text-white py-8 px-5 mt-10">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-xl font-bold mb-4">TOPPER TEST</h2>

    <div className="flex flex-wrap justify-center gap-6 text-sm">
      <a href="/about" className="hover:text-blue-400">About Us</a>
      <a href="/contact" className="hover:text-blue-400">Contact Us</a>
      <a href="/privacy-policy" className="hover:text-blue-400">Privacy Policy</a>
      <a href="/disclaimer" className="hover:text-blue-400">Disclaimer</a>
      <a href="/terms" className="hover:text-blue-400">Terms & Conditions</a>
      <a href="/refund-policy" className="hover:text-blue-400">Refund Policy</a>
    </div>

    <p className="text-gray-400 text-sm mt-6">
      © 2026 TOPPER TEST. All Rights Reserved.
    </p>
  </div>
</footer>
    </main>
  );
}
