const BASE_URL = "http://localhost:5000/api/";

export const fetchProducts = async (method, body, headers) => {
  const response = await fetch(BASE_URL + "products", {
    method: method || "GET",
    headers: headers || {},
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
};

export const fetchData = async (method, path, body, headers) => {
  const response = await fetch(BASE_URL + path || "", {
    method: method || "GET",
    headers: headers || {},
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
};
