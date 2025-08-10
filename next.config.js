/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  async redirects() {
    return [{ source: '/', destination: '/index.html', permanent: false }];
  }
};
