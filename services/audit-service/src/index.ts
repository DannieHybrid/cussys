export function logEvent(event: string, metadata?: any) {
  console.log({
    event,
    metadata,
    timestamp: new Date().toISOString(),
  });
}
