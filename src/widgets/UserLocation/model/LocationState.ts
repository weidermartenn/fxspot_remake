export interface LocationState {
    weatherData: any | null;
    forecastData: any | null;
    error: string | null;
    loading: boolean;
    countryCode: string | null;
}