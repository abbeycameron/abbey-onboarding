# Boilerplate Django REST API

This repo contains boilerplate for a Django REST API. The project is structured in the following way:

- `/apps` folder
    - Meant to hold the code for each Django app.
    - `accounts`, `core`, and `doc` are provided in the boilerplate.
- `/config` folder
    - The overall configuration of the application.
    - `settings.py` is where all configurations are defined.
    - `urls.py` defines all the routes, either explicitly or implicitly by importing them from apps.

## Dependency manager

[Poetry](https://python-poetry.org/) is the dependency manager for the project. Anything that has to do with dependencies (e.g. `pip install`) and virtual environments must be done using Poetry!

## Environment variables

Environment variables must be defined in a `.env` file. You can create multiple files for different environments (e.g. `.env.development`, `.env.staging`, etc). Then, before starting the backend, you can define which env file to use by setting the `ENV_FILE` environment variable. By default, the application will look for `.env`. If it finds it, it will use it to load environment variables, otherwise it will assume that the environment variables will be loaded in a different way (suitable when reading environment variables from a secret manager).

### django-environ

[`django-environ`](https://django-environ.readthedocs.io/en/latest/) is used to define, load, cast, and access environment variables.

### Environment variables available

| Variable | Description | Default | Required |
| -------- | ----------- | ------- | -------- |
| `SECRET_KEY` | [Django SECRET_KEY setting](https://docs.djangoproject.com/en/5.0/ref/settings/#secret-key) |  | Yes |
| `DATABASE_URL` | Database connection URL using a [supported URL schema](https://django-environ.readthedocs.io/en/latest/types.html#environ-env-db-url) |  | Yes |
| `CSRF_TRUSTED_ORIGINS` | [Django CSRF_TRUSTED_ORIGINS setting](https://docs.djangoproject.com/en/5.0/ref/settings/#csrf-trusted-origins) | `[]` | No |
| `CORS_ALLOWED_ORIGINS` | [CORS_ALLOWED_ORIGINS setting](https://github.com/adamchainz/django-cors-headers?tab=readme-ov-file#cors_allowed_origins-sequencestr) for Cross-Origin Resource Sharing (CORS) | `[]` | No |
| `EMAIL_URL` | Email account details using a [supported URL schema](https://django-environ.readthedocs.io/en/latest/types.html#environ-env-email-url) | Emails will be printed to the console | No |
| `FRONTEND_DOMAIN` | Used in email templates to concatenate urls to your frontend site | [get_current_site().domain](https://docs.djangoproject.com/en/5.0/ref/contrib/sites/#get-current-site-shortcut) | No |
| `SITE_NAME` | Used in email templates to include your site's name | [get_current_site().name](https://docs.djangoproject.com/en/5.0/ref/contrib/sites/#get-current-site-shortcut) | No |
| `DEBUG` | [Django DEBUG setting](https://docs.djangoproject.com/en/5.0/ref/settings/#debug) | `False` | No |
| `INIT_ADMIN` | Email of the first admin. Useful when deploying the application for the first time. Required when running `python manage.py createadmin`. |  | No |

Additional environment variables and their default values can be found in `settings.py`. You may add additional settings as needed.

## Django packages used

Several Django packages/extensions/plugins are used in this project. You should familiarize yourself with all of them before building your app on top of the boilerplate.

### djangorestframework

A powerful and flexible toolkit for building Web APIs. All endpoints should use their class-based views.

https://www.django-rest-framework.org/

### rest-framework-roles

A Django REST Framework plugin for role-based access.

https://github.com/Pithikos/rest-framework-roles

### django-cors-headers

Adds Cross-Origin Resource Sharing (CORS) headers to responses. This allows in-browser requests to your Django application (e.g. `api.yourapp.com`) from other origins (e.g. requests from your frontend at `yourapp.com`).

https://github.com/adamchainz/django-cors-headers

### djoser

Provides a set of Django Rest Framework views to handle basic actions such as registration, login, logout, password reset, and account activation.

https://djoser.readthedocs.io/en/latest/

### drf-spectacular

Auto-generates an OpenAPI 3 schema of you API. Provides SwaggerUI and ReDoc documentation.

https://drf-spectacular.readthedocs.io/en/latest/

## Running the project

To run the project,
1. Create your `.env` file
2. Install the dependencies with `poetry install --no-root`
2. Apply migrations with `python ./manage.py migrate`
3. Run the server with `python ./manage.py runserver`
    - Alternatively, you can run it in the vscode debugger with the included vscode launch script. Make sure that you have configured the right Python interpreter for the project.

## Next steps

### Create a user account

1. Using the Swagger documentation, navigate to the `POST` method of `/api/v1/accounts/users/`. Fill the email and password details and execute your request.
2. Go back to your console, you should see an html email. It will include a link to your frontend to confirm and activate your account, but we don't have a frontend yet. Take note of the elements in the URL: `/activate/{uid}/{token}`.
3. In Swagger, navigate to `/api/v1/accounts/users/activation/`. Fill in the `uid` and `token` using the values we identified in the activation link.
4. Go back to the console, you should see an email confirming that your account has been activated.
5. Now, let's use the DRF Browsable API. On your browser, navigate to `http://127.0.0.1:8000/api/v1/accounts/users/me/`. You'll see a message saying "Authentication credentials were not provided". Click on "Log in" and enter your credentials. Now, you can see your own details. Feel free to click on the "Extra actions" dropdown and check out other user-related actions to try.

### Create an admin account

A custom command is included in this project to create the first admin (located at `apps.accounts.management.commands.createadmin`). The idea behind it is that when deploying the application for the first time you'll need a root admin account. The email for this account can be set under the environment variable `INIT_ADMIN`. Then, make sure that you run `python manage.py createadmin` as part of your deployment CI/CD pipeline. If there are no admins, an email invite will be sent to the `INIT_ADMIN`. Let's try it out in development mode.

1. Add `INIT_ADMIN` to your `.env` file.
2. Run `python manage.py createadmin`. An email will be printed to the console. Take note of the elements in the URL: `/invite/{uid}/{token}`.
3. On your browser, navigate to `http://127.0.0.1:8000/api/v1/accounts/users/invite_confirm/`. Fill in the `uid` and `token` using the values we identified in the activation link. Enter a password for the account.
4. Go back to the console, you should see an email confirming that your account has been activated.

Now, you can log in as an admin.

### User model

The user model included in this project is different from the default Django user model in that:
1. There is no username, the email is the username. Djoser has also been configured to support this change.
2. The user id is a UUID field.

Besides that, the rest is the same. This may or may not be what you need, feel free to add fields or modify the user manager as needed. You can find the models at `apps.core.models`.

### User account logic

Check out the [djoser documentation ](https://djoser.readthedocs.io/en/latest/) to get a sense of the user account logic in the project. In order to customize it to your needs, you can modify the `apps.accounts.views.UserViewSet` class. In this project, for example, the `invite` and `invite_confirm` methods have been added to allow administrators to invite other administrators to the platform.

### Application logic

The `posts` app showcases how all the components of the application come together. In this example,
- posts can be viewed by anyone
- posts can only be created by admins and users
- admins can edit and delete any post
- users can only edit and delete their own posts

Explore the `views`, `models`, and `serializers` for more details.

### Authentication

Djoser supports token and JWT authentication. By default, token auth has been included in `apps/accounts/urls.py` as an example. If you decide to go ahead with token auth, I highly recommend using [knox](https://github.com/jazzband/django-rest-knox) as the [TOKEN_MODEL](https://djoser.readthedocs.io/en/latest/settings.html#token-model).

### Permissions

As mentioned earlier, [rest-framework-roles](https://github.com/Pithikos/rest-framework-roles) has been included in this project. If you don't need any roles beyond `admin`, `user`, and `anon` you can remove it and stick to Django rest framework and Djoser permission classes.

### Documentation visibility

By default, the Swagger, Redoc, and Browsable API documentation is only available when running the project in debug mode. This behaviour can be modified in `config.urls` and the `REST_FRAMEWORK` settings in `config.settings`.