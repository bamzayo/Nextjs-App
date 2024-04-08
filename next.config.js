/** @type {import('next').NextConfig} */

const cspHeader = `
    default-src 'self' identitytoolkit.googleapis.com securetoken.googleapis.com worldengines-7c1q.onrender.com;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' nonce-hdhdh apis.google.com ;
    style-src 'self' 'unsafe-inline';
    img-src 'self' lh3.googleusercontent.com worldengines.s3.amazonaws.com data: ;
    font-src 'self';
    connect-src 'self' identitytoolkit.googleapis.com securetoken.googleapis.com worldengines-7c1q.onrender.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    frame-src 'self' freescreen-d793d.firebaseapp.com  ;
`;

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          { key: "X-XSS-Protection", value: "1" },

          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
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
