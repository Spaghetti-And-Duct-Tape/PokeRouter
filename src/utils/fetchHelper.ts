export async function fetchRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const baseUrl = "https://pokeapi.co/api/v2";

  try {
    const response = await fetch(`${ baseUrl }/${ endpoint }`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${ response.status } ${ response.statusText }`);
    };

    return await response.json();
  } catch (err) {
    console.error(`Fetch error: ${ err }`);
    throw err;
  };
};