export interface ErrorOperation {
  status?: number;
  message?: string;
  errors?: string[] | object[];
}
