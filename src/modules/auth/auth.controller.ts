import { authService } from './auth.service';
import { registerSchema, loginSchema } from './auth.schema';
import { successResponse, errorResponse } from '@/lib/response';

export class AuthController {
  async register(reqBody: any) {
    try {
      const parsed = registerSchema.parse(reqBody);
      const result = await authService.register(parsed);
      return successResponse(result, 'Registration successful', 201);
    } catch (error: any) {
      return errorResponse(error.message || 'Registration failed', 400);
    }
  }

  async login(reqBody: any) {
    try {
      const parsed = loginSchema.parse(reqBody);
      const result = await authService.login(parsed);
      return successResponse(result, 'Login successful', 200);
    } catch (error: any) {
      return errorResponse(error.message || 'Login failed', 400);
    }
  }
}

export const authController = new AuthController();
