const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "fashion-starter-demo.s3.eu-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "prueba-servy.lon1.cdn.digitaloceanspaces.com"
      },
      { 
        protocol: "https",
        hostname: "img.freepik.com"
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com"
      }
    ],
  },
}

module.exports = nextConfig
