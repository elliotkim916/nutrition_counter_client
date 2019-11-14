export const NUTRITIONIX_BASE_URL = "https://trackapi.nutritionix.com/v2/natural/nutrients";
export const EXERCISE_BASE_URL = "https://trackapi.nutritionix.com/v2/natural/exercise";
export const APP_ID = "aeff1b26";
export const APP_KEY = "96ef74633a183f547e97d2dc6c8819d4";

const environment = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : process.env.REACT_APP_API_BASE_URL;
export const API_BASE_URL = environment;