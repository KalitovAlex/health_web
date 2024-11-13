export interface CreateCalculatorPayload {
  // Define create payload here
}

export interface UpdateCalculatorPayload {
  // Define update payload here
}

export interface CalculatorResponse {
  // Define API response here
}

export interface CalculatorListResponse {
  items: CalculatorResponse[];
  total: number;
}
