import ElementBuilder from '@utils/element-builder';

export interface ElementBuilderOptions {
  tag?: keyof HTMLElementTagNameMap;
  id?: string;
  classes?: string[];
  attributes?: Record<string, string>;
  content?: string;
  event?: ElementBuilderEventOptions;
  children?: ElementBuilder[];
}

interface ElementBuilderEventOptions {
  type: string;
  handler: EventListenerOrEventListenerObject;
  options?: boolean | AddEventListenerOptions;
}
