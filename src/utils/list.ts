/**
 * @extends EventEmitter
 */
export default class List<T> {
    private readonly items: T[];

    /**
     * @param {T[]} [items=[]]
     */
    public constructor(items: T[] = []) {
        /**
         * @type {T[]}
         * @private
         */
        this.items = items;
    }

    /**
     * Get an item in this collection by its index
     * @param {number} index
     * @return {T | null}
     */
    public at(index: number): T | null {
        return this.items[index] || null;
    }

    /**
     * Remove an item from this collection by its index
     * @param {number} index
     * @return {boolean} Whether the item was removed
     */
    public removeAt(index: number): boolean {
        if (this.items[index] !== null && this.items[index] !== undefined) {
            this.items.splice(index, 1);

            return true;
        }

        return false;
    }

    /**
     * Add an item to this collection
     * @param {T} item
     * @return {this}
     */
    public add(item: T): this {
        this.items.push(item);

        return this;
    }

    /**
     * Add an item to this collection only if it doesn't already exist
     * @param {T} item
     * @return {boolean} Whether the item was added
     */
    public addUnique(item: T): boolean {
        if (!this.contains(item)) {
            this.add(item);

            return true;
        }

        return false;
    }

    /**
     * Determine whether this collection contains an item
     * @param {T} item
     * @return {boolean}
     */
    public contains(item: T): boolean {
        for (let i: number = 0; i < this.items.length; i++) {
            if (this.items[i] === item) {
                return true;
            }
        }

        return false;
    }
}