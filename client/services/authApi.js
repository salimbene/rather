import jwtDecode from "jwt-decode";

const authApi = {};

authApi.login = async (user, password) => {
  const payload = { user, password };

  const response = await fetch(`http://localhost:3002/auth`, {
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
