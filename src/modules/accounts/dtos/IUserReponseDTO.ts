interface IUserResponseDTO {
  email: string;
  name: string;
  isAdmin: string;
  avatar: string;
  driver_license: string;
  avatar_url(): string;
}

export { IUserResponseDTO };
