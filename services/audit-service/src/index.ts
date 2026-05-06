export function logEvent(event: string, data: any) {
  console.log(`[AUDIT] ${event}`, data);
}
