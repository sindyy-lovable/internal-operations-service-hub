import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [description, setDescription] = React.useState('');
  const [requestId, setRequestId] = React.useState('');
  const [status, setStatus] = React.useState('SUBMITTED');
  const [message, setMessage] = React.useState('');
  const [actor, setActor] = React.useState('IT');

  const [aiCategory, setAiCategory] = React.useState('');
  const [aiSummary, setAiSummary] = React.useState('');
  const [aiNeedsClarification, setAiNeedsClarification] =
    React.useState(false);

  async function analyzeRequest() {
    setMessage('Analyzing request...');

    const response = await fetch('http://localhost:3000/ai-intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ freeText: description }),
    });

    if (!response.ok) {
      const error = await response.text();
      setMessage(error);
      return;
    }

    const suggestion = await response.json();

    setAiCategory(suggestion.category);
    setAiSummary(suggestion.summary);
    setAiNeedsClarification(suggestion.needsClarification);
    setMessage('AI suggestion ready');
  }

  async function createRequest() {
    const response = await fetch('http://localhost:3000/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) {
      const error = await response.text();
      setMessage(error);
      return;
    }

    const created = await response.json();
    setRequestId(created.id);
    setStatus(created.status);
    setMessage(`Created ${created.id}`);
  }

  async function transition() {
    const response = await fetch(
      `http://localhost:3000/requests/${requestId}/status`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'IN_PROGRESS',
          actor,
          department: 'IT',
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      setMessage(error);
      return;
    }

    const updated = await response.json();
    setStatus(updated.status);
    setMessage(`Transitioned ${requestId} to ${updated.status}`);
  }

  return (
    <div>
      <h1>Internal Operations Service Hub</h1>

      <label>Describe your request</label>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={analyzeRequest}>AI Assist</button>

      {aiSummary && (
        <div>
          <h2>AI Suggestion</h2>
          <p>Category: {aiCategory}</p>
          <p>Summary: {aiSummary}</p>
          <p>
            Needs clarification: {aiNeedsClarification ? 'Yes' : 'No'}
          </p>
          <button onClick={() => setDescription(aiSummary)}>
            Use AI Summary
          </button>
        </div>
      )}

      <button onClick={createRequest}>Create request</button>

      <br />

      <label>Request ID</label>
      <input
        value={requestId}
        onChange={(e) => setRequestId(e.target.value)}
      />

      <label>Actor department</label>
      <select value={actor} onChange={(e) => setActor(e.target.value)}>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
      </select>

      <button onClick={transition}>Transition to IN_PROGRESS</button>

      <p>Status: {status}</p>
      <pre>{message}</pre>
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<App />);