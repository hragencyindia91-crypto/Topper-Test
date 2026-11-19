
export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold text-blue-950 mb-6">
          Disclaimer - TOPPER TEST
        </h1>

        <p className="text-gray-700 leading-8">
          TOPPER TEST एक ऑनलाइन शैक्षणिक प्लेटफॉर्म है। इसका उद्देश्य
          विद्यार्थियों को प्रतियोगी परीक्षाओं की तैयारी में मदद करना है।
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">1. Educational Purpose</h2>
        <p className="text-gray-700 leading-8">
          वेबसाइट पर उपलब्ध प्रश्न और अध्ययन सामग्री केवल शिक्षा और अभ्यास के लिए हैं।
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">2. Accuracy of Information</h2>
        <p className="text-gray-700 leading-8">
          हम सही जानकारी देने का प्रयास करते हैं, लेकिन इसकी पूर्ण सटीकता की गारंटी नहीं देते।
          विद्यार्थी महत्वपूर्ण जानकारी का आधिकारिक स्रोतों से सत्यापन करें।
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">3. Official Website</h2>
        <p className="text-gray-700 leading-8">
          TOPPER TEST किसी सरकारी विभाग या परीक्षा आयोजित करने वाली संस्था की आधिकारिक वेबसाइट नहीं है।
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">4. External Links</h2>
        <p className="text-gray-700 leading-8">
          बाहरी वेबसाइटों के लिंक की सामग्री और नीतियों की जिम्मेदारी संबंधित वेबसाइट की होगी।
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">5. Contact</h2>
        <p className="text-gray-700 leading-8">
          किसी भी प्रश्न के लिए +91-6378053842 पर संपर्क करें।
        </p>

        <a href="/" className="inline-block mt-8 bg-blue-950 text-white px-6 py-3 rounded-lg">
          Home पर जाएँ
        </a>
      </div>
    </main>
  );
}
