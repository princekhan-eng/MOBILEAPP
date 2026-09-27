import { userRepository } from './user.repository';
import { UpdateUserInput } from './user.types';

export class UserService {
  async getUsers(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;
    const { users, total } = await userRepository.findAll(skip, limit, search);
    return {
      users,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error('User not found');
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async updateUser(id: string, data: UpdateUserInput) {
    return userRepository.update(id, data);
  }

  async deleteUser(id: string) {
    return userRepository.delete(id);
  }
}

export const userService = new UserService();
