import { useDataChannel } from '@livekit/components-react';
import { useEffect, useState } from 'react';

/**
 * Listens for real estate data sent by agent on topic "real_estate_matches"
 * and displays the data in a simple list.
 */
export default function RealEstate() {
  // Get the most recent message received on this topic
  const { message } = useDataChannel('real_estate_matches');

  // Local state to hold received results
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (message) {
      try {
        // LiveKit passes message.payload as a string (or Uint8Array for bytes)
        // For compatibility, coerce to string before parsing.
        let dataString;
        if (typeof message.payload === 'string') {
          dataString = message.payload;
        } else {
          // Assume it's a Uint8Array (from .encode('utf-8'))
          dataString = new TextDecoder('utf-8').decode(message.payload);
        }
        const parsed = JSON.parse(dataString);
        if (
          parsed.type === 'matches' && Array.isArray(parsed.data)
        ) {
          setResults(parsed.data);
        }
      } catch (e) {
        console.error("Error parsing real estate results:", e, message);
      }
    }
  }, [message]);

  if (!results) return null;

  console.log(results);

  // Simple presentation; adapt as needed for your app!
  return (
    <div className="my-6">
      <h1>Real Estate</h1>
    </div>
  );
}
