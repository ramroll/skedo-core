import { Topic } from './Topic'
import { Node } from './Node'
import { JsonWidgetTree } from './JsonWidgetTree'

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

  createChildBridge(json : JsonWidgetTree) : Bridge {
    const node = this.node.addFromJSON(json)
    return new Bridge(node)
  }

  renderExternal(elem : HTMLElement) {
    this.node.renderExternal(elem)
  }

}
