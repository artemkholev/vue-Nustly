class User {
  id;
  email;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
  }
}

export default User;
