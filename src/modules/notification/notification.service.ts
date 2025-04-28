import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { ProcessingFinishedPayload } from '../interfaces/ processing-finished-payload.interface';

@Injectable()
export class NotificationService {
  constructor(private readonly websocketGateway: WebsocketGateway) {}

  notifyProcessingFinished(data: ProcessingFinishedPayload) {
    this.websocketGateway.notifyProcessingFinished(data);
  }
}
