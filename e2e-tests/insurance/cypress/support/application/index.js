import './business';
import './buyer';
import './check-your-answers';
import './policy-and-export';

Cypress.Commands.add('createAnApplication', require('../../../../commands/insurance/create-an-application'));
Cypress.Commands.add('createApplications', require('../../../../commands/insurance/create-applications'));

Cypress.Commands.add('deleteApplication', require('../../../../commands/insurance/delete-application'));
Cypress.Commands.add('deleteApplications', require('../../../../commands/insurance/delete-applications'));
