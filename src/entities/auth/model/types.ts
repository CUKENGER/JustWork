
export type RegisterApiResponse = {
  error?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: "FREELANCER" | "EMPLOYER";
  };
};
