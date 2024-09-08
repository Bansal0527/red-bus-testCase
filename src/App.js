import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import TestCaseList from './components/TestCaseList';

const App = () => {
  const [testCases, setTestCases] = useState([]);

  const handleTestCasesGenerated = (generatedTestCases) => {
    setTestCases(generatedTestCases);
  };

  const handleSubmitResults = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/submit_results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test_cases: testCases }),
      });
      const data = await response.json();
      console.log('Results submitted:', data);
      // Handle the response as needed (e.g., show a success message)
    } catch (error) {
      console.error('Error submitting results:', error);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Red Bus Testing Tool</h1>
      <UploadForm onTestCasesGenerated={handleTestCasesGenerated} />
      {testCases.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Generated Test Cases</h2>
          <TestCaseList testCases={testCases} />
          <button
            onClick={handleSubmitResults}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Results
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
