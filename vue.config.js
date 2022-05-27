module.exports = {
	devServer: {
		port: '8080',
		disableHostCheck: true,
		proxy: {
			'/h5testrelay': {
				target: 'https://controlpanel.dbchain.cloud/nft_relay/',
				changeOrigin: true,
				pathRewrite: {
					'^/h5testrelay': ""
				}
			},
			'/h5relay': {
				target: 'https://mytroladmin.dbchain.cloud/nft_relay/',
				changeOrigin: true,
				pathRewrite: {
					'^/h5relay': ""
				}
			},
			'/relay': {
				target: 'http://192.168.0.19:3001/',
				changeOrigin: true,
			}
		}
	}
}
