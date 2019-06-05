/**
 * Eezy-HTTP-II Library
 * Library for making HTTP Requests
 *
 * @version 3.0.0
 *
 * @author Benedict Nkeonye
 * @license MIT
 **/

class EezyHTTP {
  // GET Request
  async get(url) {
    const res = await fetch(url);
    const resData = res.json();
    return resData;
  }

  // POST Request
  async post(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const resData = res.json();
    return resData;
  }

  // PUT Request
  async put(url, data) {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const resData = res.json();
    return resData;
  }

  // DELETE Request
  async delete(url) {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });

    const resData = 'User details deleted';
    return resData;
  }
}


export const http = new EezyHTTP();