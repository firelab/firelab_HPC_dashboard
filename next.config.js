/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    assetPrefix: process.env.NODE_ENV === "production" ? "/firelab_HPC_dashboard/" : "",
    basePath: process.env.NODE_ENV === "production" ? "/firelab_HPC_dashboard" : "",
  };
  
  module.exports = nextConfig;
  