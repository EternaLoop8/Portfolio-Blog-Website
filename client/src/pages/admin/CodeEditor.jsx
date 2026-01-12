import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { BOILERPLATES } from './constants';

const Boilerplates = () => BOILERPLATES

const CodeEditor = () => {
  const [language, setLanguage] = useState('cpp'); 
  const [code, setCode] = useState(Boilerplates.cpp); 

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(Boilerplates[newLang]);
  };

  const languages = [
    { id: 'c', name: 'C' },
    { id: 'cpp', name: 'C++' },
    { id: 'javascript', name: 'JavaScript' },
  ];

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-2"> 
      <div className="flex justify-end">
        <div className="flex gap-4 bg-slate-700 p-2 rounded-lg">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => handleLanguageChange(lang.id)}
              className={`px-4 py-1 text-sm rounded transition-colors ${
                language === lang.id
                  ? 'bg-blue-600 text-white font-semibold' 
                  : 'text-gray-300 hover:bg-slate-600'    
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-slate-700 rounded-md overflow-hidden shadow-lg">
        <Editor
          height="400px" 
          theme="vs-dark"
          language={language}
          value={code}
          onChange={(val) => setCode(val)}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true, 
            padding: { top: 10 }
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
