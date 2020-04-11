const User = require('./user')
const Category = require('./category')
const Exam = require('./exam')
const ExamScore = require('./examscore')
const Section = require('./section')
const UserExam = require('./userexam')
const ScoreByExam = require('./scoreByExam')

User.hasMany(ExamScore)
ExamScore.belongsTo(User)

User.belongsToMany(Exam, {through: UserExam})
ExamScore.belongsToMany(User, {through: UserExam})

UserExam.belongsTo(ExamScore)
User.hasMany(UserExam)
Exam.hasMany(UserExam, {as: 'exam'})
Category.hasMany(UserExam, {as: 'category'})
Section.hasMany(UserExam, {as: 'section'})

// User.belongsToMany(Exam, {through: UserExam})
// ExamScore.belongsToMany(User, {through: UserExam})

// Category.hasMany(ExamScore, {as: 'category'})
ExamScore.belongsTo(Category)
// Section.hasMany(ExamScore, {as: 'section'})
ExamScore.belongsTo(Section)
// Exam.hasMany(ExamScore, {as: 'exam'})
ExamScore.belongsTo(Exam)

module.exports = {
  User,
  Category,
  Section,
  Exam,
  ExamScore,
  UserExam,
  ScoreByExam
}
