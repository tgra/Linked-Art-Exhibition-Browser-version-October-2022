module.exports = {
    trailingSlash: true,
    typescript: {
      ignoreBuildErrors: true,
    },
    experimental: {
    largePageDataBytes:  128 * 1000000,
    },
    exportPathMap: function() {
      return {
        "/": {
          page: "/index",
          query: {__nextDefaultLocale:""}
        }
      };
    }
  }