
import { SecurityChatbot } from "@/components/SecurityChatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">SecureBot Sentinel</h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Your AI-powered cybersecurity assistant is ready to help.
        </p>
        <div className="grid gap-6">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-security-safe flex items-center justify-center">
                  <span className="text-white text-sm">1</span>
                </span>
                <span>Click the shield icon in the bottom right to open the security chatbot</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-security-safe flex items-center justify-center">
                  <span className="text-white text-sm">2</span>
                </span>
                <span>Ask security-related questions or drag and drop files for analysis</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-security-safe flex items-center justify-center">
                  <span className="text-white text-sm">3</span>
                </span>
                <span>Get real-time security insights and recommendations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <SecurityChatbot />
    </div>
  );
};

export default Index;
