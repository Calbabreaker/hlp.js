import Dictionary from "../utils/dictionary";
import UniqueIDGen from "../utils/unique_id_gen";
import * as ECS from "./ecs_primitives";

class World {
  constructor() {
    this.components = new Dictionary();
    this.systems = new Dictionary();
    this.uniqueIdGen = new UniqueIDGen();
  }

  registerComponent(name, properties) {}

  registerSystem(systemGroup, systemClass) {}

  createEntity(properties) {}
}

export default World;
