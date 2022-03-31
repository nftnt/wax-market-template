module.exports = {
  async redirects() {
    return [
      {
        source: url('https://alchemyuk.nftnt.tools/'),
        destination: '/alchemyuk',
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

