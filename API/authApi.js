const AUTH_ENDPOINT = "http://localhost:5000/api/auth/";

const login = async ({ username, password }) => {
  const response = await fetch(AUTH_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
     throw await response.json();
  }

  return await response.json();
};

export { login };
