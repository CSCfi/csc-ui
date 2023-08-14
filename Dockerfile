FROM mcr.microsoft.com/playwright:v1.36.0-jammy

# copy project (including tests)
COPY . /e2e

WORKDIR /e2e

RUN npx playwright install

# Run playwright test
CMD [ "npx", "playwright", "test", "--reporter=list" ]