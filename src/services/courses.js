// src/services/courses.js
const courses = [
    {
      id: 1,
      title: 'React Native for Beginners',
      description: 'Learn the basics of React Native.',
      details: 'This course covers fundamental concepts of React Native.',
      popularity: 90,
      enrolled: true,
      lessons: [
        { id: 1, title: 'Introduction to React Native' },
        { id: 2, title: 'Setting up the Environment' },
        { id: 3, title: 'Setting up the Environment' },
      ],
    },
    {
      id: 2,
      title: 'Advanced React Native',
      description: 'Dive deep into advanced concepts of React Native.',
      details: 'Advanced topics including performance optimization and native modules.',
      popularity: 85,
      enrolled: false,
      lessons: [
        { id: 1, title: 'Performance Optimization' },
        { id: 2, title: 'Integrating Native Modules' },
      ],
    },
    {
      id: 3,
      title: 'JavaScript Essentials',
      description: 'Master the fundamentals of JavaScript.',
      details: 'Comprehensive coverage of JavaScript basics to advanced topics.',
      popularity: 95,
      enrolled: false,
      lessons: [
        { id: 1, title: 'Variables and Data Types' },
        { id: 2, title: 'Functions and Scope' },
      ],
    },
  ];
  
  export const getCourses = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(courses);
      }, 10);
    });
  };
  
  export const getCourseById = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(courses.find(course => course.id === id));
      }, 10);
    });
  };
  
  export const searchCourses = (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(courses.filter(course => course.title.toLowerCase().includes(query.toLowerCase())));
      }, 10);
    });
  };
  
  export const getPopularCourses = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(courses.filter(course => course.popularity > 80));
      }, 10);
    });
  };
  
  export const getEnrolledCourses = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(courses.filter(course => course.enrolled));
      }, 10);
    });
  };
  