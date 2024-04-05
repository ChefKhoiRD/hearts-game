import express, { Application, Request, Response } from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
import path from 'path';
import fetch from 'cross-fetch';
import { setupColyseusServer } from './setupColyseusServer'; // Ensure the path is correct
import { monitor } from '@colyseus/monitor';

dotenv.config({ path: '../../.env' });

const app: Application = express();
const port: number = Number(process.env.PORT) || 3001;

// Setup Colyseus Server
const gameServer = setupColyseusServer(app);

// Middleware for parsing JSON bodies
app.use(express.json());

// Serving static files in production from the built client app
if (process.env.NODE_ENV === 'production') {
    const clientBuildPath = path.join(__dirname, '../../client/dist');
    app.use(express.static(clientBuildPath));

    // Serve the client's index.html for any other request (Single Page Application)
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(clientBuildPath, 'index.html'));
    });
}

// Colyseus monitor (optional for viewing server stats and room states)
if (process.env.ENABLE_MONITOR === 'true') {
    app.use('/colyseus', monitor());
}

// Example API endpoint for Discord OAuth2 token exchange
app.post('/token', async (req: Request, res: Response) => {
    const response = await fetch(`https://discord.com/api/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.VITE_CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: req.body.code,
        }),
    });

    const json = await response.json();
    res.send({ access_token: json.access_token });
});

// Adjusting the route prefix based on NODE_ENV to simplify proxy configuration in development
const apiPrefix = process.env.NODE_ENV === 'production' ? '/api' : '/';
app.use(apiPrefix, (req, res) => {
    res.status(404).send('API route not found');
});

// Start the game server and HTTP server
gameServer.listen(port)
    .then(() => console.log(`Server is running on http://localhost:${port}`))
    .catch(err => console.error(err));
