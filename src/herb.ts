import { RemoteQuestTracker } from '@dcl/RemoteQuestTracker'
import { ProgressStatus, QuestState } from 'dcl-quests-client/quests-client-amd'
import { progressInQuest, taskIds } from './quests'
import * as utils from '@dcl/ecs-scene-utils'

let clicksCount = 0
let canPick = true

export class Herb extends Entity {
  private task: taskIds
  //   private step: stepIds
  private client: RemoteQuestTracker
  private idleAnim: AnimationState
  private pickAnim: AnimationState
  constructor(
    model: string,
    transform: TransformConstructorArgs,
    task: taskIds,
    // step: stepIds,
    client: RemoteQuestTracker
  ) {
    super()
    engine.addEntity(this)
    this.addComponent(new GLTFShape(model))
    this.addComponent(new Transform(transform))
    this.addComponent(new Animator())
    this.task = task
    // this.step = step
    this.client = client

    this.idleAnim = new AnimationState('idle', { looping: true })
    this.pickAnim = new AnimationState('pick', { looping: false })

    this.getComponent(Animator).addClip(this.idleAnim)
    this.getComponent(Animator).addClip(this.pickAnim)

    this.idleAnim.play()

    this.addComponent(
      new OnPointerDown(
        () => {
          this.pick()
        },
        {
          hoverText: 'Collect',
          distance: 4,
          button: ActionButton.PRIMARY,
        }
      )
    )
  }
  pick() {
    if (!canPick) return

    canPick = false

    let collectSound = new AudioClip('sounds/grab.mp3')
    this.addComponentOrReplace(new AudioSource(collectSound))
    this.getComponent(AudioSource).playOnce()
    this.pickAnim.play()

    if (clicksCount < 3) {
      progressInQuest(this.task, true)
    }
    clicksCount += 1

    utils.setTimeout(600, () => {
      this.idleAnim.play()

      canPick = true
    })
  }
}
