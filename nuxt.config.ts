// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  runtimeConfig: {
    public: {
      firebaseApiKey: "AIzaSyCc6crVDivs24waMJrEVqRnJQP6VHBdjFI",
      firebaseAuthDomain: "karock-c4638.firebaseapp.com",
      firebaseProjectId: "karock-c4638",
      firebaseStorageBucket: "karock-c4638.appspot.com",
      firebaseMessagingSenderId: "798342812233",
      firebaseAppId: "1:798342812233:web:2fd9e988a560ca822c6598",
      firebaseMeasurementId: "G-52W5Q8RB55",
    },
  },
  modules: ["@pinia/nuxt", "@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      "Noto Sans JP": {
        wght: [600, 900]
      },
      "Montserrat": {
        wght: [600, 900]
      }
    }
  }
});