import ElementBuilder from '@utils/element-builder';

export default abstract class BasePage {
  protected root: ElementBuilder;

  constructor() {
    this.root = new ElementBuilder({ classes: ['page'] });
  }

  public build(): HTMLElement {
    return this.root.getElement();
  }

  public abstract render(): void;
}
