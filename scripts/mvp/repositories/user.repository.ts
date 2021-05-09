export class User {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string,
  ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}


export class UserRepository {
  private users: User[] = [new User("Mohamed","Bécha","Kaaniche")];

  public getUsers(): User[]{
    return this.users;
  }

  public getOneUser(): User {
    return this.users[0];
  }
}