export const enrollInEvent = async (eventId: string, userId: string) => {
  return fetch(`/api/enrollments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId, userId }),
  });
};