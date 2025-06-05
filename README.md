# Nostr PoW Client

A React-based web client that displays Nostr notes ranked by Proof-of-Work (PoW). The client subscribes to Nostr relays and calculates the PoW for each note, displaying the top 10 notes with the highest PoW.

## Features

- Subscribes to Nostr relays for text notes (kind 1)
- Calculates Proof-of-Work for each note by counting leading zero bits in the note ID
- Ranks and displays the top 10 notes by PoW
- Shows note content, author public key, and PoW score
- Auto-updates as new notes are received

## Implementation Details

- Built with React + Vite
- Uses the Nostr protocol for decentralized content distribution
- Implements real-time subscription and PoW calculation
- Responsive design with clean UI

## Live Demo

The application is deployed at: https://DhananjayPurohit.github.io/nostr-pow-client/

## Development

To run locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
