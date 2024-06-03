// import React from 'react';
// import { View, ScrollView, Text, StyleSheet  ,FlatList} from 'react-native';
// import Header from '../components/Header';
// import SearchBar from '../components/SearchBar';
// import CourseCard from '../components/CourseCard';

// const Home = ({navigation}) => {
//     const cardData = [
//         {
//           title: "Cloud",
//           lessons: "52 Lessons",
//           image: require('../images/Cloud.png'),
//         },
//         {
//             title: "User Interface",
//             lessons: "52 Lessons",
//             image: require('../images/UserInterface.png')
//           },
//           {
//             title: "Database",
//             lessons: "52 Lessons",
//             image: require('../images/UserInterface.png')
//           },{
//             title:"JavaScript",
//             lessons:"49 Lessons",
//             image:require('../images/JavaScript.png')
//           }
//       ];
//   return (
//     <ScrollView style={styles.container}>
//       <Header />
//       <SearchBar />
//       <Text style={styles.sectionTitle}>Popular Courses</Text>
//       <CourseCard
//         title="React JS"
//         lessons="31 Lessons"
//         image={require('../images/ReactJS.png')}
//         isPopular
//       />
//       <Text style={styles.sectionTitle}>All Courses</Text>
//       <FlatList
//       data={cardData}
//       renderItem={({ item }) => (
//         <CourseCard
//           title={item.title}
//           lessons={item.lessons}
//           image={item.image}
//           navigation={navigation}
//         />
//       )}
//       keyExtractor={(item, index) => index.toString()}
//     />
//       <CourseCard
//         title="Cloud"
//         lessons="52 Lessons"
//         image={require('../images/Cloud.png')}
//       />
//       <CourseCard
//         title="User Interface"
//         lessons="34 Lessons"
//         image={require('../images/UserInterface.png')}
//       />
//       <CourseCard
//         title="Database"
//         lessons="30 Lessons"
//         image={require('../images/Database.png')}
//       />
//       <CourseCard
//         title="JavaScript"
//         lessons="49 Lessons"
//         image={require('../images/JavaScript.png')}
//       />
//       <CourseCard
//         title="Core Java"
//         lessons="40 Lessons"
//         image={require('../images/JavaScript.png')}
//       />
//       <CourseCard
//         title="Html/Html5"
//         lessons="40 Lessons"
//         image={require('../images/JavaScript.png')}
//       />
//       <CourseCard
//         title="CSS/CSS3"
//         lessons="40 Lessons"
//         image={require('../images/JavaScript.png')}
//       />
//       <CourseCard
//         title="Python"
//         lessons="40 Lessons"
//         image={require('../images/JavaScript.png')}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f7f7',
//     paddingHorizontal: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10,
//     color: '#333',
//   },
// });

// export default Home;


import React from 'react';
import { ScrollView, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CourseCard from '../components/CourseCard';

const Home = ({ navigation }) => {
    const cardData = [
        {
            title: "Cloud",
            lessons: "52 Lessons",
            image: require('../images/Cloud.png'),
        },
        {
            title: "User Interface",
            lessons: "52 Lessons",
            image: require('../images/UserInterface.png')
        },
        {
            title: "Database",
            lessons: "52 Lessons",
            image: require('../images/Database.png')
        },
        {
            title: "JavaScript",
            lessons: "49 Lessons",
            image: require('../images/JavaScript.png')
        }
    ];
    return (
        <ScrollView style={styles.container}>
            <Header />
            <SearchBar />
            <Text style={styles.sectionTitle}>Popular Courses</Text>
            <CourseCard
                title="React JS"
                lessons="31 Lessons"
                image={require('../images/ReactJS.png')}
                isPopular
            />
            <Text style={styles.sectionTitle}>All Courses</Text>
            <FlatList
                data={cardData}
                renderItem={({ item }) => (
                    <CourseCard
                        title={item.title}
                        lessons={item.lessons}
                        image={item.image}
                        navigation={navigation}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
});

export default Home;
