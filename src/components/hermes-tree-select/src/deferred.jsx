class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    this.status = 'pending';
  }

  resolve(value) {
    this._resolve.call(this.promise, value);
    this.status = 'resolve';
  }

  reject(reason) {
    this._reject.call(this.promise, reason);
    this.status = 'reject';
  }
}

export default Deferred;
