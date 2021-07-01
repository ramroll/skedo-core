import { Topic } from './Topic'
import { ComponentMetaConfig } from './meta/ComponentMeta'
import { Node } from './Node'

export class Bridge {
  node : Node 
  constructor(node : Node){
    this.node = node
  }

  editMode(){
    this.node.setEditMode(true)
    this.node.emit(Topic.Updated)
  }

  normalMode(){
    this.node.setEditMode(false)
    this.node.emit(Topic.ResizeModelUpdated)
  }

  setPropsValue(key : string, value : any)  {
    const passProps = this.node.getPassProps()
    this.node.setpassProps(passProps.set(key, value))
    this.node.emit(Topic.Updated)
  }

  renderNode(json : ComponentMetaConfig) {

  }
}
