# Stage1: Install composer dependencies
FROM composer:2.2.25 AS installer
WORKDIR /usr/src/app

# Install composer dependencies
COPY composer.json composer.lock ./
RUN --mount=type=cache,id=composer,target=/tmp composer install --no-dev --ignore-platform-reqs

# Stage2: Build the runtime image
FROM php:8.4.3-apache AS runtime
WORKDIR /var/www/html

# Install PHP extensions
ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN install-php-extensions mysqli exif imagick zip gd intl

# Copy dependencies from installer
COPY --from=installer --chown=www-data:www-data /usr/src/app/vendor vendor
COPY --from=installer --chown=www-data:www-data /usr/src/app/web/wp web/wp
COPY --from=installer --chown=www-data:www-data /usr/src/app/web/app/mu-plugins web/app/mu-plugins
COPY --from=installer --chown=www-data:www-data /usr/src/app/web/app/plugins web/app/plugins

# Copy application files
COPY /server/000-default.conf /etc/apache2/sites-enabled/
COPY /server/php.ini $PHP_INI_DIR
COPY --chown=www-data:www-data . .