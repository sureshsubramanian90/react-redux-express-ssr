module.exports = {
    plugins: [
        require('postcss-import')(),
        require('postcss-global-import')(),
        require('postcss-preset-env')({
            stage: 1,
            preserve: false,
            autoprefixer: { grid: true }
        }),
        require('postcss-nested')(),
        require('postcss-browser-reporter')(),
        require('postcss-reporter')(),
        require('postcss-discard-duplicates')(),
        require("postcss-mixins")(),
    ]
};

