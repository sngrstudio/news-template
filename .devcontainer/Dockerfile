FROM mcr.microsoft.com/devcontainers/php:8.4-bookworm

COPY --from=ghcr.io/mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions mysqli exif imagick zip gd intl