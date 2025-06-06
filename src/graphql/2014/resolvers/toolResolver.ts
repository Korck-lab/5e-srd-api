import EquipmentCategoryModel from '@/models/2014/equipmentCategory'
import { equipmentFieldResolvers } from './common'

import { Equipment } from '@/models/2014/equipment'

const ToolResolver = {
  ...equipmentFieldResolvers,
  tool_category: async (tool: Equipment) => {
    let index = tool.tool_category?.replace(/\s+/g, '-').replace(/'/g, '').toLowerCase()
    if (index?.charAt(index.length - 1) !== 's') index += 's'
    return await EquipmentCategoryModel.findOne({ index }).lean()
  }
}

export default ToolResolver
