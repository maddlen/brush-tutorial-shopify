import App from "./app";
import Form from "./form";
import i18n from "./i18n";
import Persistor from "./persistor";
import Referrals from "./referrals";

export * from "./api";

export default {
  start: async () => {
    App.checkAppVersion();
    await i18n.init();
  },
  App,
  Form,
  i18n,
  Persistor,
  Referrals,
};
