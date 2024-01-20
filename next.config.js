/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
  env: {
    apiKey: "AIzaSyBWQOe1h4kiDwCwJijsGD96YQ0ySmGmEoA",
    authDomain: "trg-app-59d4f.firebaseapp.com",
    projectId: "trg-app-59d4f",
    storageBucket: "trg-app-59d4f.appspot.com",
    messagingSenderId: "155189265575",
    appId: "1:155189265575:web:7ae727950d91d1c2778782",
    measurementId: "G-FTSLHBB212",
  },
};

module.exports = nextConfig;
