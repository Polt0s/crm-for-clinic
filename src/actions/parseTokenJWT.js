const parseJwt = (token) => JSON.parse(atob(token.split('.')[1]));

export default parseJwt;
