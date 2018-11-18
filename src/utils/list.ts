import {EventEmitter} from "events";

/**
 * @extends EventEmitter
 */
export default class List<DataType> {
    private readonly items: DataType[];

    /**
     * @param {DataType[]} [items=[]]
     */
    public constructor(items: DataType[] = []) {
        /**
         * @type {DataType[]}
         * @private
         */
        this.items = items;
    }

    /**
     * Get an item in this collection by its index
     * @param {number} index
     * @return {DataType | null}
     */
    public at(index: number): DataType | null {
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
     * @param {DataType} item
     * @return {this}
     */
    public add(item: DataType): this {
        this.items.push(item);

        return this;
    }

    /**
     * Add an item to this collection only if it doesn't already exist
     * @param {DataType} item
     * @return {boolean} Whether the item was added
     */
    public addUnique(item: DataType): boolean {
        if (!this.contains(item)) {
            this.add(item);

            return true;
        }

        return false;
    }

    /**
     * Determine whether this collection contains an item
     * @param {DataType} item
     * @return {boolean}
     */
    public contains(item: DataType): boolean {
        for (let i: number = 0; i < this.items.length; i++) {
            if (this.items[i] === item) {
                return true;
            }
        }

        return false;
    }
}