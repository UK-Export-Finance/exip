// document.body.className = document.body.className ? `${document.body.className} js-enabled` : 'js-enabled';

// const element = document.getElementById('tasks-filters');
// if (element) {
//   element.className = 'js-enabled';
// }

document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');
