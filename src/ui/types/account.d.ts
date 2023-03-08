interface Account {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified?: boolean;
  expires: string;
}

export { Account };
