import { userService } from './user.service';
import { updateUserSchema } from './user.schema';
import { successResponse, errorResponse } from '@/lib/response';

export class UserController {
  async getAll(searchParams: URLSearchParams) {
    try {
      const page = Number(searchParams.get('page')) || 1;
      const limit = Number(searchParams.get('limit')) || 10;
      const search = searchParams.get('search') || undefined;
      const result = await userService.getUsers(page, limit, search);
      return successResponse(result.users, 'Users retrieved successfully', 200, result.meta);
    } catch (error: any) {
      return errorResponse(error.message, 400);
    }
  }

  async getById(id: string) {
    try {
      const user = await userService.getUserById(id);
      return successResponse(user, 'User retrieved successfully');
    } catch (error: any) {
      return errorResponse(error.message, 404);
    }
  }

  async update(id: string, body: any) {
    try {
      const parsed = updateUserSchema.parse(body);
      const updated = await userService.updateUser(id, parsed);
      return successResponse(updated, 'User updated successfully');
    } catch (error: any) {
      return errorResponse(error.message, 400);
    }
  }

  async delete(id: string) {
    try {
      await userService.deleteUser(id);
      return successResponse(null, 'User deleted successfully');
    } catch (error: any) {
      return errorResponse(error.message, 400);
    }
  }
}

export const userController = new UserController();
