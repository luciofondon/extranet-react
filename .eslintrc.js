module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: [
        '@typescript-eslint',
        'react',
        'prettier',
        "react-hooks"
    ],
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    rules: {
        "spaced-comment": "off",
        "no-unused-vars": "off",
        "import/no-duplicates": "off",
        "no-extra-boolean-cast": "off",
        "no-useless-escape": "off",
        'no-console': ["error", { allow: ["warn", "error"] }],
        "yoda": ["error", "always"],
        'prettier/prettier': 'error',
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
};
