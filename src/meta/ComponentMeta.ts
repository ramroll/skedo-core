
import {GroupMeta} from './GroupMeta'
import {PropMeta} from './PropMeta'
import {Map as ImmutableMap, fromJS} from 'immutable'
import {Rect} from '../Rect'


export interface PropConfig {
  name : string,
  props? : any
  type : string,
  disabled? : boolean
  default : any
  label : string
  selections ? : any
  path : string,
  row ? : number
  rowLabel : string
}

export interface GroupConfig {
  name : string,
  title : string,
  style : any,
  props : Array<PropConfig>
}

export interface PropsEditorConfigure {
  groups? : Array<GroupConfig>
}

export interface ComponentMetaConfig {
  type : string,
  image : string,
  title : string,
  isContainer : boolean,
  initialWidth : number,
  initialHeight : number,
  editor : PropsEditorConfigure,
  intrinsic? :  boolean,
  url? : string,
  style? : any,
  defaultProps : any
}


export class ComponentMeta {
  type : string  
  image : string
  title : string
  isContainer : boolean
  initialWidth : number
  initialHeight : number
  editor : PropsEditorConfigure
  intrinsic? :  boolean
  url? : string
  style? : any
  defaultProps : any

  props : {[name : string] : PropMeta}
  groups : Array<GroupMeta>

  constructor(config : ComponentMetaConfig) {
    this.type = config.type
    this.image = config.image
    this.title = config.title
    this.isContainer = config.isContainer
    this.initialWidth = config.initialWidth
    this.initialHeight = config.initialHeight
    this.intrinsic = config.intrinsic
    this.url = config.url
    this.style = config.style
    this.defaultProps = config.defaultProps
    this.editor = config.editor
    this.props = {}
    this.groups = []

    if (config.editor && config.editor.groups) {
      for (let group of config.editor.groups) {
        this.groups.push(GroupMeta.of(group))
        for (let prop of group.props || []) {
          this.props[prop.name] = new PropMeta(prop)
        }
      }
    }
  }

  createData(id : number, rect : Rect) {
    let data = ImmutableMap({
      parent : null,
      type : this.type,
      rect : rect,
      style : ImmutableMap<string, any>(),
      children : [],
      id,
      allowDrag : true,
      isMoving : false,
      editMode : false,
      passProps : fromJS(this.defaultProps || {}),
      isContainer : this.isContainer,
    })

    for(let key in this.props) {
      const prop = this.props[key]
      if (prop.default !== undefined) {
        data = PropMeta.setPropValue(
          prop.path,
          data,
          prop.default
        )
      }
    }
    return data
  }

}
