import AbilityScoreController from '@/controllers/api/2024/abilityScoreController'
import express from 'express'

const router = express.Router()

router.get('/', function (req, res, next) {
  AbilityScoreController.index(req, res, next)
})

router.get('/:index', function (req, res, next) {
  AbilityScoreController.show(req, res, next)
})

export default router
