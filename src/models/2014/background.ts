import { getModelForClass, prop } from '@typegoose/typegoose'
import { DocumentType } from '@typegoose/typegoose/lib/types'
import { APIReference, Choice } from './common'
import { srdModelOptions } from '@/util/modelOptions'

export class EquipmentRef {
  @prop({ type: () => APIReference })
  public equipment!: APIReference

  @prop({ required: true, index: true, type: () => Number })
  public quantity!: number
}

class Feature {
  @prop({ required: true, index: true, type: () => String })
  public name!: string

  @prop({ required: true, index: true, type: () => [String] })
  public desc!: string[]
}

@srdModelOptions('2014-backgrounds')
export class Background {
  @prop({ required: true, index: true, type: () => String })
  public index!: string

  @prop({ required: true, index: true, type: () => String })
  public name!: string

  @prop({ type: () => [APIReference] })
  public starting_proficiencies!: APIReference[]

  @prop({ type: () => Choice })
  public language_options!: Choice

  @prop({ required: true, index: true, type: () => String })
  public url!: string

  @prop({ type: () => [EquipmentRef] })
  public starting_equipment!: EquipmentRef[]

  @prop({ type: () => [Choice], index: true })
  public starting_equipment_options!: Choice[]

  @prop({ type: () => Feature })
  public feature!: Feature

  @prop({ type: () => Choice })
  public personality_traits!: Choice

  @prop({ type: () => Choice })
  public ideals!: Choice

  @prop({ type: () => Choice })
  public bonds!: Choice

  @prop({ type: () => Choice })
  public flaws!: Choice

  @prop({ required: true, index: true, type: () => String })
  public updated_at!: string
}

export type BackgroundDocument = DocumentType<Background>
const BackgroundModel = getModelForClass(Background)

export default BackgroundModel
