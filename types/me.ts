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
