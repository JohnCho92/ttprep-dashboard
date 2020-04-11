const router = require('express').Router()
const {
  User,
  ExamScore,
  Exam,
  Section,
  Category,
  ScoreByExam
} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {id: req.params.userId},
      include: [
        {
          model: ExamScore,
          attributes: [
            'id',
            'userId',
            'examId',
            'sectionId',
            'categoryId',
            'correct',
            'incorrect',
            'score'
          ],
          include: [
            {model: Exam, attributes: ['name']},
            {model: Section, attributes: ['name']},
            {model: Category, attributes: ['categoryName']}
          ]
        }
      ]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// need to sort exams by ascending order
router.get('/:userId/exams', async (req, res, next) => {
  try {
    const exam = await ScoreByExam.findAll({
      where: {userId: req.params.userId},
      order: [['examId', 'ASC']]
    })
    res.json(exam)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/exams/:examId', async (req, res, next) => {
  try {
    const exam = await ExamScore.findAll({
      where: {
        userId: req.params.userId,
        examId: req.params.examId
      },
      include: {
        model: Category,
        attributes: ['categoryName'],
        order: [['id', 'ASC']]
      }
    })
    res.json(exam)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/exams/:examId/reading', async (req, res, next) => {
  try {
    const exam = await ExamScore.findAll({
      where: {
        userId: req.params.userId,
        examId: req.params.examId,
        sectionId: 1
      },
      include: [
        {model: Section, attributes: ['name']},
        {
          model: Category,
          attributes: ['categoryName'],
          order: [['id', 'ASC']]
        }
      ]
    })
    res.json(exam)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/exams/:examId/writing', async (req, res, next) => {
  try {
    const exam = await ExamScore.findAll({
      where: {
        userId: req.params.userId,
        examId: req.params.examId,
        sectionId: 2
      },
      include: [
        {model: Section, attributes: ['name']},
        {
          model: Category,
          attributes: ['categoryName'],
          order: [['id', 'ASC']]
        }
      ]
    })
    res.json(exam)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/exams/:examId/math', async (req, res, next) => {
  try {
    const exam = await ExamScore.findAll({
      where: {
        userId: req.params.userId,
        examId: req.params.examId,
        sectionId: 3
      },
      include: [
        {model: Section, attributes: ['name']},
        {
          model: Category,
          attributes: ['categoryName'],
          order: [['id', 'ASC']]
        }
      ]
    })
    res.json(exam)
  } catch (err) {
    next(err)
  }
})
