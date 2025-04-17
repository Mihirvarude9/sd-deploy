import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generationTime, setGenerationTime] = useState(null);

  const generateImage = async () => {
    setLoading(true);
    setError('');
    setImage('');
    setGenerationTime(null);

    const startTime = Date.now(); // Start time

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/generate`,
        {
          prompt: prompt,
          num_steps: 28,
          guidance_scale: 7.0
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
          }
        }
      );

      const endTime = Date.now(); // End time
      const totalTimeSeconds = ((endTime - startTime) / 1000).toFixed(2); // In seconds

      setImage(`data:image/png;base64,${response.data.image}`);
      setGenerationTime(totalTimeSeconds);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || 'Something went wrong');
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Stable Diffusion 3.5 Generator</h1>
      <input
        type="text"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateImage} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {image && (
        <div>
          <h3>Generated Image</h3>
          <img src={image} alt="Generated" style={{ maxWidth: '100%' }} />
          {generationTime && (
            <p><strong>Time Taken:</strong> {generationTime} seconds</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
