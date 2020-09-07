export default {
    baseUrl: 'https://softserve2020romeo.herokuapp.com', // Romeo
    // baseUrl: 'http://34.107.31.146:5000', // Charlie
    // baseUrl: 'http://studysierapi.azurewebsites.net', // Sierra

    // Auth
    userSignIn: '/api/auth',
    userSignOut: '/api/auth',

    // Courses
    addCourse: '/api/courses',
    getCourses: '/api/courses',
    editCourse: '/api/courses',
    deleteCourse: '/api/courses',

    // Mentors
    hireMentor: '/api/mentors',
    getListOfMentors: '/api/mentors',
    editMentor: '/api/mentors',
    fireMentor: '/api/mentors',

    // Groups
    addGroup: '/api/student_groups',
    getAllGroups: '/api/student_groups',
    editGroup: '/api/student_groups',
    getGroupDetails: '/api/student_groups',
    deleteGroup: '/api/student_groups',

    // Students
    addStudent: '/api/students',
    getAllStudents: '/api/students',
    getStudentById: '/api/students',
    editStudent: '/api/students',
    deleteStudent: '/api/students',

    // Lessons
    addLesson: '/api/lessons',
    editLesson: '/api/lessons',
    getAllLessons: '/api/lessons',
    getAllLessonsByGroup: '/api/lessons/student_groups',
    getAllLessonsByCourse: '/api/lessons/courses',
    getAllLessonsByMentor: '/api/lessons/mentors',
    getAllLessonsByStudent: '/api/lessons/students',
    deleteGroupFromLesson: '/api/lessons',

    // themes
    getThemes: '/api/themes',
};
