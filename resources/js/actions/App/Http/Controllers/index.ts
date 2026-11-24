import DashboardController from './DashboardController'
import LearningPathController from './LearningPathController'
import ProgressController from './ProgressController'
import LessonController from './LessonController'
import QuizController from './QuizController'
import ProfileController from './ProfileController'
import Auth from './Auth'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
LearningPathController: Object.assign(LearningPathController, LearningPathController),
ProgressController: Object.assign(ProgressController, ProgressController),
LessonController: Object.assign(LessonController, LessonController),
QuizController: Object.assign(QuizController, QuizController),
ProfileController: Object.assign(ProfileController, ProfileController),
Auth: Object.assign(Auth, Auth),
}

export default Controllers