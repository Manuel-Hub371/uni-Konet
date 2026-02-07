import 'package:flutter/material.dart';
import 'role_selection_screen.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text('Profile Screen'),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
               Navigator.pushAndRemoveUntil(
                context,
                MaterialPageRoute(builder: (context) => const RoleSelectionScreen()),
                (route) => false,
              );
            },
            child: const Text('Logout'),
          )
        ],
      ),
    );
  }
}
