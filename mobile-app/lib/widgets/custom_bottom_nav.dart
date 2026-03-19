import 'package:flutter/material.dart';

class CustomBottomNav extends StatelessWidget {
  final int currentIndex;

  const CustomBottomNav({
    super.key,
    required this.currentIndex,
  });

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF4F46E5);
    const Color textMuted = Color(0xFF64748B);

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 20,
            offset: const Offset(0, -5),
          ),
        ],
      ),
      child: BottomNavigationBar(
        currentIndex: currentIndex,
        elevation: 0,
        backgroundColor: Colors.transparent,
        selectedItemColor: primaryBlue,
        unselectedItemColor: textMuted.withOpacity(0.5),
        showSelectedLabels: true,
        showUnselectedLabels: false,
        selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_rounded),
            activeIcon: Icon(Icons.home_rounded),
            label: 'Home',
          ),
          BottomNavigationBarItem(icon: Icon(Icons.chat_bubble_outline_rounded), label: 'Chat'),
          BottomNavigationBarItem(
            icon: Icon(Icons.add_circle_outline_rounded, size: 32),
            label: 'Post',
          ),
          BottomNavigationBarItem(icon: Icon(Icons.grid_view_rounded), label: 'Apps'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline_rounded), label: 'Profile'),
        ],
        onTap: (index) {
          if (index == currentIndex) return;
          
          String route = '/main';
          switch (index) {
            case 0: route = '/main'; break;
            case 1: route = '/chat'; break;
            case 2: route = '/post'; break;
            case 3: route = '/dashboard'; break;
            case 4: route = '/profile'; break;
          }
          
          Navigator.pushReplacementNamed(context, route);
        },
      ),
    );
  }
}
