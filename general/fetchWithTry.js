import fetch from 'node-fetch';

const URL = 'https://jsonplaceholder.typicode.com/todos/87686786';
const RETRY_COUNT = 5;

// fetch(URL)
//   .then((response) => response.json())
//   .then((json) => console.log('res', json))
//   .catch((err) => console.log('err', err));

// const success = new Promise((resolve, reject) => resolve('success'));
// const failure = new Promise((resolve, reject) => reject('failure'));

// success.then((res) => {
//   res;
// });

// failure
//   .then((res) => res)
//   .catch((err) => {
//     err;
//   });

// const functionWithPromise = () => {
//   return new Promise((resolve, reject) => {
//     resolve('resolved from inside function');
//   });
// };

// functionWithPromise().then((res) => {
//   res;
// });

// const functionWithFetch = () => {
//   return fetch(URL)
//     .then((res) => res)
//     .catch((err) => err);
// };

// functionWithFetch()
//   .then((res) => {
//     res.status;
//   })
//   .catch((err) => {
//     err;
//   });

const fetchWithTry = (url, options, n) => {
  // probably should use catch here to catch the actual failures
  return fetch(url).then((res) => {
    if (n === 1) throw '';
    if (res && res.status !== 200) {
      return fetchWithTry(url, options, n - 1);
    }
  });
};

const asyncFetchWithTry = async (url, options, n) => {
  try {
    return await fetch(url);
  } catch (err) {
    if (n === 1) {
      throw err;
    }
    return await asyncFetchWithTry(url, options, n - 1);
  }
};

fetchWithTry(URL, {}, RETRY_COUNT);

asyncFetchWithTry(URL, {}, RETRY_COUNT);
