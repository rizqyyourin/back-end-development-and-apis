import http from 'http';
import fs from 'fs';
import { WebSocketServer, WebSocket } from 'ws';

const PORT = 3001;

// 1. Buat HTTP Server
const server = http.createServer((req, res) => {
  fs.readFile('./public/index.html', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

// 2. Buat WebSocket Server
const wss = new WebSocketServer({ server });

// 3. Connection Listener
wss.on('connection', (socket, req) => {
  // 4. Parse username dari URL query
  const username = new URL(req.url, 'http://localhost').searchParams.get('username');

  // Broadcast pesan 'joined' ke SEMUA client
  const joinMessage = JSON.stringify({ type: 'system', text: `${username} joined` });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(joinMessage);
    }
  });

  // 5. Message Listener
  socket.on('message', (data) => {
    try {
      const { username, text } = JSON.parse(data.toString());
      const chatMessage = JSON.stringify({ type: 'chat', username, text });

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(chatMessage);
        }
      });
    } catch (e) {
      console.error(e);
    }
  });

  // 6. Close Listener
  socket.on('close', () => {
    const leaveMessage = JSON.stringify({ type: 'system', text: `${username} left` });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(leaveMessage);
      }
    });
  });
});

// 7. Jalankan Server
server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:3001`);
});