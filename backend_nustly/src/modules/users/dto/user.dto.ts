class User {
  id;
  email;
  roles;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.roles = model.roles[0].dataValues.value;
  }
}

export default User;
