import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-6 py-10 flex justify-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-4 border-b pb-2">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-6">
          Your privacy is important to us. We collect minimal data and use it
          only to enhance your experience on our site.
        </p>

        <p className="text-gray-700 mb-6">
          We may use cookies for analytics or performance improvements. By using
          this site, you agree to this policy.
        </p>

        <p className="text-gray-700">
          We do not share personal data with third parties.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
