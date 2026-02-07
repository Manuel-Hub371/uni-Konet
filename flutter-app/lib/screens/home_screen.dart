import 'package:flutter/material.dart';
import 'news_feed_screen.dart';
import 'chat_list_screen.dart';
import 'create_post_screen.dart';
import 'student_dashboard_screen.dart';
import 'lecturer_dashboard_screen.dart';
import 'profile_screen.dart';
import 'notification_screen.dart';

class HomeScreen extends StatefulWidget {
  final String role;

  const HomeScreen({super.key, required this.role});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  // List of screens for navigation
  late final List<Widget> _screens;

  @override
  void initState() {
    super.initState();
    // Initialize screens based on role
    _screens = [
      const NewsFeedScreen(),
      const ChatListScreen(),
      const CreatePostScreen(),
      widget.role == 'Student' 
          ? const StudentDashboardScreen() 
          : const LecturerDashboardScreen(),
      const ProfileScreen(),
    ];
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final primaryColor = Theme.of(context).primaryColor;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        // Leading University Logo
        leading: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Container(
            decoration: BoxDecoration(
              color: primaryColor.withOpacity(0.1),
              shape: BoxShape.circle,
            ),
            child: Icon(
              Icons.school_rounded, 
              color: primaryColor,
              size: 24,
            ),
          ),
        ),
        title: const Text(
          'uniKonet',
          style: TextStyle(
            color: Color(0xFF2D3748),
            fontWeight: FontWeight.bold,
            letterSpacing: -0.5,
          ),
        ),
        centerTitle: true,
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 16),
            decoration: BoxDecoration(
              color: const Color(0xFFF7FAFC),
              shape: BoxShape.circle,
            ),
            child: IconButton(
              icon: const Icon(Icons.notifications_none_rounded, color: Color(0xFF4A5568)),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const NotificationScreen()),
                );
              },
            ),
          ),
        ],
        bottom: PreferredSize(
            preferredSize: const Size.fromHeight(1),
            child: Container(color: const Color(0xFFEDF2F7), height: 1),
        ),
      ),
      body: _screens[_selectedIndex],
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 20,
              offset: const Offset(0, -5),
            ),
          ],
        ),
        child: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          backgroundColor: Colors.white,
          elevation: 0,
          currentIndex: _selectedIndex,
          selectedItemColor: primaryColor,
          unselectedItemColor: const Color(0xFFA0AEC0),
          selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
          unselectedLabelStyle: const TextStyle(fontWeight: FontWeight.w500, fontSize: 12),
          onTap: _onItemTapped,
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.home_outlined),
              activeIcon: Icon(Icons.home_rounded),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.chat_bubble_outline_rounded),
              activeIcon: Icon(Icons.chat_bubble_rounded),
              label: 'Chat',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.add_box_outlined),
              activeIcon: Icon(Icons.add_box_rounded),
              label: 'Post',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.dashboard_outlined),
              activeIcon: Icon(Icons.dashboard_rounded),
              label: 'Dashboard',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person_outline_rounded),
              activeIcon: Icon(Icons.person_rounded),
              label: 'Profile',
            ),
          ],
        ),
      ),
    );
  }
}
