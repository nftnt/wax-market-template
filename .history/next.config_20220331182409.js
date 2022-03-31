module.exports = {
  async redirects() {
    return [
      {
        source: '/alchemyuk',
        destination: 'https://alchemyuk.nftnt.tools',
        permanent: true,
      },
    ]
  },
  webpack: (config, { isServer }) => {

    return config
  },
  env: {
    version: '3.2.8',
  },
};

