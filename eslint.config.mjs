import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Custom rules for coding standards
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Discourage async/await in favor of Promises (warning only)
      "no-restricted-syntax": [
        "warn",
        {
          selector: "FunctionDeclaration[async=true]",
          message: "Prefer using Promise chains over async/await for consistency"
        },
        {
          selector: "FunctionExpression[async=true]",
          message: "Prefer using Promise chains over async/await for consistency"
        },
      ],

      // Discourage function declarations in favor of arrow functions
      "func-style": ["warn", "expression"],
      "prefer-arrow-callback": "warn",
    },
  },
];

export default eslintConfig;
