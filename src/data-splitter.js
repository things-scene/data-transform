/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import COMPONENT_IMAGE from '../assets/symbol-data-splitter.png'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'target',
      name: 'target'
    }
  ],
  'value-property': 'source'
}

import { Component, RectPath, Shape } from '@hatiolab/things-scene'

const SELF = function(o) {
  return o
}

export default class DataSplitter extends RectPath(Shape) {
  static get nature() {
    return NATURE
  }

  static get image() {
    if (!DataSplitter._image) {
      DataSplitter._image = new Image()
      DataSplitter._image.src = COMPONENT_IMAGE
    }

    return DataSplitter._image
  }

  render(context) {
    var { left, top, width, height } = this.bounds

    context.beginPath()
    context.drawImage(DataSplitter.image, left, top, width, height)
  }

  onchange(after, before) {
    if (after.hasOwnProperty('source') && Array.isArray(after.source)) {
      this.splitArray(after.source)
    }
  }

  splitArray(targetArray) {
    let targetId = this.target
    let targetComponent = this.root.findById(targetId)
    if (targetId && targetComponent) {
      for (var i = 0; i <= targetArray.length; i++) {
        targetComponent.data = targetArray[i]
      }
    }
    console.log(targetArray)
  }

  get source() {
    return this.getState('source')
  }

  set source(source) {
    this.setState('source', source)
  }

  get target() {
    return this.getState('target')
  }

  set target(target) {
    this.setState('target', target)
  }
}

Component.register('data-splitter', DataSplitter)
