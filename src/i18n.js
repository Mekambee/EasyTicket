import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./Locales/en.json";
import plTranslation from "./Locales/pl.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      pl: { translation: plTranslation }
    },
    lng: "pl",
    fallbackLng: "pl",
    interpolation: { escapeValue: false }
  });

export default i18n;