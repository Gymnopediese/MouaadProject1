
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtService } from './JWT';
import { status } from './status';
import { Reflector } from '@nestjs/core';
  
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private rights: number = 0){}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token)
		{
			console.log("no token")
			throw new UnauthorizedException();
		}
		var payload
		try
		{
			payload = jwtService.verify(token);
		} catch
		{
			console.log("invalid", token);
			throw new UnauthorizedException();
		}
		if (payload.rights < this.rights)
			throw new UnauthorizedException();

		request['user'] = payload;
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
