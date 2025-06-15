

export const inngest = new inngest({
  id: "finance-platform", // Unique app ID
  name: "Finance Platform",
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, 
    maxAttempts: 2,
  }),
});