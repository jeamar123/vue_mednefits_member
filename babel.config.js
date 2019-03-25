module.exports = {
  presets: [
    '@vue/app',
		[ "@babel/preset-env", {
			"targets": {
			  "browsers": [ "last 1 version", "ie >= 11" ]
			}
		}]
  ],
}
