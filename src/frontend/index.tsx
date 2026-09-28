import React from 'react';
import ReactDOM from 'react-dom/client';

const API_BASE_URL =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : '';

type RequestStatus = 'SUBMITTED' | 'IN_PROGRESS' | 'COMPLETED';

function App() {
  const [description, setDescription] = React.useState('');
  const [requestId, setRequestId] = React.useState('');
  const [status, setStatus] = React.useState<RequestStatus>('SUBMITTED');
  const [message, setMessage] = React.useState('');
  const [actor, setActor] = React.useState('IT');

  const [aiCategory, setAiCategory] = React.useState('');
  const [aiSummary, setAiSummary] = React.useState('');
  const [aiNeedsClarification, setAiNeedsClarification] =
    React.useState(false);

  React.useEffect(() => {
    const savedRequestId = window.localStorage.getItem('lastRequestId');

    if (savedRequestId) {
      setRequestId(savedRequestId);
      void loadRequest(savedRequestId);
    }
  }, []);

  async function analyzeRequest() {
    setMessage('Analyzing request...');

    const response = await fetch(`${API_BASE_URL}/ai-intake`, {
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
    const response = await fetch(`${API_BASE_URL}/requests`, {
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
    window.localStorage.setItem('lastRequestId', created.id);
    setStatus(created.status);
    setMessage(`Created ${created.id}`);
  }

  async function loadRequest(id: string = requestId) {
    const trimmedId = id.trim();

    if (!trimmedId) {
      setMessage('Enter a request ID');
      return;
    }

    const response = await fetch(
      `${API_BASE_URL}/requests/${trimmedId}`,
    );

    if (!response.ok) {
      const error = await response.text();
      setMessage(error);
      return;
    }

    const request = await response.json();

    setRequestId(request.id);
    setDescription(request.description);
    setStatus(request.status);
    window.localStorage.setItem('lastRequestId', request.id);
    setMessage(`Loaded ${request.id}`);
  }

  async function transition(nextStatus: RequestStatus) {
    if (!requestId.trim()) {
      setMessage('Load or create a request first');
      return;
    }

    const response = await fetch(
      `${API_BASE_URL}/requests/${requestId}/status`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: nextStatus,
          actor,
          department: actor,
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

      <button onClick={() => loadRequest()}>Load request</button>

      <br />

      <label>Actor department</label>
      <select value={actor} onChange={(e) => setActor(e.target.value)}>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
      </select>

      {status === 'SUBMITTED' && (
        <button onClick={() => transition('IN_PROGRESS')}>
          Start work
        </button>
      )}

      {status === 'IN_PROGRESS' && (
        <button onClick={() => transition('COMPLETED')}>
          Complete request
        </button>
      )}

      <p>Status: {status}</p>
      <pre>{message}</pre>
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<App />);