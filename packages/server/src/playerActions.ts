import { BlackjackRoom } from "./rooms/BlackJackRoom";
import { Client } from 'colyseus';

// Function to handle player hitting
// export async function playerHit(playerId: string, room: BlackjackRoom) {
//     try {
//         const player = room.state.players.get(playerId);
//         if (player && !player.isStanding) {
//             const card = room.drawCard(); // Draw a card from the deck
//             if (card) {
//                 player.hand.push(card); // Add the card to the player's hand
//             }
//             room.broadcastGameUpdate(); // Broadcast the updated game state
//             console.log(`Player ${playerId} hit.`);
//             return { success: true, playerId };
//         } else {
//             return { success: false, error: "Player cannot hit." };
//         }
//     } catch (error) {
//         console.error('Error in playerHit:', error); // Log the error
//         throw error; // Re-throw the error to be caught by the catch block in the router handler
//     }
// }

// Function to handle player hitting
export async function playerHit(playerId: string, room: BlackjackRoom) {
    try {
        const player = room.state.players.get(playerId);
        if (!player) {
            return { success: false, error: "Player not found." };
        }
        if (!player.isStanding) {
            const card = room.drawCard(); // Draw a card from the deck
            if (card) {
                player.hand.push(card); // Add the card to the player's hand
            }
            room.broadcastGameUpdate(); // Broadcast the updated game state
            console.log(`Player ${playerId} hit.`);
            return { success: true, playerId };
        } else {
            return { success: false, error: "Player cannot hit." };
        }
    } catch (error) {
        console.error('Error in playerHit:', error); // Log the error
        throw error; // Re-throw the error to be caught by the catch block in the router handler
    }
}


// Function to handle player standing
export async function playerStand(playerId: string, room: BlackjackRoom) {
    const player = room.state.players.get(playerId);
    if (player && !player.isStanding) {
        player.isStanding = true; // Set the player as standing
        room.broadcastGameUpdate(); // Broadcast the updated game state
        console.log(`Player ${playerId} stood.`);
        return { success: true, playerId };
    } else {
        return { success: false, error: "Player cannot stand." };
    }
}
