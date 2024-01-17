const ROLE_LIST = "/";
const ROLE_ADD = "roles/add";
const ROLE_UPDATE = "roles/update/:id";
const ROLE_ASSIGN = "roles/users";
const ROLE_ACCESS = "roles/access/:id";


const API_ROLE = "/roles";
const API_ROLE_GET = "/roles/:id";
const API_ROLE_ACCESS = "/access";
const API_ROLE_ACCESS_ID = "/access/:id";
const API_ROLE_ACCESS_GET = "/access/:id";
const API_ACCESS = "/access";
const API_USERS = "/users";


export { ROLE_ACCESS, ROLE_ADD, ROLE_ASSIGN, ROLE_LIST, ROLE_UPDATE, API_ROLE, API_ROLE_GET, API_USERS, API_ACCESS, API_ROLE_ACCESS, API_ROLE_ACCESS_GET, API_ROLE_ACCESS_ID }