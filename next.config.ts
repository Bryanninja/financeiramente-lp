/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Isso gera a pasta 'out' com o HTML puro
  images: {
    unoptimized: true, // Necessário para exportação estática
  },
};

module.exports = nextConfig;
