import React, { useState } from 'react';

const TestCase = ({ testCase, onUpdate }) => {
  const [status, setStatus] = useState('');
  const [comments, setComments] = useState('');

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onUpdate({ status: newStatus, comments });
  };

  const handleCommentsChange = (e) => {
    const newComments = e.target.value;
    setComments(newComments);
    onUpdate({ status, comments: newComments });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md mb-4">
      <div dangerouslySetInnerHTML={{ __html: testCase }} />
      <div className="mt-4">
        <label htmlFor="status" className="block text-sm font-medium mb-2">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className="w-full p-2 bg-gray-700 rounded-md"
        >
          <option value="">Select Status</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>
      </div>
      <div className="mt-4">
        <label htmlFor="comments" className="block text-sm font-medium mb-2">
          Comments
        </label>
        <textarea
          id="comments"
          value={comments}
          onChange={handleCommentsChange}
          className="w-full p-2 bg-gray-700 rounded-md"
          rows="4"
        />
      </div>
    </div>
  );
};

export default TestCase;