export interface LocationState {
    weatherData: any | null;
    error: string | null;
    loading: boolean;
    countryCode: string | null;
    city: string;
    temp: number | '--';
    condition_icon: string | null;
}