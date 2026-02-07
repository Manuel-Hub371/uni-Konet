import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'screens/splash_screen.dart';

void main() {
  // Ensure status bar style is consistent
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.dark,
  ));
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'uniKonet',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        // Primary Color Palette
        primaryColor: const Color(0xFF407BFF), // Professional Light Blue
        scaffoldBackgroundColor: const Color(0xFFF5F7FA), // Soft White/Grey
        
        // Color Scheme
        colorScheme: ColorScheme.fromSwatch().copyWith(
          primary: const Color(0xFF407BFF),
          secondary: const Color(0xFF6C63FF), // Accent Purple
          surface: Colors.white,
        ),

        // AppBar Theme
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          elevation: 0,
          centerTitle: true,
          iconTheme: IconThemeData(color: Color(0xFF2D3748)),
          titleTextStyle: TextStyle(
            color: Color(0xFF2D3748),
            fontSize: 20,
            fontWeight: FontWeight.bold,
            letterSpacing: 0.5,
          ),
        ),

        // Input Decoration Theme (TextFields)
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.white,
          contentPadding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFF407BFF), width: 2),
          ),
          prefixIconColor: const Color(0xFFA0AEC0),
          labelStyle: const TextStyle(color: Color(0xFF718096)),
        ),

        // ElevatedButton Theme
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF407BFF),
            foregroundColor: Colors.white,
            elevation: 2,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            padding: const EdgeInsets.symmetric(vertical: 16),
            textStyle: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              letterSpacing: 0.5,
            ),
          ),
        ),

        // Text Theme
        textTheme: const TextTheme(
          headlineMedium: TextStyle(
            color: Color(0xFF2D3748),
            fontWeight: FontWeight.bold,
            letterSpacing: -0.5,
          ),
          titleLarge: TextStyle(
            color: Color(0xFF2D3748),
            fontWeight: FontWeight.w600,
          ),
          bodyMedium: TextStyle(
            color: Color(0xFF4A5568),
            fontSize: 15,
          ),
        ),
        
        useMaterial3: true,
      ),
      home: const SplashScreen(),
    );
  }
}
