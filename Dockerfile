FROM ruby:2.6.6-alpine

ARG RAILS_ENV
ARG NODE_ENV
ARG BUNDLE_JOBS=20
ARG FOLDERS_TO_REMOVE
ARG BUNDLE_WITHOUT
ARG ADDITIONAL_PACKAGES
ARG PRECOMPILE_ASSETS
ARG YARN_INSTALL
ARG SECRET_KEY_BASE
ARG DEVISE_SECRET

ENV RAILS_ENV ${RAILS_ENV}
ENV NODE_ENV ${NODE_ENV}
ENV SECRET_KEY_BASE does-not-matter
ENV DEVISE_SECRET does-not-matter

WORKDIR /app

RUN apk add --update --no-cache --quiet \
    build-base \
    postgresql-dev \
    imagemagick \
    nodejs-current \
    yarn \
    tzdata \
    openssh \
    $ADDITIONAL_PACKAGES

COPY Gemfile Gemfile.lock ./
RUN gem install bundler
RUN bundle install --quiet $BUNDLE_WITHOUT --jobs $BUNDLE_JOBS \
  && rm -rf /usr/local/bundle/cache/*.gem \
  && find /usr/local/bundle/gems/ -name "*.c" -delete \
  && find /usr/local/bundle/gems/ -name "*.o" -delete

COPY package.json yarn.lock ./
RUN if [ ! -z "$YARN_INSTALL" ]; \
    then \
      yarn install --quiet; \
    fi

COPY . .

RUN if [ ! -z "$PRECOMPILE_ASSETS" ]; \
    then \
      bundle exec rails assets:precompile; \
    fi

RUN rm -rf $FOLDERS_TO_REMOVE
RUN date -u > BUILD_TIME

CMD ["docker/startup.sh"]
