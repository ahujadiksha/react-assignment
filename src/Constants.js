const Cryptr = require('cryptr');
export const BEARER_TOKEN = 'kashvdhas8765762JHghdm867kagdG7i';
const SECRET_KEY = 'jhdgsa7673HGhvd878ghvvdIil14';
const cryptr = new Cryptr(SECRET_KEY);
export const Encrypt = (value) => {
	return cryptr.encrypt(value);
};
export const Decrypt = (value) => {
	return cryptr.decrypt(value);
};
