# Git Hub Actions (GHA) 🚀

GitHub Actions has been widely used to define custom workflows (using YAML syntax) to build, test, lint and deploy out code directly from our public GitHub repositories.

## Script

### CICD 📝

This Bash script represents a Continuous Integration and Continuous Deployment (CICD) process.

### Color Variables

- `RED` 🟥: Represents the color code for red.
- `GREEN` 🟩: Represents the color code for green.
- `BLUE` 🔵: Represents the color code for blue.
- `YELLOW` 🟨: Represents the color code for yellow.
- `NC` ⬛: Represents the color code for no color (default).

### User Input

The script prompts the user to select an option from the following:

- `${YELLOW}0. Infrastructure 🔧${NC}`
- `${BLUE}1. Deployment 🧪${NC}`
- `${RED}2. ACR Purge 🗑️${NC}`

### Option Handling

Based on the user's selection, the script performs the following actions:

### Infrastructure 🔧

- Sets the `destination` variable to "infrastructure".
- Sets the `branch` variable to "main".

### Deployment 🧪

- Prompts the user to enter a value for the `destination` variable.
- Sets the `branch` variable to "main".

### ACR Purge 🗑️

- Clears the values of the `destination` and `branch` variables.
- Runs an Azure CLI command to purge specific resources in an Azure Container Registry (ACR).

## IaC 🔨

### Overview

This documentation outlines the setup and configuration of the EXIP project's infrastructure automation using GitHub Actions. This automation aims to streamline the deployment process, ensure security, and maintain consistency across various environments.

### Workflow Structure 📋

The infrastructure automation workflow consists of several stages, each with a specific focus and associated tasks:

1. **Setup 🔧**: This stage sets up environment variables and prepares the workflow for execution.

2. **Base 🧱**: In this stage, the base infrastructure components are created, providing a foundation for the project.

3. **Security 🔑**: Security measures and configurations are implemented to safeguard the infrastructure.

4. **Web App 🔧**: Configure web applications and services required for the project.

5. **Logs and Diagnostic Settings 📒**: Set up logging and diagnostic settings for monitoring and debugging purposes.

6. **Alerts 📢**: Notifies the relevant team when the origin is unhealthy for every defined minute over defined minutes interval.

### Workflow Triggers 🔄

This workflow is automatically triggered under specific conditions:

- **Push to Infrastructure Branch**: The workflow triggers when there is a push event to the "infrastructure" branch.

- **Changes to Workflow Configuration**: It also triggers when there are changes to the `.github/workflows/infrastructure.yml` file.

### Environment Variables 🌐

The following environment variables are used throughout the workflow:

- **PRODUCT**: The name of the product, which is "exip."

- **ENVIRONMENT**: The current environment, which is "infrastructure."

- **TIMEZONE**: The timezone used for timestamping.

- **TARGET**: The deployment environment target (e.g., development, staging, production).

- (Add other relevant environment variables)

### Workflow Jobs and Tasks 🚦

Each stage in the workflow is associated with one or more jobs that contain specific tasks to achieve the desired outcome:

- **Setup 🔧**: This job handles the initial setup tasks and environment variable configuration.

- **Base 🧱**: The base infrastructure job creates foundational components.

- **Security 🔑**: Security measures are implemented in this job.

- **Web App 🔧**: This job configures web applications environment variables, application settings, database connection and other CI/CD configurations.

- **Logs and Diagnostic Settings 📒**: Configure logging and diagnostic settings for monitoring and troubleshooting.

- **Alerts 📢**: Dispatched alerts to the respective action group when a specific condition on the selected dimension is met.

### Usage 🛠️

To run this infrastructure automation workflow, follow these steps:

1. Ensure you are on the "infrastructure" branch in your repository.

2. Make changes to the workflow configuration in `.github/workflows/infrastructure.yml` if needed.

3. Push your changes to the repository to trigger the workflow.

### Conclusion 🎉

The EXIP Infrastructure Automation workflow streamlines the process of setting up infrastructure components, enhancing security, configuring web applications and database With the automation in place, you can maintain consistent environments for development, staging, and production, and deploy with confidence.

If you have any questions or need further assistance, please don't hesitate to reach out to the development team. Happy automating! 🤖✨

## Deployment 🚀

The workflow is triggered on pushes to the `dev`, `staging`, and `production` branches when changes are made to specific paths related to source code, the database, and the deployment workflow itself.

### Environment Variables

- `PRODUCT`: The name of the product (EXIP).
- `ENVIRONMENT`: The environment (derived from `github.ref_name`).
- `TIMEZONE`: The timezone set to 'Europe/London'.
- `FROM`: Base artifact version (latest).

### Jobs

#### Job: Setup 🔧

This job sets up the environment variables and outputs them for other jobs to use.

#### Job: Database 📦️

This job performs actions related to the database. It checks out the repository, logs in to Azure, and configures Azure defaults. TODO: MS SQL DB setup.

#### Job: API 📦️

This job deploys the API. It checks out the repository, logs in to Azure, configures Azure defaults, and sets up Azure Container Registry (ACR) variables. It builds and pushes Docker images, creates a temporary deployment slot, swaps the slot, and restarts the web app.

#### Job: UI 📦️

This job deploys the UI. It checks out the repository, logs in to Azure, configures Azure defaults, and sets up Azure Container Registry (ACR) variables. It builds and pushes Docker images, creates a temporary deployment slot, swaps the slot, and restarts the web app.

## Source Code Analysis 🚨

This workflow will run a source code analysis (SCA) on your code whenever a pull request is submitted. The SCA will use the Codacy and Fossa tools to check for any potential security vulnerabilities and licensing issues in your code. If any vulnerabilities or issues are found.

**Environment variables:**

- `environment`: The name of the environment to run the workflow in.
- `timezone`: The timezone to use for the workflow.

**Steps:**

1. **Setup test infrastructure**

   - 🔨 Set the environment and timezone variables.
   - 💾 Clone the repository.

2. **Codacy**

   - 🔍️ Run the Codacy SCA on the code.
   - 🚨 Report any potential security vulnerabilities to the console.

3. **Fossa**

   - ⚖️ Run the Fossa SCA on the code.
   - 📝 Report any potential licensing issues to the console.

**Tips:**

- 🧹 Use SCA tools that are appropriate for the language you are using.
- ⚙️ Configure the SCA tools to report all potential vulnerabilities and issues.
- 🔨 Fix any vulnerabilities or issues that the SCA tools report.
- 🔌 Add the SCA tools to your pre-commit hook so that they are run before you commit your code.

By using SCA tools, you can help to ensure that your code is secure and compliant with all applicable licenses.

## Lint 🎨

This workflow will run a linting check on your code whenever a pull request is submitted to the `main-application` branch. The linting check will use the `eslint` linter to check for any errors or warnings in your code. If any errors or warnings are found.

**Environment variables:**

- `environment` : The name of the environment to run the workflow in.
- `timezone` : The timezone to use for the workflow.

**Steps:**

1. **Setup test infrastructure**

   - 🔨 Set the environment and timezone variables.
   - 💾 Clone the repository.

2. **Lint**

   - 🎨 Run the linting check on the code.
   - 🚨 Report any errors or warnings to the console.

**Tips:**

- 🧹 Use a linter that is appropriate for the language you are using.
- ⚙️ Configure the linter to report all errors and warnings.
- 🔨 Fix any errors or warnings that the linter reports.
- 🔌 Add the linter to your pre-commit hook so that it is run before you commit your code.

By using linters, you can help to ensure that your code is clean, consistent, and easy to read.

## Revision 📑

This workflow automates the release process by:

- 📑 Update `package.json`, `README.md`, and `CHANGELOG.md`
- 🚀 Create a new release
- 📂 Upload the release assets

---
