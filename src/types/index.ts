export interface Option {
  value: string
  label: string
}

export interface User {
  username?: string;
  email?: string;
  country?: string;
  password?: string;
}

export interface FormProps {
  onComplete: (props: User) => void
  countries?: Option[]
}