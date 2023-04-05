const tmdbApi = {};

tmdbApi.getContent = async () => {
  const response = await fetch("http://localhost:3002/tmdb");
  const { data } = await response.json();
  return data;
};

tmdbApi.getDetails = async (id, isMovie, session) => {
  let headers = {};
  if (!session) return;
  headers = { "rather-token": session.token };
  const route = isMovie ? "m" : "s";
  const response = await fetch(`http://localhost:3002/tmdb/${route}/${id}`, {
    headers,
  });
  const { data } = await response.json();
  if (isMovie) return data.movieDetail;

  return data.showDetail;
};

tmdbApi.filter = async (filter, session) => {
  let headers = {};
  if (session.token) headers = { "rather-token": session.token };
  const response = await fetch(`http://localhost:3002/tmdb?filter=${filter}`, {
    method: "POST",
    headers,
  });
  const { data } = await response.json();
  return data;
};

export default tmdbApi;
