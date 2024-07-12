import RequestRide from '../../application/useCase/ride/RequestRide';
import HttpServer from '../http/HttpServer';

export default class RideController {
  constructor(
    readonly httpServer: HttpServer,
    readonly requestRide: RequestRide
  ) {
    this.httpServer.register(
      'post',
      '/request',
      async (params: any, body: any) => {
        const input = body;
        const output = await this.requestRide.execute(input);
        return output;
      }
    );
  }
}
