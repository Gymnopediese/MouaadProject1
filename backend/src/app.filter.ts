import { Catch, ArgumentsHost, ExceptionFilter, Module, NestModule, MiddlewareConsumer, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { status } from './status';

@Catch()
export class ErrorToKokoFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
	const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

	console.log("ERROR", exception);
	if (typeof(exception) == 'string')
		response
		.status(200)
		.json({
			status: exception,
			// timestamp: new Date().toISOString(),
			// path: request.url,
		});
	else
		response
		.status(exception.response.statusCode)
		.json(exception.response);
  }
}

// @Injectable()
// export class ErrorToKokoMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction): void {
	
//     try {
//       next();
//     } catch (error) {
//     }
//   }
// }