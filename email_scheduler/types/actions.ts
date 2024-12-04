export type Action = EmailAction;

export interface EmailAction {
  type: "email";
  subject: string;
  body: string;
  delay?: number;
}
