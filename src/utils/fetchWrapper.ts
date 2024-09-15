class HttpError extends Error {
  constructor(public response: Response) {
    super(`HTTP error: ${response.statusText}`);
  }
}

export async function fetchWrapper<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new HttpError(response);
  }

  return response.json();
}