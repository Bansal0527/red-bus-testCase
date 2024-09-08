import React, { useState, useEffect } from 'react';
import TestCase from './TestCase';

const TestCaseList = ({ testCases }) => {
  const [testCaseResults, setTestCaseResults] = useState([]);

  useEffect(() => {
    setTestCaseResults(testCases.map(testCase => ({ testCase, status: '', comments: '' })));
  }, [testCases]);

  const handleTestCaseUpdate = (index, updateData) => {
    const updatedResults = [...testCaseResults];
    updatedResults[index] = { ...updatedResults[index], ...updateData };
    setTestCaseResults(updatedResults);
  };

  return (
    <div>
      {testCaseResults.map((testCaseResult, index) => (
        <TestCase
          key={index}
          testCase={testCaseResult.testCase}
          onUpdate={(updateData) => handleTestCaseUpdate(index, updateData)}
        />
      ))}
    </div>
  );
};

export default TestCaseList;