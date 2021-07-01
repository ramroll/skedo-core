import {Emiter} from "./Emiter";
import {Map as ImmutableMap} from 'immutable'
import { Topic } from "./Topic";

export interface Node extends Emiter<Topic> {
	setEditMode(value : boolean) : void
	getPassProps() : ImmutableMap<string, any> 
	setpassProps(values : ImmutableMap<string, any>) : void


}