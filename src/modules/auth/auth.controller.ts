import { authService } from './auth.service';
import { registerSchema, loginSchema } from './auth.schema';
import { successResponse, errorResponse } from '@/lib/response';

export class AuthController {
  async register(reqBody: any) {
    try {
      const parsed = registerSchema.parse(reqBody);
      const result = await authService.register(parsed);
      const response = successResponse(result, 'Registration successful', 201);
      response.cookies.set('token', result.token, {
        path: '/',
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60,
        sameSite: 'lax',
      });
      return response;
    } catch (error: any) {
      if (error?.issues || error?.errors) {
        return errorResponse('Validation failed', 400, error.issues || error.errors);
      }
      return errorResponse(error.message || 'Registration failed', 400);
    }
  }

  async login(reqBody: any) {
    try {
      const parsed = loginSchema.parse(reqBody);
      const result = await authService.login(parsed);
      const response = successResponse(result, 'Login successful', 200);
      response.cookies.set('token', result.token, {
        path: '/',
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60,
        sameSite: 'lax',
      });
      return response;
    } catch (error: any) {
      if (error?.issues || error?.errors) {
        return errorResponse('Validation failed', 400, error.issues || error.errors);
      }
      return errorResponse(error.message || 'Login failed', 400);
    }
  }

  async me(userId: string) {
    try {
      const user = await authService.getCurrentUser(userId);
      return successResponse(user, 'Session retrieved successfully', 200);
    } catch (error: any) {
      return errorResponse(error.message || 'User not found', 404);
    }
  }

  async logout() {
    const response = successResponse({ loggedOut: true }, 'Successfully logged out', 200);
    response.cookies.delete('token');
    return response;
  }
}

export const authController = new AuthController();
