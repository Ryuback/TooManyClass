db.auth('admin', '123-dev-server-321');

db = db.getSiblingDB('tooManyClass');

db.createUser(
  {
    user: 'devUser',
    pwd: '123-devUser-321',
    roles: [{role: 'dbOwner', db: 'tooManyClass'}]
  }
);

db.getCollection('_configs').insertOne({
  _id: '1',
  dbVersion: 1,
});
// mongodb://admin:123-dev-server-321@127.0.0.1:27017/tooManyClass?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
