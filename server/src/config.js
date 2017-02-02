/**
 * example of config , don't add to version control
 * @type {{db: string, secret: string, adminUsername: string, adminPassword: string}}
 */
const config = {
  dbUser:'dbadmin',
  dbPwd:'123456',
  dbHost:'localhost',
  dbPort:27017,
  dbDatabase : 'blog',
  dbAuthSource:'admin',
  secret : 'e3ca223a-ab88-475b-9f1d-010636214c43',
  adminUsername : 'admin',
  adminPassword : '12345678',
  apiServer : 'http://localhost:8000/',
  defaultNumPerPage:2

};
//'mongodb://dbadmin:123456@localhost/blog?authSource=admin',
export default config;
