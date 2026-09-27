import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '@/constants/app.constants';

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export function getPaginationParams(pageQuery?: string | number, limitQuery?: string | number): PaginationParams {
  const page = Math.max(1, Number(pageQuery) || 1);
  const rawLimit = Number(limitQuery) || DEFAULT_PAGE_SIZE;
  const limit = Math.min(MAX_PAGE_SIZE, Math.max(1, rawLimit));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}
