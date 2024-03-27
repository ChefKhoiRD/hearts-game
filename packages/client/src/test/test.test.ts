import { Client, Room } from 'colyseus.js';
import { joinRoom, sendMessage, listenForMessages } from '../colyseusClient';

// Mock the Colyseus client and room
jest.mock('colyseus.js');
const mockClient = new Client('ws://localhost:3000/') as jest.Mocked<Client>;
const mockRoom = {} as jest.Mocked<Room>;

describe('Colyseus Client Functions', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear mock calls before each test
    });
  
    describe('joinRoom', () => {
      it('should join a Colyseus room', async () => {
        await joinRoom('test-room');
        expect(mockClient.joinOrCreate).toHaveBeenCalledWith('test-room');
      });
  
      it('should handle errors when joining a room', async () => {
        const errorMessage = 'Failed to join room';
        mockClient.joinOrCreate.mockRejectedValue(new Error(errorMessage));
        await expect(joinRoom('test-room')).rejects.toThrow(errorMessage);
      });
    });

//   describe('sendMessage', () => {
//     it('should send a message to a Colyseus room', () => {
//       sendMessage(mockRoom, 'test-message', { data: 'test-data' });
//       expect(mockRoom.send).toHaveBeenCalledWith('test-message', { data: 'test-data' });
//     });

//     it('should handle errors when sending a message', () => {
//       const errorMessage = 'Failed to send message';
//       mockRoom.send.mockImplementation(() => {
//         throw new Error(errorMessage);
//       });
//       expect(() => sendMessage(mockRoom, 'test-message', {})).toThrow(errorMessage);
//     });
//   });

//   describe('listenForMessages', () => {
//     it('should listen for messages from a Colyseus room', () => {
//       const callback = jest.fn();
//       listenForMessages(mockRoom, 'test-message', callback);
//       const message = { data: 'test-data' };
//       mockRoom.onMessage.mock.calls[0][1](message);
//       expect(callback).toHaveBeenCalledWith(message);
//     });

//     it('should handle errors when listening for messages', () => {
//       const errorMessage = 'Failed to handle message';
//       const callback = jest.fn(() => {
//         throw new Error(errorMessage);
//       });
//       listenForMessages(mockRoom, 'test-message', callback);
//       const message = { data: 'test-data' };
//       expect(() => mockRoom.onMessage.mock.calls[0][1](message)).toThrow(errorMessage);
//     });
//   });
});
