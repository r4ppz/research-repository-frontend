const getError = (err: unknown): string => {
  if (err instanceof Error) {
    if (err.message.includes("401")) return "Invalid credentials. Please use your school email.";
    if (err.message.includes("network"))
      return "Network error. Check your connection and try again.";
    return err.message;
  }
  if (typeof err === "string") return err;
  return "An unexpected error occurred. :(";
};

export default getError;
