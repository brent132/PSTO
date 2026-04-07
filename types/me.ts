export type Me =
  | {
      ok: true;
      me: {
        username: string;
        firstName: string;
        lastName: string;
        middleName: string;
        suffix: string;
        role: string;
        updated_at: string;
      };
    }
  | { ok: false; me: null };

export type EditCredentialsPayload = {
  username?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  suffix?: string;
};

export type EditCredentialsDialogProps = {
  user: {
    username?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string | null;
    suffix?: string | null;
  };
};
