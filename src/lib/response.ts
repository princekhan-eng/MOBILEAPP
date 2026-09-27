import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';

export function successResponse<T>(data: T, message?: string, status = 200, meta?: ApiResponse['meta']) {
  const body: ApiResponse<T> = {
    success: true,
    message,
    data,
    meta,
  };
  return NextResponse.json(body, { status });
}

export function errorResponse(message: string, status = 400, errors?: any) {
  const body: ApiResponse = {
    success: false,
    message,
    error: message,
    errors,
  };
  return NextResponse.json(body, { status });
}
