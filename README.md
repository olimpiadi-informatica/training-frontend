# Italian Olympiads in Informatics Training Website

This repository contains the source code for the new training website of the Italian Olympiads in Informatics.

The website is based on [NextJS](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/)
and [DaisyUI](https://daisyui.com/).

## Installation

1. Clone the repository.
2. Run `yarn install` to install the dependencies.
3. Run `yarn lingui:compile` to compile the translations.

## Development

Run `yarn dev` to start the development server.

If you've added or changed text, you need to update the translations:

1. Run `yarn lingui:extract` to extract the new messages.
2. Update `src/locales/en/messages.po` with the new translation.
3. Run `yarn lingui:compile` to compile the translations.

## Deployment

Ask Filippo Casarin.
