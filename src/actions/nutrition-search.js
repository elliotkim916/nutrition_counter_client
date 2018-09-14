export const NUTRITION_SEARCH_REQUEST = 'NUTRITION_SEARCH_REQUEST';
export const nutrtionSearchRequest = () => ({
  type: NUTRITION_SEARCH_REQUEST
});

export const NUTRITION_SEARCH_SUCCESS = 'NUTRITION_SEARCH_SUCCESS';
export const nutritionSearchSuccess = nutrition => ({
  type: NUTRITION_SEARCH_SUCCESS,
  nutrition
});

export const NUTRITION_SEARCH_ERROR = 'NUTRITION_SEARCH_ERROR';
export const nutritionSearchError = error => ({
  type: NUTRITION_SEARCH_ERROR,
  error
});