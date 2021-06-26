import {Emiter} from "./Emiter";
import {Map as ImmutableMap} from 'immutable'
import { Topic } from "./Topic";

export default interface Node extends Emiter<Topic> {
	setEditMode(value : boolean) 
	getPassProps() : ImmutableMap<string, any>
	setpassProps(values : ImmutableMap<string, any>)


}