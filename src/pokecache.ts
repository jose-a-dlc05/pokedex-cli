type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(num: number) {
    this.#interval = num;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val,
    };
    this.#cache.set(key, entry);
  }

  get<T>(key: string) {
    if (!this.#cache.get(key)) {
      return undefined;
    }

    return this.#cache.get(key)?.val;
  }

  #reap() {
    for (const entry of this.#cache) {
      if (entry[1].createdAt < Date.now() - this.#interval) {
        this.#cache.delete(entry[0]);
      }
    }
  }

  #startReapLoop() {
    const ID = setInterval(() => {
      this.#reap();
    }, this.#interval);

    this.#reapIntervalId = ID;
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
