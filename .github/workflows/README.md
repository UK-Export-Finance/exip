# Bash
A bash script is a text file that contains a series of commands that are executed by the Bash shell. Bash scripts can be used to automate tasks.
Bash scripts can be a powerful tool for automating tasks.

## Deployment 🚀

 ### CICD
* 🔧 0. Infrastructure
* 🧪 1. Deployment
* 🗑️ 2. ACR Purge

Prompt the user to input a selection.
If the selection is not empty, the script checks the value and executes the corresponding section:

* 🔧 INFRASTRUCTURE: Sets the destination variable to "infrastructure" and the branch variable to "main".
* 🧪 DEPLOYMENT: Sets the destination variable to "deployment" and the branch variable to "main".
* 🗑️ ACR PURGE: Sets the destination and branch variables to empty strings. Executes the az acr run command to purge ACR (Azure Container Registry) based on specific filters and age.

If both destination and branch are not empty, the script performs the following steps:

* Checks out the specified branch and pulls the latest changes from the remote repository.
* Displays the latest commit of the branch.
* Creates a new branch based on the destination.
* Forces a push to the remote repository, setting the upstream branch.

# Git Hub Actions
GitHub Actions is a continuous integration (CI) and continuous delivery (CD) platform that runs in GitHub repositories. GitHub Actions lets you automate your workflows by creating custom jobs that run on different events, such as pushes to a branch or releases.

## Source Code Analysis 🚨

This workflow will run a source code analysis (SCA) on your code whenever a pull request is submitted. The SCA will use the Codacy and Fossa tools to check for any potential security vulnerabilities and licensing issues in your code. If any vulnerabilities or issues are found, the workflow will fail and a notification will be sent to the `#exip-github-actions` Slack channel.

**Environment variables:**

* `environment`: The name of the environment to run the workflow in.
* `timezone`: The timezone to use for the workflow.

**Steps:**

1. **Setup test infrastructure**

    * 🔨 Set the environment and timezone variables.
    * 💾 Clone the repository.

2. **Codacy**

    * 🔍️ Run the Codacy SCA on the code.
    * 🚨 Report any potential security vulnerabilities to the console.

3. **Fossa**

    * ⚖️ Run the Fossa SCA on the code.
    * 📝 Report any potential licensing issues to the console.

**Tips:**

* 🧹 Use SCA tools that are appropriate for the language you are using.
* ⚙️ Configure the SCA tools to report all potential vulnerabilities and issues.
* 🔨 Fix any vulnerabilities or issues that the SCA tools report.
* 🔌 Add the SCA tools to your pre-commit hook so that they are run before you commit your code.

By using SCA tools, you can help to ensure that your code is secure and compliant with all applicable licenses.

## Lint 🎨

This workflow will run a linting check on your code whenever a pull request is submitted to the `main-application` branch. The linting check will use the `eslint` linter to check for any errors or warnings in your code. If any errors or warnings are found, the workflow will fail and a notification will be sent to the `#exip-github-actions` Slack channel.

**Environment variables:**

* `environment` : The name of the environment to run the workflow in.
* `timezone` : The timezone to use for the workflow.

**Steps:**

1. **Setup test infrastructure**

    * 🔨 Set the environment and timezone variables.
    * 💾 Clone the repository.

2. **Lint**

    * 🎨 Run the linting check on the code.
    * 🚨 Report any errors or warnings to the console.

3. **Notification**

    * 🔔 Send a notification to the `#exip-github-actions` Slack channel if the linting check fails.
    * 📝 The notification includes the status of the workflow, the steps that were run, and the errors or warnings that were found.

**Tips:**

* 🧹 Use a linter that is appropriate for the language you are using.
* ⚙️ Configure the linter to report all errors and warnings.
* 🔨 Fix any errors or warnings that the linter reports.
* 🔌 Add the linter to your pre-commit hook so that it is run before you commit your code.

By using linters, you can help to ensure that your code is clean, consistent, and easy to read.

## Revision 📑
This workflow automates the release process by:

* 📑 Update `package.json`, `README.md`, and `CHANGELOG.md`
* 🚀 Create a new release
* 📂 Upload the release assets

## Infrastructure 🔨

This is a GitHub workflow that builds and deploys infrastructure for EXIP.

## On

  * Push to the `infrastructure` branch 🚀

## Jobs

  * **Setup:**
    * Sets up environment variables and timezone 🌍
  * **Base:**
    * Creates a resource group, app service plan, log analytics workspace, container registry, virtual network, and VNET peering 🗼
    * Creates a web app for the UI and API 🌐
  * **WebApp:**
    * Configures continuous deployment for the UI and API 🔀
    * Sets configuration and settings for the UI and API ⚙️

## Outputs

  * **Environment:** The name of the environment, e.g. `development` or `production`.
  * **Timezone:** The timezone, e.g. `Europe/London`.

## Details

The `Setup` job sets up environment variables and timezone. This is useful for setting things like the Azure subscription ID, resource group name, and location. The `Base` job creates a resource group, app service plan, log analytics workspace, container registry, virtual network, and VNET peering. This is the foundation for all of the other infrastructure that will be created. The `WebApp` job creates a web app for the UI and API. This is the front-end for the EXIP application. The `WebApp` job also configures continuous deployment for the UI and API. This means that changes to the code will be automatically deployed to the production environment. The `WebApp` job also sets configuration and settings for the UI and API. This includes things like the application name, port, and environment variables.

This GitHub workflow provides a comprehensive and easy-to-use way to build and deploy infrastructure for EXIP.