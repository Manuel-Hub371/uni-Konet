import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Profile')),
      body: Column(
        children: [
          const SizedBox(height: 20),
          const CircleAvatar(radius: 50, child: Icon(Icons.person, size: 50)),
          const ListTile(title: Text('Name'), subtitle: Text('John Doe')),
          const ListTile(title: Text('Role'), subtitle: Text('Student')),
          ElevatedButton(
            onPressed: () => Navigator.pushReplacementNamed(context, '/login'),
            child: const Text('Logout'),
          ),
        ],
      ),
    );
  }
}
