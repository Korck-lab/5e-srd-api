import { Option } from '@/models/2014/common'

const EquipmentOptionResolver = {
  __resolveType(option: Option) {
    if (option.option_type === 'counted_reference') return 'CountedReferenceOption'
    if (option.option_type === 'choice') return 'EquipmentCategoryChoiceOption'
    if (option.option_type === 'multiple') return 'EquipmentMultipleOption'

    return null
  }
}

export default EquipmentOptionResolver
