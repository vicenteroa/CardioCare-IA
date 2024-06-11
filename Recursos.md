## Recursos utilizados

[Flowbite](https://flowbite.com/docs/getting-started/quickstart/)

[Toastify](https://apvarun.github.io/toastify-js/)

[Spline](https://spline.design/)

[Eslint](https://ota-meshi.github.io/eslint-plugin-astro/)

[Tailwind CSS](https://tailwindcss.com/docs/guides/astro)

[Cypress](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)

[Date-Fns-Tz](https://www.npmjs.com/package/date-fns-tz)

[Bcrypt](https://www.npmjs.com/package/bcrypt)

[NinjaKeys](https://github.com/ssleptsov/ninja-keys)

## Documentación utilizada

[Astro Firebase](https://docs.astro.build/es/guides/backend/google-firebase/)

[Astro Eslint](https://docs.astro.build/es/editor-setup/#eslint)

[Astro Vercel](https://docs.astro.build/es/guides/integrations-guide/vercel/#por-qu%C3%A9-astro-vercel)

[Astro Theme](https://docs.astro.build/es/tutorial/6-islands/2/)

[Astro Testing](https://docs.astro.build/es/guides/testing/#cypress)

[Google AI Developer](https://ai.google.dev/gemini-api/docs/get-started/tutorial?lang=web&authuser=1&hl=es-419)

[Astro React](https://docs.astro.build/es/guides/integrations-guide/react/)

[React+Gemini](https://www.youtube.com/watch?v=Ra9r3ppeYZk)

[Repo:Abbas with Gemini+Image](https://github.com/Abbas-Whoami/react-meal-app/tree/main/src/components)

## Despligue utilizado

[Vercel](https://vercel.com)

## Configuración de Vscode para Eslint | prettier

```json
"eslint.validate": [
        "javascript",
        "javascriptreact",
        "astro",
        "typescript",
        "typescriptreact"
    ],
    "console-ninja.featureSet": "Community",
    "window.menuBarVisibility": "compact",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[jsonc]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "prettier.documentSelectors": ["*/.astro"],
    "[astro]": {"editor.defaultFormatter": "esbenp.prettier-vscode"},
    "terminal.integrated.fontWeight": "normal",
    "terminal.integrated.fontFamily": "Symbols Nerd Font Mono",
    "git.openRepositoryInParentFolders": "never",
    "[javascriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.codeActionsOnSave": {
            "source.fixAll": "explicit"
        }
    },
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
},

```
