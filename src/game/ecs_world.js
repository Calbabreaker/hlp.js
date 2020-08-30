import { Map } from "../utils/map";
import { UniqueIDGen } from "../utils/unique_id_gen";
import * as ECS from "./ecs_primitives";

export class World {
  constructor() {
    this.components = new Map();
    this.systems = new Map();
    this.uniqueIdGen = new UniqueIDGen();
  }

  registerComponent(name, properties) {}

  registerSystem(systemGroup, systemClass) {}

  createEntity(properties) {}
}
