const https = require('https');

const limitPerPage = 20;
const apiUrl = 'https://5b5cb0546a725000148a67ab.mockapi.io/api/v1/users';

const getUsers = async function (pageNo = 1) {
  let actualUrl = apiUrl + `?page=${pageNo}&limit=${limitPerPage}`;

  return new Promise((resolve, reject) => {
    https
      .get(actualUrl, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          resolve(JSON.parse(data));
        });
      })
      .on('error', (err) => {
        reject(err.message);
      });
  });
};

const getEntireUserList = async function (pageNo = 1) {
  const results = await getUsers(pageNo);
  if (results.length > 0) {
    return results.concat(await getEntireUserList(pageNo + 1));
  } else {
    return results;
  }
};

(async () => {
  const entireList = await getEntireUserList();
  console.log(entireList);
})();
