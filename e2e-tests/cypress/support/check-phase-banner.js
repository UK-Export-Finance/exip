import partials from '../e2e/partials';
import { ROUTES } from '../../constants';

export default () => {
  partials.phaseBanner.tag().invoke('text').then((text) => {
    expect(text.trim()).equal('alpha');
  });

  partials.phaseBanner.text().invoke('text').then((text) => {
    expect(text.trim()).equal('This is a new service - your feedback will help us to improve it.');
  });

  partials.phaseBanner.feedbackLink().invoke('text').then((text) => {
    expect(text.trim()).equal('feedback');
  });

  partials.phaseBanner.feedbackLink().should('have.attr', 'href', ROUTES.FEEDBACK);
};
