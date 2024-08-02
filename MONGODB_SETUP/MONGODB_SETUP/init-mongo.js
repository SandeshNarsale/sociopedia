// init-mongo.js

db.createUser({
  user: "dummyuser",
  pwd: "user123",
  roles: [{ role: "readWrite", db: "admin" }]
});

