import BoundingBox from './BoundingBox';

/**
 * Represents a type Server Viewing Area.
 */
export type ServerViewingArea = {
  label: string;
  occupantsByID: string[];
  boundingBox: BoundingBox;
};

/**
 * Represents a Viewing Area in Covey.Town.
 */
export default class ViewingArea {
  private _occupants: string[] = [];

  private _label: string;

  private _boundingBox: BoundingBox;

  /**
  * Creates a Viewing Area in Covey.Town.
  * @constructor
  * @param {string} label - The label in the Viewing Area.
  * @param {BoundingBox} boundingBox - The boundingBox in the Viewing Area.
  */
  constructor(label: string, boundingBox: BoundingBox) {
    this._boundingBox = boundingBox;
    this._label = label;
  }

  get label() {
    return this._label;
  }

  get occupants() {
    return this._occupants;
  }

  getBoundingBox(): BoundingBox {
    return this._boundingBox;
  }

  toServerViewingArea(): ServerViewingArea {
    return {
      label: this.label,
      occupantsByID: this.occupants,
      boundingBox: this.getBoundingBox(),
    };
  }
}
