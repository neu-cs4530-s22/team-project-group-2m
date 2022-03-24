import BoundingBox from './BoundingBox';

export type ServerViewingArea = {
  label: string;
  occupantsByID: string[];
  boundingBox: BoundingBox;
};

export type ViewingAreaListener = {
  onOccupantsChange?: (newOccupants: string[]) => void;
};
export default class ViewingArea {
  private _occupants: string[] = [];

  private _label: string;

  private _boundingBox: BoundingBox;

  private _listeners: ViewingAreaListener[] = [];

  constructor(label: string, boundingBox: BoundingBox) {
    this._boundingBox = boundingBox;
    this._label = label;
  }

  get label() {
    return this._label;
  }

  set occupants(newOccupants: string[]) {
    if(newOccupants.length !== this._occupants.length || !newOccupants.every((val, index) => val === this._occupants[index])){
      this._listeners.forEach(listener => listener.onOccupantsChange?.(newOccupants));
      this._occupants = newOccupants;
    }
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

  addListener(listener: ViewingAreaListener) {
    this._listeners.push(listener);
  }

  removeListener(listener: ViewingAreaListener) {
    this._listeners = this._listeners.filter(eachListener => eachListener !== listener);
  }

  copy() : ViewingArea{
    const ret = new ViewingArea(this.label,this._boundingBox);
    ret.occupants = this.occupants.concat([]);
    this._listeners.forEach(listener => ret.addListener(listener));
    return ret;
  }

  static fromServerViewingArea(serverArea: ServerViewingArea): ViewingArea {
    const ret = new ViewingArea(serverArea.label, BoundingBox.fromStruct(serverArea.boundingBox));
    ret.occupants = serverArea.occupantsByID;
    return ret;
  }
}
