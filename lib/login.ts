export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
    ok: boolean;
    message?: string;
}; 