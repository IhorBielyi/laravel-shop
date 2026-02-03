FROM php:8.4-fpm-alpine

WORKDIR /var/www

RUN docker-php-ext-install pdo_mysql mysqli

RUN apk add --no-cache \
    autoconf \
    gcc \
    g++ \
    make \
    linux-headers \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && docker-php-ext-install pdo_mysql mysqli \
    && apk del autoconf gcc g++ make linux-headers

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

CMD ["php-fpm"]