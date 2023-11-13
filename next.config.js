/** @type {import('next').NextConfig} */

if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ""}`;
}

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "politicozen-test.s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "politicozen-prod.s3.us-east-2.amazonaws.com",
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["fabric"],
    serverComponentsExternalPackages: ["canvas"],
  },
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
      canvas: "commonjs canvas",
      fabric: "commonjs fabric",
    });
    // config.infrastructureLogging = { debug: /PackFileCache/ };
    return config;
  },
};

module.exports = nextConfig;
