/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'dota2protracker.com',
			},
		],
	},
}

module.exports = nextConfig

export default nextConfig
