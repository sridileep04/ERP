module.exports = {
    // Turn on recommended configuration information
    // "extends": "eslint:recommended",
// By default, ESLint will look for configuration files in all parent directories, all the way to the root directory. This is useful if you want all your projects to follow a specific convention, but can sometimes lead to unexpected results. To restrict ESLint to a specific project, set "root": true under the eslintConfig field in the package.json file or .eslintrc.* files in your project's root directory. Once ESLint finds "root": true in the configuration file, it stops looking in the parent directory.
    "root": true,
// Additional global variables that the script accesses during execution
// The no-undef rule will warn when undefined variables are accessed. If you want to use global variables in a file, it is recommended that you define these global variables so that ESLint will not issue warnings. You can use annotations or define global variables in configuration files.
    "globals": {
        "window": true,
        "document": true,
        "$": true
    },
    // Set up plug-ins to parse js files in html
    // "plugins": [
    //     'html'
    // ],
    //Set parser options (this property must be set)
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            // "arrowFunctions": true,
            // "experimentalObjectRestSpread": true,
            // "classes": true,
            // "modules": true,
            // "defaultParams": true
        }
    },
    // Enabled rules and their respective error levels
    "rules": {


        // Multiple duplicate definitions are prohibited in the same scope
        "no-redeclare": 1
    },
    // Specify the environment you want to enable
    "env": {
        "browser": true,
        "node": true
    },
    "parser": "babel-eslint"
}