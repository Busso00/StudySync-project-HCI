'use strict';

function User(id, email, password, firstname, lastname, role) {
  this.id = id;
  this.email = email;
  this.password = password;
  this.firstname = firstname;
  this.lastname = lastname;
  this.role = role;
}

module.exports = { User };
