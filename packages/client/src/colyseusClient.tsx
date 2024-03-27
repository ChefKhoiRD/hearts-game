import { Client, Room } from 'colyseus.js';

// Set up Colyseus Client
const client = new Client('https://flooring-stopping-sg-beginners.trycloudflare.com');

// Function to join a Colyseus room
export async function joinRoom(roomName: string): Promise<Room> {
    try {
        return await client.joinOrCreate(roomName);
    } catch (error) {
        console.error('Error joining room:', error);
        throw error;
    }
}

// Function to send a message to a Colyseus room
export function sendMessage(room: Room, messageType: string, data: any): void {
    try {
        room.send(messageType, data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Function to listen for messages from a Colyseus room
export function listenForMessages(room: Room, messageType: string, callback: (message: any) => void): void {
    room.onMessage(messageType, (message: any) => {
        try {
            callback(message);
        } catch (error) {
            console.error('Error handling message:', error);
        }
    });
}
