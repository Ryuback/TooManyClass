import { User } from '../user.model';

export interface TaskGroupDto {
  group: Partial<User>[];
}
