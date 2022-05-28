type Handler<T> = {
  (data: T): void;
};

interface CustomEventListener<T> {
  on(handler: Handler<T>): void;
  off(handler: Handler<T>): void;
}

class CustomEvent<T> implements CustomEventListener<T> {
  private handlers: Handler<T>[] = [];

  on(handler: Handler<T>): void {
    this.handlers.push(handler);
  }
  off(handler: Handler<T>): void {
    this.handlers = this.handlers.filter(h => h !== handler);
  }
  trigger(data: T) {
    this.handlers.forEach(h => h(data));
  }
  expose(): CustomEventListener<T> {
    return this;
  }
}

export default CustomEvent;
