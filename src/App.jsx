import React, { useEffect, useState } from "react";
import { SimplePool } from "nostr-tools/pool";

const RELAYS = [
  "wss://relay.damus.io", 
  "wss://relay.snort.social",
];

const pool = new SimplePool();

function calculatePoW(eventId) {
  // eventId is a hex string. We'll count leading zero bits as PoW.
  // Convert hex to binary string:
  const bin = BigInt("0x" + eventId).toString(2).padStart(256, "0");

  let count = 0;
  for (const bit of bin) {
    if (bit === "0") count++;
    else break;
  }
  return count;
}

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const events = [];

    // Subscribe to events
    const sub = pool.subscribe(
      RELAYS,
      {
        kinds: [1], // Text notes
        limit: 50,
      },
      {
        onevent(event) {
          // Calculate PoW
          const pow = calculatePoW(event.id);

          // Avoid duplicates
          if (!events.find((e) => e.id === event.id)) {
            events.push({ ...event, pow });
            // Sort descending by PoW
            events.sort((a, b) => b.pow - a.pow);
            setNotes([...events].slice(0, 10)); // Only keep top 10 notes
          }
        }
      }
    );

    // Clean up function
    return () => {
      sub.close(); // Close the subscription
    };
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h1>Nostr Notes with Proof-of-Work (PoW)</h1>
      {notes.length === 0 && <p>Loading notes...</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map(({ id, content, pubkey, pow }) => (
          <li key={id} style={{ marginBottom: 20, borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
            <p><strong>PoW:</strong> {pow} leading zero bits</p>
            <p>{content}</p>
            <p style={{ fontSize: 12, color: "#666" }}>By: {pubkey.slice(0, 8)}...{pubkey.slice(-8)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;