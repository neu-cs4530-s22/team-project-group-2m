import BoundingBox from './BoundingBox';

/**
 * Represents a type Server Viewing Area
 */
export type ServerViewingArea = {
  label: string;
  occupantsByID: string[];
  boundingBox: BoundingBox;
};

/**
 * Represents a class Viewing Area in Covey.Town
 */
export default class ViewingArea {
  private _occupants: string[] = [];

  private _label: string;

  private _boundingBox: BoundingBox;

  /**
  * Creates a Viewing Area in Covey.Town
  * @constructor
  * @param {string} label - The label in the Viewing Area
  * @param {BoundingBox} boundingBox - The boundingBox in the Viewing Area
  */
  constructor(label: string, boundingBox: BoundingBox) {
    this._boundingBox = boundingBox;
    this._label = label;
  }

  /**
  * gets the label of the Viewing Area
  * @returns {string} the label of the viewing Area
  */
  get label() {
    return this._label;
  }

  /**
  * gets the occupants that are in the Viewing Area
  * @returns {string} the occupants of the viewing Area
  */
  get occupants() {
    return this._occupants;
  }

  /**
  * gets the Boundingbox of the Viewing Area
  * @returns {BoundingBox} a Bounding Box
  */
  getBoundingBox(): BoundingBox {
    return this._boundingBox;
  }

  /**
  * gets the values for the server of the Viewing Area
  * @returns {ServerViewingArea} a Server Viewing Area
  */
  toServerViewingArea(): ServerViewingArea {
    return {
      label: this.label,
      occupantsByID: this.occupants,
      boundingBox: this.getBoundingBox(),
    };
  }
}
