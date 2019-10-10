import React from 'react';
import { YellowBox } from 'react-native'; // Informações de warning que aparecem na aplicação
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return <Routes />
}
