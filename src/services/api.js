/**
 * Fetches server data from servers.json.
 * @returns {Promise<Array>} List of server objects.
 */
export async function getServers() {
  const resp = await fetch('/data/servers.json');
  if (!resp.ok) throw new Error('Failed to load server data');
  return resp.json();
}