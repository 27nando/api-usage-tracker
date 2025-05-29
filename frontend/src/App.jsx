import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  const fetchLogs = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/usage', {
        headers: { 'x-api-key': apiKey },
      });

      const data = await res.json();

      if (res.ok) {
        setLogs(data.logs);
        setError('');
      } else {
        setError(data.error || 'Failed to fetch logs');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">API Usage Dashboard</h1>
      <input
        className="border p-2 mt-2"
        placeholder="Enter your API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button className="ml-2 p-2 bg-blue-500 text-white" onClick={fetchLogs}>
        View Usage
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4">
        {logs.length > 0 && (
          <table className="table-auto border-collapse border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Endpoint</th>
                <th className="border px-2 py-1">Method</th>
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Response Time</th>
                <th className="border px-2 py-1">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{log.endpoint}</td>
                  <td className="border px-2 py-1">{log.method}</td>
                  <td className="border px-2 py-1">{log.status_code}</td>
                  <td className="border px-2 py-1">{log.response_time_ms} ms</td>
                  <td className="border px-2 py-1">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
