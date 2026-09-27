const rateLimitStore = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(ip: string, limit = 100, windowMs = 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || record.expiresAt < now) {
    rateLimitStore.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}
