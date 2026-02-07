import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const UniKonetApp());
}

class UniKonetApp extends StatelessWidget {
  const UniKonetApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'uniKonet',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const HomeScreen(),
    );
  }
}
