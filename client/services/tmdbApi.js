let baseUrl = "http://localhost:3002";
if (process.env.NEXT_PUBLIC_ENV === "prod")
  baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

const tmdbApi = {};

tmdbApi.getContent = async () => {
  const response = await fetch(`${baseUrl}/tmdb`);
  const { data } = await response.json();
  return data;
};

tmdbApi.getDetails = async (id, isMovie, session) => {
  let headers = {};
  if (!session) return;
  headers = { "rather-token": session.token };
  const route = isMovie ? "m" : "s";
  const response = await fetch(`${baseUrl}/tmdb/${route}/${id}`, {
    headers,
  });
  const { data } = await response.json();
  if (isMovie) return data.movieDetail;

  return data.showDetail;
};

tmdbApi.filter = async (filter, session) => {
  let headers = {};
  if (session.token) headers = { "rather-token": session.token };
  const response = await fetch(`${baseUrl}/tmdb?filter=${filter}`, {
    method: "POST",
    headers,
  });
  const { data } = await response.json();
  return data;
};

export default tmdbApi;
