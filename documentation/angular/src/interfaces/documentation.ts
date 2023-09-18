/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ComponentData {
  name?: string;
  filePath: string;
  encapsulation: string;
  tag: string;
  readme: string;
  docs: string;
  docsTags: any[];
  usage: any;
  props: any[];
  methods: any[];
  events: EventItem[];
  listeners: Listener[];
  styles: any[];
  slots: any[];
  parts: any[];
  dependents: string[];
  dependencies: string[];
  dependencyGraph: { [key: string]: string[] };
  children?: ComponentData[];
}

export interface Listener {
  event: string;
  capture: boolean;
  passive: boolean;
}

export interface EventItem {
  event: string;
  detail: any;
  bubbles: boolean;
  cancelable: boolean;
  composed: boolean;
  docs: string;
  docsTags: any[];
}
