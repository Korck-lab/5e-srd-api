import EquipmentModel from '@/models/2014/equipment'
import { gearFieldResolvers } from './common'
import { Equipment } from '@/models/2014/equipment'

const PackResolver = {
  ...gearFieldResolvers,
  contents: async (pack: Equipment) => {
    const contents = pack.contents
    const equipment = await EquipmentModel.find({
      index: { $in: contents?.map((c) => c.item.index) }
    }).lean()

    return contents?.map((c) => ({
      ...c,
      item: equipment.find((e) => e.index === c.item.index)
    }))
  }
}

export default PackResolver
