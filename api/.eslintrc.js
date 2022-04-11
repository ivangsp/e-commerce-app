module.exports = {
  extends: '@loopback/eslint-config',
  rules: {
    "@typescript-eslint/naming-convention": [
      "error",
      {
        // Allow property name , application/json as a valid property name
        //Ref: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.md
        "selector": "property",
        "format": ["strictCamelCase"],
        "filter": {
          // you can expand this regex to add more allowed names
          "regex": "^(application#/json|Property-Name-Two)$",
          "match": false
        }
      }
    ]
  }
};
