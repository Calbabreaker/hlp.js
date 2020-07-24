hlp.ECSWorld = class {
  constructor() {
    this.components = new hlp.Dictionary();
    this.systems = new hlp.Dictionary();
    this.uniqueIdGen = new hlp.UniqueIDGen();
  }

  registerComponent(name, properties) {}

  registerSystem(systemGroup, systemClass) {}

  createEntity(properties) {}
};
