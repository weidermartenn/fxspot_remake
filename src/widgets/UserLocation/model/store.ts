import { defineStore } from 'pinia';
import axios from 'axios';
import type { LocationState } from './LocationState';

export const useLocationStore = defineStore('location', {
    state: (): LocationState => ({
        weatherData: null,
        error: null,
        loading: false,
        countryCode: null,
        city: '',
        temp: '--',
        condition_icon: null
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
                const { data: {location, current} } = await axios.get(
                    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&lang=ru&q=${latitude},${longitude}&days=1`
                );

                this.weatherData = { location, current };
                this.city = location?.name || 'Неизвестный город';
                this.temp = Math.round(current?.temp_c || '--');
                this.condition_icon = current?.condition?.icon || null;
            } catch {
                this.error = 'Ошибка при загрузке данных';
            } finally {
                this.loading = false;
            }
        }
    }
})