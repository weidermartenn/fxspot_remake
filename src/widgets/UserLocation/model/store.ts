import { defineStore } from 'pinia';
import axios from 'axios';
import type { LocationState } from './LocationState';

export const useLocationStore = defineStore('location', {
    state: (): LocationState => ({
        weatherData: null,
        forecastData: null,
        error: null,
        loading: false,
        countryCode: null,
    }),
    getters: {
        isLoading: (state) => state.loading,
    },
    actions: {
        async fetchWeatherByIP() {
            this.loading = true;
            this.error = null;
            
            try {
                const { data: { latitude, longitude, country } } = await axios.get(`https://ipapi.co/json/`);
                this.countryCode = country;

                const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
                const { data } = await axios.get(
                    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&lang=ru&q=${latitude},${longitude}&days=1`
                );

                this.weatherData = data;
            } catch {
                this.error = 'Ошибка при загрузке данных';
            } finally {
                this.loading = false;
            }
        },

        async fetchWeatherForecast(days: number = 3) {
            this.loading = true;
            this.error = null;

            try {
                const { data: { latitude, longitude } } = await axios.get(`https://ipapi.co/json/`);
                const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
                
                const { data: { forecast } } = await axios.get(
                    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&lang=ru&q=${latitude},${longitude}&days=${days}`
                );

                this.forecastData = forecast;
            } catch {
                this.error = 'Ошибка при загрузке прогноза';
            } finally {
                this.loading = false;
            }
        }
    }
})