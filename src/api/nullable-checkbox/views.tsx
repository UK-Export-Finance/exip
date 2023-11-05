/**
 * React component for the custom nullable checkbox KeystoneJS field.
 * This would render in the KeystoneJS admin UI/CMS.
 * Since we do not actually use this, we don't need to render anything.
 * However without a "component" the build will fail - the custom field requires a component.
 * Therefore we can just return an empty component.
 * If the admin UI/CMS does become used, there are many examples of how to create a real component here:
 * https://github.com/keystonejs/keystone/blob/main/examples/custom-field
 * @returns React component or null
 */
const views = () => null;

export default views;
