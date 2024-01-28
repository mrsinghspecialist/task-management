export type User = {
  name: string;
  email: string;
  password: string;
  userType: UserType;
};

export type UserType = "Regular" | "Admin";
