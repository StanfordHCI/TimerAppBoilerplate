import React, { default as ReactFromImport } from "react";
import { default as ReactReduxFromImport, Provider } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationOptions } from "@react-navigation/stack/lib/typescript/src/types";
import { CardStyleInterpolators, createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';

import ENV from "./config";
import { ReactFromModule, ReactReduxFromModule } from "reactgenie-lib";

import { TimerView } from "./src/TimerView";
import { NewTimerForm } from "./src/NewTimerForm";


console.log("React is ReactFromModule", ReactFromModule === ReactFromImport);
console.log(
  "ReactRedux is ReactReduxFromModule: ",
  ReactReduxFromImport === ReactReduxFromModule
);

export let AppNavigator: any = null;

type Props = NativeStackScreenProps<any, any>

const TimerTab = ({route, navigation}: Props) => {
    AppNavigator = navigation
    return (
        <TimerView/>
    )
}

const TimerModalTab = ({route, navigation}: Props) => {
    AppNavigator = navigation
    return (
          <NewTimerForm {...route.params}/>
    )
}

const cardStyle: StackNavigationOptions = {
    presentation: 'card' ,
    animationEnabled: true,
    headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
}

const modalStyle: StackNavigationOptions = {
    presentation: 'modal' ,
    animationEnabled: true,
    headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    headerShown: false,
    animationTypeForReplace: 'pop',
}

const App = () => {
    let TimerStack = () => {
        let TimerNavigator = createStackNavigator();
        return (
            <TimerNavigator.Navigator screenOptions={{
                headerShown: true
            }}>
                <TimerNavigator.Screen name="Timers" component={TimerTab} options={cardStyle}/>
                <TimerNavigator.Screen name="TimerModal" component={TimerModalTab} options={modalStyle}  />
            
            </TimerNavigator.Navigator >
        );
    }

  return (
    // TODO: wrap TimerStack with relevant providers for React Genie
          <TimerStack/>
  );
};

export default App;
