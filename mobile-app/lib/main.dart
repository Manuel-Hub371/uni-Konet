import 'package:flutter/material.dart';
import 'screens/login/login_screen.dart';
import 'screens/change_password/change_password_screen.dart';
import 'screens/main_feed/main_screen.dart';
import 'screens/chat/chat_screen.dart';
import 'screens/post/post_screen.dart';
import 'screens/dashboard/dashboard_screen.dart';
import 'screens/profile/profile_screen.dart';
import 'screens/notifications/notification_screen.dart';

void main() {
  runApp(const UniKonetApp());
}

class UniKonetApp extends StatelessWidget {
  const UniKonetApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'UniKonet',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      initialRoute: '/login',
      routes: {
        '/login': (context) => const LoginScreen(),
        '/change-password': (context) => const ChangePasswordScreen(),
        '/main': (context) => const MainScreen(),
        '/chat': (context) => const ChatScreen(),
        '/post': (context) => const PostScreen(),
        '/dashboard': (context) => const DashboardScreen(),
        '/profile': (context) => const ProfileScreen(),
        '/notifications': (context) => const NotificationScreen(),
      },
    );
  }
}
