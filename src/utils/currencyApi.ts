export function api(BASE_URL: string, optionsBase?: RequestInit) {
    return async function <T>(endpoint: string, optionsEndpoint?: RequestInit): Promise<T> {
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
          },
          ...optionsBase,
          ...optionsEndpoint,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: T = await response.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    };
  
  }
  
  
  export const currencyApi = api("https://status.neuralgeneration.com/api")