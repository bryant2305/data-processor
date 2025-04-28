import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ProcessingFinishedPayload } from '../interfaces/ processing-finished-payload.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  notifyProcessingFinished(data: ProcessingFinishedPayload) {
    this.server.emit('processing-finished', data);
  }
}
