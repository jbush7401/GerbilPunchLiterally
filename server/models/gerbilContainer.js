/**
 * Created by jbush_000 on 5/23/2016.
 */
"use strict";

class GerbilContainer {
  constructor() {
    this._gerbils = new Map();
  }

  addGerbil(gerbil) {
    this._gerbils.set(gerbil.id, gerbil);
  }

  removeGerbil(gerbil) {
    this._gerbils.delete(gerbil.id);
  }

  getGerbil(gerbilId) {
    return this._gerbils.get(gerbilId);
  }

  getGerbils() {
    return this._gerbils.values();
  }
  
  resetGerbils() {
    this._gerbils.clear();
  }
  
}

module.exports = GerbilContainer;
