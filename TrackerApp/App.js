// import * as React from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";
// // import { createStackNavigator } from "@react-navigation/stack";
// import Home from "./components/Home.js";
// import Goals from "./components/Goals.js";

// // const Stack = createStackNavigator();

// const Drawer = createDrawerNavigator();
  
// export default function App() {
//   return (
//     <NavigationContainer>
//        <Drawer.Navigator
//     //  screenOptions={{
//     //     drawerActiveBackgroundColor: 'rgba(128, 128, 128, 0.1)',
//     //     drawerActiveTintColor: 'black',
//     //   }}
//     >
//       <Drawer.Screen name="Home"  component={Home} />
//       <Drawer.Screen name="Goals" component={Goals} />
//     </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }


import * as React from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/Home.js";
import Goals from "./components/Goals.js";

const Stack = createStackNavigator();

// const Drawer = createDrawerNavigator();

// function Root(){
//   return(
//     <Drawer.Navigator
//     //  screenOptions={{
//     //     drawerActiveBackgroundColor: 'rgba(128, 128, 128, 0.1)',
//     //     drawerActiveTintColor: 'black',
//     //   }}
//     >
//       <Drawer.Screen name="Home"  component={Home} />
//       <Drawer.Screen name="Goals" component={Goals} />
//     </Drawer.Navigator>
//   )
// }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "rgba(30, 30, 30, 0.9)",
          },
          headerTintColor: "white",
        }}
      >
        {/* <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Goals" component={Goals} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
