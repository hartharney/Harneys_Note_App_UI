import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";


const Stack = createStackNavigator();

const AuthNaviagtor = () => {
    return (
            <Stack.Navigator screenOptions={{headerShown : false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Register"  >
                    {props => <RegisterScreen {...props} currentPath="/register" />}
                </Stack.Screen>
                <Stack.Screen name="Login" >
                    {props => <LoginScreen {...props} currentPath="/login" />}
                </Stack.Screen>
            </Stack.Navigator>
    )
}

export default AuthNaviagtor;
