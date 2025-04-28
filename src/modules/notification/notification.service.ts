import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Injectable()
export class NotificationService {
  constructor(private readonly websocketGateway: WebsocketGateway) {}

  notifyProcessingFinished(data: any) {
    this.websocketGateway.notifyProcessingFinished(data);
  }
}
