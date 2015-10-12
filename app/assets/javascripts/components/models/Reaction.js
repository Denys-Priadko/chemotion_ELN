import sha256 from 'sha256';
import _ from 'lodash';

import Sample from '../models/Sample';

export default class Reaction {

  constructor(args) {
    Object.assign(this, args);
    this._checksum = this.checksum();
  }

  static buildEmpty() {
    return new Reaction({
      id: '_new_',
      type: 'reaction',
      name: 'New Reaction',
      status: "",
      description: "",
      timestamp_start: "",
      timestamp_stop: "",
      observation: "",
      purification: "",
      dangerous_products: "",
      solvents: "",
      rf_value: 0.00,
      temperature: "",
      tlc_description: "",
      starting_materials: [],
      reactants: [],
      products: [],
      literatures: []
    })
  }

  get edited() {
    return this._checksum != this.checksum();
  }

  checksum() {
    return sha256(JSON.stringify(_.omit(_.omit(this, '_checksum'), _.isEmpty)));
  }

  get isNew() {
    return this.id == '_new_'
  }

  get temperature() {
    return this._temperature
  }

  set temperature(temperature) {
    this._temperature = temperature
  }

  get solvents() {
    return this._solvents
  }

  set solvents(solvents) {
    this._solvents = solvents
  }

  get starting_materials() {
    return this._starting_materials
  }

  set starting_materials(samples) {
    this._starting_materials = this._coerceToSamples(samples);
  }

  get reactants() {
    return this._reactants
  }

  set reactants(samples) {
    this._reactants = this._coerceToSamples(samples);
  }

  get products() {
    return this._products
  }

  set products(samples) {
    this._products = this._coerceToSamples(samples);
  }

  get samples() {
    return [...this.starting_materials, ...this.reactants, ...this.products]
  }

  addMaterial(material, materialGroup) {
    const materials = this[materialGroup];
    materials.push(material);
  }

  deleteMaterial(material, materialGroup) {
    const materials = this[materialGroup];
    const materialIndex = materials.indexOf(material);
    materials.splice(materialIndex, 1);
  }

  moveMaterial(material, previousMaterialGroup, materialGroup) {
    const materials = this[materialGroup];
    this.deleteMaterial(material, previousMaterialGroup);
    materials.push(material);
  }

  _coerceToSamples(samples) {
    return samples && samples.map(s => new Sample(s)) || []
  }

  sampleById(sampleID) {
    return this.samples.find((sample) => {
      return sample.id == sampleID;
    })
  }

  get referenceMaterial() {
    return this.samples.find((sample) => {
      return sample.reference;
    })
  }

  markSampleAsReference(sampleID) {
    this.samples.forEach((sample) => {
      sample.reference = sample.id == sampleID;
    })
  }

  get svgPath() {
    return this.reaction_svg_file && `/images/reactions/${this.reaction_svg_file}`
  }
}
