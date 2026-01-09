import React from "react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-6 py-10 flex justify-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-4 border-b pb-2">
          Terms & Conditions
        </h1>

        <p className="text-gray-700 mb-6">
          By accessing <span className="font-semibold">EternaLoop8</span>, you
          agree to follow the terms outlined here.
        </p>

        <ol className="list-decimal list-inside space-y-3 text-gray-800 mb-6">
          <li>You may not republish content without permission.</li>
          <li>Our content is for informational purposes only.</li>
          <li>We are not responsible for third-party links or content.</li>
        </ol>

        <p className="text-gray-700">
          Use of this site means acceptance of these terms.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
