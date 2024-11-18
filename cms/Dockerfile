# Dependencies Container
FROM composer:2.8.2 AS deps
WORKDIR /usr/src/app
COPY composer.* ./
RUN --mount=type=cache,id=composer,target=/tmp composer install --no-dev --ignore-platform-reqs

# Runner Container
FROM php:8.2.25-apache AS runner
WORKDIR /var/www/html

## Setup extensions
RUN a2enmod rewrite
ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN IPE_GD_WITHOUTAVIF=1 install-php-extensions mysqli gd exif igbinary imagick/imagick@master intl zip apcu timezonedb

## copy files
COPY server/000-default.conf /etc/apache2/sites-enabled/000-default.conf
COPY server/php.ini $PHP_INI_DIR/php.ini
COPY --chown=www-data:www-data --from=deps /usr/src/app/vendor vendor
COPY --chown=www-data:www-data --from=deps /usr/src/app/web/wp web/wp
COPY --chown=www-data:www-data --from=deps /usr/src/app/web/app/mu-plugins web/app/mu-plugins
COPY --chown=www-data:www-data --from=deps /usr/src/app/web/app/plugins web/app/plugins
COPY --chown=www-data:www-data . .