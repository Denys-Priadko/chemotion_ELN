import React, {Component} from 'react'
import SVG from 'react-inlinesvg';
import {Alert, Label, Table} from 'react-bootstrap';
import {SVGContent, MaterialContent, DescriptionContent, PurificationContent, TLCContent, ObservationContent, AnalysesContent, LiteratureContent} from './ReactElements';

const Reports = ({selectedReactions, settings}) => {
  let reactions = selectedReactions.map( (reaction, i) => {
    return (
      <Report key={i} reaction={reaction} settings={settings}/>
    )
  })
  return (
    <div> {reactions} </div>
  )
}

const Report = ({reaction, settings}) => {
  const {name, description, literatures, starting_materials, reactants,
         products, dangerous_products, purification,
         observation, reaction_svg_file, tlc_description, tlc_solvents, rf_value } = reaction

  const settings_obj = settings.reduce((o, {text, checked} ) => {
    o[text] = checked
    return o
  }, {})

  return (
    <div>
      <Alert bsStyle='success' style={{textAlign: 'center', backgroundColor: '#428bca', color:'white', border:'none'}}> {name} </Alert>

      <SVGContent show={settings_obj.formula} reaction_svg_file={reaction_svg_file} />
      <MaterialContent  show={settings_obj.material}
                        starting_materials={starting_materials}
                        reactants={reactants}
                        products={products} />
      <DescriptionContent show={settings_obj.description} description={description} />
      <PurificationContent show={settings_obj.purification} purification={purification} />
      <TLCContent show={settings_obj.tlc} tlc_description={tlc_description} tlc_solvents={tlc_solvents} rf_value={rf_value} />
      <ObservationContent show={settings_obj.observation} observation={observation} />
      <AnalysesContent show={settings_obj.analysis} products={products} />
      <LiteratureContent show={settings_obj.literature} literatures={literatures} />
    </div>
  )
}

export default Reports