import { type ElementBuilderOptions } from '@types';

export default class ElementBuilder {
  private element: HTMLElement;

  constructor({
    tag = 'div',
    id,
    classes,
    attributes,
    content,
    event,
    children,
    styles,
  }: ElementBuilderOptions = {}) {
    this.element = document.createElement(tag);

    if (id) this.setId(id);
    if (classes) this.addClass(...classes);
    if (attributes) this.addAttribute(attributes);
    if (content) this.setContent(content);
    if (event) this.addEvent(event);
    if (children) this.addChild(...children);
    if (styles) this.addStyle(styles);
  }

  public setId(id: string): void {
    this.element.id = id;
  }

  public getId(): string {
    return this.element.id;
  }

  public addClass(...classNames: NonNullable<ElementBuilderOptions['classes']>): void {
    this.element.classList.add(...classNames);
  }

  public removeClass(...classNames: NonNullable<ElementBuilderOptions['classes']>): void {
    this.element.classList.remove(...classNames);
  }

  public replaceClass(
    remove: NonNullable<ElementBuilderOptions['classes']>,
    add: NonNullable<ElementBuilderOptions['classes']>
  ): void {
    this.removeClass(...remove);
    this.addClass(...add);
  }

  public hasClass = (className: string): boolean => this.element.classList.contains(className);

  public toggleClass(...classNames: NonNullable<ElementBuilderOptions['classes']>): void {
    classNames.forEach((className) => this.element.classList.toggle(className));
  }

  public addStyle(styles: Partial<CSSStyleDeclaration>): void {
    for (const key in styles) {
      const value = styles[key];
      if (value) {
        this.element.style[key] = value;
      }
    }
  }

  public addAttribute(attributes: NonNullable<ElementBuilderOptions['attributes']>): void {
    for (const [name, value] of Object.entries(attributes)) {
      this.element.setAttribute(name, value);
    }
  }

  public removeAttribute(...attributeNames: string[]): void {
    attributeNames.forEach((name) => this.element.removeAttribute(name));
  }

  public setContent(content: NonNullable<ElementBuilderOptions['content']>): void {
    this.element.textContent = content;
  }

  public removeContent(): void {
    this.element.textContent = '';
  }

  public addEvent({
    type,
    handler,
    options = false,
  }: NonNullable<ElementBuilderOptions['event']>): void {
    this.element.addEventListener(type, handler, options);
  }

  public removeEvent({
    type,
    handler,
    options = false,
  }: NonNullable<ElementBuilderOptions['event']>): void {
    this.element.removeEventListener(type, handler, options);
  }

  public addChild(...children: ElementBuilder[]): void {
    children.forEach((child) => this.element.appendChild(child.getElement()));
  }

  public remove(): void {
    this.element.remove();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public getOffsetWidth(): number {
    return this.element.offsetWidth;
  }

  public getChildCount(): number {
    const element = this.getElement();
    return element ? element.childElementCount : 0;
  }
}
