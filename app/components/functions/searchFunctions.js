export function elementsFound(val) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=36155099ee0dfee4c1e0d95e58f2e8a5&language=en-US&query=${val}`;

  fetch(url)
    .then(res => res.json())
    .then(post => post.results)
    .catch(error => {
      console.log(error);
    });
}
