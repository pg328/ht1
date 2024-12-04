import { Action } from "./actions";

import events from "../events";

// Done this way to give errors on misspelling trigger names and autocomplete, using the strings in `events`
type Trigger = (typeof events)[number];

export interface Flow {
  trigger: Trigger; // Event name that triggers the flow
  actions: Action[];
}

export type Flows = Record<Trigger, Flow>;
