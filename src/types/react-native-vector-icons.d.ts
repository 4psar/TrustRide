declare module 'react-native-vector-icons/Ionicons' {
  import { Icon } from 'react-native-vector-icons/Icon';
  export default class Ionicons extends Icon {
    static glyphMap: { [name: string]: number };
  }
}

declare module 'react-native-vector-icons/Icon' {
  import * as React from 'react';
  import { TextStyle, StyleProp } from 'react-native';

  export interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: StyleProp<TextStyle>;
  }

  export class Icon extends React.Component<IconProps> {}
}
