# EXIP UI :file_folder:

User interface to check if a UK based exporter can apply for credit insurance and/or get a premium quote.

## Directory Structure

- **Dockerfile**: This file defines the Docker image that will be used to run the application.
- **README.md**: This file provides a brief overview of the application.
- **jest.config.js**: This file configures the Jest test runner.
- **package-lock.json**: This file lists the exact versions of all the dependencies used by the application.
- **package.json**: This file defines the application's dependencies and other metadata.
- **public**: This directory contains static assets, such as images and CSS files.
- **scripts**: This directory contains scripts that are used to automate tasks, such as running tests and building the application.
- **styles**: This directory contains stylesheets in `*.scss` format.
- **types**: This directory contains type declaration files, which are used to describe the shape and are used for typechecking.
- **server**: This directory contains the application's source code.
  - **api**: This directory contains the application's APIs.
    - **external**: This directory contains APIs that are provided by external services.
    - **keystone**: This directory contains APIs that are provided by the Keystone framework.
  - **constants**: This directory contains the application's constants.
  - **content-strings**: This directory contains the application's content strings.
  - **controllers**: This directory contains the application's controllers.
  - **middleware**: This directory contains the application's middleware.

---
