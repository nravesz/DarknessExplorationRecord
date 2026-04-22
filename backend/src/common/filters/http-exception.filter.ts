import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import { MongoServerError } from 'mongodb';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		const { status, message } = this.resolve(exception);
		response.status(status).json({ statusCode: status, message });
	}

	private resolve(exception: unknown): { status: number; message: string } {
		if (exception instanceof HttpException) {
			const response = exception.getResponse();
			const message =
				typeof response === 'object' && 'message' in response
					? (response as { message: string | string[] }).message
					: exception.message;
			return { status: exception.getStatus(), message: message as string };
		}

		if (exception instanceof MongooseError.ValidationError) {
			const message = Object.values(exception.errors)
				.map((e) => e.message)
				.join(', ');
			return { status: HttpStatus.BAD_REQUEST, message };
		}

		if (exception instanceof MongooseError.CastError) {
			return { status: HttpStatus.BAD_REQUEST, message: `Invalid value for field '${exception.path}'` };
		}

		if (exception instanceof MongoServerError && exception.code === 11000) {
			const field = Object.keys(exception.keyValue ?? {})[0] ?? 'field';
			return { status: HttpStatus.CONFLICT, message: `Duplicate value for '${field}'` };
		}

		return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error' };
	}
}
