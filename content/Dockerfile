# Dependencies installer image
FROM composer:2.8.9 AS installer
WORKDIR /usr/src/app

COPY composer.* .
RUN --mount=type=cache,id=composer,target=/tmp composer install --ignore-platform-reqs --no-dev --prefer-dist

# Runner image
FROM php:8.4.7-apache-bookworm AS runner
WORKDIR /var/www/html

ARG CLI=false

RUN a2enmod rewrite
COPY --from=ghcr.io/mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions mysqli exif imagick zip gd intl

# Install WP-CLI only if CLI=true
RUN if [ "$CLI" = "true" ]; then \
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp; \
    fi

RUN echo "Listen 4322" > /etc/apache2/ports.conf
COPY server-config/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY server-config/php.ini $PHP_INI_DIR/php.ini
COPY --chown=www-data:www-data --from=installer /usr/src/app/vendor vendor
COPY --chown=www-data:www-data --from=installer /usr/src/app/web/wp web/wp
COPY --chown=www-data:www-data --from=installer /usr/src/app/web/app/mu-plugins web/app/mu-plugins
COPY --chown=www-data:www-data --from=installer /usr/src/app/web/app/plugins web/app/plugins
# COPY --chown=www-data:www-data --from=installer /usr/src/app/web/app/plugins/redis-cache/includes/object-cache.php web/app
COPY --chown=www-data:www-data . .

EXPOSE 4322