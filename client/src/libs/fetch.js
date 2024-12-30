export const fetchInstance = (endpoint, options = {}) => {
  const baseURL =
    import.meta.env.MODE === "development"
      ? "http://localhost:8080/api"
      : "/api";

  const url = `${baseURL}${endpoint}`;

  const defaultOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const finalOptions = { ...defaultOptions, ...options };

  return fetch(url, finalOptions)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((errorText) => {
          throw new Error(
            `HTTP error! Status: ${response.status}. Response: ${errorText}`
          );
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};
