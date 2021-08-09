import { createChannel } from '../node_modules/decentraland-builder-scripts/channel'
import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'

import { AmbientSound } from './ambient'
import { handleQuests } from './quests'

let plaza = new Entity()
plaza.addComponent(new GLTFShape('models/MedievalPlaza.glb'))
plaza.addComponent(
  new Transform({
    position: new Vector3(160, 0, 160),
  })
)

engine.addEntity(plaza)

let dragon = new Entity()
dragon.addComponent(new GLTFShape('models/Dragon.glb'))
dragon.addComponent(
  new Transform({
    position: new Vector3(223, 51, 92),
    scale: new Vector3(1, 1, 1),
    rotation: Quaternion.Euler(0, -35, 0),
  })
)
const dragonAnimator = new Animator()
dragon.addComponent(dragonAnimator)
let playDragon = new AnimationState('DragonIdle')
dragonAnimator.addClip(playDragon)
playDragon.play()
engine.addEntity(dragon)

engine.addEntity(dragon)

handleQuests()

let town = new AmbientSound(
  { position: new Vector3(61, 2, 134) },
  'sounds/medieval-town.mp3',
  0,
  true
)

let town2 = new AmbientSound(
  { position: new Vector3(150, 2, 250) },
  'sounds/medieval-town.mp3',
  0,
  true
)

let water = new AmbientSound(
  { position: new Vector3(151, 4, 95) },
  'sounds/water.mp3',
  0,
  true
)

// Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, true, (e) => {
//   log(`pos: `, Camera.instance.feetPosition)
//   log(`rot: `, Camera.instance.rotation)
//   // if(e.hit){
//   //   console.log(
//   //     'ENT: ',  engine.entities[e.hit.entityId],
//   //     'POS:', engine.entities[e.hit.entityId].getComponent(Transform)
//   //   )
//   // }
// })
