module.exports = {
    name: "auth",
    filename: "remoteEntry.js",
    exposes: {
        './Register': './src/components/Register',
        './Login': './src/components/Login',
        './InfoTooltip': './src/components/InfoTooltip',
    },
    shared: ["react", "react-dom"]
}; 