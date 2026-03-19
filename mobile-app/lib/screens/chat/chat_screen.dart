import 'package:flutter/material.dart';
import '../../widgets/custom_bottom_nav.dart';

class ChatScreen extends StatelessWidget {
  const ChatScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Chats')),
      body: const Center(child: Text('Chat List Placeholder')),
      bottomNavigationBar: const CustomBottomNav(currentIndex: 1),
    );
  }
}
