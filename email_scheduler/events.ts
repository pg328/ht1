// Done this way to give errors on misspelling trigger names and autocomplete, using the strings in `events`
const events = ["websiteSignUp", "socksPurchased"] as const;

export default events;
