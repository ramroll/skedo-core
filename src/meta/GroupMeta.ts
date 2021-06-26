import { GroupConfig, PropConfig } from "./ComponentMeta"

export class GroupMeta {
	propKeys: Set<string>
  title : string
  style : any
	name : string

	constructor(){
		this.propKeys = new Set<string>()
		this.name = ''
		this.title = ''
		this.style = {}
	}

	static of(config : GroupConfig) {
		const group = new GroupMeta()
		group.name = config.name
		group.title = config.title
		group.style = config.style
		if (config.props) {
      config.props.forEach((prop: PropConfig) => {
        group.propKeys.add(prop.name)
      })
    }
		return group
	}

	clone() {
		const g = new GroupMeta()
		g.name = this.name
		g.title = this.title
		g.style = this.style
		g.propKeys = new Set([...this.propKeys])
		return g	
	}


	mergeGroup(group : GroupMeta) {
		const g = new GroupMeta()
		g.propKeys = new Set([...this.propKeys])
		group.propKeys.forEach(key => {
			g.propKeys.add(key)
		})
		return g
	}
}