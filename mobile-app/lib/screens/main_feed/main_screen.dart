import 'package:flutter/material.dart';

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('UniKonet Feed'),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications),
            onPressed: () => Navigator.pushNamed(context, '/notifications'),
          ),
        ],
      ),
      body: ListView.builder(
        itemCount: 10,
        itemBuilder: (context, index) => Card(
          margin: const EdgeInsets.all(8),
          child: ListTile(
            leading: const CircleAvatar(child: Icon(Icons.person)),
            title: Text('Announcement #${index + 1}'),
            subtitle: const Text('This is a placeholder for a university update...'),
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 0,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.chat), label: 'Chat'),
          BottomNavigationBarItem(icon: Icon(Icons.add_box), label: 'Post'),
          BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Dashboard'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
        onTap: (index) {
          switch (index) {
            case 1: Navigator.pushNamed(context, '/chat'); break;
            case 2: Navigator.pushNamed(context, '/post'); break;
            case 3: Navigator.pushNamed(context, '/dashboard'); break;
            case 4: Navigator.pushNamed(context, '/profile'); break;
          }
        },
      ),
    );
  }
}
