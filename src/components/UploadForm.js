import React, { useState } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

const UploadForm = ({ onTestCasesGenerated }) => {
  const [context, setContext] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('context', context);
    files.forEach((file) => formData.append('screenshots', file));

    try {
      const response = await fetch('http://127.0.0.1:5000/api/describe', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      // Split the response into individual test cases
      const cases = data.test_cases.split('<strong>Test Case ID:</strong>').filter(Boolean);
      const formattedCases = cases.map(testCase => `<strong>Test Case ID:</strong>${testCase}`);
      onTestCasesGenerated(formattedCases);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="context" className="block text-sm font-medium mb-2">
          Context
        </label>
        <textarea
          id="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded-md"
          rows="4"
        />
      </div>
      <div>
        <label htmlFor="screenshots" className="block text-sm font-medium mb-2">
          Upload Screenshots
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="screenshots"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <CloudArrowUpIcon className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
              id="screenshots"
              type="file"
              multiple
              className="hidden"
              onChange={(e) => setFiles([...e.target.files])}
            />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? 'Generating Test Cases...' : 'Generate Test Cases'}
      </button>
    </form>
  );
};

export default UploadForm;