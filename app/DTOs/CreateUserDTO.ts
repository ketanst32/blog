export class CreateUserDTO {
  constructor(
    public email: string,
    public password: string,
    public fullName: string
  ) {}
}
