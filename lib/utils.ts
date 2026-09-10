export function delay(ms: number, enabled = true) {
  return enabled ? new Promise(resolve => setTimeout(resolve, ms)) : Promise.resolve();
}
