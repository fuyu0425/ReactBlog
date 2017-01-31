/**
 * example of config , don't add to version control
 * @type {{db: string, secret: string, adminUsername: string, adminPassword: string}}
 */
const config = {
  db : 'mongodb://localhost/blog',
  secret : 'e3ca223a-ab88-475b-9f1d-010636214c43',
  adminUsername : 'admin',
  adminPassword : '12345678',
  apiServer : 'http://localhost:8000/',
  numPerPage:20

};
export default config;
