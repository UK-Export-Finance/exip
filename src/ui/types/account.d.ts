interface Account {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified?: boolean;
}

export { Account };
