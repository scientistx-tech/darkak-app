import { Tabs } from 'expo-router';
import { View } from 'react-native';

type TabScreenProps = {
    name: string;
    title: string;
    VectorIcon: any;
    iconName: string;
    size: number;
  color?: string;
  activeBackground?: string;
}
type TabBarIconProps = {
    color?: string;
    size?: number;
    focused?: boolean;
}

const TabScreen = ({ name, title, VectorIcon, iconName, size, color = '#FFFFFF', activeBackground = '#5694FF' }: TabScreenProps) => {
  // Renders a Tabs.Screen with a floating circular active style similar to the provided design.
  // - activeBackground: background for the active circular button (defaults to light blue)
  // - color: icon color (defaults to white)
  return (
    <Tabs.Screen
      name={name}
      options={{
        title: title,
        tabBarLabel: title,
        tabBarActiveTintColor: color,
        tabBarInactiveTintColor: color,
        tabBarIcon: ({ focused }: TabBarIconProps) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {focused ? (
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: activeBackground,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -28,
                  // subtle shadow to lift the button
                  shadowColor: '#000',
                  shadowOpacity: 0.18,
                  shadowOffset: { width: 0, height: 6 },
                  shadowRadius: 10,
                  elevation: 6,
                }}
              >
                <VectorIcon name={iconName} size={size} color="#FFFFFF" />
              </View>
            ) : (
              <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <VectorIcon name={iconName} size={size} color={color} />
              </View>
            )}
          </View>
        ),
      }}
    />
  );
};

export default TabScreen