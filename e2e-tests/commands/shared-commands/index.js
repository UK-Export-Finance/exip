import '@cypress-audit/lighthouse/commands';

import './account';
import '../analytics';
import './assertions';
import './click-events';
import './eligibility';
import './form';
import './intercept';
import './url';

Cypress.Commands.add('autocompleteKeyboardInput', require('../autocomplete-keyboard-input'));
Cypress.Commands.add('corePageChecks', require('../core-page-checks'));
Cypress.Commands.add('keyboardInput', require('../keyboard-input'));
Cypress.Commands.add('navigateToRootUrl', require('../navigate-to-root-url'));
Cypress.Commands.add('saveSession', require('../save-session'));
