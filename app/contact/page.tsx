
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold text-blue-950 mb-6">
          Contact Us - TOPPER TEST
        </h1>

        <p className="text-gray-700 leading-8">
          TOPPER TEST से संबंधित किसी भी प्रश्न, सुझाव या समस्या के लिए
          आप हमसे संपर्क कर सकते हैं।
        </p>

        <div className="mt-6 space-y-3 text-gray-700">
          <p>
  <strong>Phone:</strong> +91-6378053842
</p>
          <p><strong>Website:</strong> TOPPER TEST</p>
        </div>

        <a
          href="/"
          className="inline-block mt-8 bg-blue-950 text-white px-6 py-3 rounded-lg"
        >
          Home पर जाएँ
        </a>
      </div>
    </main>
  );
}
