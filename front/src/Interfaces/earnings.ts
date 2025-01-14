export interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

export interface WeeklySummary {
  week: string;
  total: number;
  orderCount: number;
}

export interface UserEarnings {
  user: User;
  year: number;
  month: number;
  totalEarnings: number;
  weeklySummary: WeeklySummary[];
}

export interface FetchError {
  message: string;
}
