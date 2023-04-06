import jwtDecode from "jwt-decode";

let baseUrl = "http://localhost:3002";
if (process.env.NEXT_PUBLIC_ENV === "prod")
  baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

const authApi = {};

authApi.login = async (user, password) => {
  const payload = { user, password };

  const response = await fetch(`${baseUrl}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const { status } = response;
  const data = await response.text();
  return { status, data };
};

authApi.getUserLevel = (token) => {
  if (!token) return null;
  const decode = jwtDecode(token);
  return decode.isAdmin;
};

export default authApi;
