// const checkEnvVariables = require("./check-env-variables")

// checkEnvVariables()

/**
 * Medusa Cloud-related environment variables
 */
const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "172.16.16.90",
      },
      {
        protocol: "http",
        hostname: "172.16.16.99",
      },
      {
        protocol: "https",
        hostname: "claybysevgi.com",
      },
      {
        protocol: "http",
        hostname: "claybysevgi.com",
      },
      {
        protocol: "https",
        hostname: "www.claybysevgi.com",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "minio.zaferkaraca.net",
      },
      {
        protocol: "http",
        hostname: "minio.zaferkaraca.net",
      },
      {
        protocol: "https",
        hostname: "minio.claybysevgi.com",
      },
      {
        protocol: "http",
        hostname: "minio.claybysevgi.com",
      },
      {
        protocol: "https",
        hostname: "minio.sedefliatolye.com.tr",
      },
      {
        protocol: "http",
        hostname: "minio.sedefliatolye.com.tr",
      },
      {
        protocol: "https",
        hostname: "hobby.zaferkaraca.net",
      },
      {
        protocol: "https",
        hostname: "sedefliatolye.com.tr",
      },
      {
        protocol: "http",
        hostname: "sedefliatolye.com.tr",
      },
      {
        protocol: "https",
        hostname: "www.sedefliatolye.com.tr",
      },
      {
        protocol: "https",
        hostname: "claybysevgi.com",
      },
      {
        protocol: "https",
        hostname: "www.claybysevgi.com",
      },
      ...(S3_HOSTNAME && S3_PATHNAME
        ? [
          {
            protocol: "https",
            hostname: S3_HOSTNAME,
            pathname: S3_PATHNAME,
          },
        ]
        : []),
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
